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
  const [successMessage, setSuccessMessage] = useState("")

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

    fetchFlyers()

setUploading(false)

setSuccessMessage(

  editingFlyer
    ? "Flyer actualizado correctamente"
    : "Flyer creado correctamente"

)

setTimeout(() => {

  setSuccessMessage("")

}, 1800)

setTimeout(() => {

  resetForm()

  setShowForm(false)

}, 2200)
  }

  return (

    <PageWrapper>

      <section className="bg-[#f5f5f7] min-h-screen text-[#111111]">

        {successMessage && (

       <motion.div

      initial={{
      opacity: 0,
      y: -30
      }}

      animate={{
      opacity: 1,
      y: 0
      }}

      exit={{
      opacity: 0
      }}

      className="
      fixed
      top-6
      left-1/2
      -translate-x-1/2
      z-[999]
      bg-black
      text-white
      px-8
      py-5
      rounded-2xl
      font-semibold
      shadow-lg
    "
  >

    {successMessage}

  </motion.div>

)}

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-[#e5e5e5]"
        >

          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">

            <div>

              <p className="uppercase tracking-[5px] text-[#8e8e93] text-sm mb-2">
                CMS
              </p>

              <h1 className="text-5xl font-semibold tracking-[-2px]">
                Flyers
              </h1>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => navigate("/admin")}
                className="
                  bg-white
                  border border-[#dcdcdc]
                  px-5 py-3
                  rounded-2xl
                  transition-all duration-300
                  text-[#111111]
                  hover:bg-[#f2f2f2]
                  shadow-sm
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
                  bg-black
                  text-white
                  px-5 py-3
                  rounded-2xl
                  font-semibold
                  transition-all duration-300
                  hover:bg-[#1c1c1e]
                  shadow-sm
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
             bg-white
             border border-[#e5e5e5]
             rounded-[32px]
             p-10
             shadow-sm
            ">

              <h2 className="text-4xl font-semibold tracking-[-1px] mb-10">

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
                    bg-[#f7f7f7]
                   border border-[#dcdcdc]
                   text-[#111111]
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#bdbdbd]
                  "
                />

                <input
                  type="text"
                  placeholder="Día"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  className="
                    bg-[#f7f7f7]
                    border border-[#dcdcdc]
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#bdbdbd]
                  "
                />

                <input
                  type="text"
                  placeholder="Hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="
                    bg-[#f7f7f7]
                    border border-[#dcdcdc]
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#bdbdbd]
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
                    bg-[#f7f7f7]
                    border border-[#dcdcdc]
                    rounded-2xl
                    p-5
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#bdbdbd]
                  "
                />

                <label
                  className="
                    md:col-span-2
                    bg-[#f7f7f7]
                   border border-dashed border-[#dcdcdc]
                   text-[#111111]
                    rounded-2xl
                    p-10
                    cursor-pointer
                    flex flex-col items-center justify-center
                    text-[#6e6e73]
                    transition-all duration-300
                    hover:border-[#bdbdbd]
                    hover:bg-[#fafafa]
                  "
                >

                  <div className="text-4xl mb-4">
                    🖼️
                  </div>

                  <p className="text-lg font-semibold mb-2">
                    Cambiar Imagen
                  </p>

                  <p className="text-sm text-[#6e6e73]">
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
                    border border-[#e5e5e5]
                    shadow-sm
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
                  bg-[#f7f7f7]
                  border border-[#dcdcdc]
                  rounded-2xl
                  p-5
                  outline-none
                  min-h-[150px]
                  transition-all
                  duration-300
                  focus:border-[#bdbdbd]
                "
              />

              <button
                onClick={handleSaveFlyer}
                className="
                  mt-8
                  bg-black
                  text-white
                  px-8 py-4
                  rounded-2xl
                  font-semibold
                  transition-all duration-300
                  hover:bg-[#1c1c1e]
                  shadow-sm
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
                 y: -4
                 }}

                className="
                  bg-white
                 text-[#111111]
                 rounded-[32px]
                 overflow-hidden
                 border border-[#e5e5e5]
                 shadow-sm
                  transition-all duration-300
                "
              >

                <img
                  src={flyer.image_url}
                  alt={flyer.titulo}
                  className="
                    w-full
                    h-[420px]
                    object-cover
                  "
                />

                <div className="p-8">

                  <p className="uppercase tracking-[4px] text-[#8e8e93] font-medium text-sm mb-4 font-semibold">
                    {flyer.dia}
                  </p>

                  <h2 className="text-3xl font-semibold tracking-[-1px] mb-4 leading-tight">
                    {flyer.titulo}
                  </h2>

                  <p className="text-[#6e6e73] text-lg mb-4">
                    {flyer.hora}
                  </p>

                  <p className="text-sm text-[#8e8e93] mb-6">
                    Orden: {flyer.orden}
                  </p>

                  <p className="text-[#6e6e73] leading-relaxed mb-8">
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
                        font-semibold
                        hover:bg-[#1c1c1e]
                        transition-all duration-300
                        hover:opacity-90
                      "
                    >

                      Editar

                    </button>

                    <button
                      onClick={() => handleDelete(flyer.id)}
                      className="
                        bg-[#ff3b30]
                        text-white
                        px-6
                        rounded-2xl
                        font-semibold
                        transition-all duration-300
                        hover:bg-[#ff453a]
                        hover:opacity-90
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