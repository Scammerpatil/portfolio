const SectionTitle = ({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) => {
  return (
    <>
      <div className="w-full mx-auto text-center mb-4">
        <h2 className="mb-4 text-3xl text-base-content font-bold !leading-tight sm:text-4xl md:text-[45px]">
          {title}
        </h2>
        <p className="text-base text-base-content !leading-relaxed md:text-lg">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
