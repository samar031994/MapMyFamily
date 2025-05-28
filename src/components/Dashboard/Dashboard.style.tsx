import styled from "styled-components";
import React from "react";
import { Card } from "@mantine/core";

export const CardObj = styled(Card)`
  margin: 10px;
  border-left: 5px solid #0070f3;
  width: 300px;
  transition: transform 0.2s, box-shadow 0.2s;
  boxshadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  &:hover {
    transform: translate(8px, -4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`
