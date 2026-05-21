import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Live() {

  const [liveData, setLiveData] = useState(null)

  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {

    fetchLive()

  }, [])

  async function fetchLive() {

    const { data, error } = await supabase
      .from("livestream")
      .select("*")
      .eq("id", 1)
      .single()

    if (error) {

      console.log(error)

    } else {

      setLiveData(data)

    }

  }

  if (!liveData) return null

  function getEmbedUrl(url) {

    if (!url) return ""

    try {

      // LINK youtu.be
      if (url.includes("youtu.be/")) {

        const videoId = url.split("youtu.be/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      // LINK watch?v=
      if (url.includes("watch?v=")) {

        const videoId = url.split("v=")[1].split("&")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      // LINK shorts
      if (url.includes("/shorts/")) {

        const videoId = url.split("/shorts/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      // LINK live
      if (url.includes("/live/")) {

        const videoId = url.split("/live/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      // SI YA ES EMBED
      if (url.includes("/embed/")) {

        return url

      }

      return ""

    } catch {

      return ""

    }

  }

  function getThumbnail(url) {

    // THUMBNAIL PERSONALIZADA
    if (liveData?.thumbnail_url) {

      return liveData.thumbnail_url

    }

    try {

      let videoId = ""

      // youtu.be
      if (url.includes("youtu.be/")) {

        videoId = url.split("youtu.be/")[1].split("?")[0]

      }

      // watch?v=
      else if (url.includes("watch?v=")) {

        videoId = url.split("v=")[1].split("&")[0]

      }

      // shorts
      else if (url.includes("/shorts/")) {

        videoId = url.split("/shorts/")[1].split("?")[0]

      }

      // live
      else if (url.includes("/live/")) {

        videoId = url.split("/live/")[1].split("?")[0]

      }

      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    } catch {

      return ""

    }

  }

  return (

    <section
      id="envivo"
      className="bg-black text-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-yellow-400 mb-4">
            En Vivo
          </p>

          <h2 className="text-5xl font-black mb-6">
            {liveData.title}
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">

            {liveData.subtitle}

          </p>

        </div>

        {/* Live Container */}

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* VIDEO */}

          <div className="rounded-[35px] overflow-hidden shadow-2xl border border-white/10">

            <div className="aspect-video relative bg-zinc-950">

              {!playVideo ? (

                <div
                  onClick={() => setPlayVideo(true)}
                  className="w-full h-full cursor-pointer relative group"
                >

                  <img
                    src={getThumbnail(liveData.youtube_url)}
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
                  src={getEmbedUrl(liveData.youtube_url)}
                  title="YouTube Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>

              )}

            </div>

          </div>

          {/* INFO */}

          <div>

            {liveData.is_live && (

              <div className="flex items-center gap-3 mb-6">

                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>

                <p className="uppercase tracking-[4px] text-red-400 font-semibold">

                  Estamos En Vivo

                </p>

              </div>

            )}

            <h3 className="text-5xl font-black leading-tight mb-8">

              {liveData.side_title}

            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">

              {liveData.side_description}

            </p>

            <a
              href={liveData.youtube_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-2xl font-bold transition duration-300 text-lg"
            >

              {liveData.button_text}

            </a>

          </div>

        </div>

      </div>

    </section>

  )

}