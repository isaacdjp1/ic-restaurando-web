import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { useAuth } from "../context/AuthContext"

import { supabase } from "../lib/supabase"

export default function ProtectedRoute({ children }) {

  const {
    session,
    loading
  } = useAuth()

  const [isAdmin, setIsAdmin] =
  useState(false)

  const [checkingAdmin, setCheckingAdmin] =
  useState(true)

  useEffect(() => {

    async function checkAdmin() {

      if (!session) {

        setCheckingAdmin(false)

        return

      }

      const { data } =
      await supabase
        .from("admins")
        .select("*")
        .eq(
          "id",
          session.user.id
        )
        .single()

      if (data) {

        setIsAdmin(true)

      }

      setCheckingAdmin(false)

    }

    checkAdmin()

  }, [session])

  if (loading || checkingAdmin) {

    return (

      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6" />

          <p className="text-zinc-500 text-lg font-medium">

            Verificando acceso...

          </p>

        </div>

      </div>

    )

  }

  if (!session || !isAdmin) {

    return <Navigate to="/login" replace />

  }

  return children

}