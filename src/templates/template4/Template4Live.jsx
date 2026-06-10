import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template4Live() {

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
        bg-[#f8f8f8]
        py-32
        px-6
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-[#C8A96B]
              text-sm
              font-semibold
              mb-5
            "
          >
            Transmisión En Vivo
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              text-black
              mb-8
              font-bold
            "
            style={{
              fontFamily: "Montserrat"
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
            style={{
              fontFamily: "Inter"
            }}
          >
            {liveData.subtitle}
          </p>

        </div>

        <div
          className="
            bg-white
            border
            border-zinc-200
            rounded-[40px]
            overflow-hidden
            shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          "
        >

          <div className="grid lg:grid-cols-2">

            {/* VIDEO */}

            <div className="relative">

              <div className="aspect-video lg:aspect-auto lg:h-full">

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
                        bg-black/30
                        group-hover:bg-black/20
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

            <div
              className="
                p-10
                md:p-14
                flex
                flex-col
                justify-center
              "
            >

              {liveData.is_live && (

                <div
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-3
                    px-5
                    py-3
                    rounded-full
                    bg-[#C8A96B]/10
                    border
                    border-[#C8A96B]/30
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
                      text-[#C8A96B]
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      font-bold
                    "
                  >
                    EN VIVO AHORA
                  </span>

                </div>

              )}

              <h3
                className="
                  text-4xl
                  md:text-6xl
                  text-black
                  leading-tight
                  mb-8
                  font-bold
                "
                style={{
                  fontFamily: "Montserrat"
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
                "
                style={{
                  fontFamily: "Inter"
                }}
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
                  w-fit
                  px-8
                  py-5
                  rounded-2xl
                  bg-[#C8A96B]
                  text-black
                  font-semibold
                  hover:opacity-90
                  transition-all
                "
              >

                {liveData.button_text}

              </a>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}