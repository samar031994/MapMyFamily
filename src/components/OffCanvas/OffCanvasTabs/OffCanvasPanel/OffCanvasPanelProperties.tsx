import React, { useState } from "react";
import { Fieldset, TextInput, Stack, Radio } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";

const OffCanvasPanelProperties = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [deathDate, setDeathDate] = useState<Date | null>(null);
  return (
    <>
      <Fieldset
        legend="Properties"
        variant="default"
        style={{ backgroundColor: "inherit", margin: "4px 4px 4px 4px" }}
        id="Properties"
      >
        <TextInput label="Name" placeholder="Enter name" />
        <TextInput label="Location" placeholder="Enter location" />
      </Fieldset>
      <Fieldset
        legend="Gender"
        variant="default"
        style={{ backgroundColor: "inherit", margin: "4px 4px 4px 4px" }}
        id="Gender"
      >
        <Radio.Group>
          <Stack>
            <Radio value={"Male"} label="Male" />
            <Radio value={"Female"} label="Female" />
            <Radio value={"Other"} label="Other" />
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
    </>
  );
};

export default OffCanvasPanelProperties;
