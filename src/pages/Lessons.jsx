import React, { useEffect, useState } from "react";
import LessonCard from "../components/LessonCard";
import LessonDetail from "../components/LessonDetail";
import "../styles/lessons.css";


export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetch("/lessons.json")
      .then((res) => res.json())
      .then((data) => setLessons(data));
  }, []);

  return (
    <div className="container">
      <h1>Lecciones de Python</h1>
      {selectedLesson ? (
        <LessonDetail lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />
      ) : (
        lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onSelect={setSelectedLesson} />
        ))
      )}
    </div>
  );
}
