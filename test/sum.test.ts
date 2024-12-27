import { sum } from "./sum";

describe("sum", () => {
  test("add 1+2 should be 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

test("Object assignment", () => {
  const data = { one: 1 };
  data["two"] = undefined;
  expect(data).toEqual({ one: 1 });
});

test("Adding positive number is not 0", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/q/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

beforeAll(() => {
  console.log("beforeAll");
  // shoppingList.pop("milk");
});

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve("peanut butter");
      reject("error");
    }, 1000);
  });
};

// test("the data is peanut butter", async () => {
//   const data = await fetchData();
//   expect(data).toBe("peanut butter");
// });

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (error) {
    expect(error).toMatch("error");
  }
});



beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});



beforeEach(() => console.log('connection setup'));
beforeEach(() => console.log('database setup'));

afterEach(() => console.log('database teardown'));
afterEach(() => console.log('connection teardown'));

test('test 1', () => console.log('test 1'));
// test.only('this will be the only test that runs', () => {
//   expect(true).toBe(false);
// });
describe('extra', () => {
  beforeEach(() => console.log('extra database setup'));
  afterEach(() => console.log('extra database teardown'));

  test('test 2', () => console.log('test 2'));
});
