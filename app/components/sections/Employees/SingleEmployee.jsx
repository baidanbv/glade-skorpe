const SingleEmployee = ({ data }) => {
  return (
    <div className="max-w-[40%] text-center mb-5">
      <img src={data.image} alt={data.name} className="max-h-[120px] md:max-h-full" />
      <h3 className=" text-md font-kurale mt-2 md:text-2xl">{data.name}</h3>
      <p className="text-xs  md:text-lg">{data.position}</p>
    </div>
  );
};

export default SingleEmployee;
