const Mail = () => {
  return (
    <div className="z-50 flex md-mx:hidden text-base-content items-center gap-10 fixed bottom-32 -right-48 rotate-90">
      <div className="flex" data-aos-duration="800" data-aos="fade-down-left">
        <a
          href="mailto:sauravpatil.rcpit@gmail.com"
          className="font-mono tracking-wide hover:text-primary hover:-translate-x-1 transition transform duration-300 ease-in-out"
        >
          sauravpatil.rcpit@gmail.com
        </a>
      </div>
      <hr className="border w-40 rounded-full bg-base-content border-base-content" />
    </div>
  );
};
export default Mail;
