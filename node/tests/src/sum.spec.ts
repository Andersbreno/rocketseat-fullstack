import { sum } from "./sum"

describe("sum", () => {

    let sumResult: number

    beforeAll(() => {
        sumResult = 7
        console.log("Executado antes")
    })

    afterAll(() => {
        sumResult = 0
        console.log("Executado depois", sumResult)
    })

    it("sum", () => {
      const result = sum(2, 5);
      console.log(sumResult)
      expect(result).toBe(sumResult);
    });

    test("sum of 2 + 2  must be 4", () => {
      const result = sum(2, 2);
      expect(result).toBe(4);
    });
})

describe("sum1", () => {
    it("sum", () => {
      const result = sum(2, 5);
      expect(result).toBe(7);
    });

    test("sum of 2 + 2  must be 4", () => {
      const result = sum(2, 2);
      expect(result).toBe(4);
    });
})
