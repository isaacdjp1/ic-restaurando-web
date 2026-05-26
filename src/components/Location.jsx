import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Location() {

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

      <h3 className="text-3xl font-black mb-6 text-white">
        Ubicación
      </h3>

      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
        {settings?.address}

      <br />

      {settings?.city}
      </p>

      <a
        href={settings?.maps_link}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-white transition"
      >

        Cómo llegar

      </a>

      <div className="mt-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-md">

        <iframe
          title="Nuestra Ubicación"
          src={settings?.maps_embed}
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>

    </div>

  )
}