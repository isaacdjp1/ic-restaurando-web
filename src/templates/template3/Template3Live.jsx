import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template3Live() {

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

        const videoId =
          url.split("youtu.be/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("watch?v=")) {

        const videoId =
          url.split("v=")[1].split("&")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("/shorts/")) {

        const videoId =
          url.split("/shorts/")[1].split("?")[0]

        return `https://www.youtube.com/embed/${videoId}?autoplay=1`

      }

      if (url.includes("/live/")) {

        const videoId =
          url.split("/live/")[1].split("?")[0]

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

        videoId =
          url.split("youtu.be/")[1].split("?")[0]

      } else if (url.includes("watch?v=")) {

        videoId =
          url.split("v=")[1].split("&")[0]

      } else if (url.includes("/shorts/")) {

        videoId =
          url.split("/shorts/")[1].split("?")[0]

      } else if (url.includes("/live/")) {

        videoId =
          url.split("/live/")[1].split("?")[0]

      }

      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    } catch {

      return ""

    }

  }

  return (

    <section
      id="envivo"
      className="
        bg-slate-950
        py-32
        px-6
        relative
        overflow-hidden
      "
    >

      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-blue-600/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-600/20 blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-20">

          <p
            className="
              uppercase
              tracking-[0.4em]
              text-blue-400
              text-sm
              mb-6
            "
          >
            Livestream
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-white
              mb-8
            "
            style={{
              fontFamily: "Space Grotesk",
            }}
          >
            {liveData.title}
          </h2>

          <p
            className="
              text-slate-400
              text-lg
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            {liveData.subtitle}
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* VIDEO */}

          <div
            className="
              overflow-hidden
              rounded-[40px]
              border
              border-slate-800
              shadow-[0_0_80px_rgba(37,99,235,0.15)]
            "
          >

            <div className="aspect-video relative bg-black">

              {!playVideo ? (

                <div
                  onClick={() => setPlayVideo(true)}
                  className="
                    w-full
                    h-full
                    cursor-pointer
                    relative
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
                      bg-black/40
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
                        w-28
                        h-28
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-violet-600
                        flex
                        items-center
                        justify-center
                        shadow-[0_0_40px_rgba(124,58,237,0.5)]
                        group-hover:scale-110
                        transition
                      "
                    >

                      <span
                        className="
                          text-white
                          text-5xl
                          ml-2
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
                  bg-red-500/10
                  border
                  border-red-500/30
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
                    text-red-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    font-bold
                  "
                >
                  EN VIVO
                </span>

              </div>

            )}

            <h3
              className="
                text-5xl
                md:text-6xl
                font-bold
                text-white
                leading-tight
                mb-8
              "
              style={{
                fontFamily: "Space Grotesk",
              }}
            >
              {liveData.side_title}
            </h3>

            <p
              className="
                text-slate-400
                text-lg
                leading-relaxed
                mb-10
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
                py-5
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-violet-600
                text-white
                font-semibold
                hover:scale-105
                transition-all
                shadow-[0_0_30px_rgba(124,58,237,0.35)]
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