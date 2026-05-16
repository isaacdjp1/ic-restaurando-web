export default function LiveStreams() {
  return (
    <section id="envivo" className="bg-gray-100 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-4">
            En Vivo
          </p>

          <h2 className="text-5xl font-black mb-6">
            Transmisiones en Vivo
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Conéctate a nuestros servicios en vivo cada viernes y domingo
            desde cualquier lugar del mundo.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Viernes */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">

            <div className="aspect-video">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/live_stream?channel=TU_CANAL_ID"
                title="Servicio Viernes"
                allowFullScreen
              ></iframe>

            </div>

            <div className="p-8">

              <p className="text-yellow-500 uppercase tracking-[3px] mb-3">
                Viernes
              </p>

              <h3 className="text-3xl font-black mb-4">
                Servicio Congregacional
              </h3>

              <p className="text-gray-600 text-lg">
                Todos los viernes • 7:00 PM - 9:00 PM
              </p>

            </div>

          </div>

          {/* Domingo */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">

            <div className="aspect-video">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/live_stream?channel=TU_CANAL_ID"
                title="Servicio Domingo"
                allowFullScreen
              ></iframe>

            </div>

            <div className="p-8">

              <p className="text-yellow-500 uppercase tracking-[3px] mb-3">
                Domingo
              </p>

              <h3 className="text-3xl font-black mb-4">
                Escuela Dominical
              </h3>

              <p className="text-gray-600 text-lg">
                Todos los domingos • 9:00 AM - 12:00 PM
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}