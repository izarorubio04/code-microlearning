import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "../styles/codeEditor.css";

export default function CodeEditor({ lesson }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const ejecutarCodigo = async () => {
    setLoading(true);
    setOutput("Ejecutando...");

    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "778be9610amsh1e17630b747c21dp13f4c9jsn9286a59e2ddd", // 🔑 Inserta tu clave de RapidAPI
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        language_id: 71, // Python 3
        source_code: code,
        stdin: lesson.input || ""
      })
    });

    const result = await response.json();
    const salida = result.stdout ? result.stdout.trim() : result.stderr;

    if (salida === lesson.output.trim()) {
      setOutput("✅ ¡Correcto!");
    } else {
      setOutput(`❌ Salida esperada:\n${lesson.output}\n\nTu salida:\n${salida}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <h4>Tu código:</h4>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        theme="light"
        onChange={(value) => setCode(value)}
      />
      <br />
      <button onClick={ejecutarCodigo} disabled={loading}>
        {loading ? "Ejecutando..." : "Ejecutar código"}
      </button>
      <pre>{output}</pre>
    </div>
  );
}