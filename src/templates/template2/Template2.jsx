import Template2Navbar from "./Template2Navbar"
import Template2Hero from "./Template2Hero"
import Template2Services from "./Template2Services"
import Template2Flyers from "./Template2Flyers"
import Template2LiveStreams from "./Template2Live"
import Template2Gallery from "./Template2Gallery"
import Template2PrayerForm from "./Template2PrayerForm"
import Template2Footer from "./Template2Footer"
import Template2CookieBanner from "./Template2CookieBanner"

import "./template2.css"

export default function Template2() {
  return (
    <div className="template2">
      <Template2Navbar />
      <Template2Hero />
      <Template2Services />
      <Template2Flyers />
      <Template2LiveStreams />
      <Template2Gallery />
      <Template2PrayerForm />
      <Template2Footer />
      <Template2CookieBanner />
    </div>
  )
}