/**
 * Um botão padronizado com variantes e estado de 'disabled'.
 */
export function Button({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  variant = 'primary',
  className = ''
}) {
  const baseStyle = "px-4 py-2 rounded-md font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${styles[variant]} ${className}`} //junta as classe(Styles) da variant, da baseStyle e da chamada do component
    >
      {disabled ? 'Salvando...' : children}
    </button>
  );
}
