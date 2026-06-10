import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template4Location() {

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
          text-black
          mb-6
        "
        style={{
          fontFamily: "Montserrat",
        }}
      >
        Nuestra Ubicación
      </h3>

      <p
        className="
          text-zinc-600
          text-lg
          leading-relaxed
          mb-8
        "
        style={{
          fontFamily: "Inter",
        }}
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
          bg-[#C8A96B]
          text-black
          font-semibold
          hover:opacity-90
          transition-all
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
          border-zinc-200
          bg-white
          shadow-[0_15px_50px_rgba(0,0,0,0.08)]
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