import { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const MAX_SELECTED_EXTRA = +process.env.NEXT_PUBLIC_MAX_SELECTED_EXTRA || 5;

const CustomMultipleSelect = ({ ingredients, selectedExtraIngredients, setSelectedExtraIngredients }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleIngredientSelection = (ingredient) => {
    if (ingredient === 'none') {
      setSelectedExtraIngredients([]);
    } else {
      if (selectedExtraIngredients.includes(ingredient)) {
        setSelectedExtraIngredients(selectedExtraIngredients.filter((item) => item !== ingredient));
      } else {
        if (selectedExtraIngredients.length < MAX_SELECTED_EXTRA) {
          setSelectedExtraIngredients([...selectedExtraIngredients, ingredient]);
        }
      }
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative mb-5" ref={dropdownRef}>
      <div className="p-2 bg-[#F7E8E1] cursor-pointer w-52 mx-auto drop-shadow flex items-center justify-between" onClick={toggleDropdown}>
        <span>
          Tilføj ingrediens <span className="text-[12px]"> (max {MAX_SELECTED_EXTRA}stk) </span>
        </span>
        <IoIosArrowUp className={`${isOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out transform`} />
      </div>

      {isOpen && (
        <ul className="absolute z-10 left-1/2 top-full -translate-x-1/2 w-52 bg-[#F7E8E1] max-h-40 overflow-y-auto border border-background lg:border-none custom-scrollbar">
          <li className={`p-2 cursor-pointer ${selectedExtraIngredients.length === 0 ? 'bg-accent text-secondary' : 'bg-white'}`} onClick={() => handleIngredientSelection('none')}>
            Fjern alle{' '}
          </li>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id} className={`p-2 cursor-pointer ${selectedExtraIngredients.includes(ingredient.name) ? 'bg-accent text-secondary' : 'bg-white'} transition-transform duration-300 ease-in-out transform lg:hover:bg-accent lg:hover:text-secondary`} onClick={() => handleIngredientSelection(ingredient.name)}>
              {ingredient.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomMultipleSelect;
