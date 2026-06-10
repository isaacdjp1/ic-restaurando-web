import Template3Navbar from "./Template3Navbar"
import Template3Hero from "./Template3Hero"
import Template3Services from "./Template3Services"
import Template3Flyers from "./Template3Flyers"
import Template3Live from "./Template3Live"
import Template3Gallery from "./Template3Gallery"
import Template3PrayerForm from "./Template3PrayerForm"
import Template3Footer from "./Template3Footer"

import "./template3.css"

export default function Template3() {
  return (
    <div className="template3">
      <Template3Navbar />
      <Template3Hero />
      <Template3Services />
      <Template3Flyers />
      <Template3Live />
      <Template3Gallery />
      <Template3PrayerForm />
      <Template3Footer />
    </div>
  )
}