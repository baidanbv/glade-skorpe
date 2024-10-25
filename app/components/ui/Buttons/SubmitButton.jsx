
const SubmitButton = ({title, handleClick, type}) => {
  return (
    <button type={type} className={`bg-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline font-kurale  hover:text-secondary hover:bg-background  transition-colors duration-300 ease-in-out`} 
      onClick={handleClick}>
  {title}
</button>


  );
};

export default SubmitButton