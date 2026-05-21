import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"

import AdminHome from "./pages/AdminHome"
import AdminPeticiones from "./pages/AdminPeticiones"
import AdminFlyers from "./pages/AdminFlyers"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminLivestream from "./pages/AdminLivestream"
import Gallery from "./components/Gallery"
import AdminGallery from "./pages/AdminGallery"

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>

            <AdminHome />

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/peticiones"
        element={
          <ProtectedRoute>

            <AdminPeticiones />

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/flyers"
        element={
          <ProtectedRoute>

            <AdminFlyers />

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/livestream"
        element={
          <ProtectedRoute>

            <AdminLivestream />

          </ProtectedRoute>
        }
      />

      <Route 
      path="/galeria" element=
      {<Gallery />} />

      <Route 
      path="/admin/galeria" element=
      {<AdminGallery />} />

    </Routes>

  )

}