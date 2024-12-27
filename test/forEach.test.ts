import { forEach } from "./forEach";

const mockCallBack = jest.fn((x) => 42 + x);

test("mock function", () => {
  forEach([0, 1], mockCallBack);

  expect(mockCallBack.mock.calls.length).toBe(2);

  expect(mockCallBack.mock.calls[0][0]).toBe(0)
  expect(mockCallBack.mock.calls[1][0]).toBe(1)
  expect(mockCallBack.mock.lastCall?.[0]).toBe(1)
  expect(mockCallBack.mock.results[1].value).toBe(43)
});
