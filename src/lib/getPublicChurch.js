import { supabase } from "./supabase"

export async function getPublicChurch() {

  let domain =
    window.location.hostname

  if (
    domain === "localhost" ||
    domain === "127.0.0.1"
  ) {

    domain =
      "restaurandoelaltar.com"

  }

  const { data, error } =
    await supabase

      .from("churches")

      .select("*")

      .eq(
        "domain",
        domain
      )

      .single()

      console.log("DOMAIN:", domain)
      console.log("DATA:", data)
      console.log("ERROR:", error)

  if (error) {

    console.log(
      "Public Church Error:",
      error
    )

    return null

  }

  return data

}