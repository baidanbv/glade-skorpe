import ActionButton from '@/components/ui/Buttons/ActionButton';

const AcceptMessage = ({ message, acceptButton, cancelButton }) => {
  return (
    <div className="bg-background flex items-center justify-center flex-col p-10">
      <h3 className="font-kurale text-xl text-center mb-7">{message}</h3>
      <div className="flex gap-5">
        <ActionButton title="Ja" handleClick={acceptButton} action="open" />
        <ActionButton title="Nej" handleClick={cancelButton} action="delete" />
      </div>
    </div>
  );
};

export default AcceptMessage;
