import gallery1 from "../assets/images/gallery1.webp"
import gallery2 from "../assets/images/gallery2.webp"
import gallery3 from "../assets/images/gallery3.webp"
import gallery4 from "../assets/images/gallery4.webp"
import gallery5 from "../assets/images/gallery5.webp"
import gallery6 from "../assets/images/gallery6.webp"
import gallery7 from "../assets/images/gallery7.webp"
import gallery8 from "../assets/images/gallery8.webp"
import gallery9 from "../assets/images/gallery9.webp"
import gallery10 from "../assets/images/gallery10.webp"
import gallery11 from "../assets/images/gallery11.webp"
import gallery12 from "../assets/images/gallery12.webp"


const images = [
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

export default function Gallery() {
  return (
    <section
      className="bg-black text-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-yellow-400 mb-4">

            Galería

          </p>

          <h2 className="text-5xl font-black mb-6">

            Nuestra Comunidad

          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">

            Vive momentos de adoración, unidad y transformación
            junto a nuestra iglesia.

          </p>

        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {images.map((image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-[30px] group relative"
            >

              <img
                src={image}
                alt="Galería Iglesia"
                className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}