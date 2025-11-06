import { Form } from '@/components/form/formPost';
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { checkAuth } from "@/utils/auth/checkAuth"


export default async function novaNoticia() {
  //Buscar dados do usuário
  const cookiesList = await cookies()
  const token = cookiesList.get('token_login')?.value
  const response = await checkAuth(token);
  const user = response.user;

  if(response.status != 201) { //Usuário não logado
    redirect("/login");
  }


  
  return (
    <div>
      <Form novo={ true } user={ user } />
    </div>
  );
}