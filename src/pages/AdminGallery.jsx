import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import PageWrapper from "../components/PageWrapper"

export default function AdminGallery() {

  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState(1)

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

      setImages(data)

    }

  }

  async function handleUpload() {

    if (!selectedFile) {

      alert("Selecciona una imagen")
      return

    }

    try {

      setUploading(true)

      // BUSCAR IMAGEN EXISTENTE

      const existingImage = images.find(
        (img) => img.position === selectedPosition
      )

      // ELIMINAR IMAGEN ANTERIOR

      if (existingImage) {

        const oldFileName = existingImage.image_url
          .split("/")
          .pop()

        await supabase.storage
          .from("gallery")
          .remove([oldFileName])

        await supabase
          .from("gallery")
          .delete()
          .eq("id", existingImage.id)

      }

      // NUEVO ARCHIVO

      const fileExt = selectedFile.name
        .split(".")
        .pop()

      const fileName = `${Date.now()}.${fileExt}`

      // UPLOAD STORAGE

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, selectedFile)

      if (uploadError) throw uploadError

      // PUBLIC URL

      const { data: publicUrlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName)

      const imageUrl = publicUrlData.publicUrl

      // INSERT DATABASE

      const { error: insertError } = await supabase
        .from("gallery")
        .insert([
          {
            image_url: imageUrl,
            position: selectedPosition
          }
        ])

      if (insertError) throw insertError

      alert("Imagen reemplazada correctamente")

      setSelectedFile(null)
      setPreview(null)

      fetchGallery()

    } catch (error) {

      console.log(error)

      alert(error.message)

    } finally {

      setUploading(false)

    }

  }

  async function deleteImage(id, imageUrl) {

    const confirmed = confirm("¿Eliminar imagen?")

    if (!confirmed) return

    try {

      const fileName = imageUrl
        .split("/")
        .pop()

      await supabase.storage
        .from("gallery")
        .remove([fileName])

      await supabase
        .from("gallery")
        .delete()
        .eq("id", id)

      fetchGallery()

    } catch (error) {

      console.log(error)

      alert("Error eliminando imagen")

    }

  }

  async function deleteAllImages() {

    const confirmed = confirm(
      "¿Eliminar TODAS las imágenes?"
    )

    if (!confirmed) return

    try {

      const filePaths = images.map((image) => {

        return image.image_url
          .split("/")
          .pop()

      })

      // ELIMINAR STORAGE

      if (filePaths.length > 0) {

        await supabase.storage
          .from("gallery")
          .remove(filePaths)

      }

      // ELIMINAR DATABASE

      await supabase
        .from("gallery")
        .delete()
        .neq("id", 0)

      fetchGallery()

      alert("Galería eliminada")

    } catch (error) {

      console.log(error)

      alert("Error eliminando galería")

    }

  }

  function removeSelectedImage() {

    setSelectedFile(null)
    setPreview(null)

  }

  return (

    <PageWrapper>

      <section className="min-h-screen bg-[#f5f5f7] text-[#111111] px-6 py-16">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <motion.div
            initial={{
              opacity: 0,
              y: -30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16"
          >

            <div>

              <p className="uppercase tracking-[6px] text-[#8e8e93] mb-3 text-sm font-medium">

                Gallery CMS

              </p>

              <h1 className="text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-[-2px] mb-5">

                Admin
                <br />
                Galería

              </h1>

              <p className="text-[#6e6e73] text-lg max-w-2xl leading-relaxed">

                Gestiona imágenes, previews y contenido visual
                dinámico de la iglesia.

              </p>

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
              shadow-sm
                transition-all duration-300
                w-fit
              "
            >

              Dashboard

            </Link>

          </motion.div>

          {/* UPLOAD */}

          <motion.div

            initial={{
              opacity: 0,
              y: 40,
              scale: 0.97
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            transition={{
              duration: 0.55
            }}

            className="
              bg-white
              border border-[#e5e5e5]
              rounded-[32px]
              p-10
              mb-16
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            "
          >

            <p className="uppercase tracking-[6px] text-[#8e8e93] text-sm mb-8">

              Upload Images

            </p>

            {/* SLOT SELECTOR */}

            <div className="mb-10">

              <p className="uppercase tracking-[5px] text-[#8e8e93] text-sm mb-4">

                Seleccionar Slot

              </p>

              <select
                value={selectedPosition}
                onChange={(e) =>
                  setSelectedPosition(Number(e.target.value))
                }
                className="
                 bg-[#f7f7f7]
                border border-[#dcdcdc]
                rounded-2xl
                px-6 py-4
                text-[#111111]
                text-lg
                  w-full max-w-md
                  transition-all duration-300
                  focus:border-yellow-400
                "
              >

                {[...Array(12)].map((_, index) => (

                  <option
                    key={index}
                    value={index + 1}
                  >

                    Reemplazar Imagen #{index + 1}

                  </option>

                ))}

              </select>

            </div>

            {/* UPLOAD BOX */}

            <label
              className="
                border border-dashed border-[#dcdcdc]
                rounded-[35px]
                p-16
                flex flex-col
                items-center justify-center
                text-center
                cursor-pointer
                hover:border-[#bdbdbd]
                hover:bg-[#fafafa]
                transition-all duration-300
                bg-[#fcfcfc]
              "
            >

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {

                  const file = e.target.files[0]

                  if (file) {

                    setSelectedFile(file)

                    setPreview(URL.createObjectURL(file))

                  }

                  e.target.value = ""

                }}
              />

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 2
                }}
                className="text-7xl mb-6"
              >

                📸

              </motion.div>

              <h3 className="text-3xl font-semibold mb-3 tracking-[-1px]">

                Subir Imagen

              </h3>

              <p className="text-gray-500 text-xl">

                JPG, PNG o WEBP

              </p>

            </label>

            {/* PREVIEW */}

            {preview && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  duration: 0.4
                }}

                className="mt-12"
              >

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="uppercase tracking-[5px] text-[#8e8e93] text-sm mb-2">

                      Preview

                    </p>

                    <h3 className="text-2xl font-semibold tracking-[-1px]">

                      Imagen Seleccionada

                    </h3>

                  </div>

                  <button
                    onClick={removeSelectedImage}
                    className="
                      bg-red-500 hover:bg-red-400
                      text-white
                      px-6 py-3
                      rounded-2xl
                      font-bold
                      transition-all duration-300
                      hover:scale-105
                    "
                  >

                    Deseleccionar

                  </button>

                </div>

                <motion.img

                  initial={{
                    opacity: 0,
                    scale: 0.97
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1
                  }}

                  transition={{
                    duration: 0.45
                  }}

                  src={preview}
                  alt=""
                  className="
                    w-full max-w-2xl
                    h-[420px]
                    object-cover
                    rounded-[35px]
                    border border-[#e5e5e5]
                    shadow-sm
                  "
                />

              </motion.div>

            )}

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-10">

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="
                 bg-black hover:bg-[#1c1c1e]
                 text-white
                  px-12 py-5
                  rounded-[24px]
                  font-semibold text-lg
                  transition-all duration-300
                  disabled:opacity-50
                  hover:scale-105
                  hover:shadow-xl
                "
              >

                {uploading
                  ? "Subiendo..."
                  : "Reemplazar Imagen"}

              </button>

              <button
                onClick={deleteAllImages}
                className="
                  bg-red-500 hover:bg-red-400
                  text-white
                  px-10 py-5
                  rounded-[24px]
                  font-black text-xl
                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-xl
                  hover:shadow-red-500/30
                "
              >

                Eliminar Toda la Galería

              </button>

            </div>

          </motion.div>

          {/* GALLERY PREVIEW */}

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.5,
              delay: 0.1
            }}

            className="mb-10"
          >

            <p className="uppercase tracking-[6px] text-[#8e8e93] text-sm mb-4">

              Gallery Preview

            </p>

            <h2 className="text-4xl lg:text-5xl font-black mb-4">

              Imágenes Actuales

            </h2>

            <p className="text-gray-500 text-lg">

              Estas imágenes son las que aparecen públicamente
              en la galería de la página web.

            </p>

          </motion.div>

          {/* GRID */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {images.map((image, index) => (

              <motion.div
                key={image.id}

                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.96
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}

                transition={{
                  duration: 0.45,
                  delay: index * 0.06
                }}

                whileHover={{
                  y: -8,
                  scale: 1.02
                }}

                className="
                  bg-white
                  border border-[#e5e5e5]
                  rounded-[30px]
                  shadow-sm
                  overflow-hidden
                  group
                  transition-all duration-300
                  hover:border-[#d1d1d1]
                  hover:shadow-md
                "
              >

                <div className="relative overflow-hidden">

                  <img
                    src={image.image_url}
                    alt=""
                    className="
                      w-full
                      h-[340px]
                      object-cover
                      transition duration-700
                      group-hover:scale-105
                    "
                  />

                  <div className="
                    absolute top-4 left-4
                    bg-white/90
                    backdrop-blur-md
                    px-4 py-2
                    rounded-full
                    border border-[#e5e5e5]
                    shadow-sm
                  ">

                    <p className="text-sm font-bold text-[#8e8e93]">

                      Slot #{image.position}

                    </p>

                  </div>

                </div>

                <div className="p-6">

                  <button
                    onClick={() =>
                      deleteImage(image.id, image.image_url)
                    }
                    className="
                      w-full
                      bg-red-500 hover:bg-red-400
                      text-white
                      py-4
                      rounded-2xl
                      font-bold
                      transition-all duration-300
                      hover:scale-105
                    "
                  >

                    Eliminar Imagen

                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </PageWrapper>

  )

}