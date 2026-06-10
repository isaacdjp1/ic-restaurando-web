import { useState } from "react"
import emailjs from "@emailjs/browser"
import { supabase } from "../../lib/supabase"
import { getPublicChurch } from "../../lib/getPublicChurch"

export default function Template4PrayerForm() {

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

      const church =
        await getPublicChurch()

      if (!church) {

        alert("No se encontró la iglesia.")

        setLoading(false)

        return

      }

      const { error } = await supabase
        .from("peticiones")
        .insert(
          [
            {
              church_id: church.id,
              nombre: formData.nombre,
              email: formData.correo,
              telefono: formData.telefono,
              mensaje: formData.mensaje,
              estado: "Pendiente",
            },
          ],
          {
            returning: "minimal",
          }
        )

      if (error) {

        console.log(error)

        alert("Error guardando petición.")

        setLoading(false)

        return

      }

      await emailjs.send(
        import.meta.env
          .VITE_EMAILJS_SERVICE_ID,

        import.meta.env
          .VITE_EMAILJS_TEMPLATE_ID,

        {
          nombre: formData.nombre,
          email: formData.correo,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
        },

        import.meta.env
          .VITE_EMAILJS_PUBLIC_KEY
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

      alert(
        "Hubo un error al enviar la petición."
      )

    }

    setLoading(false)

  }

  return (

    <section
      id="oracion"
      className="
        bg-[#f8f8f8]
        py-32
        px-6
      "
    >

      <div className="max-w-6xl mx-auto">

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
            Oración
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-black
              mb-8
            "
            style={{
              fontFamily: "Montserrat",
            }}
          >
            Estamos Para Servirte
          </h2>

          <div
            className="
              w-24
              h-[3px]
              bg-[#C8A96B]
              mx-auto
              mb-8
            "
          />

          <p
            className="
              text-zinc-600
              text-lg
              max-w-3xl
              mx-auto
              leading-relaxed
            "
            style={{
              fontFamily: "Inter",
            }}
          >
            Comparte tu petición de oración con nuestro
            equipo pastoral. Estaremos acompañándote en
            fe y oración junto a tu familia.
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-[40px]
            border
            border-zinc-200
            p-8
            md:p-14
            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
          "
        >

          <form
            onSubmit={handleSubmit}
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            <div>

              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-zinc-300
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-[#C8A96B]
                  transition-all
                "
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
                className="
                  w-full
                  border
                  border-zinc-300
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-[#C8A96B]
                  transition-all
                "
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
                className="
                  w-full
                  border
                  border-zinc-300
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-[#C8A96B]
                  transition-all
                "
              />

              {errors.telefono && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.telefono}
                </p>
              )}

            </div>

            <div className="md:col-span-2">

              <textarea
                rows="7"
                name="mensaje"
                placeholder="Escribe tu petición de oración..."
                value={formData.mensaje}
                onChange={handleChange}
                maxLength={300}
                className="
                  w-full
                  border
                  border-zinc-300
                  rounded-2xl
                  p-4
                  resize-none
                  outline-none
                  focus:border-[#C8A96B]
                  transition-all
                "
              />

              <div className="flex justify-between mt-2">

                {errors.mensaje ? (
                  <p className="text-red-500 text-sm">
                    {errors.mensaje}
                  </p>
                ) : (
                  <span />
                )}

                <p className="text-zinc-500 text-sm">
                  {formData.mensaje.length}/300
                </p>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                md:col-span-2
                py-5
                rounded-2xl
                bg-[#C8A96B]
                text-white
                font-semibold
                hover:opacity-90
                transition-all
              "
            >
              {loading
                ? "Enviando..."
                : "Enviar Petición"}
            </button>

            {success && (

              <div className="md:col-span-2">

                <div
                  className="
                    mt-4
                    border
                    border-green-200
                    bg-green-50
                    rounded-[32px]
                    p-8
                    text-center
                  "
                >

                  <h3
                    className="
                      text-4xl
                      text-black
                      mb-4
                      font-bold
                    "
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    ¡Petición Enviada!
                  </h3>

                  <p className="text-zinc-600 mb-8">
                    Nuestro equipo estará orando por ti y tu familia.
                  </p>

                  <button
                    onClick={() =>
                      setSuccess(false)
                    }
                    className="
                      px-8
                      py-4
                      rounded-2xl
                      bg-black
                      text-white
                    "
                  >
                    OK
                  </button>

                </div>

              </div>

            )}

          </form>

        </div>

      </div>

    </section>

  )

}