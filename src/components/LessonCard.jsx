import React from "react";

export default function LessonCard({ lesson, onSelect }) {
    return (
        <div className="card" onClick={() => onSelect(lesson)}>
            <h2>{lesson.titulo}</h2>
            <p><b>Tema:</b> {lesson.tema} | <b>Nivel:</b> {lesson.nivel}</p>
            <p>{lesson.descripcion}</p>
        </div>
    );
}
