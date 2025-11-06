/**
 * Exibe uma mensagem de erro padronizada no formulário.
 */
export function FormError({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
      <p>{message}</p>
    </div>
  );
}
