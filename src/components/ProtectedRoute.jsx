import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function ProtectedRoute({ children }) {

  const [session, setSession] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function checkSession() {

      const { data } = await supabase.auth.getSession()

      setSession(data.session)

      setLoading(false)

    }

    checkSession()

  }, [])

  if (loading) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center text-white text-2xl font-bold">

        Cargando...

      </div>

    )

  }

  if (!session) {

    return <Navigate to="/login" />

  }

  return children

}