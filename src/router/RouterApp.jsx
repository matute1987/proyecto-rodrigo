import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";            // default
import Dashboard from "../pages/Dashboard"; // nombrado
import Login from "../pages/Login";          // default
import Register from "../pages/Register";    // default
import NotFound from "../pages/NotFound";    // default

import PrivateRoute from "../components/PrivateRoute"; // defaul export

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterApp };