'use server'
import { cookies } from "next/headers";


export async function Logout() {
  const cookiesList = await cookies()
  cookiesList.delete('token_login')
  console.log(cookiesList)
  return
}