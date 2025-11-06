
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export async function checkAuth(token) {
  if(!token) {
    return {status: "401", message: "Not has token"};
  }

  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: "GET",
      headers: {
        Cookie: `token_login=${token}`
      },
      credentials: "include",
      cache: "no-store"
    });
    let user;
    if (response.status === 201) {
      user = await response.json()
      return {status: "201", user: user};
    }
  } catch(err) {
    return {status: "401", message: err};
  }  
}