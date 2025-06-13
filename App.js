import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(null);

  const login = () => {
    window.location.href = "/auth/procore";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("code")) {
      axios.get(`/auth/procore/callback?code=${params.get("code")}`)
        .then(r => setToken(r.data));
    } else if (token) {
      axios.get("/api/projects", {
        headers: { Authorization: JSON.stringify(token) }
      })
      .then(r => setProjects(r.data))
      .catch(e => console.error(e));
    }
  }, [token]);

  return (
    <div>
      <h1>FieldOps360+ Dashboard</h1>
      {!token ? (
        <button onClick={login}>Connect to Procore</button>
      ) : (
        <ul>
          {projects.map(p => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;