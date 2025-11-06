// src/components/newsComponent/Form.jsx (Seu arquivo, refatorado)
'use client';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/form/inputForm';
import { FormTextarea } from '@/components/form/textAreaInput';
import { Button } from '@/components/button';
import { FormError } from '@/components/form/error';

const API_URL = 'http://localhost:5001'


/** 
 * Componente formulário para a criação de novas notícias
 */
export function Form(props) {
  // Se 'props.novo' for true, é um formulário de criação.
  // Se for false, é de edição e usamos os dados de 'props'.
  const isNew = props.novo || false;
  const author = props.user?.id || null;
  
  const router = useRouter();

  const [title, setTitle] = useState(props.titulo || '');
  const [resume, setResume] = useState(props.resumo || '');
  const [body, setBody] = useState(props.corpo || '');
  const [imageFile, setImageFile] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title || !resume || !body) {
      setFormError('Por favor, preencha todos os campos (Título, Resumo, Corpo).');
      return;
    }
    
    setIsSubmitting(true);
    setFormError(null);
    
    const payloadForm = new FormData();
    payloadForm.append('title', title);
    payloadForm.append('resume', resume);
    payloadForm.append('body', body);
    payloadForm.append('author', author)
    
    // Só anexa a imagem se uma nova foi selecionada
    if (imageFile) {
      payloadForm.append('add_image', imageFile);
    }

    try {
      let response;
      if (isNew) { //Novo post
        response = await axios.post(`${API_URL}/news/`, payloadForm);
      } else { //Edidar post
        response = await axios.put(`${API_URL}/news/${props.id}/`, payloadForm);
      }

      alert(`Notícia ${isNew ? 'criada' : 'atualizada'} com sucesso!`);
      router.push('/'); 
      router.refresh(); 
      
    } catch (err) {
      console.log('Falha ao enviar formulário:', err);
      setFormError(err.response?.data?.message || `Ocorreu um erro. Tente novamente.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta notícia? Esta ação é irreversível.")) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    try {
      await axios.delete(`${API_URL}/news/${props.id}/`);
      alert("Notícia deletada com sucesso.");
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Falha ao deletar:', err);
      setFormError(err.response?.data?.message || 'Ocorreu um erro ao deletar.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>{isNew ? "Criar Nova Notícia" : "Editar Notícia"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <FormInput
          label="Título:"
          id="titulo"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <FormTextarea
          label="Resumo:"
          id="resumo"
          name="resume"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
        />
        
        <FormTextarea
          label="Corpo:"
          id="corpo"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          required
        />
        
        <FormInput
          label={isNew ? "Imagem de Destaque:" : "Substituir Imagem (Opcional):"}
          id="imagem"
          name="add_image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border-none p-0 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-gray-200"
          
        />

        <FormError message={formError} />

        <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          {!isNew && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              Deletar Notícia
            </Button>
          )}
          
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="sm:ml-auto" 
          >
            {isNew ? 'Criar Notícia' : 'Salvar Alterações'}
          </Button>
        </div>

      </form>
    </div>
  );
}