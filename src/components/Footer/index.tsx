"use client";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";
import MyImage from "./MyImage";
import CountUp from "react-countup";

const Footer = ({ visitorCount }: { visitorCount: number }) => {
  const formattedVisitorCount = String(visitorCount).padStart(6, "0").split("");

  return (
    <footer className="px-4 md:px-24 bg-base-300 relative z-10 pt-16 text-sm lg:text-base-content md:pt-20 lg:pt-24 orbitron">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Brand & Social Links */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-12 max-w-[360px] lg:mb-16">
              <Link href="/" className="inline-block">
                <MyImage />
              </Link>
              <p className="mb-9 text-sm lg:text-base leading-relaxed lg:text-base-content/80">
                Code is not just what I do, it&apos;s how I create. Innovation
                starts with curiosity.
              </p>
              <div className="flex items-center">
                <a
                  href="https://www.facebook.com/saurav.patil.16121"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="mr-6 duration-300 hover:text-primary"
                >
                  <IconBrandFacebook size={24} />
                </a>
                <a
                  href="https://x.com/ScammerPatil"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="mr-6 duration-300 hover:text-primary"
                >
                  <IconBrandTwitter size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@scammer104"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="mr-6 duration-300 hover:text-primary"
                >
                  <IconBrandYoutube size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/scammerpatil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="duration-300 hover:text-primary"
                >
                  <IconBrandLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="w-full px-4 sm:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-8 lg:mb-16">
              <h2 className="mb-4 lg:mb-10 text-lg md:text-xl font-bold">
                Useful Links
              </h2>
              <ul>
                {["portfolio", "blog", "contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      className="mb-2 md:mb-4 inline-block text-sm lg:text-base duration-300 hover:text-primary capitalize"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms & Privacy */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-8 lg:mb-16">
              <h2 className="mb-4 lg:mb-10 text-lg md:text-xl font-bold">
                Terms & Privacy
              </h2>
              <ul>
                <li>
                  <Link
                    href="/terms"
                    className="mb-2 md:mb-4 inline-block text-sm lg:text-base duration-300 hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="mb-2 md:mb-4 inline-block text-sm lg:text-base duration-300 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-2/12">
            <div className="mb-8 lg:mb-16">
              <h4 className="mb-4 lg:mb-10 text-lg md:text-xl font-bold">
                Contact Us
              </h4>
              <ul>
                <li className="mb-2 md:mb-4 text-sm lg:text-base">
                  <a href="tel:+917499455643">+91 74994 55643</a>
                </li>
                <li className="mb-2 md:mb-4 text-sm lg:text-base">
                  <a href="mailto:sauravpatil.rcpit@gmail.com">
                    sauravpatil.rcpit@gmail.com
                  </a>
                </li>
                <li className="mb-2 md:mb-4 text-sm lg:text-base">
                  Address: Plot No: 3B, L.I.C Colony, Pimple Road, Amalner
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent"></div>

        {/* Visitor Count */}
        <div className="py-4 flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row gap-1">
            {formattedVisitorCount.map((digit, index) => (
              <span
                key={index}
                className="flex items-center justify-center w-10 h-10 bg-base-100 text-base lg:text-xl font-bold rounded-md shadow-md"
              >
                <CountUp end={parseInt(digit)} />
              </span>
            ))}
          </div>
          <span className="text-sm lg:text-base">Peek-a-People</span>
        </div>

        {/* Footer Credits */}
        <div className="py-4">
          <p className="text-center text-sm lg:text-base">
            © {new Date().getFullYear()} Copyright reserved to{" "}
            <a
              href="https://github.com/Scammerpatil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              Scammer Patil
            </a>{" "}
            and <span className="text-primary">NovaCops</span>
          </p>
        </div>
      </div>
      <div className="absolute right-0 top-14 z-[-1]">
        <svg
          width="55"
          height="99"
          viewBox="0 0 55 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.8"
            cx="49.5"
            cy="49.5"
            r="49.5"
            fill="currentColor"
          />
          <mask
            id="mask0_94:899"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="99"
            height="99"
          >
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="currentColor"
            />
          </mask>
          <g mask="url(#mask0_94:899)">
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="url(#paint0_radial_94:899)"
            />
            <g opacity="0.8" filter="url(#filter0_f_94:899)">
              <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_94:899"
              x="12.4852"
              y="-15.1763"
              width="82.7646"
              height="82.7646"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10.5"
                result="effect1_foregroundBlur_94:899"
              />
            </filter>
            <radialGradient
              id="paint0_radial_94:899"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
            >
              <stop stopOpacity="0.47" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-24 left-0 z-[-1]">
        <svg
          width="79"
          height="94"
          viewBox="0 0 79 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            fill="url(#paint0_linear_94:889)"
          />
          <rect
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            stroke="url(#paint1_linear_94:889)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
            fill="url(#paint2_linear_94:889)"
          />
          <path
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
            stroke="url(#paint3_linear_94:889)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
            fill="url(#paint4_linear_94:889)"
          />
          <path
            d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
            stroke="url(#paint5_linear_94:889)"
            strokeWidth="0.7"
          />
          <defs>
            <linearGradient
              id="paint0_linear_94:889"
              x1="-41"
              y1="21.8445"
              x2="36.9671"
              y2="59.8878"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0.62" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_94:889"
              x1="25.6675"
              y1="95.9631"
              x2="-42.9608"
              y2="20.668"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_94:889"
              x1="20.325"
              y1="-3.98039"
              x2="90.6248"
              y2="25.1062"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0.62" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_94:889"
              x1="18.3642"
              y1="-1.59742"
              x2="113.9"
              y2="80.6826"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_94:889"
              x1="61.1098"
              y1="62.3249"
              x2="-8.82468"
              y2="58.2156"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0.62" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_94:889"
              x1="65.4236"
              y1="65.0701"
              x2="24.0178"
              y2="41.6598"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.51" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
