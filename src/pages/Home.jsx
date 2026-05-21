import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Flyers from "../components/Flyers"
import Live from "../components/Live"
import PrayerForm from "../components/PrayerForm"
import Footer from "../components/Footer"
import Gallery from "../components/Gallery"
import CookieBanner from "../components/CookieBanner"

export default function Home() {

  return (

    <div className="overflow-hidden">

      <Navbar />
      <CookieBanner />
      <Hero />
      <Services />
      <Flyers />
      <Live />
      <Gallery />
      <PrayerForm />
      <Footer />

    </div>

  )

}