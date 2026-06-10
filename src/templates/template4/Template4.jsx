import Template4Navbar from "./Template4Navbar"
import Template4Hero from "./Template4Hero"
import Template4Services from "./Template4Services"
import Template4Flyers from "./Template4Flyers"
import Template4Live from "./Template4Live"
import Template4Gallery from "./Template4Gallery"
import Template4PrayerForm from "./Template4PrayerForm"
import Template4Footer from "./Template4Footer"
import Template4CookieBanner from "./Template4CookieBanner"

import "./template4.css"

export default function Template4() {

  return (

    <div className="template4">

      <Template4Navbar />

      <Template4Hero />

      <Template4Services />

      <Template4Flyers />

      <Template4Live />

      <Template4Gallery />

      <Template4PrayerForm />

      <Template4Footer />

      <Template4CookieBanner />

    </div>

  )

}