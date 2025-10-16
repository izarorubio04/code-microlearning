// src/components/Landing.jsx
import React from "react";
import "../styles.css";

export default function Landing({ onStart, onAuth }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>PyCodemy</h1>
          <div className="hero-buttons">
            <button className="btn-secondary" onClick={() => onAuth?.()}>Iniciar sesión</button>
            <button className="btn-outline" onClick={() => onAuth?.()}>Registrarse</button>
          </div>
        </div>
      </section>

      <section className="info">
        <p className="info-text">
          Microlecciones y desafíos diarios para mejorar tus habilidades de código en minutos.
        </p>
        <button className="btn-primary" onClick={onStart}>
          Comienza ahora →
        </button>
      </section>

      <section className="empty-section">
        <p>Próximamente más contenido...</p>
      </section>

      <footer className="footer">
        <p>© 2025 Code Microlearning | Desarrollado por Izaro Rubio Uribe</p>
      </footer>
    </div>
  );
}
