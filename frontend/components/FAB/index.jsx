// src/components/ui/Fab.jsx
import Link from 'next/link';


// Floating Action Button (FAB) que usa o Link do Next.js.
export function Fab({ href, children }) {
  return (
    <Link
      href={href}
      className="fixed bottom-10 right-10 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 p-4 text-white shadow-lg transition-colors hover:bg-blue-600"
    >
      {children}
    </Link>
  );
}