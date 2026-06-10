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

export default function Template4Gallery() {

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
        bg-white
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
              mb-5
              font-semibold
            "
          >
            Galería
          </p>

          <h2
            className="
              text-5xl
              md:text-6xl
              text-black
              mb-6
              font-bold
            "
            style={{
              fontFamily: "Montserrat"
            }}
          >
            Nuestra Comunidad
          </h2>

          <p
            className="
              text-zinc-600
              text-lg
              max-w-3xl
              mx-auto
            "
          >
            Conoce algunos de los momentos que compartimos
            como iglesia y familia.
          </p>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
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
                  bg-white
                  rounded-[28px]
                  overflow-hidden
                  border
                  border-zinc-200
                  shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  transition-all
                  duration-300
                "
              >

                <img
                  src={finalImage}
                  alt="Galería Iglesia"
                  className="
                    w-full
                    h-[320px]
                    object-cover
                    hover:scale-105
                    transition-all
                    duration-700
                  "
                />

              </div>

            )

          })}

        </div>

      </div>

    </section>

  )

}