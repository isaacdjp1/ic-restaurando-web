import { supabase } from "./supabase"

export async function getCurrentChurchId() {

  const {

    data: { user }

  } = await supabase.auth.getUser()

  if (!user) {

    return null

  }

  const { data, error } =
    await supabase

      .from("admins")

      .select("church_id")

      .eq(
        "email",
        user.email
      )

      .single()

  if (error) {

    console.log(
      "Church ID Error:",
      error
    )

    return null

  }

  return data.church_id

}