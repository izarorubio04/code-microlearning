import React from "react";
import "../styles/home.css";


export default function Home({ session }) {
  const username = session?.user?.email?.split("@")[0] || "usuario";

  return (
    <div className="home-page">
      <h1>👋 Hola, {username}</h1>
      <p>Bienvenida a tu espacio de aprendizaje diario en Python 🚀</p>
    </div>
  );
}
