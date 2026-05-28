import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom"
import { useToast } from "../context/ToastContext"

export default function AdminLivestream() {

  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [playPreview, setPlayPreview] = useState(false)

  const [streamData, setStreamData] = useState({
    id: 1,
    title: "",
    subtitle: "",
    side_title: "",
    side_description: "",
    youtube_url: "",
    button_text: "",
    thumbnail_url: "",
    is_live: false,
  })

  useEffect(() => {

    fetchLivestream()

  }, [])

  async function fetchLivestream() {

    const { data, error } = await supabase
      .from("livestream")
      .select("*")
      .eq("id", 1)
      .single()

    if (error) {

      console.log(error)

    } else {

      setStreamData(data)

    }

  }

  async function uploadThumbnail(file) {

    try {

      setUploading(true)

      const fileExt = file.name.split(".").pop()

      const fileName = `thumbnail-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("livestream-thumbnails")
        .upload(fileName, file)

      if (uploadError) {

        console.log(uploadError)

        showToast("Error subiendo imagen", "error")

        setUploading(false)

        return

      }

      const { data } = supabase.storage
        .from("livestream-thumbnails")
        .getPublicUrl(fileName)

      setStreamData({
        ...streamData,
        thumbnail_url: data.publicUrl,
      })

      setUploading(false)

    } catch (error) {

      console.log(error)

      setUploading(false)

    }

  }

  async function handleSave() {

    setLoading(true)

    const { error } = await supabase
      .from("livestream")
      .update({
        title: streamData.title,
        subtitle: streamData.subtitle,
        side_title: streamData.side_title,
        side_description: streamData.side_description,
        youtube_url: streamData.youtube_url,
        button_text: streamData.button_text,
        thumbnail_url: streamData.thumbnail_url,
        is_live: streamData.is_live,
      })
      .eq("id", 1)

    setLoading(false)

    if (error) {

      console.log(error)

      showToast("Error actualizando livestream", "error")

    } else {

      showToast("Livestream actualizado")

      fetchLivestream()

    }

  }

  function getEmbedUrl(url) {

    if (!url) return ""

    try {

      if (url.includes("youtu.be/")) {

        const videoId = url.split("youtu.be/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("watch?v=")) {

        const videoId = url.split("v=")[1].split("&")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("/shorts/")) {

        const videoId = url.split("/shorts/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("/live/")) {

        const videoId = url.split("/live/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("/embed/")) {

        return url

      }

      return ""

    } catch {

      return ""

    }

  }

  function getThumbnail(url) {

    if (streamData.thumbnail_url) {

      return streamData.thumbnail_url

    }

    try {

      let videoId = ""

      if (url.includes("youtu.be/")) {

        videoId = url.split("youtu.be/")[1].split("?")[0]

      }

      else if (url.includes("watch?v=")) {

        videoId = url.split("v=")[1].split("&")[0]

      }

      else if (url.includes("/shorts/")) {

        videoId = url.split("/shorts/")[1].split("?")[0]

      }

      else if (url.includes("/live/")) {

        videoId = url.split("/live/")[1].split("?")[0]

      }

      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    } catch {

      return ""

    }

  }

  return (

    <section className="min-h-screen bg-[#f5f5f7] text-[#111111] px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}

        <div className="flex justify-between items-center mb-14">

          <div>

            <p className="uppercase tracking-[5px] text-[#8e8e93] mb-3 text-sm">
              Livestream CMS
            </p>

            <h1 className="text-5xl font-semibold tracking-[-2px]">
              Admin Livestream
            </h1>

          </div>

          <Link
            to="/admin"
            className="
bg-white
text-[#111111]
px-8 py-4
rounded-2xl
font-medium
border border-[#dcdcdc]
hover:bg-[#f2f2f2]
transition
shadow-sm
"
          >

            Dashboard

          </Link>

        </div>

        <div className="flex flex-col gap-10">

          {/* FORM */}

          <div className="bg-white border border-[#e5e5e5] rounded-[32px] p-10 shadow-sm">

            <div className="mb-12">

              <p className="uppercase tracking-[5px] text-[#8e8e93] mb-3 text-sm">
                Livestream CMS
              </p>

              <h2 className="text-4xl font-semibold tracking-[-1px]">
                Configuración
              </h2>

              <p className="text-[#6e6e73] mt-3">
                Administra el livestream, textos, miniaturas y transmisión en vivo.
              </p>

            </div>

            <div className="grid gap-8">

              {/* TITULO SUPERIOR */}

              <div>

                <label className="block text-sm uppercase tracking-[3px] text-[#8e8e93] mb-4">

                  Título Superior

                </label>

                <input
                  type="text"
                  placeholder="Ej: Transmisiones Online"
                  value={streamData.title}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      title: e.target.value,
                    })
                  }
                  className="w-full bg-[#f7f7f7]
                  border border-[#dcdcdc]
                  rounded-2xl
                  px-6 py-4
                  text-[#111111] outline-none focus:border-[#bdbdbd] transition text-lg"
                />

              </div>

              {/* DESCRIPCION SUPERIOR */}

              <div>

                <label className="block text-sm uppercase tracking-[3px] text-[#8e8e93] mb-4">

                  Descripción Superior

                </label>

                <textarea
                  placeholder="Texto pequeño debajo del título principal..."
                  value={streamData.subtitle}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      subtitle: e.target.value,
                    })
                  }
                  className="
w-full
bg-[#f7f7f7]
border border-[#dcdcdc]
rounded-2xl
px-6 py-4
text-[#111111]
outline-none
h-36
resize-none
focus:border-[#bdbdbd]
transition
text-lg
"
                />

              </div>

              {/* TITULO LATERAL */}

              <div>

                <label className="block text-sm uppercase tracking-[3px] text-[#8e8e93] mb-4">

                  Título Lateral

                </label>

                <input
                  type="text"
                  placeholder="Ej: Vive cada servicio desde cualquier lugar."
                  value={streamData.side_title}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      side_title: e.target.value,
                    })
                  }
                  className="
w-full
bg-[#f7f7f7]
border border-[#dcdcdc]
rounded-2xl
px-6 py-4
text-[#111111]
outline-none
focus:border-[#bdbdbd]
transition
text-lg
"
                />

              </div>

              {/* DESCRIPCION LATERAL */}

              <div>

                <label className="block text-sm uppercase tracking-[3px] text-[#8e8e93] mb-4">

                  Descripción Lateral

                </label>

                <textarea
                  placeholder="Descripción principal al lado del video..."
                  value={streamData.side_description}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      side_description: e.target.value,
                    })
                  }
                  className="
w-full
bg-[#f7f7f7]
border border-[#dcdcdc]
rounded-2xl
px-6 py-4
text-[#111111]
outline-none
h-40
resize-none
focus:border-[#bdbdbd]
transition
text-lg
"
                />

              </div>

              {/* BOTON */}

              <div>

                <label className="block text-sm uppercase tracking-[3px] text-[#8e8e93] mb-4">

                  Texto del Botón

                </label>

                <input
                  type="text"
                  placeholder="Ej: Ver Canal de YouTube"
                  value={streamData.button_text}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      button_text: e.target.value,
                    })
                  }
                  className="
w-full
bg-[#f7f7f7]
border border-[#dcdcdc]
rounded-2xl
px-6 py-4
text-[#111111]
outline-none
focus:border-[#bdbdbd]
transition
text-lg
"
                />

              </div>

              {/* LINK */}

              <div>

                <label className="block text-sm uppercase tracking-[3px] text-[#8e8e93] mb-4">

                  Link de YouTube

                </label>

                <input
                  type="text"
                  placeholder="Pega aquí el link del live o video..."
                  value={streamData.youtube_url}
                  onChange={(e) => {

                    setPlayPreview(false)

                    setStreamData({
                      ...streamData,
                      youtube_url: e.target.value,
                    })

                  }}
                  className="
w-full
bg-[#f7f7f7]
border border-[#dcdcdc]
rounded-2xl
px-6 py-4
text-[#111111]
outline-none
focus:border-[#bdbdbd]
transition
text-lg
"
                />

              </div>

              {/* THUMBNAIL */}

              <div className="bg-[#fcfcfc]
               border border-dashed border-[#dcdcdc]
               rounded-[28px]
               p-8">

                <div className="mb-6">

                  <p className="uppercase tracking-[3px] text-[#8e8e93] text-sm mb-3">

                    Thumbnail Personalizada

                  </p>

                  <h3 className="text-2xl font-semibold mb-2">

                    Miniatura Opcional

                  </h3>

                  <p className="text-gray-500">

                    Si YouTube no carga la miniatura automáticamente,
                    puedes subir una personalizada aquí.

                  </p>

                </div>

                <label className="flex flex-col items-center justify-center border border-[#dcdcdc] rounded-2xl p-10 cursor-pointer hover:border-[#bdbdbd] transition bg-white">

                  <div className="text-center">

                    <p className="text-lg font-semibold mb-2">
                      Subir Imagen
                    </p>

                    <p className="text-gray-500 text-sm">
                      JPG, PNG o WEBP
                    </p>

                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {

                      if (e.target.files[0]) {

                        uploadThumbnail(e.target.files[0])

                      }

                    }}
                    className="hidden"
                  />

                </label>

                {uploading && (

                  <p className="text-yellow-500 mt-6">
                    Subiendo imagen...
                  </p>

                )}

                {streamData.thumbnail_url && (

                  <div className="mt-8">

                    <div className="flex items-center justify-between mb-4">

                      <p className="text-sm uppercase tracking-[3px] text-[#8e8e93]">

                        Preview Thumbnail

                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setStreamData({
                            ...streamData,
                            thumbnail_url: "",
                          })
                        }
                        className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-xl font-semibold transition"
                      >

                        Eliminar

                      </button>

                    </div>

                    <img
                      src={streamData.thumbnail_url}
                      alt="Thumbnail"
                      className="w-full max-w-lg rounded-3xl border border-[#e5e5e5] shadow-sm"
                    />

                  </div>

                )}

              </div>

              {/* LIVE TOGGLE */}

              <div className="bg-white border border-[#e5e5e5] rounded-2xl shadow-sm px-6 py-5 flex items-center justify-between">

                <div>

                  <p className="uppercase tracking-[3px] text-[#8e8e93] text-sm mb-2">

                    Estado del Live

                  </p>

                  <h3 className="text-2xl font-semibold">

                    Mostrar “Estamos En Vivo”

                  </h3>

                </div>

                <input
                  type="checkbox"
                  checked={streamData.is_live || false}
                  onChange={(e) =>
                    setStreamData({
                      ...streamData,
                      is_live: e.target.checked,
                    })
                  }
                  className="w-7 h-7"
                />

              </div>

              {/* BOTON */}

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-black hover:bg-[#1c1c1e] text-white px-10 py-6 rounded-2xl font-semibold text-lg transition duration-300 hover:scale-[1.02]"
              >

                {loading
                  ? "Guardando..."
                  : "Guardar Cambios"}

              </button>

            </div>

          </div>

          {/* PREVIEW */}

          <div className="bg-white border border-[#e5e5e5] rounded-[32px] overflow-hidden shadow-sm">

         <div className="p-8 border-b border-[#e5e5e5]">

        <p className="uppercase tracking-[4px] text-[#8e8e93]">
          Preview en Tiempo Real
       </p>

       </div>


            {/* HEADER */}

            <div className="text-center py-16 px-8 border-b border-[#e5e5e5]">

              <p className="uppercase tracking-[5px] text-[#8e8e93] mb-4">
                En Vivo
              </p>

              <h2 className="text-5xl font-semibold mb-6 break-words">

                {streamData.title || "Transmisiones Online"}

              </h2>

              <p className="text-gray-400 text-lg max-w-3xl mx-auto break-words">

                {streamData.subtitle || "Conéctate con nosotros"}

              </p>

            </div>

            {/* CONTENT */}

            <div className="p-10 md:p-14">

              <div className="grid lg:grid-cols-2 gap-14 items-center">

                {/* VIDEO */}

                <div className="rounded-[35px] overflow-hidden shadow-2xl border border-[#e5e5e5]">

                  <div className="aspect-video relative bg-[#f5f5f7]">

                    {!playPreview ? (

                      <div
                        onClick={() => setPlayPreview(true)}
                        className="w-full h-full cursor-pointer relative group"
                      >

                        <img
                          src={getThumbnail(streamData.youtube_url)}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>

                        <div className="absolute inset-0 flex items-center justify-center">

                          <div className="bg-red-600 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition">

                            <span className="text-white text-4xl ml-2">
                              ▶
                            </span>

                          </div>

                        </div>

                      </div>

                    ) : (

                      <iframe
                        className="w-full h-full"
                        src={getEmbedUrl(streamData.youtube_url)}
                        title="Preview"
                        allowFullScreen
                      ></iframe>

                    )}

                  </div>

                </div>

                {/* INFO */}

                <div>

                  {streamData.is_live && (

                    <div className="flex items-center gap-3 mb-6">

                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>

                      <p className="uppercase tracking-[4px] text-red-400 font-semibold">

                        Estamos En Vivo

                      </p>

                    </div>

                  )}

                  <h3 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 break-words">

                    {streamData.side_title || "Título lateral"}

                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed mb-10 break-words">

                    {streamData.side_description || "Descripción lateral"}

                  </p>

                  <a
                    href={streamData.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="
inline-block
bg-black
hover:bg-[#1c1c1e]
text-white
px-10
py-5
rounded-2xl
font-semibold
transition
duration-300
text-lg
" px-10 py-5 rounded-2xl font-bold transition duration-300 text-lg
                  >

                    {streamData.button_text || "Ver Canal"}

                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}