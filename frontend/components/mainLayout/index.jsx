
import Link from "next/link";
import { Button } from "@/components/button"
import { cookies } from "next/headers";
import { checkAuth } from '@/utils/auth/checkAuth'

// Header e Footer
async function Header() {
  const cookiesList = await cookies()
  const token = cookiesList.get('token_login')?.value
  const response = await checkAuth(token);
  let user;
  let LoginButton = 'Login'
  if (response.status === '201') {
    user = response.user;
    LoginButton = 'Logout'
  }
  
  return (
    <header className="w-full bg-white p-4 shadow-md">
      <nav className="mx-auto max-w-7xl flex justify-between">
        <Link href={'/'}>
          <h1 className="text-2xl font-bold text-gray-800">Econect Blog</h1>
        </Link>
        <Link
        href={
          LoginButton === 'Login' ? '/login' : '/logout'
        }>
          <Button
          variant= {LoginButton === 'Login' ? "primary" : "secondary"}
          className="ml-auto"
          >
            { LoginButton }
          </Button>
        </Link>


      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-gray-100 p-4 text-center text-gray-600">
      <p>© {new Date().getFullYear()} Econect. Todos os direitos reservados.</p>
    </footer>
  );
}

/**
 * Layout principal da aplicação. Inclui Header, Footer
 * e uma área de conteúdo principal padronizada.
 */
export function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      
      <main className="w-full grow max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
