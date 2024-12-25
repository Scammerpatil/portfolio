import { useColorContext } from "@/context/colorContext";
import {
  Badge,
  Button,
  Group,
  Image,
  Indicator,
  Modal,
  ScrollArea,
  Text,
  useMatches,
} from "@mantine/core";

const FullProjectModal = (props: any) => {
  const download = useMatches({ xs: "xs", md: "sm", lg: "md", bs: "lg" });
  const techno = useMatches({ xs: "md", sm: "md", md: "lg", bs: "xl" });
  const btn = useMatches({ xs: "xs", sm: "sm", md: "md", lg: "lg" });
  const color = useColorContext().color;
  return (
    <Modal.Root
      scrollAreaComponent={ScrollArea.Autosize}
      size="auto"
      centered
      className="font-mono"
      opened={props.opened}
      onClose={props.close}
    >
      <Modal.Overlay className="!backdrop-opacity-85 blur-sm" />
      <Modal.Content className="!rounded-3xl">
        <Modal.Header className="!bg-base-100 xs-mx:!p-2 !border-primary !border-2 !border-b-0 !rounded-tl-3xl !rounded-tr-3xl">
          <Modal.Title
            data-autofocus
            className="!text-4xl sm-mx:!text-3xl xs-mx:!text-2xl xsm-mx:!text-xl text-base-content flex gap-3 xs-mx:gap-1 items-center !font-bold"
          >
            {props.title}
            {props.live === true && (
              <Badge
                className="flex items-center gap-1"
                size={download}
                variant="outline"
                color="red"
                rightSection={
                  <Indicator
                    color="red"
                    position="middle-end"
                    size={10}
                    processing
                  ></Indicator>
                }
              >
                Live
              </Badge>
            )}
          </Modal.Title>
          <Modal.CloseButton
            size="md"
            iconSize="30px"
            className="!bg-base-100 !text-error !hover:!bg-error !hover:!text-base-content !rounded-full !p-1 !shadow-[0_0_5px_0_#64FFDA] !hover:!shadow-[0_0_10px_1px_#64FFDA80] !border-primary !border-2 !hover:!border-0"
          />
        </Modal.Header>
        <Modal.Body className="!bg-base-100 xs-mx:!p-2 !pt-2 !border-primary !border-2 !border-t-0 !rounded-bl-3xl !rounded-br-3xl">
          <Image
            className="!rounded-xl !shadow-[0_0_5px_0_#64FFDA]"
            src={props.image}
            alt={props.image}
          />
          <div className="flex flex-wrap gap-3 xs-mx:gap-2 my-3">
            {props.technologies.map((tech: string, index: number) => (
              <Badge key={index} size={techno} variant="light" color={color}>
                {tech}
              </Badge>
            ))}
          </div>
          <Text
            className="!text-justify !text-lg sm-mx:!text-base xs-mx:!text-xs"
            c="dimmed"
          >
            {props.desc}
          </Text>
          <Group justify="space-between" mt="md" mb={3}>
            <a
              href={props.github}
              target="_blank"
              className="!w-[48%] sm-mx:!w-[46%]"
            >
              <Button
                variant="outline"
                size={btn}
                color={color}
                fullWidth
                radius="md"
              >
                View Code
              </Button>
            </a>
            <a href={props.link} target="_blank" className="!w-[48%] ">
              <Button
                size={btn}
                color={color}
                className="!text-base-100"
                fullWidth
                radius="md"
              >
                View Live App
              </Button>
            </a>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
export default FullProjectModal;
