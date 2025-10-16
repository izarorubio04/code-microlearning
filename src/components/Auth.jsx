import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/auth.css";


export default function Auth({ onAuthComplete = () => {}, onBack = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // si signUp devuelve user (depende si email confirmation está activado),
    // el onAuthStateChange de App.jsx gestionará el upsert del profile.
    setMessage("¡Revisa tu correo para confirmar la cuenta!");
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // onAuthStateChange en App.jsx asignará session; llamamos al callback
    onAuthComplete();
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Introduce tu correo electrónico.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#reset-password`
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Enlace de restablecimiento enviado. Revisa tu correo.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Accede a PyCodemy</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        <button onClick={handleSignIn} className="bg-blue" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        <button onClick={handleSignUp} className="bg-gray" disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePasswordReset(e);
            }}
            className="forgot"
          >
            ¿Olvidaste tu contraseña?
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Volver
          </a>
        </div>
      </div>
    </div>
  );
}

