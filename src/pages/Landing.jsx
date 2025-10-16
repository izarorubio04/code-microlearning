import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function Landing({ session }) {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* 1. Hero */}
      <section className="hero">
        <h1>PyCodemy</h1>
        <div className="hero-buttons">
          {session ? (
            <button className="btn-primary" onClick={() => navigate("/home")}>
              Ir al inicio →
            </button>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => navigate("/auth")}>
                Iniciar sesión
              </button>
              <button className="btn-outline" onClick={() => navigate("/auth")}>
                Registrarse
              </button>
            </>
          )}
        </div>
      </section>

      {/* 2. Descripción */}
      <section className="info">
        <p>Microlecciones y desafíos diarios para mejorar tus habilidades de código en minutos.</p>
      </section>

      {/* 3. Placeholder */}
      <section className="empty-section">
        <p>Próximamente más contenido...</p>
      </section>
    </div>
  );
}
