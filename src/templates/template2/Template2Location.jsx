import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template2Location() {
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
          text-4xl
          text-black
          mb-6
        "
        style={{
          fontFamily: "Instrument Serif",
        }}
      >
        Ubicación
      </h3>

      <p
        className="
          text-zinc-600
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
          py-3
          rounded-full
          border
          border-zinc-300
          text-black
          hover:bg-black
          hover:text-white
          transition-all
          duration-300
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
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        "
      >
        <iframe
          title="Nuestra Ubicación"
          src={settings?.maps_embed}
          width="100%"
          height="260"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}