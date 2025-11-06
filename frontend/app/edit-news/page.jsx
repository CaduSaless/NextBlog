import { Form } from '@/components/form/formPost';
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { checkAuth } from "@/utils/auth/checkAuth"
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

/**
 * Pagina de edição de notícias já existentes
 */
export default async function editarNoticia({ searchParams }) {
  //Buscar dados do usuário
  const cookiesList = await cookies()
  const token = cookiesList.get('token_login')?.value
  let response = await checkAuth(token);
  const user = response.user;

  if(response.status != 201) { // Usuário não logado
    redirect("/login");
  }

  //Buscar dados da notícia
  const { id } = await searchParams;
  try {
    response = await axios.get(`${API_URL}/news/${id}`);
  } catch (error) {
    console.error('Error fetching news item for editing:', error);
    return <div>Error loading news item.</div>;
  }

  
  response = response.data[0];
  return (
    <div>
      <Form novo={ false } user={ user }  titulo={response.titulo} resumo={response.resumo} corpo={response.corpo} id={ id } />
    </div>
  );
}