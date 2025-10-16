import React from "react";
import "../styles.css";

export default function Landing({ onStart }) {
  return (
    <div>
      {/* 1️ Sección principal (título + botones) */}
      <section className="hero">
        <div className="hero-content">
          <h1>PyCodemy</h1>
          <div className="hero-buttons">
            <button className="btn-secondary">Iniciar sesión</button>
            <button className="btn-outline">Registrarse</button>
          </div>
        </div>
      </section>

      {/* 2️ Sección de descripción */}
      <section className="info">
        <p className="info-text">
          Microlecciones y desafíos diarios para mejorar tus habilidades de código en minutos.
        </p>
        <button className="btn-primary" onClick={onStart}>
          Comienza ahora →
        </button>
      </section>

      {/* 3️ Sección vacía */}
      <section className="empty-section">
        <p>Próximamente más contenido...</p>
      </section>

      {/* 4️ Footer */}
      <footer className="footer">
        <p>© 2025 Code Microlearning | Desarrollado por Izaro Rubio Uribe</p>
      </footer>
    </div>
  );
}
