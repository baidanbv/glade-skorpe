const ActionButton = ({title, handleClick, action}) => {
  return (
    <button className={`font-kurale text-secondary
      ${action === 'delete' ? 'bg-[#f44336]' : 'bg-accent'} 
      outline-none px-3 py-1 rounded-sm cursor-pointer 
      border border-transparent hover:text-accent 
      hover:bg-transparent hover:border hover:border-accent 
      transition-colors duration-300 ease-in-out`} 
      onClick={handleClick}>
  {title}
</button>


  );
};

export default ActionButton