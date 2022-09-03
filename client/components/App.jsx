import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { cacheUser } from "../auth0-utils";

import { Landing } from "./Landing";
import { Paths } from "./Paths";

function App() {
  cacheUser(useAuth0);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && window.location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<Paths />} />
      </Routes>
    </>
  );
}

export default App;
