const Mail = ({ mail }: { mail: string }) => {
  return (
    <div className="fixed bottom-32 -right-44 z-50 hidden rotate-90 items-center gap-10 text-base-content md:flex orbitron">
      <div className="flex" data-aos="fade-down-left" data-aos-duration="800">
        <a
          href={`mailto:${mail}`}
          className="font-mono tracking-wide transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:text-primary"
        >
          {mail}
        </a>
      </div>
      <hr className="w-40 rounded-full border border-base-content bg-base-content" />
    </div>
  );
};

export default Mail;
