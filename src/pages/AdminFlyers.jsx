import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import PageWrapper from "../components/PageWrapper"
import { motion } from "framer-motion"

export default function AdminFlyers() {

  const navigate = useNavigate()

  const [flyers, setFlyers] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingFlyer, setEditingFlyer] = useState(null)

  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [dia, setDia] = useState("")
  const [hora, setHora] = useState("")
  const [orden, setOrden] = useState(1)

  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {

    fetchFlyers()

  }, [])

  useEffect(() => {

    if (editingFlyer) {

      setTitulo(editingFlyer.titulo)
      setDescripcion(editingFlyer.descripcion)
      setDia(editingFlyer.dia)
      setHora(editingFlyer.hora)
      setOrden(editingFlyer.orden)

      setPreview(editingFlyer.image_url)

      setShowForm(true)

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })

    }

  }, [editingFlyer])

  async function fetchFlyers() {

    const { data, error } = await supabase
      .from("flyers")
      .select("*")
      .order("orden", { ascending: true })

    if (!error) {

      setFlyers(data)

    }

  }

  function resetForm() {

    setTitulo("")
    setDescripcion("")
    setDia("")
    setHora("")
    setOrden(1)

    setImageFile(null)
    setPreview("")

    setEditingFlyer(null)

  }

  async function handleDelete(id) {

    const confirmDelete =
      confirm("¿Eliminar flyer?")

    if (!confirmDelete) return

    await supabase
      .from("flyers")
      .delete()
      .eq("id", id)

    fetchFlyers()

  }

  function handleImageChange(e) {

    const file = e.target.files[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {

      alert("La imagen no puede superar 5MB")
      return

    }

    if (
      !file.type.includes("png") &&
      !file.type.includes("jpg") &&
      !file.type.includes("jpeg") &&
      !file.type.includes("webp")
    ) {

      alert("Formato inválido")
      return

    }

    setImageFile(file)

    setPreview(URL.createObjectURL(file))

    // RESET INPUT

    e.target.value = ""

  }

  async function uploadImage() {

    if (!imageFile) {

      return editingFlyer
        ? editingFlyer.image_url
        : preview

    }

    const fileName =
      `${Date.now()}-${imageFile.name}`

    const { error: uploadError } =
      await supabase.storage
        .from("flyers")
        .upload(fileName, imageFile)

    if (uploadError) {

      console.log(uploadError)

      alert(uploadError.message)

      return null

    }

    const { data } = supabase.storage
      .from("flyers")
      .getPublicUrl(fileName)

    return data.publicUrl

  }

  async function handleSaveFlyer() {

    if (
      !titulo ||
      !descripcion ||
      !dia ||
      !hora
    ) {

      alert("Completa todos los campos")
      return

    }

    setUploading(true)

    const imageUrl = await uploadImage()

    if (!imageUrl) {

      setUploading(false)
      return

    }

    if (editingFlyer) {

      const { error } = await supabase
        .from("flyers")
        .update({

          titulo,
          descripcion,
          dia,
          hora,
          orden: Number(orden),
          image_url: imageUrl

        })
        .eq("id", editingFlyer.id)

      if (error) {

        console.log(error)

        alert(error.message)

        setUploading(false)
        return

      }

    } else {

      const { error } = await supabase
        .from("flyers")
        .insert([

          {
            titulo,
            descripcion,
            dia,
            hora,
            orden: Number(orden),
            image_url: imageUrl,
            activo: true
          }

        ])

      if (error) {

        console.log(error)

        alert(error.message)

        setUploading(false)
        return

      }

    }

    resetForm()

    setShowForm(false)

    fetchFlyers()

    setUploading(false)

  }

  return (

    <PageWrapper>

      <section className="bg-black min-h-screen text-white">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-white/10"
        >

          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">

            <div>

              <p className="uppercase tracking-[5px] text-yellow-400 text-sm mb-2">
                CMS
              </p>

              <h1 className="text-5xl font-black">
                Flyers
              </h1>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => navigate("/admin")}
                className="
                  bg-white/10
                  border border-white/10
                  px-5 py-3
                  rounded-2xl
                  transition-all duration-300
                  hover:bg-white
                  hover:text-black
                  hover:scale-105
                "
              >

                Dashboard

              </button>

              <button
                onClick={() => {

                  resetForm()

                  setShowForm(!showForm)

                }}
                className="
                  bg-yellow-500
                  text-black
                  px-5 py-3
                  rounded-2xl
                  font-bold
                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-xl
                  hover:shadow-yellow-500/30
                "
              >

                {showForm ? "Cerrar" : "+ Nuevo Flyer"}

              </button>

            </div>

          </div>

        </motion.div>

        {/* FORM */}

        {showForm && (

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
              duration: 0.5
            }}

            className="max-w-4xl mx-auto px-6 pt-12"
          >

            <div className="
              bg-white/5
              border border-white/10
              rounded-[2rem]
              p-10
              backdrop-blur-xl
              shadow-2xl
              shadow-black/30
            ">

              <h2 className="text-4xl font-black mb-10">

                {editingFlyer
                  ? "Editar Flyer"
                  : "Nuevo Flyer"}

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="
                    bg-black/40
                    border border-white/10
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-yellow-400
                  "
                />

                <input
                  type="text"
                  placeholder="Día"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  className="
                    bg-black/40
                    border border-white/10
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-yellow-400
                  "
                />

                <input
                  type="text"
                  placeholder="Hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="
                    bg-black/40
                    border border-white/10
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-yellow-400
                  "
                />

                <input
                  type="number"
                  placeholder="Orden"
                  value={orden}
                  onChange={(e) =>
                    setOrden(Number(e.target.value))
                  }
                  className="
                    bg-black/40
                    border border-white/10
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-yellow-400
                  "
                />

                <label
                  className="
                    md:col-span-2
                    bg-black/40
                    border border-dashed border-white/10
                    rounded-2xl
                    p-10
                    cursor-pointer
                    flex flex-col items-center justify-center
                    text-gray-400
                    transition-all duration-300
                    hover:border-yellow-400
                    hover:bg-white/[0.03]
                  "
                >

                  <div className="text-5xl mb-4">
                    🖼️
                  </div>

                  <p className="text-xl font-bold mb-2">
                    Cambiar Imagen
                  </p>

                  <p className="text-sm text-gray-500">
                    JPG, PNG o WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              </div>

              {preview && (

                <motion.img
                  initial={{
                    opacity: 0,
                    scale: 0.96
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1
                  }}

                  transition={{
                    duration: 0.4
                  }}

                  src={preview}
                  alt="Preview"
                  className="
                    mt-8
                    w-full
                    max-h-[500px]
                    object-cover
                    rounded-3xl
                    border border-white/10
                  "
                />

              )}

              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="
                  w-full
                  mt-6
                  bg-black/40
                  border border-white/10
                  rounded-2xl
                  p-5
                  outline-none
                  min-h-[150px]
                  transition-all
                  duration-300
                  focus:border-yellow-400
                "
              />

              <button
                onClick={handleSaveFlyer}
                className="
                  mt-8
                  bg-yellow-500
                  text-black
                  px-8 py-4
                  rounded-2xl
                  font-black
                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-xl
                  hover:shadow-yellow-500/30
                "
              >

                {uploading
                  ? "Subiendo..."
                  : editingFlyer
                  ? "Actualizar Flyer"
                  : "Guardar Flyer"}

              </button>

            </div>

          </motion.div>

        )}

        {/* GRID */}

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {flyers.map((flyer, index) => (

              <motion.div
                key={flyer.id}

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
                  delay: index * 0.08
                }}

                whileHover={{
                  y: -8,
                  scale: 1.02
                }}

                className="
                  bg-white
                  text-black
                  rounded-[2rem]
                  overflow-hidden
                  shadow-2xl
                  transition-all duration-300
                "
              >

                <img
                  src={flyer.image_url}
                  alt={flyer.titulo}
                  className="
                    w-full
                    h-[500px]
                    object-cover
                  "
                />

                <div className="p-8">

                  <p className="uppercase tracking-[4px] text-yellow-500 text-sm mb-4 font-bold">
                    {flyer.dia}
                  </p>

                  <h2 className="text-4xl font-black mb-4 leading-tight">
                    {flyer.titulo}
                  </h2>

                  <p className="text-gray-500 text-xl mb-4">
                    {flyer.hora}
                  </p>

                  <p className="text-sm text-gray-400 mb-6">
                    Orden: {flyer.orden}
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    {flyer.descripcion}
                  </p>

                  <div className="flex gap-4">

                    <button
                      onClick={() => setEditingFlyer(flyer)}
                      className="
                        flex-1
                        bg-black
                        text-white
                        py-4
                        rounded-2xl
                        font-bold
                        hover:bg-yellow-500
                        hover:text-black
                        transition-all duration-300
                        hover:scale-105
                      "
                    >

                      Editar

                    </button>

                    <button
                      onClick={() => handleDelete(flyer.id)}
                      className="
                        bg-red-500
                        text-white
                        px-6
                        rounded-2xl
                        font-bold
                        transition-all duration-300
                        hover:bg-red-400
                        hover:scale-105
                      "
                    >

                      X

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </PageWrapper>

  )

}