// src/components/ResetPassword.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ResetPassword({ onBack = () => {} }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Verificar si el hash indica recovery (opcional)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const type = params.get("type");
    if (type !== "recovery") {
      setError("Acceso no válido para restablecer la contraseña.");
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (!password.trim()) {
      setError("Por favor introduce una nueva contraseña.");
      return;
    }
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setMessage("Contraseña actualizada correctamente. Actualiza la página para iniciar sesión.");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4 text-center">Restablecer Contraseña</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="border p-2 w-full rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleUpdatePassword} className="bg-blue-600 text-white p-2 w-full rounded">
          Actualizar contraseña
        </button>

        <div style={{ marginTop: 12 }}>
          <button onClick={onBack} style={{ background: "transparent", border: "none", color: "#2563eb" }}>Volver</button>
        </div>
      </div>
    </div>
  );
}
