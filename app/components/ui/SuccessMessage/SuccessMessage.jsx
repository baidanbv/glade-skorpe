'use client';

const SuccessMessage = ({ clientName = '', message = '' }) => {
  return (
    <div className="bg-[#FFF7ECC7] font-kurale  flex items-center justify-center flex-col p-10">
      {message === '' ? (
        <>
          <h3 className="text-2xl text-center lg:text-5xl">Tak for din besked {clientName}!</h3>
          <h3 className="text-2xl text-center lg:text-5xl"> Vi vender tilbage hurtigst muligt.</h3>
        </>
      ) : (
        <h3 className="text-2xl text-center lg:text-5xl">{message}</h3>
      )}
    </div>
  );
};

export default SuccessMessage;
