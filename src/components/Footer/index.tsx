import { Info, socialLinks } from "@/components/User";

const Footer = () => {
  return (
    <div className="pt-36 font-mono flex flex-col gap-2 items-center justify-end bg-[url('/bg.png')] h-72 bg-cover bg-center bg-no-repeat">
      <div className="md-mx:flex hidden text-base-content gap-8 sm-mx:gap-6">
        {socialLinks.map((icon, index) => (
          <a
            key={index}
            href={`${icon.link}`}
            target="_blank"
            className="font-mono text-lg hover:text-primary hover:scale-105 transition transform duration-300 ease-in-out"
          >
            <icon.icon stroke={1.5} size={25} />
          </a>
        ))}
      </div>
      <div className="text-white text-xl md-mx:text-lg sm-mx:text-base xs-mx:text-sm xs-mx:flex flex-col items-center">
        Copyright &copy; {new Date().getFullYear()} {Info.name}{" "}
        <span className="xs-mx:hidden">|</span> <span>All Rights Reserved</span>
      </div>
    </div>
  );
};
export default Footer;
