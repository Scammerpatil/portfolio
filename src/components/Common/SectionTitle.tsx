const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  mb?: string;
}) => {
  return (
    <>
      <div
        className="w-full mx-auto text-center"
        style={{ maxWidth: width, marginBottom: mb }}
      >
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
