import { Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import AdminHome from "./pages/AdminHome"
import AdminPeticiones from "./pages/AdminPeticiones"
import AdminFlyers from "./pages/AdminFlyers"
import AdminLivestream from "./pages/AdminLivestream"
import AdminGallery from "./pages/AdminGallery"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminLayout from "./components/AdminLayout"
import AdminHero from "./pages/AdminHero"
import AdminContenido from "./pages/AdminContenido"
import AdminConfiguracion from "./pages/AdminConfiguracion"


import Gallery from "./components/Gallery"

export default function App() {

  const hostname = window.location.hostname

  const isAdminDomain =
  hostname.startsWith("admin.")
  || hostname.includes("admin.localhost")

  return (

    <Routes>

      <Route
      path="/login"
      element={
      isAdminDomain
      ? <Login />
      : <Navigate to="/" />
  }
/>
    <Route
  path="/"
  element={<Home />}
/>

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>

            <AdminLayout>

              <AdminHome />

            </AdminLayout>

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/flyers"
        element={
          <ProtectedRoute>

            <AdminLayout>

              <AdminFlyers />

            </AdminLayout>

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/galeria"
        element={
          <ProtectedRoute>

            <AdminLayout>

              <AdminGallery />

            </AdminLayout>

          </ProtectedRoute>
        }
      />

      <Route
      path="/admin/hero"
      element={
     <ProtectedRoute>

      <AdminHero />

    </ProtectedRoute>
       }
      />

      <Route
  path="/admin/contenido"
  element={
    <ProtectedRoute>

      <AdminLayout>

        <AdminContenido />

      </AdminLayout>

    </ProtectedRoute>
  }
/>

<Route
  path="/admin/configuracion"
  element={
    <ProtectedRoute>

      <AdminLayout>

        <AdminConfiguracion />

      </AdminLayout>

    </ProtectedRoute>
  }
/>

      <Route
        path="/admin/livestream"
        element={
          <ProtectedRoute>

            <AdminLayout>

              <AdminLivestream />

            </AdminLayout>

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/peticiones"
        element={
          <ProtectedRoute>

            <AdminLayout>

              <AdminPeticiones />

            </AdminLayout>

          </ProtectedRoute>
        }
      />

      {/* PUBLIC */}

      <Route
  path="/galeria"
  element={<Gallery />}

/>

    </Routes>

  )

}