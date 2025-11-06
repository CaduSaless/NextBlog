import { LoginForm } from '@/components/form/formLogin';
import { cookies } from "next/headers"
import { redirect } from 'next/navigation';
import { checkAuth } from "@/utils/auth/checkAuth"

/**
 * Página de Login do usuário
 */
export default async function NewLogin() {
  //Verificação se usuário já está logado
  const cookiesList = await cookies()
  const token = cookiesList.get('token_login')?.value
  const response = await checkAuth(token);
  if(response.status === 201) {
    redirect("/");
  
  }

  return (
    <div>
      <LoginForm novo={ true } />
    </div>
  );
}