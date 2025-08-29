import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(err, info) {
    console.error("ErrorBoundary caught:", err, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-6 bg-red-900 text-white rounded">
          <h3 className="text-lg font-bold">Algo deu errado</h3>
          <p className="mt-2">{this.state.error.message || "Erro inesperado"}</p>
          <button onClick={() => this.setState({ error: null })} className="mt-4 px-3 py-2 bg-white text-black rounded">Tentar novamente</button>
        </div>
      );
    }
    return this.props.children;
  }
}
