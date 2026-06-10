import { useEffect, useState } from "react"

export default function Template2CookieBanner() {
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
        max-w-3xl
        bg-white/95
        backdrop-blur-2xl
        border
        border-zinc-200
        rounded-[32px]
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          items-center
          gap-6
        "
      >
        <div className="flex-1">

          <h3
            className="
              text-2xl
              text-black
              mb-2
            "
            style={{
              fontFamily:
                "Instrument Serif",
            }}
          >
            Utilizamos Cookies
          </h3>

          <p
            className="
              text-zinc-600
              leading-relaxed
            "
          >
            Esta página utiliza cookies y tecnologías
            similares para mejorar la experiencia del
            usuario y optimizar el funcionamiento del sitio.
          </p>

        </div>

        <div
          className="
            flex
            gap-3
            w-full
            md:w-auto
          "
        >
          <button
            onClick={rejectCookies}
            className="
              flex-1
              md:flex-none
              px-6
              py-3
              rounded-full
              border
              border-zinc-300
              text-black
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
              md:flex-none
              px-8
              py-3
              rounded-full
              bg-black
              text-white
              hover:opacity-90
              transition-all
            "
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  )
}