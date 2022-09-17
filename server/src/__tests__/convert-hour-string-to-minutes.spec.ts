import { describe, it } from "mocha";
import { expect } from "chai";
import { convertHourStringToMinutes } from "../utils/convert-hour-string-to-minutes";

describe("convertHourStringToMinutes Suit Test", () => {
  it("should be return a minutes amount correctly", () => {
    const paramMock = "20:00";
    const minutes = 1200; //20:00
    const hourStringResult = convertHourStringToMinutes(paramMock);

    expect(hourStringResult).to.be.deep.equal(minutes);
  });

  it("should be return a throw if incorrectly param be a format incorrect", () => {
    const paramMock = "a00";

    expect(() => convertHourStringToMinutes(paramMock)).to.throw(
      "Invalid params for function, your deserver send in format 00:00"
    );
  });
  it("should be return a throw if param is a string empty", () => {
    const paramMock = "";

    expect(() => convertHourStringToMinutes(paramMock)).to.throw(
      "Params cannot be empty"
    );
  });
});
