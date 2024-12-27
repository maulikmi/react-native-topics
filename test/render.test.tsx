import { ButtonComponent } from "@/app/landing";
import { render, screen } from "@testing-library/react-native";

test("basic test", () => {
  render(<ButtonComponent title="Test" onPress={() => {}} />);
  expect(screen.getByText("Test"))
});
