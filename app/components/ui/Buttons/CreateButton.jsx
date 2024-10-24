const CreateButton = ({title, handleClick}) => {
  return (
    <button className={`bg-accent outline-none py-2 px-5 rounded-sm cursor-pointer absolute right-5 top-0 font-kurale text-secondary 
      border border-transparent hover:text-accent 
      hover:bg-transparent hover:border hover:border-accent 
      transition-colors duration-300 ease-in-out`} 
      onClick={handleClick}>
  {title}
</button>


  );
};

export default CreateButton