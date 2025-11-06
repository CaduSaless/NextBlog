import { Metadata } from 'next';
import { News } from '@/components/news/allNews';
import { Fab } from '@/components/FAB'
import { Plus } from 'lucide-react';

// Metadados (Importante para SEO)
export const metadata = {
  title: 'Econect Blog',
  description: 'Welcome to the Econect Blog!',
};

function page() {
  return (
    <div className='w-full h-11/12'>
      {/* Botão para criar nova notícia */}
      <Fab href="/create-news">
        <Plus size={24} />
      </Fab>
      <News/>
    </div>
  );
}

export default page;