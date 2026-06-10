import { useEffect, useState } from "react"

export default function Template3CookieBanner() {
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
        max-w-4xl
      "
    >
      <div
        className="
          bg-slate-900/90
          backdrop-blur-2xl
          border
          border-blue-500/20
          rounded-[32px]
          overflow-hidden
          shadow-[0_0_50px_rgba(37,99,235,0.20)]
        "
      >

        <div
          className="
            h-1
            bg-gradient-to-r
            from-blue-500
            via-violet-500
            to-blue-500
          "
        />

        <div className="p-6 md:p-8">

          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-center
              gap-6
            "
          >

            <div className="flex-1">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  px-4
                  py-2
                  rounded-full
                  mb-4
                "
              >
                <span>🍪</span>

                <span
                  className="
                    text-blue-300
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    font-semibold
                  "
                >
                  Privacidad
                </span>
              </div>

              <h3
                className="
                  text-2xl
                  md:text-3xl
                  text-white
                  mb-3
                  font-bold
                "
                style={{
                  fontFamily:
                    "Space Grotesk",
                }}
              >
                Utilizamos Cookies
              </h3>

              <p
                className="
                  text-slate-300
                  leading-relaxed
                "
              >
                Utilizamos cookies y tecnologías
                similares para mejorar la experiencia,
                optimizar el rendimiento y ofrecer un
                sitio más rápido y personalizado.
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
                  rounded-2xl
                  border
                  border-slate-700
                  text-slate-300
                  hover:border-slate-500
                  hover:bg-slate-800
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
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-violet-600
                  text-white
                  font-semibold
                  hover:scale-105
                  transition-all
                  shadow-[0_0_25px_rgba(124,58,237,0.35)]
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