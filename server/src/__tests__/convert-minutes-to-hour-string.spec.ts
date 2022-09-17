import { describe, it } from "mocha";
import { expect } from "chai";
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string";

describe("convertMinutesToHourString Suit Test", () => {
  it("should be return a hours by minutes param", () => {
    const minutesAmountMock = 1050;

    const result = convertMinutesToHourString(minutesAmountMock);
    expect(result).to.be.deep.equal("17:30");
  });

  it("should be a error if parameter is negative", () => {
    const minutesMock = -10;

    expect(() => convertMinutesToHourString(minutesMock)).to.throw(
      "Parameters must be positive"
    );
  });

  it("should be a error if hour value is not valid", () => {
    const minutesMock = 3000;

    expect(() => convertMinutesToHourString(minutesMock)).to.throw(
      "Hour 50 is not a valid."
    );
  });
});
