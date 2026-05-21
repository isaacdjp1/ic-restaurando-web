import { useState } from "react"
import emailjs from "@emailjs/browser"
import { supabase } from "../lib/supabase"

export default function PrayerForm() {

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  })

  const [errors, setErrors] = useState({})

  const [success, setSuccess] = useState(false)

  const [loading, setLoading] = useState(false)

  const regex = {
    nombre: /^[A-Za-zÀ-ÿ\s]{3,40}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^[0-9+\-\s]{7,20}$/,
  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const validate = () => {

    let newErrors = {}

    if (!regex.nombre.test(formData.nombre)) {

      newErrors.nombre =
        "Ingresa un nombre válido."

    }

    if (!regex.correo.test(formData.correo)) {

      newErrors.correo =
        "Ingresa un correo válido."

    }

    if (
      formData.telefono &&
      !regex.telefono.test(formData.telefono)
    ) {

      newErrors.telefono =
        "Ingresa un teléfono válido."

    }

    if (formData.mensaje.trim().length < 15) {

      newErrors.mensaje =
        "La petición debe tener mínimo 15 caracteres."

    }

    if (formData.mensaje.length > 300) {

      newErrors.mensaje =
        "Máximo 300 caracteres."

    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {

      // GUARDAR EN SUPABASE

      const { data, error } = await supabase
        .from("peticiones")
        .insert([
          {
            nombre: formData.nombre,
            email: formData.correo,
            telefono: formData.telefono,
            mensaje: formData.mensaje,
            estado: "Pendiente",
          },
        ])
        .select()

      console.log("SUPABASE DATA:", data)
      console.log("SUPABASE ERROR:", error)

      if (error) {

        console.log(error)

        alert("Error guardando petición.")

        setLoading(false)

        return

      }

      // ENVIAR EMAIL

      await emailjs.send(
        "service_g0m7var",
        "template_t67hst9",
        {
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
        },
        "2ybHwBiiCoPmaIxNe"
      )

      setSuccess(true)

      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
      })

      setErrors({})

    } catch (error) {

      console.log(error)

      alert("Hubo un error al enviar la petición.")

    }

    setLoading(false)

  }

  return (

    <section
      id="oracion"
      className="bg-gradient-to-br from-yellow-400 to-yellow-600 py-24 px-6"
    >

      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl p-10 md:p-16">

        <div className="text-center mb-12">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-4">
            Peticiones
          </p>

          <h2 className="text-5xl font-black mb-6">
            ¿Necesitas oración?
          </h2>

          <p className="text-gray-600 text-lg">
            Nuestro Grupo de Oración estará orando por ti y tu familia.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <div>

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="bg-gray-100 rounded-2xl p-4 outline-none w-full"
            />

            {errors.nombre && (
              <p className="text-red-500 text-sm mt-2">
                {errors.nombre}
              </p>
            )}

          </div>

          <div>

            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="bg-gray-100 rounded-2xl p-4 outline-none w-full"
            />

            {errors.correo && (
              <p className="text-red-500 text-sm mt-2">
                {errors.correo}
              </p>
            )}

          </div>

          <div className="md:col-span-2">

            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="bg-gray-100 rounded-2xl p-4 outline-none w-full"
            />

            {errors.telefono && (
              <p className="text-red-500 text-sm mt-2">
                {errors.telefono}
              </p>
            )}

          </div>

          <div className="md:col-span-2">

            <textarea
              rows="6"
              name="mensaje"
              placeholder="Escribe tu petición de oración..."
              value={formData.mensaje}
              onChange={handleChange}
              maxLength={300}
              className="bg-gray-100 rounded-2xl p-4 outline-none w-full"
            ></textarea>

            <div className="flex justify-between mt-2">

              {errors.mensaje ? (
                <p className="text-red-500 text-sm">
                  {errors.mensaje}
                </p>
              ) : (
                <span></span>
              )}

              <p className="text-gray-400 text-sm">
                {formData.mensaje.length}/300
              </p>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-4 rounded-2xl hover:bg-yellow-500 hover:text-black transition md:col-span-2"
          >

            {loading ? "Enviando..." : "Enviar Petición"}

          </button>

          {success && (

            <div className="md:col-span-2 flex justify-center">

              <div className="bg-green-100 border border-green-300 rounded-3xl p-8 w-full text-center shadow-lg">

                <h3 className="text-3xl font-black mb-4 text-black">
                  ¡Petición Enviada!
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Nuestro Grupo de Oración estará orando por ti y tu familia.
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold transition w-full"
                >

                  OK

                </button>

              </div>

            </div>

          )}

        </form>

      </div>

    </section>

  )

}