import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import LessonDetail from "./components/LessonDetail";
import "./styles.css";

function App() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetch("/lessons.json")
      .then((res) => res.json())
      .then((data) => setLessons(data));
  }, []);

  if (selectedLesson) {
    return (
      <div className="container">
        <LessonDetail lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Code Microlearning</h1>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} onSelect={setSelectedLesson} />
      ))}
    </div>
  );
}

export default App;
