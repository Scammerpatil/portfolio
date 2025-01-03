import { Timeline, useMatches } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { useColorContext } from "@/context/colorContext";
import { Experience } from "@/types/Experience";

const TimelineItem = (items: Experience[]) => {
  const size = useMatches({
    xs: 15,
    md: 20,
  });
  return items.map((item: Experience, index: number) => (
    <Timeline.Item
      data-aos="fade-up"
      data-aos-duration="800"
      key={index}
      className="!pt-12 !mb-2 sm-mx:!p-1"
      bullet={<IconBriefcaseFilled className="!text-base-100" size={size} />}
    >
      <div className="border shadow-primary shadow-md hover:-translate-y-2 transition transform duration-300 ease-in-out flex flex-col gap-2 border-primary p-4 rounded-2xl sm-mx:p-2">
        <div className="flex gap-2 items-center">
          <Image
            className="w-16 md-mx:w-14 rounded-full"
            src={`${item.image}`}
            width={64}
            height={64}
            alt="Company"
          />
          <div className="flex flex-col">
            <div className="text-base-content text-2xl font-semibold sm-mx:text-xl xs-mx:text-lg xsm-mx:text-base">
              {item.role}
            </div>
            <div className="text-lg font-semibold text-base-content flex gap-3 md-mx:text-base sm-mx:text-sm xs-mx:text-xs">
              <a
                href={item.companyURL}
                target="_blank"
                className="hover:underline cursor-pointer"
              >
                {item.company}
              </a>
              &#x2022; {item.date}
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
    </Timeline.Item>
  ));
};

const ExperienceModel = ({ experience }: { experience: Experience[] }) => {
  const size = useMatches({
    xs: 15,
    md: 20,
  });
  const dot = useMatches({
    xs: 25,
    md: 30,
  });
  const color = useColorContext().color;
  return (
    <div
      className="px-16 mx-20 md-mx:px-6 sm-mx:px-2 lg-mx:mx-0 my-10 mb-28 font-mono"
      id="experience"
    >
      <SectionTitle
        title="Battlefield Experience ⚔️"
        paragraph="A journey through the roles I've conquered and lessons I've mastered."
      />

      <Timeline color={color} active={5} bulletSize={dot} lineWidth={2}>
        {TimelineItem(experience)}
        <Timeline.Item
          bullet={
            <IconBriefcaseFilled className="!text-base-100" size={size} />
          }
        ></Timeline.Item>
      </Timeline>
    </div>
  );
};
export default ExperienceModel;
