import {
  ActionIcon,
  Modal,
  ScrollArea,
  Tooltip,
  useMatches,
} from "@mantine/core";
import { IconArrowBigDownLineFilled } from "@tabler/icons-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Info } from "@/components/User";
import { useColorContext } from "@/context/colorContext";

const ResumeViewer = (props: any) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const btn = useMatches({
    xs: "xs",
    sm: "sm",
    md: "md",
  });
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
        <Modal.Header className="!bg-base-100 xs-mx:!p-2 !border-primary xs-mx:!border  !border-2 xs-mx:!border-b-0 !border-b-0 !rounded-tl-3xl !rounded-tr-3xl">
          <Modal.Title
            data-autofocus
            className="!text-4xl xs-mx:!text-2xl text-base-content flex gap-3 items-center !font-bold"
          >
            Resume
            <Tooltip
              label="Download"
              className="!text-base-100"
              color={color}
              position="right"
              offset={5}
            >
              <ActionIcon
                className="!text-primary"
                component="a"
                href="/Saurav Deepak Patil_Computer_Engineering.pdf"
                size={btn}
                download={Info.name}
                variant="outline"
                color={color}
              >
                <IconArrowBigDownLineFilled className=" xs-mx:!w-[16px] xs-mx:!h-" />
              </ActionIcon>
            </Tooltip>
          </Modal.Title>
          <Modal.CloseButton
            size="md"
            iconSize="30px"
            className="!bg-base-100 !text-error"
          />
        </Modal.Header>
        <Modal.Body className="!bg-base-100 xs-mx:!p-2 !pt-2 !border-primary !border-2 xs-mx:!border xs-mx:!border-t-0 !border-t-0 !rounded-bl-3xl !rounded-br-3xl ">
          <Document
            className="w-full !rounded-2xl !overflow-hidden !min-w-40 !min-h-14"
            file="/Saurav Deepak Patil_Computer_Engineering.pdf"
          >
            <Page
              className="w-full !min-w-40 !min-h-14 md-mx:[&>.react-pdf\_\_Page\_\_canvas]:!w-full md-mx:[&>.react-pdf\_\_Page\_\_canvas]:!h-auto"
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
export default ResumeViewer;
