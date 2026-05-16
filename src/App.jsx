import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Flyers from "./components/Flyers"
import Live from "./components/Live"
import PrayerForm from "./components/PrayerForm"
import Gallery from "./components/Gallery"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Flyers />
      <Live />
      <Gallery />
      <PrayerForm />
      <Footer />
    </>
  )
}