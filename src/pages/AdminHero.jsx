import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { getCurrentChurchId } from "../lib/getCurrentChurchId"

export default function AdminHero() {

  const navigate = useNavigate()
  const { showToast } = useToast()

  const [loading, setLoading] = useState(false)

  const [titulo, setTitulo] = useState("")
  const [subtitulo, setSubtitulo] = useState("")
  const [botonTexto, setBotonTexto] = useState("")
  const [botonLink, setBotonLink] = useState("")
  
  const [logoFile, setLogoFile] = useState(null)

const [slide1, setSlide1] = useState(null)
const [slide2, setSlide2] = useState(null)
const [slide3, setSlide3] = useState(null)
const [slide4, setSlide4] = useState(null)
const [slide5, setSlide5] = useState(null)

const [logoPreview, setLogoPreview] = useState("")
const [heroContent, setHeroContent] = useState(null)
const [heroLoaded, setHeroLoaded] = useState(false)

const [slide1Preview, setSlide1Preview] = useState("")
const [slide2Preview, setSlide2Preview] = useState("")
const [slide3Preview, setSlide3Preview] = useState("")
const [slide4Preview, setSlide4Preview] = useState("")
const [slide5Preview, setSlide5Preview] = useState("")

  useEffect(() => {

    fetchHero()

  }, [])

  async function fetchHero() {

  const churchId =
    await getCurrentChurchId()

  const { data, error } = await supabase

    .from("hero_content")

    .select("*")

    .eq(
      "church_id",
      churchId
    )

    .eq(
      "activo",
      true
    )

    .single()

    if (!error && data) {
        setHeroContent(data)
        setHeroLoaded(true)

      setTitulo(data.titulo || "")
      setSubtitulo(data.subtitulo || "")
      setBotonTexto(data.boton_texto || "")
      setBotonLink(data.boton_link || "")

      setLogoPreview(data.logo_url || "")

      setSlide1Preview(data.slide1 || "")
      setSlide2Preview(data.slide2 || "")
      setSlide3Preview(data.slide3 || "")
      setSlide4Preview(data.slide4 || "")
      setSlide5Preview(data.slide5 || "")

    }

  }

  async function handleSlideUpload(e, slideNumber) {

  const file = e.target.files[0]

  if (!file) return

  const fileName = `slide-${slideNumber}-${Date.now()}`

  const { error: uploadError } = await supabase.storage
    .from("hero-content")
    .upload(fileName, file)

  if (uploadError) {

    console.log(uploadError)
    return

  }

  const { data } = supabase.storage
    .from("hero-content")
    .getPublicUrl(fileName)

  const imageUrl = data.publicUrl

  const churchId =
  await getCurrentChurchId()

const { error } = await supabase

  .from("hero_content")

  .update({
    [`slide${slideNumber}`]:
      imageUrl
  })

  .eq(
    "church_id",
    churchId
  )

  .eq(
    "activo",
    true
  )

  if (!error) {

    fetchHero()

  }

}

  async function uploadImage(file, fileName) {

  if (!file) return null

  const filePath = `${fileName}-${Date.now()}`

  const { error } = await supabase.storage
    .from("hero-content")
    .upload(filePath, file, {
      upsert: true
    })

  if (error) {

    console.log(error)

    return null

  }

  const { data } = supabase.storage
    .from("hero-content")
    .getPublicUrl(filePath)

  return data.publicUrl

}

  async function updateHero() {

    setLoading(true)

    if (logoFile && heroContent?.logo_url) {

    const oldLogoPath =
    decodeURIComponent(
      heroContent.logo_url
        .split("/")
        .pop()
    )

    await supabase.storage

    .from("hero-content")

    .remove([oldLogoPath])

}

    const logoUrl = await uploadImage(logoFile, "logo")

    if (slide1 && heroContent?.slide1) {

  const oldSlide1 =
    decodeURIComponent(
      heroContent.slide1
        .split("/")
        .pop()
    )

    console.log(
  "OLD SLIDE 1:",
  oldSlide1
)

const result = await supabase.storage
  .from("hero-content")
  .remove([oldSlide1])

console.log(
  "DELETE RESULT:",
  result
)

  await supabase.storage
    .from("hero-content")
    .remove([oldSlide1])

}

if (slide2 && heroContent?.slide2) {

  const oldSlide2 =
    decodeURIComponent(
      heroContent.slide2
        .split("/")
        .pop()
    )

  const result =
    await supabase.storage

      .from("hero-content")

      .remove([oldSlide2])

  console.log(
    "DELETE SLIDE 2:",
    result
  )

}

if (slide3 && heroContent?.slide3) {

  const oldSlide3 =
    decodeURIComponent(
      heroContent.slide3
        .split("/")
        .pop()
    )

  const result =
    await supabase.storage

      .from("hero-content")

      .remove([oldSlide3])

  console.log(
    "DELETE SLIDE 3:",
    result
  )

}

if (slide4 && heroContent?.slide4) {

  const oldSlide4 =
    decodeURIComponent(
      heroContent.slide4
        .split("/")
        .pop()
    )

  const result =
    await supabase.storage

      .from("hero-content")

      .remove([oldSlide4])

  console.log(
    "DELETE SLIDE 4:",
    result
  )

}

if (slide5 && heroContent?.slide5) {

  const oldSlide5 =
    decodeURIComponent(
      heroContent.slide5
        .split("/")
        .pop()
    )

  const result =
    await supabase.storage

      .from("hero-content")

      .remove([oldSlide5])

  console.log(
    "DELETE SLIDE 5:",
    result
  )

}

    const slide1Url = await uploadImage(slide1, "slide1")
    const slide2Url = await uploadImage(slide2, "slide2")
    const slide3Url = await uploadImage(slide3, "slide3")
    const slide4Url = await uploadImage(slide4, "slide4")
    const slide5Url = await uploadImage(slide5, "slide5")

    const finalSlide1 = slide1Url || heroContent?.slide1
    const finalSlide2 = slide2Url || heroContent?.slide2
    const finalSlide3 = slide3Url || heroContent?.slide3
    const finalSlide4 = slide4Url || heroContent?.slide4
    const finalSlide5 = slide5Url || heroContent?.slide5

    if (slide1Url) setSlide1Preview(slide1Url)
    if (slide2Url) setSlide2Preview(slide2Url)
    if (slide3Url) setSlide3Preview(slide3Url)
    if (slide4Url) setSlide4Preview(slide4Url)
    if (slide5Url) setSlide5Preview(slide5Url)

      const churchId =
      await getCurrentChurchId()

    const { error } = await supabase
      .from("hero_content")
      .update({
      titulo,
     subtitulo,
     boton_texto: botonTexto,
     boton_link: botonLink,

     logo_url: logoUrl || logoPreview,

     slide1: finalSlide1,
     slide2: finalSlide2,
     slide3: finalSlide3,
     slide4: finalSlide4,
     slide5: finalSlide5,
    })
      .eq(
  "church_id",
  churchId
)

.eq(
  "activo",
  true
)

    if (error) {

      showToast("Error actualizando portada", "error")

    } else {

      showToast("Portada actualizada correctamente", "success")

    await fetchHero()

    }

    setLoading(false)

  }

  if (!heroLoaded) {

  return (

    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">

      <div className="flex flex-col items-center gap-6">

        <div className="
          w-20
          h-20
          rounded-full
          border-4
          border-black
          border-t-transparent
          animate-spin
        "></div>

        <p className="text-[#6e6e73] text-lg tracking-wide">
          Cargando Portada Web...
        </p>

      </div>

    </div>

  )

}

  return (

    <section className="min-h-screen bg-[#f5f5f7] px-6 py-16 text-[#111111]">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="uppercase tracking-[6px] text-[#8e8e93] mb-4 text-sm font-medium">
              CMS
            </p>

            <h1 className="text-5xl font-semibold tracking-[-2px]">
              Portada Web
            </h1>

          </div>

         <button
  onClick={() => navigate("/admin")}
  className="
    bg-white
    hover:bg-[#f2f2f2]
    border border-[#dcdcdc]
    px-7 py-3
    rounded-2xl
    text-[#111]
    font-medium
    transition-all duration-300
    shadow-sm
  "
>

            Dashboard

          </button>

        </div>

        <div className="
  bg-white
  border border-[#e5e5e5]
  rounded-[32px]
  p-10
  space-y-10
  shadow-[0_4px_20px_rgba(0,0,0,0.04)]
">

            <div>

          <label className="block mb-4 text-[#6e6e73]">
          Logo Iglesia
        </label>

  {
        logoPreview && (
        <img
        src={logoPreview}
        alt="Logo"
        className="
          w-40
          h-40
          object-contain
          rounded-2xl
          bg-[#f7f7f7]
         border border-[#dcdcdc]
         text-[#111]
          p-4
          mb-4
        "
      />
    )
  }

       <label
  className="
    flex items-center justify-center
    w-full
    bg-[#f7f7f7]
    border border-[#dcdcdc]
    rounded-2xl
    px-6 py-5
    cursor-pointer
    hover:border-yellow-500/40
    transition
  "
>

  <span className="text-[#6e6e73] font-medium">

    {
      logoFile
        ? logoFile.name
        : "Seleccionar Logo"
    }

  </span>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => {

      const file = e.target.files[0]

      if (!file) return

      setLogoFile(file)

      setLogoPreview(URL.createObjectURL(file))

    }}
  />

</label>

  {
  logoPreview &&
  logoPreview.includes("supabase") && (
      <button
        type="button"
        onClick={() => {

          setLogoFile(null)
          setLogoPreview("")

        }}
        className="
          mt-4
          bg-red-500
          hover:bg-red-400
          px-5 py-3
          rounded-xl
          font-semibold
          transition
        "
      >

        Deseleccionar Logo

      </button>
    )
  }

</div>

          <div>

            <div className="space-y-6">

  <h2 className="text-2xl font-bold">
    Slideshow Hero
  </h2>

  {[1, 2, 3, 4, 5].map((slide) => (

    <div key={slide}>

      <label className="block mb-3 text-white/60">
        Slide {slide}
      </label>

      <label
  className="
    flex items-center justify-center
    w-full
   bg-[#f7f7f7]
   border border-[#dcdcdc]
   text-[#111]
    rounded-2xl
    px-6 py-5
    cursor-pointer
    hover:border-yellow-500/40
    transition
  "
>

  <span className="text-[#6e6e73] font-medium">

  {
    slide === 1 && slide1
      ? slide1.name
    : slide === 2 && slide2
      ? slide2.name
    : slide === 3 && slide3
      ? slide3.name
    : slide === 4 && slide4
      ? slide4.name
    : slide === 5 && slide5
      ? slide5.name
      : `Seleccionar Slide ${slide}`
  }

</span>

<input
  type="file"
  accept="image/*"
  hidden
  onChange={(e) => {

    const file = e.target.files[0]

    if (!file) return

    if (slide === 1) setSlide1(file)
    if (slide === 2) setSlide2(file)
    if (slide === 3) setSlide3(file)
    if (slide === 4) setSlide4(file)
    if (slide === 5) setSlide5(file)

  }}
/>

</label>

{
  (
    (slide === 1 && slide1) ||
    (slide === 2 && slide2) ||
    (slide === 3 && slide3) ||
    (slide === 4 && slide4) ||
    (slide === 5 && slide5)
  ) && (

    <button
      type="button"
      onClick={() => {

  if (slide === 1) {

    setSlide1(null)
    setSlide1Preview("")

  }

  if (slide === 2) {

    setSlide2(null)
    setSlide2Preview("")

  }

  if (slide === 3) {

    setSlide3(null)
    setSlide3Preview("")

  }

  if (slide === 4) {

    setSlide4(null)
    setSlide4Preview("")

  }

  if (slide === 5) {

    setSlide5(null)
    setSlide5Preview("")

  }

}}
      className="
        mt-4
        bg-red-500
        hover:bg-red-400
        px-5 py-3
        rounded-xl
        font-semibold
        transition
      "
    >

      Deseleccionar Slide {slide}

    </button>

  )
}

      {

        (
        slide === 1 ? slide1Preview :
        slide === 2 ? slide2Preview :
        slide === 3 ? slide3Preview :
        slide === 4 ? slide4Preview :
        slide === 5 ? slide5Preview :
         ""
    )
        
        && (

          <img
            src={
           slide === 1 ? slide1Preview :
           slide === 2 ? slide2Preview :
           slide === 3 ? slide3Preview :
           slide === 4 ? slide4Preview :
           slide === 5 ? slide5Preview :
            ""
          }
            alt={`Slide ${slide}`}
            className="
              mt-4
              w-full
              h-44
              object-cover
              rounded-2xl
              border border-white/10
            "
          />

        )

      }

    </div>

  ))}

</div>


            <label className="block mb-3 text-white/60">
              Título Principal
            </label>

            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="
                w-full
                bg-[#f7f7f7]
                border border-[#dcdcdc]
                rounded-2xl
                px-6 py-5
                outline-none
              "
            />

          </div>



          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-3 text-white/60">
                Texto Botón
              </label>

              <input
                type="text"
                value={botonTexto}
                onChange={(e) => setBotonTexto(e.target.value)}
                className="
                  w-full
                  bg-[#f7f7f7]
                  border border-[#dcdcdc]
                  rounded-2xl
                  px-6 py-5
                  outline-none
                "
              />

            </div>

            <div>

              <label className="block mb-3 text-white/60">
                Link Botón
              </label>

              <select
             value={botonLink}
             onChange={(e) => setBotonLink(e.target.value)}
             className="
             w-full
             bg-[#f7f7f7]
             border border-[#dcdcdc]
             rounded-2xl
             px-6 py-5
             outline-none
             text-[#111111]
            "
            >

           <option value="#inicio">Inicio</option>

           <option value="#servicios">Servicios</option>

           <option value="#eventos">Eventos</option>

          <option value="#envivo">En Vivo</option>

          <option value="#oracion">Oración</option>

         </select>

            </div>

          </div>

          <button
            onClick={updateHero}
            disabled={loading}
            className="
  bg-black
  hover:bg-[#1c1c1e]
  text-white
  px-10 py-5
  rounded-2xl
  font-semibold
  transition-all duration-300
  shadow-lg
"
          >

            {loading
              ? "Actualizando..."
              : "Actualizar Portada"}

          </button>

        </div>

      </div>

    </section>

  )

}