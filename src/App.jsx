import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Auth from "./components/Auth";
import Account from "./components/Account";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [session, setSession] = useState(null);

  // Detectar sesión activa
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Determinar si estamos en la Landing Page
  const isLanding = location.pathname === "/";

  return (
    <Router>
      <div className="app">
        {/* Solo mostramos Navbar si NO estamos en la landing */}
        {!isLanding && <Navbar session={session} />}

        <div className="main-content">
          <Routes>
            {/* Landing pública */}
            <Route path="/" element={<Landing session={session} />} />

            {/* Página de inicio (solo usuarios logueados) */}
            <Route
              path="/home"
              element={session ? <Home session={session} /> : <Navigate to="/" />}
            />

            {/* Lecciones (solo usuarios logueados) */}
            <Route
              path="/lessons"
              element={session ? <Lessons /> : <Navigate to="/" />}
            />

            {/* Autenticación */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account session={session} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
