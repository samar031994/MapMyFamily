import React, { useEffect, useState } from "react";
import { Fieldset, TextInput, Stack, Radio, Button } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import * as G from "../../../Global.atoms";
import { useAtom } from "jotai";
import { NodeModelType } from "@/models/Tree.model";

const OffCanvasPanelProperties = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [deathDate, setDeathDate] = useState<Date | null>(null);
  const [currentNode, setCurrentNode] = useAtom(G.SelectedNodeAtom);
  const [diagramActions, setDiagramActions] = useAtom(G.DiagramActionsAtom);
  return (
    <>
      <Fieldset
        legend="Properties"
        variant="default"
        style={{ backgroundColor: "inherit", margin: "4px 4px 4px 4px" }}
        id="Properties"
      >
        <TextInput
          label="Name"
          placeholder={currentNode?.name ? "" : "Enter a name"}
          value={currentNode?.name || ""}
          onChange={(e) => {
            setCurrentNode({
              ...(currentNode as NodeModelType),
              name: e.currentTarget.value,
            });
          }}
        />
        <TextInput
          label="Location"
          placeholder={currentNode?.city ? currentNode?.city : "Enter a city"}
          onChange={(e) => {
            setCurrentNode({
              ...(currentNode as NodeModelType),
              city: e.currentTarget.value,
            });
          }}
        />
      </Fieldset>
      <Fieldset
        legend="Gender"
        variant="default"
        style={{ backgroundColor: "inherit", margin: "4px 4px 4px 4px" }}
        id="Gender"
      >
        <Radio.Group
          value={currentNode?.gender || ""}
          onChange={(value) => {
            setCurrentNode({
              ...(currentNode as NodeModelType),
              gender: value,
            });
          }}
        >
          <Stack>
            <Radio
              value={"Male"}
              label="Male"
            />
            <Radio
              value={"Female"}
              label="Female"
            />
          </Stack>
        </Radio.Group>
      </Fieldset>
      {/* <Fieldset id="Date" variant="default" legend="lifetime">
        <YearPickerInput
          dropdownType="modal"
          label="Birth Year"
          variant="default"
          value={birthDate}
          onChange={setBirthDate}
        />
        <YearPickerInput
          dropdownType="modal"
          label="Death Year"
          variant="default"
          value={deathDate}
          onChange={setDeathDate}
        ></YearPickerInput>
      </Fieldset> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button variant="filled" color="orange" style={{ margin: "8px" }}>
          Assign to Self
        </Button>
        <Button
          variant="filled"
          style={{ margin: "8px" }}
          onClick={() => {
            currentNode &&
              diagramActions &&
              diagramActions.applyChanges(currentNode);
          }}
        >
          Apply Changes
        </Button>
      </div>
    </>
  );
};

export default OffCanvasPanelProperties;
