import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "../context/ToastContext"

export default function AdminConfiguracion() {

  const navigate = useNavigate()
  const { showToast } = useToast()

  const [settings, setSettings] = useState(null)

  const [saving, setSaving] = useState(false)

  const [logoPreview, setLogoPreview] = useState(null)

  const [faviconPreview, setFaviconPreview] = useState(null)

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

  async function uploadBrandingImage(file, field) {

  if (!file) return

  const fileExt = file.name.split(".").pop()

  const fileName = `${uuidv4()}.${fileExt}`

  const filePath = `${field}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from("branding")
    .upload(filePath, file)

  if (uploadError) {

    console.log(uploadError)

    return

  }

  const { data } = supabase.storage
    .from("branding")
    .getPublicUrl(filePath)

  const publicUrl = data.publicUrl

  const updatedSettings = {
    ...settings,
    [field]: publicUrl
  }

  setSettings(updatedSettings)

  await supabase
    .from("site_settings")
    .update({
      [field]: publicUrl
    })
    .eq("id", settings.id)

}

  async function saveSettings() {

    if (!settings) return

    setSaving(true)

    const { error } = await supabase
      .from("site_settings")
      .update({
  church_name: settings.church_name,
  church_short_name: settings.church_short_name,
  address: settings.address,
  city: settings.city,
  maps_link: settings.maps_link,
  maps_embed: settings.maps_embed,
  primary_color: settings.primary_color,
  secondary_color: settings.secondary_color
})
      .eq("id", settings.id)

    if (!error) {

      showToast("Configuración actualizada", "success")

    }

    setSaving(false)

  }

  return (

    <section className="min-h-screen bg-[#f5f5f7] text-[#111111] px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="uppercase tracking-[5px] text-zinc-400 mb-4">

            CMS

          </p>

          <h1 className="text-5xl font-semibold tracking-tight mb-10">

            Configuración

          </h1>

          <div className="flex flex-wrap gap-4 mb-16">

            <button
              onClick={() => navigate("/admin")}
              className="
              bg-white
              hover:bg-zinc-100
              border border-zinc-200
              text-zinc-700
              px-6 py-4
              rounded-2xl
              font-medium
              transition-all duration-300
               shadow-sm
"
            >

              ← Volver al Dashboard

            </button>

            <button
              onClick={saveSettings}
              disabled={saving}
              className="
              bg-black
              hover:bg-zinc-800
              text-white
              px-6 py-4
              rounded-2xl
              font-semibold
              transition-all duration-300
              shadow-sm
              disabled:opacity-50
              "
            >

              {
                saving
                  ? "Guardando..."
                  : "Guardar Cambios"
              }

            </button>

          </div>

        </motion.div>

        {settings && (

          <div className="
            bg-white
            border border-zinc-200
            shadow-sm
            rounded-3xl
            p-8
            grid gap-6
          ">

            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">

            Nombre Iglesia

            </p>

            <input
              type="text"
              value={settings.church_name || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  church_name: e.target.value
                })
              }
              placeholder="Nombre Iglesia"
              className="
               bg-[#f8f8f8]
               border border-zinc-200
               rounded-2xl
               px-5 py-4
               text-[#111111]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5
"
              
            />

            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">

              Dirección

            </p>

            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  address: e.target.value
                })
              }
              placeholder="Dirección"
              className="
                bg-[#f8f8f8]
               border border-zinc-200
               rounded-2xl
               px-5 py-4
               text-[#111111]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5
"
            />

            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">

            Ciudad

            </p>

            <input
              type="text"
              value={settings.city || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  city: e.target.value
                })
              }
              placeholder="Ciudad"
              className="
                bg-[#f8f8f8]
               border border-zinc-200
               rounded-2xl
               px-5 py-4
               text-[#111111]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5
"
            />

            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">

              Link Google Maps

            </p>

            <input
              type="text"
              value={settings.maps_link || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maps_link: e.target.value
                })
              }
              placeholder="Link Google Maps"
              className="
                bg-[#f8f8f8]
                border border-zinc-200
                rounded-2xl
                px-5 py-4
                text-[#111111]
                focus:outline-none
                focus:ring-2
                focus:ring-black/5
              "
            />

            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">

              Embed Google Maps

            </p>

            <textarea
              value={settings.maps_embed || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maps_embed: e.target.value
                })
              }
              placeholder="Google Maps Embed"
              className="
                bg-[#f8f8f8]
               border border-zinc-200
               rounded-2xl
               px-5 py-4
               text-[#111111]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5
"
            />

            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">

  Nombre Corto Iglesia

</p>

<input
  type="text"
  value={settings.church_short_name || ""}
  onChange={(e) =>
    setSettings({
      ...settings,
      church_short_name: e.target.value
    })
  }
  placeholder="Nombre Corto"
  className="
   bg-[#f8f8f8]
   border border-zinc-200
   rounded-2xl
   px-5 py-4
   text-[#111111]
   focus:outline-none
   focus:ring-2
   focus:ring-black/5
"
/>

<p className="text-zinc-500 uppercase tracking-[3px] mb-3">

  Color Primario

</p>

<input
  type="text"
  value={settings.primary_color || ""}
  onChange={(e) =>
    setSettings({
      ...settings,
      primary_color: e.target.value
    })
  }
  placeholder="#eab308"
  className="
    bg-[#f8f8f8]
               border border-zinc-200
               rounded-2xl
               px-5 py-4
               text-[#111111]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5
"
/>

<p className="text-zinc-500 uppercase tracking-[3px] mb-3">

  Color Secundario

</p>

<input
  type="text"
  value={settings.secondary_color || ""}
  onChange={(e) =>
    setSettings({
      ...settings,
      secondary_color: e.target.value
    })
  }
  placeholder="#000000"
  className="
    bg-[#f8f8f8]
               border border-zinc-200
               rounded-2xl
               px-5 py-4
               text-[#111111]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5
  "
/>

<p className="text-zinc-500 uppercase tracking-[3px] mb-3">

  Logo Admin CMS

</p>


{
  (logoPreview || settings.logo_url !== "temp") && (

    <div className="mt-6">

      <div className="flex items-start gap-6 mb-6">

        <p className="text-[#111111] font-semibold">

          Preview Logo Admin

        </p>

        <button
  onClick={async () => {

    setLogoPreview(null)

    setSettings({
      ...settings,
      logo_url: "temp"
    })

    await supabase
      .from("site_settings")
      .update({
        logo_url: "temp"
      })
      .eq("id", settings.id)

  }}
  className="
  bg-red-500
  hover:bg-red-400
  text-white
  px-4 py-2
  rounded-xl
  font-medium
  transition-all duration-300
  shadow-sm
"
>

  Deseleccionar

</button>

      </div>

      <img
  src={logoPreview || settings.logo_url}
  alt="Logo"
  className="
    w-28
    h-28
    object-cover
    rounded-2xl
    border border-zinc-200
    shadow-sm
    p-2
    bg-white
  "
/>

    </div>

  )
}

<p className="text-zinc-500 uppercase tracking-[3px] mb-3 mt-10">

  Subir Logo Admin CMS

</p>

<label
  className="
border border-dashed border-zinc-300
rounded-[30px]
p-10
flex flex-col
items-center justify-center
text-center
cursor-pointer
hover:border-zinc-400
hover:bg-zinc-50
transition-all duration-300
bg-[#fafafa]
"
>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => {

  const file = e.target.files[0]

  if (!file) return

  setLogoPreview(
    URL.createObjectURL(file)
  )

  uploadBrandingImage(
    file,
    "logo_url"
  )

}}
  />

  <div className="text-4xl mb-4">

    🖼️

  </div>

  <h3 className="text-2xl font-semibold tracking-tight mb-2">

    Subir Logo Admin CMS

  </h3>

  <p className="text-gray-500">

    PNG, JPG o WEBP

  </p>

</label>

<p className="text-zinc-500 uppercase tracking-[3px] mb-3">

  Subir Favicon (Icono del sitio)

</p>

{
  (faviconPreview || settings.favicon_url !== "temp") && (

    <div className="mt-6">

      <div className="flex items-start gap-6 mb-6">

        <p className="text-[#111111] font-semibold">

          Preview Favicon

        </p>

        <button
  onClick={async () => {

    setFaviconPreview(null)

    setSettings({
      ...settings,
      favicon_url: "temp"
    })

    await supabase
      .from("site_settings")
      .update({
        favicon_url: "temp"
      })
      .eq("id", settings.id)

  }}
  className="
    bg-red-500 hover:bg-red-400
    text-white
    px-5 py-2
    rounded-xl
    font-bold
    transition-all duration-300
  "
>

  Deseleccionar

</button>

      </div>

      <img
        src={faviconPreview || settings.favicon_url}
        alt="Favicon"
        className="
        w-28
        h-28
        object-cover
          rounded-2xl
          border border-zinc-200
          shadow-sm
          p-2
          bg-white
        "
      />

    </div>

  )
}

<label
  className="
border border-dashed border-zinc-300
rounded-[30px]
p-10
flex flex-col
items-center justify-center
text-center
cursor-pointer
hover:border-zinc-400
hover:bg-zinc-50
transition-all duration-300
bg-[#fafafa]
"
>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => {

  const file = e.target.files[0]

  if (!file) return

  setFaviconPreview(
    URL.createObjectURL(file)
  )

  uploadBrandingImage(
    file,
    "favicon_url"
  )

}}
  />

  <div className="text-4xl mb-4">

    🌐

  </div>

  <h3 className="text-2xl font-semibold tracking-tight mb-2">

    Subir Favicon

  </h3>

  <p className="text-gray-500">

    PNG recomendado

  </p>

</label>

          </div>

        )}

      </div>

    </section>

  )

}