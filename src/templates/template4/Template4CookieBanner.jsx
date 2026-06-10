import { useEffect, useState } from "react"

export default function Template4CookieBanner() {

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {

    const cookieChoice =
      localStorage.getItem("cookieConsent")

    if (!cookieChoice) {

      setShowBanner(true)

    }

  }, [])

  function acceptCookies() {

    localStorage.setItem(
      "cookieConsent",
      "accepted"
    )

    setShowBanner(false)

  }

  function rejectCookies() {

    localStorage.setItem(
      "cookieConsent",
      "rejected"
    )

    setShowBanner(false)

  }

  if (!showBanner) return null

  return (

    <div
      className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        z-[999]
        w-[95%]
        max-w-5xl
      "
    >

      <div
        className="
          bg-white
          border
          border-zinc-200
          rounded-[24px]
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
      >

        <div
          className="
            h-1
            bg-[#C8A96B]
          "
        />

        <div className="p-8">

          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-center
              gap-8
            "
          >

            <div className="flex-1">

              <span
                className="
                  inline-flex
                  items-center
                  px-4
                  py-2
                  rounded-full
                  bg-[#C8A96B]/10
                  text-[#C8A96B]
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  mb-4
                "
              >
                Política de Cookies
              </span>

              <h3
                className="
                  text-2xl
                  md:text-3xl
                  text-black
                  font-bold
                  mb-3
                "
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                Tu privacidad es importante
              </h3>

              <p
                className="
                  text-zinc-600
                  leading-relaxed
                "
              >
                Utilizamos cookies para mejorar la experiencia
                de navegación, optimizar el funcionamiento del
                sitio y ofrecer contenido relevante para nuestros visitantes.
              </p>

            </div>

            <div
              className="
                flex
                gap-3
                w-full
                lg:w-auto
              "
            >

              <button
                onClick={rejectCookies}
                className="
                  flex-1
                  lg:flex-none
                  px-6
                  py-4
                  rounded-xl
                  border
                  border-zinc-300
                  text-zinc-700
                  hover:bg-zinc-100
                  transition-all
                "
              >
                Rechazar
              </button>

              <button
                onClick={acceptCookies}
                className="
                  flex-1
                  lg:flex-none
                  px-8
                  py-4
                  rounded-xl
                  bg-[#C8A96B]
                  text-white
                  font-semibold
                  hover:opacity-90
                  transition-all
                "
              >
                Aceptar
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}