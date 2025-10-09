import React from "react";
import CodeEditor from "./CodeEditor";

export default function LessonDetail({ lesson, onBack }) {
    return (
        <div className="card">
            <button onClick={onBack}>← Volver</button>
            <h2>{lesson.titulo}</h2>
            <p>{lesson.descripcion}</p>

            <h3>Ejemplo:</h3>
            <pre>{lesson.codigo_ejemplo}</pre>

            <h3>Reto:</h3>
            <p>{lesson.reto}</p>

            <CodeEditor lesson={lesson} />
        </div>
    );
}
