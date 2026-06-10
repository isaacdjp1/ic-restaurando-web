import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template2Live() {
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
    if (liveData?.thumbnail_url) {
      return liveData.thumbnail_url
    }

    try {
      let videoId = ""

      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0]
      } else if (url.includes("watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0]
      } else if (url.includes("/shorts/")) {
        videoId = url.split("/shorts/")[1].split("?")[0]
      } else if (url.includes("/live/")) {
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
      className="bg-white py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">
          <p
            className="
              uppercase
              tracking-[0.35em]
              text-sm
              text-zinc-500
              mb-6
            "
          >
            En Vivo
          </p>

          <h2
            className="
              text-5xl
              md:text-6xl
              text-black
              mb-8
            "
            style={{
              fontFamily: "Instrument Serif",
            }}
          >
            {liveData.title}
          </h2>

          <p
            className="
              text-zinc-600
              text-lg
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            {liveData.subtitle}
          </p>
        </div>

        {/* CONTENT */}

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* VIDEO */}

          <div
            className="
              overflow-hidden
              rounded-[36px]
              border
              border-zinc-200
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              bg-white
            "
          >
            <div className="aspect-video bg-zinc-100 relative">

              {!playVideo ? (
                <div
                  onClick={() => setPlayVideo(true)}
                  className="
                    relative
                    w-full
                    h-full
                    cursor-pointer
                    group
                  "
                >
                  <img
                    src={getThumbnail(
                      liveData.youtube_url
                    )}
                    alt="Thumbnail"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/20
                      group-hover:bg-black/30
                      transition
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        w-24
                        h-24
                        rounded-full
                        bg-white
                        flex
                        items-center
                        justify-center
                        shadow-2xl
                        group-hover:scale-110
                        transition
                      "
                    >
                      <span
                        className="
                          text-black
                          text-4xl
                          ml-1
                        "
                      >
                        ▶
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(
                    liveData.youtube_url
                  )}
                  title="YouTube Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* INFO */}

          <div>

            {liveData.is_live && (
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-full
                  bg-red-50
                  border
                  border-red-200
                  mb-8
                "
              >
                <div
                  className="
                    w-3
                    h-3
                    bg-red-500
                    rounded-full
                    animate-pulse
                  "
                />

                <span
                  className="
                    text-red-600
                    uppercase
                    tracking-[0.2em]
                    text-xs
                    font-semibold
                  "
                >
                  Estamos En Vivo
                </span>
              </div>
            )}

            <h3
              className="
                text-5xl
                md:text-6xl
                text-black
                leading-[1]
                mb-8
              "
              style={{
                fontFamily: "Instrument Serif",
              }}
            >
              {liveData.side_title}
            </h3>

            <p
              className="
                text-zinc-600
                text-lg
                leading-relaxed
                mb-10
                max-w-xl
              "
            >
              {liveData.side_description}
            </p>

            <a
              href={liveData.youtube_url}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                px-8
                py-4
                rounded-full
                bg-black
                text-white
                font-medium
                hover:opacity-90
                transition
              "
            >
              {liveData.button_text}
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}