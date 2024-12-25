import { socialLinks } from "@/components/User";

const Footer = ({
  visitorCount,
  name,
}: {
  visitorCount: number;
  name: string;
}) => {
  // Format visitor count to include leading zeros
  const formattedVisitorCount = String(visitorCount).padStart(6, "0").split("");

  return (
    <div className="pt-36 w-full font-mono flex flex-col gap-4 items-center justify-end bg-[url('/bg.png')] h-72 bg-contain bg-black bg-center bg-no-repeat">
      {/* Social Links */}
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

      {/* Copyright Information */}
      <div className="text-white text-xl md-mx:text-lg sm-mx:text-base xs-mx:text-sm xs-mx:flex flex-col items-center">
        Copyright &copy; {new Date().getFullYear()} {name}{" "}
        <span className="xs-mx:hidden">|</span> <span>All Rights Reserved</span>
      </div>

      {/* Visitor Count Display */}
      <div className="flex gap-2">
        {formattedVisitorCount.map((digit, index) => (
          <span
            key={index}
            className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white text-xl md:text-2xl font-bold rounded-md shadow-md"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Footer;
