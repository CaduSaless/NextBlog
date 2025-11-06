/**
 * Um componente de Input padronizado com label embutido e props.
 */
export function FormInput({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${props.className || ''}`} //Base style + classes de quem "chamou" o componente
      />
    </div>
  );
}
