// src/components/Account.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Account({ session, onNavigate = () => {} }) {
  const user = session.user;
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    // onAuthStateChange de App.jsx manejará la redirección a home
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-lg mx-auto mt-20 bg-white shadow-lg rounded-xl border">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        ¡Bienvenido, <span className="text-blue-600">{user.email}</span>!
      </h1>

      <p className="text-gray-600 text-center leading-relaxed">
        Has iniciado sesión correctamente con Supabase. Aquí podrás gestionar tu cuenta.
      </p>

      <div className="w-full bg-gray-50 rounded-lg p-4 text-left border">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📋 Información de la cuenta</h2>
        <p className="text-sm text-gray-600"><strong>Correo:</strong> {user.email}</p>
        <p className="text-sm text-gray-600"><strong>ID de usuario:</strong> {user.id}</p>
        <p className="text-sm text-gray-600"><strong>Creado el:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-3 mt-4 w-full">
        <button onClick={() => onNavigate("lessons")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
          Ir a Lecciones
        </button>

        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-6">💡 Consejo: Cuida tu seguridad. No compartas tu contraseña.</p>
    </div>
  );
}
