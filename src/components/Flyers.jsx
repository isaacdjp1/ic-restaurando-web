import { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

import ViernesImg from "../assets/images/Eventodamas.webp"
import SabadoImg from "../assets/images/Domingo.webp"
import DomingoImg from "../assets/images/Martes.webp"

const flyers = [
  {
    title: "Mujeres Indetenibles",
    day: "Sábado",
    time: "4:30 PM - 6:30 PM",

    description:
      "Un espacio especial donde las mujeres pueden fortalecer su fe, compartir experiencias, crecer espiritualmente y descubrir el propósito de Dios para sus vidas en una comunidad llena de amor y apoyo.",

    image: ViernesImg,
  },

  {
    title: "Escuela Dominical",
    day: "Domingo",
    time: "8:00 AM - 11:30 PM",

    description:
      "Nuestra reunión principal de domingo donde toda la familia se reúne para adorar, aprender y compartir juntos.",

    image: SabadoImg,
  },

  {
    title: "Formación de liderazgo",
    day: "Martes",
    time: "7:00 PM - 8:30 PM",

    description:
      "Un tiempo de formación y crecimiento espiritual diseñado para preparar líderes comprometidos con el llamado de Dios. Cada encuentro es una oportunidad para aprender, servir y fortalecer el propósito ministerial en una atmósfera de fe y enseñanza.",

    image: DomingoImg,
  },
]
