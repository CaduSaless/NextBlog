'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button'
import { redirect } from 'next/navigation';

/**
 * Um componente de card reutilizável que renderiza um item da lista de notícias.
*/
export function NewsCard({ newsItem, user='' }) {
  
  const handleEdit = () => {
    redirect(`/edit-news?id=${newsItem.id}`)
  }

  
  const imageUrl = `/uploads/${newsItem.add_imagem}`
  
  return (
    <li className="w-full list-none overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link
        href={`/news/?id=${newsItem.id}`}
        className="flex border border-gray-200"
      >
        <div className="relative h-28 w-28 shrink-0">
          <Image
            src={imageUrl}
            alt={newsItem.titulo || 'Imagem da notícia'}
            fill 
            sizes="112px"
            className="object-cover" 
          />
        </div>

        <div className="ml-px flex flex-col justify-center gap-1 p-4">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-blue-600">
            {newsItem.titulo}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {newsItem.resumo}
          </p>
        </div>
      </Link>
    </li>
  );
}
