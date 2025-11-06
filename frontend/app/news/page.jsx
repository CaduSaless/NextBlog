// app/news/page.jsx (Seu arquivo, refatorado)
import axios from "axios";
import { Message } from "@/components/news/message";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button'
import { cookies } from "next/headers"
import { checkAuth } from "@/utils/auth/checkAuth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

/**
 * Função auxiliar para buscar os dados da notícia.
 */
async function getNewsItem(id) {

  if (!id) {
    return { data: null, error: 'ID da notícia não fornecido.' };
  }
  
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    
    const newsItem = response.data?.[0]; 
    
    if (newsItem) {
      return { data: newsItem, error: null };
    } else {
      return { data: null, error: 'Notícia não encontrada.' };
    }

  } catch (error) {
    console.error('Error fetching news item:', error.message);
    return { data: null, error: 'Ocorreu um erro ao carregar a notícia.' };
  }
}

/**
 * Esta é a página de detalhes da notícia.
 */
export default async function NewsDetailsPage({ searchParams }) {
  const { id } = await searchParams;
  const { data: newsItem, error } = await getNewsItem(id);

  //Busca dos dados do usuário logado:
  const cookiesList = await cookies()
  const token = cookiesList.get('token_login')?.value
  const response = await checkAuth(token);
  const user = response.user;

  if (error) {
    return <Message text={error} />;
  }

  const imageUrl = newsItem.add_imagem;


  
  return (
    <article className="m-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
      
      <div className="relative h-64 w-full sm:h-96">
        <Image
          src={`/uploads/${imageUrl}`}
          alt={newsItem.titulo || 'Imagem da notícia'}
          fill
          sizes="(max-width: 768px) 100vw, 864px" 
          className="object-cover"
          priority 
        />
      </div>

      <div className="p-6 sm:p-10">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
          {newsItem.titulo}
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          {newsItem.resumo}
        </p>

        <div className="prose prose-lg max-w-none prose-img:rounded-lg prose-a:text-blue-600">
          
          <p className="whitespace-pre-wrap">{newsItem.corpo}</p>
        </div>
      </div>

      <div className="mb-2 mr-2 flex justify-end">
      { user.id === newsItem.autor_id && (

        <Link
          href={ `/edit-news?id=${newsItem.id}` }>
          <Button
          variant="secondary"
          disabled={ false }
          >
            Editar
          </Button>
        </Link>
      )}
      </div>
    </article>
  );
}
