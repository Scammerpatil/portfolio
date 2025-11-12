"use client";

import { motion } from "framer-motion";
import { IconBriefcaseFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useColorContext } from "@/context/colorContext";
import { Experience } from "@/types/Experience";
import SectionTitle from "../Common/SectionTitle";

const TimelineItem = ({ item }: { item: Experience }) => {
  const { color } = useColorContext();

  return (
    <motion.li
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ gridTemplateColumns: "none" }}
      className=""
    >
      <div className="timeline-middle rounded-full bg-primary-content p-2 mr-2 lg:mr-4">
        <IconBriefcaseFilled className="text-primary-content" color={color} />
      </div>
      <div className="border shadow-primary shadow-md hover:-translate-y-2 transition transform duration-300 ease-in-out flex flex-col gap-2 border-primary p-2 rounded-2xl md:p-4 bg-base-200 timeline-end mb-10 md:text-end">
        <div className="flex gap-2 items-center">
          <Image
            className="w-16 max-md:w-14 rounded-full"
            src={`data:${item.image.contentType};base64,${Buffer.from(
              item.image.data
            ).toString("base64")}`}
            width={64}
            height={64}
            alt={item.company}
          />
          <div className="flex flex-col justify-center items-start">
            <div className="text-base-content text-base font-semibold md:text-xl lg:text-2xl ">
              {item.role}
            </div>
            <div className="font-semibold text-base-content flex gap-3 text-sm md:text-base">
              <a
                href={item.companyURL}
                target="_blank"
                className="hover:underline cursor-pointer"
              >
                {item.company}
              </a>
              &#x2022; {formatDate(item.startDate)} -
              {item.endDate ? formatDate(item.endDate) : "Present"}
            </div>
          </div>
        </div>
        <div className="text-base-content/80 leading-6 text-justify md-mx:text-sm xs-mx:text-xs ">
          {item.desc}
        </div>
        <div className="text-lg font-medium text-base-content md-mx:text-base sm-mx:text-sm xs-mx:text-xs flex gap-1">
          <div className="font-semibold text-base-content">Skills:</div>
          <div className="flex gap-1 flex-wrap text-base-content/80">
            {item.skills.map((skill: string, index: number) => (
              <div key={index}> &#x2022; {skill} </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="bg-primary w-px mr-2 lg:mr-4" />
    </motion.li>
  );
};

const ExperienceModel = ({ experience }: { experience: Experience[] }) => {
  return (
    <section
      id="experience"
      className="px-6 sm:px-10 md:px-20 lg:px-28 my-10 bg-base-300 py-10"
    >
      <SectionTitle
        title="Battlefield Experience ⚔️"
        paragraph="A journey through the roles I've conquered and lessons I've mastered."
      />

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
      >
        {experience.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </motion.ul>
    </section>
  );
};

export default ExperienceModel;

const formatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};
