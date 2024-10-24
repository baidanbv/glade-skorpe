const Button = ({ title, py = 'py-2', px = 'px-24', type = 'text', onClick }) => {
  return (
    <button type={type} className={`text-secondary mx-auto text-3xl ${py} ${px} bg-accent rounded-full drop-shadow border border-transparent hover:text-accent 
      hover:bg-transparent hover:border hover:border-accent 
      transition-colors duration-300 ease-in-out`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
