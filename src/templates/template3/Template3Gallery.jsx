import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import gallery1 from "../../assets/images/gallery1.webp"
import gallery2 from "../../assets/images/gallery2.webp"
import gallery3 from "../../assets/images/gallery3.webp"
import gallery4 from "../../assets/images/gallery4.webp"
import gallery5 from "../../assets/images/gallery5.webp"
import gallery6 from "../../assets/images/gallery6.webp"
import gallery7 from "../../assets/images/gallery7.webp"
import gallery8 from "../../assets/images/gallery8.webp"
import gallery9 from "../../assets/images/gallery9.webp"
import gallery10 from "../../assets/images/gallery10.webp"
import gallery11 from "../../assets/images/gallery11.webp"
import gallery12 from "../../assets/images/gallery12.webp"

const localImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
]

export default function Template3Gallery() {

  const [cmsImages, setCmsImages] = useState([])

  useEffect(() => {

    fetchGallery()

  }, [])

  async function fetchGallery() {

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("position", { ascending: true })

    if (error) {

      console.log(error)

    } else {

      setCmsImages(data)

    }

  }

  return (

    <section
      className="
        bg-slate-950
        py-32
        overflow-hidden
      "
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center mb-20">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-blue-400
              text-sm
              mb-5
            "
          >
            Galería
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              text-white
              mb-6
            "
            style={{
              fontFamily: "Space Grotesk"
            }}
          >
            Momentos Que Nos Definen
          </h2>

          <p
            className="
              text-slate-400
              text-lg
              max-w-3xl
              mx-auto
            "
          >
            Historias, encuentros y experiencias que forman
            parte de nuestra comunidad.
          </p>

        </div>

      </div>

      {/* HORIZONTAL GALLERY */}

      <div
        className="
          overflow-x-auto
          pb-6
          scrollbar-hide
        "
      >

        <div
          className="
            flex
            gap-6
            px-6
            w-max
          "
        >

          {localImages.map((localImage, index) => {

            const cmsImage = cmsImages.find(
              (img) => img.position === index + 1
            )

            const finalImage =
              cmsImage
                ? cmsImage.image_url
                : localImage

            return (

              <div
                key={index}
                className="
                  group
                  relative
                  flex-shrink-0
                  w-[320px]
                  md:w-[420px]
                  h-[520px]
                  rounded-[36px]
                  overflow-hidden
                  border
                  border-slate-800
                  hover:border-blue-500/40
                  transition-all
                  duration-500
                "
              >

                <img
                  src={finalImage}
                  alt="Galería Iglesia"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-transparent
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-6
                  "
                >

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      bg-white/10
                      backdrop-blur-md
                      border
                      border-white/10
                    "
                  >

                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-blue-500
                      "
                    />

                    <span
                      className="
                        text-white
                        text-sm
                      "
                    >
                      Comunidad
                    </span>

                  </div>

                </div>

              </div>

            )

          })}

        </div>

      </div>

      {/* BOTTOM CTA */}

      <div className="max-w-7xl mx-auto px-6 mt-16">

        <div
          className="
            rounded-[40px]
            border
            border-slate-800
            bg-slate-900
            p-10
            text-center
          "
        >

          <h3
            className="
              text-3xl
              md:text-5xl
              text-white
              mb-4
            "
            style={{
              fontFamily: "Space Grotesk"
            }}
          >
            Sé Parte De La Historia
          </h3>

          <p
            className="
              text-slate-400
              max-w-2xl
              mx-auto
            "
          >
            Cada reunión, cada servicio y cada evento
            construyen una comunidad más fuerte.
          </p>

        </div>

      </div>

    </section>

  )

}