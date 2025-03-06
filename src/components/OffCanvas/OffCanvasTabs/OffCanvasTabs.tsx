import { Tabs } from "@mantine/core";
import EditIconSVG from "./EditIconSVG";
import FileIconSVG from "./FileIconSVG";
import InfoSVG from "./InfoSVG";
import OffCanvasPanelFile from "./OffCanvasPanel/OffCanvasPanelFile";

const OffCanvasTabs = ({
  diagramRef,
}: {
  diagramRef: React.RefObject<go.Diagram>;
}) => {
  return (
    <>
      <Tabs defaultValue={"file"} radius={"xs"} color="black">
        <Tabs.List grow>
          <Tabs.Tab value="file" leftSection={<FileIconSVG />}>
            File
          </Tabs.Tab>
          <Tabs.Tab value="edit" leftSection={<EditIconSVG />}>
            Edit
          </Tabs.Tab>
          <Tabs.Tab value="properties" leftSection={<InfoSVG />}>
            Properties
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="file">
          <OffCanvasPanelFile diagramRef={diagramRef} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default OffCanvasTabs;
