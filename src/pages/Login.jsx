import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { motion } from "framer-motion"


export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [settings, setSettings] = useState(null)

  useEffect(() => {

    async function checkSession() {

      const { data } =
        await supabase.auth.getSession()

      if (data.session) {

        navigate("/admin")

      }

    }

    checkSession()

    fetchSettings()

  }, [])

  async function fetchSettings() {

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("activo", true)
    .single()

  if (data) {

    setSettings(data)

  }

}

  async function handleLogin(e) {

    e.preventDefault()

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({

      email,
      password

    })

    if (error) {

      alert("Correo o contraseña incorrectos")

      setLoading(false)

    } else {

      // DELAY PARA VER ANIMACIÓN

      setTimeout(() => {

        navigate("/admin")

      }, 900)

    }

  }

  return (

    <motion.section

      initial={{
        opacity: 0,
        scale: 1.02,
        filter: "blur(12px)"
      }}

      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)"
      }}

      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}

      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        overflow-hidden
        bg-black
      "
    >

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            duration: 1.2
          }}

          className="
            absolute
            top-[-200px]
            left-[-120px]
            w-[500px]
            h-[500px]
            bg-yellow-500/10
            blur-[160px]
            rounded-full
          "
        ></motion.div>

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            duration: 1.2,
            delay: 0.2
          }}

          className="
            absolute
            bottom-[-200px]
            right-[-120px]
            w-[500px]
            h-[500px]
            bg-yellow-500/10
            blur-[160px]
            rounded-full
          "
        ></motion.div>

      </div>

      {/* FULL BACKGROUND IMAGE */}

<motion.div

  initial={{
    opacity: 0,
    scale: 1.08
  }}

  animate={{
    opacity: 1,
    scale: 1
  }}

  transition={{
    duration: 1.2
  }}

  className="absolute inset-0"
>

  <img
    src={settings?.logo_url}
    alt="Background"
    className="
    w-full
    h-full
    object-contain
    opacity-25
    blur-[1px]
    scale-90
"
  />

</motion.div>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/30"></div>

      {/* Home Button */}

      <motion.button

        initial={{
          opacity: 0,
          y: -20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5,
          delay: 0.2
        }}

        onClick={() => {

       const currentHost =
      window.location.hostname

       const publicDomain =
       currentHost.replace("admin.", "")

       if (
    currentHost.includes("localhost")
     ) {

    window.location.href =
    "http://localhost:5173"

  } else {

    window.location.href =
    `https://${publicDomain}`

  }

}}

        className="
          absolute top-8 right-8 z-20
          bg-white/10
          backdrop-blur-lg
          border border-white/10
          text-white
          px-5 py-3
          rounded-2xl
          font-semibold
          transition-all duration-300
          hover:bg-white
          hover:text-black
          hover:scale-105
          hover:shadow-xl
          hover:shadow-white/10
        "
      >

        Inicio

      </motion.button>

      {/* Login Card */}

      <motion.div

        initial={{
          opacity: 0,
          y: 50,
          scale: 0.95
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}

        transition={{
          duration: 0.7,
          delay: 0.15
        }}

        className="
          relative z-10
          bg-white/85
          backdrop-blur-xl
          rounded-3xl
          p-10
          w-full
          max-w-md
          shadow-[0_25px_80px_rgba(0,0,0,0.45)]
          border border-white/20
        "
      >

        <motion.h1

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            delay: 0.3
          }}

          className="
          text-4xl
          font-black
          mb-8
          text-center
          text-black
"
        >

          Admin Login

        </motion.h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6"
        >

          <motion.input

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: 0.35
            }}

            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

           className="
           bg-[#f3f3f5]
           text-black
           placeholder:text-gray-500
           rounded-2xl
           p-4
           outline-none
           border border-black/10
           transition-all duration-300
           focus:ring-2
           focus:ring-yellow-500
"
          />

          <motion.input

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: 0.42
            }}

            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            className="
           bg-[#f3f3f5]
           text-black
           placeholder:text-gray-500
           rounded-2xl
           p-4
           outline-none
           border border-black/10
           transition-all duration-300
           focus:ring-2
           focus:ring-yellow-500
"
          />

          <motion.button

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: 0.5
            }}

            type="submit"

            disabled={loading}

            className="
              bg-black
              text-white
              py-4
              rounded-2xl
              transition-all duration-300
              hover:bg-yellow-500
              hover:text-black
              hover:scale-[1.02]
              active:scale-[0.98]
              hover:shadow-xl
              hover:shadow-yellow-500/20
              disabled:opacity-70
            "
          >

            {loading ? "Ingresando..." : "Ingresar"}

          </motion.button>

        </form>

      </motion.div>

    </motion.section>

  )

}