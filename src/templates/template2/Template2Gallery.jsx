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

export default function Template2Gallery() {
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
    <section className="bg-[#fafafa] py-32 px-6">
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
            Galería
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
            Nuestra Comunidad
          </h2>

          <p
            className="
              text-zinc-600
              text-lg
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Vive momentos de adoración, unidad y crecimiento
            compartidos por nuestra comunidad.
          </p>
        </div>

        {/* MASONRY STYLE GRID */}

        <div
          className="
            columns-1
            md:columns-2
            lg:columns-3
            gap-6
            space-y-6
          "
        >
          {localImages.map((localImage, index) => {
            const cmsImage = cmsImages.find(
              (img) => img.position === index + 1
            )

            const finalImage = cmsImage
              ? cmsImage.image_url
              : localImage

            return (
              <div
                key={index}
                className="
                  break-inside-avoid
                  overflow-hidden
                  rounded-[28px]
                  bg-white
                  border
                  border-zinc-200
                  shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                  group
                "
              >
                <div className="overflow-hidden">
                  <img
                    src={finalImage}
                    alt="Galería Iglesia"
                    className="
                      w-full
                      object-cover
                      transition-all
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}