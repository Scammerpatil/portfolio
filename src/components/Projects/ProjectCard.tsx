import {
  Badge,
  Card,
  Group,
  Image,
  Indicator,
  Text,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FullProjectModal from "./FullProjectModal";
import { useColorContext } from "@/context/colorContext";
import { ProjectData } from "@/types/Project";
const ProjectCard = (props: ProjectData) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { color } = useColorContext();
  const badge = useMatches({
    xsm: "sm",
    md: "md",
    lg: "lg",
  });
  return (
    <div
      className="w-[32%] lg-mx:w-[46%] md-mx:w-[48%] sm-mx:w-[90%] xs-mx:w-full"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <Card
        onClick={open}
        className="!bg-base-300 cursor-pointer transition-transform duration-300 ease-in-out hover:!scale-[1.02] mb-5 hover:!shadow-md shadow-primary !border-primary border-2"
        shadow="lg"
        padding="sm"
        radius="lg"
        withBorder
      >
        <Card.Section className="p-3">
          <Image
            className="!rounded-xl !shadow-[0_0_5px_0_#64FFDA]"
            src={props.image}
            alt={props.image.toString()}
          />
        </Card.Section>

        <Group justify="space-between" mt="xs" mb="xs">
          <div className="!text-2xl gap-2 !font-bold !text-base-content flex items-center sm-mx:!text-xl">
            {props.title}
            {props.live === true && (
              <Badge
                className="!px-1"
                variant="outline"
                color="red"
                rightSection={
                  <Indicator
                    className="!mr-0.5 !z-0"
                    color="red"
                    position="middle-end"
                    size={7}
                    processing
                  ></Indicator>
                }
              >
                Live
              </Badge>
            )}
          </div>
        </Group>
        <Group mb="sm" className="!gap-2">
          {props.technologies.map(
            (tech: string, index: number) =>
              index < 3 && (
                <Badge key={index} size={badge} variant="filled" color={color}>
                  {tech}
                </Badge>
              )
          )}
        </Group>
        <Text
          className="!text-justify text-base-content/80 !text-sm xs-mx:!text-xs"
          lineClamp={5}
          size="sm"
        >
          {props.desc}
        </Text>

        <button
          onClick={open}
          className="btn btn-primary btn-outline rounded-xl text-primary-content mt-3"
          color={color}
        >
          Show More
        </button>
      </Card>
      <FullProjectModal
        opened={opened}
        close={close}
        title={props.title}
        desc={props.desc}
        image={props.image.toString()}
        live={props.live}
        link={props.link}
        github={props.github}
        technologies={props.technologies}
      />
    </div>
  );
};
export default ProjectCard;
