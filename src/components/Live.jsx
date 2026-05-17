export default function Live() {
  return (
    <section
      id="envivo"
      className="bg-black text-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-yellow-400 mb-4">
            En Vivo
          </p>

          <h2 className="text-5xl font-black mb-6">
            Transmisiones Online
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">

            Conéctate con nosotros cada viernes y domingo
            en nuestras transmisiones en vivo.

          </p>

        </div>

        {/* Live Container */}

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Video */}

          <div className="rounded-[35px] overflow-hidden shadow-2xl border border-white/10">

            <div className="aspect-video">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Wdlts_up0z0"
                title="YouTube Live"
                allowFullScreen
              ></iframe>

            </div>

          </div>

          {/* Info */}

          <div>

            <div className="flex items-center gap-3 mb-6">

              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>

              <p className="uppercase tracking-[4px] text-red-400 font-semibold">

                Estamos En Vivo

              </p>

            </div>

            <h3 className="text-5xl font-black leading-tight mb-8">

              Vive cada servicio
              desde cualquier lugar.

            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">

              Sé parte de cada reunión, palabra y momento
              de adoración a través de nuestras transmisiones online.

            </p>

            <a
              href="https://www.youtube.com/@restaurandoeaf"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-2xl font-bold transition duration-300 text-lg"
            >

              Ver Canal de YouTube

            </a>

          </div>

        </div>

      </div>

    </section>
  )
}