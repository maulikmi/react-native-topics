import React from "react";
import renderer from "react-test-renderer";
import { ThemedText } from "../ThemedText";

test(`renders correctly`, () => {
  const tree = renderer
    .create(<ThemedText>Snapshot tests!</ThemedText>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
