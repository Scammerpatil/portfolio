import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { navLinks } from "./index";
import { IconMenu2 } from "@tabler/icons-react";

const SideBar = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Drawer.Root
        className="bs:hidden z-50"
        position="right"
        opened={opened}
        onClose={toggle}
        size="50vw"
      >
        <Drawer.Overlay className="!-z-0 bg-transparent bg-opacity-50 backdrop-blur-sm" />
        <Drawer.Content className="!-z-0 bg-transparent">
          <Drawer.Body className="flex flex-col text-base items-center justify-center gap-5 bg-base-200 h-full">
            {navLinks(true, toggle)}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <button>
        <IconMenu2
          size={60}
          onClick={toggle}
          className="btn btn-primary btn-outline bs:hidden z-50 cursor-pointer text-base-content ml-4"
        />
      </button>
    </>
  );
};
export default SideBar;
