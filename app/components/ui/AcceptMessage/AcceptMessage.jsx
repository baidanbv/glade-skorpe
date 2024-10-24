const AcceptMessage = ({ message, acceptButton, cancelButton }) => {
  return (
    <div className="bg-background flex items-center justify-center flex-col p-10">
      <h3 className="font-kurale text-xl text-center mb-7">{message}</h3>
      <div className="flex gap-5">
        <button className="font-kurale bg-accent py-2 px-8 cursor-pointer rounded-sm text-secondary" onClick={acceptButton}>
          Ja
        </button>
        <button className="font-kurale bg-[#f44336] py-2 px-8 cursor-pointer rounded-sm text-secondary" onClick={cancelButton}>
          Nej
        </button>
      </div>
    </div>
  );
};

export default AcceptMessage;
