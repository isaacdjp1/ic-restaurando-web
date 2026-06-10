import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template3Location() {

  const [settings, setSettings] = useState(null)

  useEffect(() => {

    fetchSettings()

  }, [])

  async function fetchSettings() {

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("activo", true)
      .single()

    console.log(data)
    console.log(error)

    if (data) {

      setSettings(data)

    }

  }

  return (

    <div>

      <h3
        className="
          text-3xl
          md:text-4xl
          font-bold
          text-white
          mb-6
        "
        style={{
          fontFamily: "Space Grotesk",
        }}
      >
        Encuéntranos
      </h3>

      <p
        className="
          text-slate-400
          text-lg
          leading-relaxed
          mb-8
        "
      >

        {settings?.address}

        <br />

        {settings?.city}

      </p>

      <a
        href={settings?.maps_link}
        target="_blank"
        rel="noreferrer"
        className="
          inline-flex
          items-center
          justify-center
          px-6
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-violet-600
          text-white
          font-semibold
          hover:scale-105
          transition-all
          shadow-[0_0_30px_rgba(124,58,237,0.25)]
        "
      >
        Cómo llegar
      </a>

      <div
        className="
          mt-8
          overflow-hidden
          rounded-[28px]
          border
          border-slate-800
          bg-slate-900
          shadow-[0_0_40px_rgba(37,99,235,0.12)]
        "
      >

        <iframe
          title="Nuestra Ubicación"
          src={settings?.maps_embed}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>

    </div>

  )

}