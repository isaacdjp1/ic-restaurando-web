import { useEffect, useState } from "react"

export default function CookieBanner() {

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
        max-w-2xl
        bg-black/90
        backdrop-blur-xl
        border
        border-white/10
        rounded-[30px]
        p-6
        shadow-2xl
      "
    >

      <div className="flex flex-col md:flex-row items-center gap-6">

        <div className="flex-1">

          <p className="text-white text-lg font-semibold mb-2">

            Utilizamos Cookies

          </p>

          <p className="text-gray-400 text-sm leading-relaxed">

            Esta página utiliza cookies y tecnologías similares
            para mejorar la experiencia del usuario y el funcionamiento del sitio web.

          </p>

        </div>

        <div className="flex gap-3 w-full md:w-auto">

          <button
            onClick={rejectCookies}
            className="
              flex-1 md:flex-none
              bg-white/10
              hover:bg-white/20
              text-white
              font-semibold
              px-6
              py-4
              rounded-2xl
              transition-all
              duration-300
            "
          >

            Rechazar

          </button>

          <button
            onClick={acceptCookies}
            className="
              flex-1 md:flex-none
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              px-8
              py-4
              rounded-2xl
              transition-all
              duration-300
            "
          >

            Aceptar

          </button>

        </div>

      </div>

    </div>

  )

}