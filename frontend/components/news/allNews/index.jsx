import axios from 'axios';
import { NewsCard } from '@/components/news/newsCard';
import { Message } from '@/components/news/message';
import { checkAuth } from '@/utils/auth/checkAuth';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'


/*
 * Component que reúne as notícias na home da aplicação 
 */

export async function News() { 
  const cookiesList = await cookies()
  const token = cookiesList.get('token_login')?.value
  let response = await checkAuth(token);
  const user = response.user;

  let allNews = null;
  let error = null;

  try {
    const response = await axios.get(`${API_URL}/news`);
    allNews = response.data;
  } catch (err) {
    console.error('Error fetching news:', err);
    error = 'Ocorreu um erro ao carregar as notícias...';
  }

  if (error) {
    return <Message text={error} />;
  }

  if (!allNews || allNews.length === 0) {
    return <Message text="Não há notícias publicadas." />;
  }

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>TODAS AS NOTÍCIAS</h1>
      
      <ul className='flex w-full flex-col gap-4'>
        {allNews.map((newsItem) => (
          <NewsCard newsItem={newsItem} user={user.id} key={newsItem.id} />
        ))}
      </ul>
    </>
  );
}


