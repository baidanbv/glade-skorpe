import Title from '@/components/ui/Title/Title';

const WelcomeSection = ({ title, description }) => {
  return (
    <section className="py-12">
      <Title title={title} />
      <p className="text-center mt-6">{description}</p>
    </section>
  );
};

export default WelcomeSection;
