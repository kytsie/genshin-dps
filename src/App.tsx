import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes &&
            routes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.element />}
              />
            ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
