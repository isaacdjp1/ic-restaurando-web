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

  const sidebarOpen = true

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

    <div className="min-h-screen bg-[#f5f5f7] text-[#111111] flex">

      {/* MOBILE TOPBAR */}

      <div
        className="
          fixed top-0 left-0 w-full z-50
          lg:hidden
          bg-[#ffffffcc]
          backdrop-blur-xl
          border-b border-zinc-200
          px-6 py-5
          flex items-center justify-between
        "
      >

        <h1 className="
        text-lg
        font-semibold
        tracking-tight
        text-[#111111]
        ">
          VEYRON CMS
        </h1>

        <button
          onClick={() => setMobileOpen(true)}
          className="
            bg-zinc-100
            p-3
            rounded-xl
            hover:bg-zinc-200
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


      {/* SIDEBAR */}

     <aside
     className={`
     fixed z-50
     top-0 left-0
     h-[100dvh]
     overflow-y-auto
     pb-10

     w-[250px]

     bg-[#ffffffcc]
     backdrop-blur-2xl

     border-r border-zinc-200/70

     p-6
     flex flex-col

     transition-all duration-300

     sidebar-scroll

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

          <div>

            <p className="
            uppercase
            tracking-[4px]
            text-zinc-400
            text-xs
            font-medium
            mb-2
            ">
              CMS
            </p>

            <h1 className="
             text-2xl
             font-semibold
             tracking-tight
             leading-tight
             text-[#111111]
    ">
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
                gap-4 justify-start
                px-5 py-4
                rounded-xl
                transition-all duration-300
                font-semibold

                ${
                  location.pathname === link.path
                    ? "bg-black text-white shadow-sm"
                    : "text-zinc-500 hover:bg-zinc-100"
                }
              `}
            >

              {link.icon}

              <span>
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
              bg-white
              hover:bg-zinc-100
              border border-zinc-200
              text-zinc-700
              py-4
              rounded-2xl
              font-medium
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
        ? "lg:ml-[280px]"
        : "lg:ml-0"
      }
        `}
      >

        {children}

      </main>

    </div>

  )

}