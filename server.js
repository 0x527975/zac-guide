import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from './config.js';

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    createAdminUser(); // Create admin user after connection
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 500 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  build: { type: mongoose.Schema.Types.ObjectId, ref: 'Build', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Build Schema
const buildSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 1000 },
  lane: { type: String, required: true, enum: ['top', 'jungle', 'mid', 'support', 'bottom'] },
  matchup: { type: String, required: true },
  runes: { type: Object, required: true },
  items: { type: Object, required: true },
  spells: { type: Object, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [String],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Build = mongoose.model('Build', buildSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Create Admin User Function
async function createAdminUser() {
  try {
    const adminExists = await User.findOne({
      $or: [
        { username: config.ADMIN_USERNAME },
        { email: 'admin@zac-guide.com' }
      ]
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(config.ADMIN_PASSWORD, 12);
      const adminUser = new User({
        username: config.ADMIN_USERNAME,
        email: 'admin@zac-guide.com',
        password: hashedPassword,
        isAdmin: true,
        isVerified: true
      });
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log(`👤 Username: ${config.ADMIN_USERNAME}`);
      console.log(`🔑 Password: ${config.ADMIN_PASSWORD}`);
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}


// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Admin Middleware
const adminAuth = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Routes

// Register with Secret Code
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, secretCode } = req.body;
    
    // Secret Code Validation
    const validSecretCodes = [
      'ZAC2024',           // Código principal
      'MONOZAC',           // Código alternativo
      'GOSMA',             // Código alternativo
      'SLIME',             // Código alternativo
      'ZACMAIN'            // Código alternativo
    ];
    
    if (!validSecretCodes.includes(secretCode)) {
      return res.status(400).json({ 
        message: 'Código secreto inválido! Apenas mono Zacs autorizados podem se cadastrar.' 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: true
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
app.get('/api/auth/profile', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        isVerified: req.user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get builds with comments
app.get('/api/builds', async (req, res) => {
  try {
    const builds = await Build.find()
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      })
      .sort({ createdAt: -1 });
    res.json(builds);
  } catch (error) {
    console.error('Get builds error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single build with comments
app.get('/api/builds/:id', async (req, res) => {
  try {
    const build = await Build.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      });
    
    if (!build) {
      return res.status(404).json({ message: 'Build não encontrada' });
    }
    
    // Increment views
    build.views += 1;
    await build.save();
    
    res.json(build);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create build
app.post('/api/builds', auth, async (req, res) => {
  try {
    const build = new Build({
      ...req.body,
      author: req.user._id
    });
    
    await build.save();
    
    const populatedBuild = await Build.findById(build._id)
      .populate('author', 'username');
    
    res.status(201).json(populatedBuild);
  } catch (error) {
    console.error('Create build error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment to build
app.post('/api/builds/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comentário não pode estar vazio' });
    }
    
    const comment = new Comment({
      content: content.trim(),
      author: req.user._id,
      build: req.params.id
    });
    
    await comment.save();
    
    // Add comment to build
    await Build.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id }
    });
    
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');
    
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike comment
app.post('/api/comments/:id/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }
    
    const likeIndex = comment.likes.indexOf(req.user._id);
    if (likeIndex > -1) {
      comment.likes.splice(likeIndex, 1);
    } else {
      comment.likes.push(req.user._id);
    }
    
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment (author or admin only)
app.delete('/api/comments/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }
    
    if (!req.user.isAdmin && comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }
    
    // Remove comment from build
    await Build.findByIdAndUpdate(comment.build, {
      $pull: { comments: comment._id }
    });
    
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comentário deletado' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike build
app.post('/api/builds/:id/like', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) {
      return res.status(404).json({ message: 'Build não encontrada' });
    }
    
    const likeIndex = build.likes.indexOf(req.user._id);
    if (likeIndex > -1) {
      build.likes.splice(likeIndex, 1);
    } else {
      build.likes.push(req.user._id);
    }
    
    await build.save();
    res.json(build);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete build (admin or author)
app.delete('/api/builds/:id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) {
      return res.status(404).json({ message: 'Build não encontrada' });
    }
    
    if (!req.user.isAdmin && build.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }
    
    // Delete all comments
    await Comment.deleteMany({ build: req.params.id });
    
    await Build.findByIdAndDelete(req.params.id);
    res.json({ message: 'Build deletada' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get builds by user
app.get('/api/builds/user/:userId', async (req, res) => {
  try {
    const builds = await Build.find({ author: req.params.userId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(builds);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get liked builds
app.get('/api/builds/liked', auth, async (req, res) => {
  try {
    const builds = await Build.find({ likes: req.user._id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(builds);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search builds
app.get('/api/builds/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const builds = await Build.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { matchup: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
    
    res.json(builds);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Zac Guide API is running',
    timestamp: new Date().toISOString(),
    features: [
      'User Authentication',
      'Build Management',
      'Comment System',
      'Like System',
      'Search Functionality'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Secret codes: ZAC2024, MONOZAC, GOSMA, SLIME, ZACMAIN`);
});
