import { useState } from "react"

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom"

import {
  Menu,
  X,
  LayoutDashboard,
  Image,
  Radio,
  Images,
  HandHelping,
  MonitorSmartphone,
  FileText,
  Settings
} from "lucide-react"

import { supabase } from "../lib/supabase"

export default function AdminLayout({ children }) {

  const location = useLocation()

  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isDashboard = location.pathname === "/admin"

  async function handleLogout() {

    await supabase.auth.signOut()

    navigate("/login")

  }

  const links = [

  {
    name: "Dashboard",
    path: "/admin",
    icon: <LayoutDashboard size={20} />
  },

  {
    name: "Portada Web",
    path: "/admin/hero",
    icon: <MonitorSmartphone size={20} />
  },

  {
    name: "Contenido",
    path: "/admin/contenido",
    icon: <FileText size={20} />
  },

  {
    name: "Configuración",
    path: "/admin/configuracion",
    icon: <Settings size={20} />
  },

  {
    name: "Flyers",
    path: "/admin/flyers",
    icon: <Image size={20} />
  },

  {
    name: "Galería",
    path: "/admin/galeria",
    icon: <Images size={20} />
  },

  {
    name: "Livestream",
    path: "/admin/livestream",
    icon: <Radio size={20} />
  },

  {
    name: "Peticiones",
    path: "/admin/peticiones",
    icon: <HandHelping size={20} />
  }

  ]

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* MOBILE TOPBAR */}

      <div
        className="
          fixed top-0 left-0 w-full z-50
          lg:hidden
          bg-black/80
          backdrop-blur-xl
          border-b border-white/10
          px-6 py-5
          flex items-center justify-between
        "
      >

        <h1 className="text-xl font-black">
          CMS Admin
        </h1>

        <button
          onClick={() => setMobileOpen(true)}
          className="
            bg-white/10
            p-3
            rounded-xl
            hover:bg-white/20
            transition
          "
        >

          <Menu size={24} />

        </button>

      </div>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (

        <div
          className="
            fixed inset-0
            bg-black/70
            backdrop-blur-sm
            z-40
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        />

      )}

      {/* DESKTOP SIDEBAR TOGGLE */}

<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className={`
  hidden lg:flex
  fixed top-6 right-6

  bg-white/10 hover:bg-white/20
  border border-white/10
  p-3 rounded-2xl
  transition-all duration-300
  backdrop-blur-xl
`}
>

  <Menu size={22} />

</button>

      {/* SIDEBAR */}

      <aside
        className={`
          fixed z-50
          top-0 left-0
          h-[100dvh] overflow-y-auto pb-10
          ${sidebarOpen ? "w-[280px]" : "w-[110px]"}

          bg-[#050505]
          border-r border-white/10
          backdrop-blur-md
          ${sidebarOpen ? "p-8" : "p-4"}
          flex flex-col
          transition-all duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          ${
            isDashboard
              ? "lg:flex lg:translate-x-0"
              : "lg:hidden"
          }
        `}
      >

        {/* CLOSE MOBILE */}

        <div className="flex items-center justify-between lg:block">

          <div className={`${sidebarOpen ? "block" : "hidden"} transition-all duration-300`}>

            <p className="uppercase tracking-[5px] text-yellow-400 text-sm mb-3">
              CMS
            </p>

            <h1 className="text-3xl font-black leading-tight">
              Restaurando
              <br />
              El Altar
            </h1>

          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="
              lg:hidden
              bg-white/10
              p-2
              rounded-xl
            "
          >

            <X size={24} />

          </button>

        </div>

        {/* NAVIGATION */}

        <nav className="flex flex-col gap-4 mt-14">

          {links.map((link) => (

            <Link
              key={link.path}
              to={link.path}

              onClick={() => setMobileOpen(false)}

              className={`
                flex items-center
                ${sidebarOpen ? "gap-4 justify-start" : "justify-center"}
                px-5 py-4
                rounded-2xl
                transition-all duration-300
                font-semibold

                ${
                  location.pathname === link.path
                    ? "bg-yellow-500 text-black shadow-[0_0_25px_rgba(234,179,8,0.35)]"
                    : "bg-white/[0.03] hover:bg-white/10 text-white"
                }
              `}
            >

              {link.icon}

              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
             {link.name}
             </span>

            </Link>

          ))}

        </nav>

        {/* FOOTER */}

        <div className="mt-10 flex flex-col gap-4">

          <a
            href="/"
            target="_blank"
            className="
              w-full
              bg-white/5
              hover:bg-white/10
              border border-white/10
              text-white
              py-4
              rounded-2xl
              font-semibold
              transition-all duration-300
              text-center
            "
          >

            Ver Sitio Web

          </a>

          <button
            onClick={handleLogout}
            className="
              w-full
              bg-red-500
              hover:bg-red-400
              text-white
              py-4
              rounded-2xl
              font-bold
              transition-all duration-300
            "
          >

            Cerrar Sesión

          </button>

        </div>

      </aside>

      {/* CONTENT */}

      <main
        className={`
          flex-1
          min-h-screen
          overflow-y-auto
          pt-[90px]
          lg:pt-0
          transition-all duration-300

          ${
          isDashboard
        ? sidebarOpen
        ? "lg:ml-[280px]"
        : "lg:ml-[110px]"
        : "lg:ml-0"
      }
        `}
      >

        {children}
        
      </main>

    </div>

  )

}