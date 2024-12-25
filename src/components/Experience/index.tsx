import { Timeline, useMatches } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";
import { ExperienceInfo } from "@/components/User";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { useColorContext } from "@/context/colorContext";

const TimelineItem = (items: any) => {
  const size = useMatches({
    xs: 15,
    md: 20,
  });
  return items.map((item: any, index: number) => (
    <Timeline.Item
      data-aos="fade-up"
      data-aos-duration="800"
      key={index}
      className="!pt-12 !mb-2 sm-mx:!p-1"
      bullet={<IconBriefcaseFilled className="!text-base-100" size={size} />}
    >
      <div className="border shadow-[0_0_10px_0_#64FFDA50] hover:-translate-y-2 transition transform duration-300 ease-in-out flex flex-col gap-2 border-primary p-4 rounded-2xl sm-mx:p-2">
        <div className="flex gap-2 items-center">
          <Image
            className="rounded-lg w-16 md-mx:w-14"
            src={`/${item.company}.png`}
            width={64}
            height={64}
            alt="Company"
          />
          <div className="flex flex-col">
            <div className="text-white text-2xl font-semibold sm-mx:text-xl xs-mx:text-lg xsm-mx:text-base">
              {item.role}
            </div>
            <div className="text-lg font-semibold text-base-content md-mx:text-base sm-mx:text-sm xs-mx:text-xs">
              {item.company} &#x2022; {item.date}
            </div>
          </div>
        </div>
        <div className="text-base-content/80 leading-6 text-justify md-mx:text-sm xs-mx:text-xs ">
          {item.desc}
        </div>

        <div className="text-lg font-medium text-base-content md-mx:text-base sm-mx:text-sm xs-mx:text-xs flex gap-1">
          <div className="font-semibold text-white">Skills:</div>
          <div className="flex gap-1 flex-wrap">
            {item.skills.map((skill: any, index: number) => (
              <div key={index}> &#x2022; {skill} </div>
            ))}
          </div>
        </div>
      </div>
    </Timeline.Item>
  ));
};

const Experience = () => {
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
      id="Experience"
    >
      <SectionTitle
        title="Battlefield Experience ⚔️"
        paragraph="A journey through the roles I've conquered and lessons I've mastered."
      />

      <Timeline color={color} active={5} bulletSize={dot} lineWidth={2}>
        {TimelineItem(ExperienceInfo)}
        <Timeline.Item
          bullet={<IconBriefcaseFilled className="!text-bgColor" size={size} />}
        ></Timeline.Item>
      </Timeline>
    </div>
  );
};
export default Experience;
