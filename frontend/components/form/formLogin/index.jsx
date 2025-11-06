'use client';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/form/inputForm';
import { Button } from '@/components/button';
import { FormError } from '@/components/form/error';

const API_URL = 'http://localhost:5001'


/**
 * Componente formulário para Login
 */
export function LoginForm({ novo }) {
  const isNew = novo || false;

  const router = useRouter();
  
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !senha) {
      setFormError('Por favor, preencha todos os campos (Email, Senha).');
      return;
    }
    setIsSubmitting(true);
    setFormError(null);
    
    const payloadForm = new FormData();
    payloadForm.append('email', email);
    payloadForm.append('senha', senha);
    
    try {
      let response;
      if (isNew) {
        payloadForm.append('nome', nome);
        response = await axios.post(`${API_URL}/auth/new`, payloadForm, {
          withCredentials: true
        });
      } else {
        response = await axios.post(`${API_URL}/auth/login`, payloadForm, {
          withCredentials: true
        });
      }

      alert(`Login ${isNew ? 'criado' : 'efetuado'} com sucesso!`);
      router.replace('/');
      router.refresh()
      
    } catch (err) {
      console.log('Falha ao enviar formulário:', err);
      setFormError(err.response?.data?.message || `Ocorreu um erro. Tente novamente.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-auto max-w-2xl rounded-lg bg-white p-10 shadow-md">
      <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        
        <FormInput
          label="Email:"
          id="email"
          name="email"
          type="email"
          value={email}
          className="p-0.5 pl-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <FormInput
          label="Senha:"
          id="senha"
          name="senha"
          value={senha}
          type="password"
          className="p-0.5 pl-2"
          onChange={(e) => setSenha(e.target.value)}
          
        />

        {isNew && (
          <FormInput
          label="Nome:"
          id="nome"
          name="nome"
          value={nome}
          className="p-0.5 pl-2"
          onChange={(e) => setNome(e.target.value)}
          />
        )}

        <FormError message={formError} />

        <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          {!isNew ?
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.replace('/login/new')}
              disabled={isSubmitting}
              >
              Criar uma Conta
            </Button> :
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.replace('/login/')}
              disabled={isSubmitting}
              >
              Entrar em conta já existente
            </Button>}
          
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="ml-auto"
          >
            {isNew ? 'Criar Login' : 'Entrar'}
          </Button>
        </div>

      </form>
    </div>
  );
}