import { useState } from 'react';

const TabMenu = ({ categories, onSelect }) => {
  const [activeTab, setActiveTab] = useState(categories.length > 0 ? categories[0].name : '');

  const handleTabClick = (category) => {
    setActiveTab(category);
    onSelect(category);
  };

  return (
    <div className="flex items-center justify-between px-4  bg-background mb-6  sm:justify-center sm:gap-5">
      {categories.map((category) => (
        <div key={category._id} className="relative z-0 w-[120px] h-[135px] overflow-hidden flex items-center justify-center text-2xl text-secondary font-jah before:block before:absolute before:w-full before:h-full before:bg-background before:opacity-30 before:z-10 before:top-0 before:left-0 lg:hover:cursor-pointer group" onClick={() => handleTabClick(category.name)}>
          <img src={category.image} alt={category.name} className={`absolute z-0 top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:-translate-y-2 ${activeTab === category.name ? '-translate-y-2' : ''}`} />
          <span key={category._id} className={`relative z-0 text-border transition-transform duration-300 ease-in-out transform group-hover:-translate-y-2 ${activeTab === category.name ? '-translate-y-2' : ''}`}>
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
