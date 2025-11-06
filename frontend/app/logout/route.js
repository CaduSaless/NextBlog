import axios from "axios";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export async function GET() {
  try {
    await axios.get(`${API_URL}/logout`, {
      withCredentials: true
    });
  } catch (err) {
    console.error(err);
  }
  redirect('/')
  return new Response(null, { status: 200 });
}
