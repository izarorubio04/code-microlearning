// src/App.jsx
import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import LessonDetail from "./components/LessonDetail";
import Landing from "./components/Landing";
import "./styles.css";

function App() {
  const [page, setPage] = useState("home"); // control de navegación manual
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Cargar las lecciones solo si estamos en la página de lecciones
  useEffect(() => {
    if (page === "lessons") {
      fetch("/lessons.json")
        .then((res) => res.json())
        .then((data) => setLessons(data));
    }
  }, [page]);

  // === Vistas ===
  if (page === "home") {
    return <Landing onStart={() => setPage("lessons")} />;
  }

  if (page === "lessons") {
    return (
      <div className="container">
        <h1>Code Microlearning</h1>
        {selectedLesson ? (
          <LessonDetail
            lesson={selectedLesson}
            onBack={() => setSelectedLesson(null)}
          />
        ) : (
          lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onSelect={setSelectedLesson}
            />
          ))
        )}
      </div>
    );
  }

  return null;
}

export default App;
