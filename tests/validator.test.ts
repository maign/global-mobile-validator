import { checkValidMobileNumber, formatMobileNumber, Country } from "../src/";

describe("Mobile Number Validator", () => {
  test("US mobile number validation", () => {
    // Valid US numbers (with and without leading 1)
    expect(checkValidMobileNumber(Country.US, "2234567890")).toBe(true);
    expect(checkValidMobileNumber(Country.US, "12234567890")).toBe(true);

    // Invalid US numbers
    expect(checkValidMobileNumber(Country.US, "1234567890")).toBe(false); // Invalid area code
    expect(checkValidMobileNumber(Country.US, "223456789012")).toBe(false); // Too long
    expect(checkValidMobileNumber(Country.US, "abcdef1234")).toBe(false); // Non-numeric
  });

  test("UK mobile number validation", () => {
    expect(checkValidMobileNumber(Country.UK, "07123456789")).toBe(true);
    expect(checkValidMobileNumber(Country.UK, "06123456789")).toBe(false);
    expect(checkValidMobileNumber(Country.UK, "071234567")).toBe(false);
  });

  test("India mobile number validation", () => {
    expect(checkValidMobileNumber(Country.India, "9876543210")).toBe(true);
    expect(checkValidMobileNumber(Country.India, "5555555555")).toBe(false);
    expect(checkValidMobileNumber(Country.India, "1987654321")).toBe(false);
  });

  test("Mobile number formatting", () => {
    // US number formatting
    expect(formatMobileNumber(Country.US, "2234567890")).toBe(
      "+1 (223) 456-7890"
    );
    expect(formatMobileNumber(Country.US, "12234567890")).toBe(
      "+1 (223) 456-7890"
    );

    // UK number formatting
    expect(formatMobileNumber(Country.UK, "07911123456")).toBe(
      "+44 079 1112 3456"
    );

    // India number formatting
    expect(formatMobileNumber(Country.India, "9876543210")).toBe(
      "+91 98765 43210"
    );
  });

  test("Invalid mobile number formatting throws error", () => {
    expect(() => formatMobileNumber(Country.US, "1234567890")).toThrow(
      "Invalid mobile number"
    );
    expect(() => formatMobileNumber(Country.UK, "06123456789")).toThrow(
      "Invalid mobile number"
    );
  });
});
