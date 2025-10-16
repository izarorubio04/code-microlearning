import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/navbar.css";

export default function Navbar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Code Microlearning</h2>

      <div className="nav-links">
        {session ? (
          <>
            <Link to="/home">Inicio</Link>
            <Link to="/lessons">Lecciones</Link>
            <Link to="/daily">Reto Diario</Link>
            <Link to="/account">Perfil</Link>
            <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/auth">Iniciar sesión</Link>
          </>
        )}
      </div>
    </nav>
  );
}
