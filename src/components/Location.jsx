export default function Location() {
  return (

    <div>

      <h3 className="text-3xl font-black mb-6 text-white">
        Ubicación
      </h3>

      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
        Cra 13 #43-74 <br />
        Barranquilla, Colombia
      </p>

      <a
        href="https://maps.app.goo.gl/ADvBsyRNeZjzGnq47?g_st=ic"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-white transition"
      >

        Cómo llegar

      </a>

      <div className="mt-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-md">

        <iframe
          title="Nuestra Ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.7279803529836!2d-74.78135539986744!3d10.90826569616856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef5d3dc085e9b39%3A0x6dcfcaccf97b6fc!2sIGLESIA%20CRISTIANA%20RESTAURANDO%20EL%20ALTAR%20FAMILIAR!5e0!3m2!1sen!2sca!4v1778989505731!5m2!1sen!2sca"
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>

    </div>

  )
}