// src/App.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import LessonCard from "./components/LessonCard";
import LessonDetail from "./components/LessonDetail";
import Landing from "./components/Landing";
import Auth from "./components/Auth";
import Account from "./components/Account";
import ResetPassword from "./components/ResetPassword";
import "./styles.css";

export default function App() {
  // navigation state: "home" | "lessons" | "auth" | "account" | "reset"
  const [page, setPage] = useState("home");
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // auth session
  const [session, setSession] = useState(null);

  // load session and listen auth changes
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      if (session) {
        // if logged in and on auth or home, go to account (or lessons if you prefer)
        setPage((p) => (p === "auth" || p === "home" ? "account" : p));
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setPage((p) => (p === "auth" || p === "home" ? "account" : p));
      } else {
        // logged out — show home
        setPage("home");
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // when entering lessons page, load lessons (keeps behaviour original)
  useEffect(() => {
    if (page === "lessons") {
      fetch("/lessons.json")
        .then((res) => res.json())
        .then((data) => setLessons(data));
    }
  }, [page]);

  // Ensure there's a profile row for the user (upsert) when session becomes available
  useEffect(() => {
    if (!session?.user) return;
    // try to upsert a minimal profile record
    const upsertProfile = async () => {
      const user = session.user;
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username: user.email?.split("@")[0] || null
      }, { returning: "minimal" });
      if (error) console.warn("Error upserting profile:", error.message);
    };
    upsertProfile();
  }, [session]);

  // Navigation handlers to pass down
  const go = (target) => setPage(target);

  // === Vistas según page ===
  if (page === "home") {
    return <Landing onStart={() => go("lessons")} onAuth={() => go("auth")} />;
  }

  if (page === "auth") {
    return <Auth onAuthComplete={() => go(session ? "account" : "home")} onBack={() => go("home")} />;
  }

  if (page === "account") {
    // if not logged in, redirect to auth
    if (!session) return <Auth onAuthComplete={() => go("account")} onBack={() => go("home")} />;
    return <Account session={session} onNavigate={go} />;
  }

  if (page === "reset") {
    return <ResetPassword onBack={() => go("auth")} />;
  }

  if (page === "lessons") {
    return (
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Code Microlearning</h1>
          <div>
            {session ? (
              <button onClick={() => go("account")} style={{ marginRight: 8 }}>Mi cuenta</button>
            ) : (
              <button onClick={() => go("auth")} style={{ marginRight: 8 }}>Iniciar sesión</button>
            )}
            <button onClick={() => go("home")}>Volver</button>
          </div>
        </div>

        {selectedLesson ? (
          <LessonDetail lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />
        ) : (
          lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} onSelect={setSelectedLesson} />)
        )}
      </div>
    );
  }

  return null;
}
