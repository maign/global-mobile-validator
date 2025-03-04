import { Country } from "./countries";

export function checkValidMobileNumber(
  countryName: Country,
  phoneNumber: string
): boolean {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  switch (countryName) {
    case Country.US:
      // US phone number validation (10 digits, optional leading 1)
      return (
        /^(1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(cleanedNumber) &&
        (cleanedNumber.length === 10 || cleanedNumber.length === 11)
      );

    case Country.UK:
      // UK mobile number validation (starts with 07, 11 digits total)
      return /^(07\d{9})$/.test(cleanedNumber);

    case Country.India:
      // Indian mobile number validation (starts with 6-9, 10 digits)
      return /^[6-9]\d{9}$/.test(cleanedNumber);

    case Country.Canada:
      // Canadian phone number validation (10 digits)
      return (
        /^(1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(cleanedNumber) &&
        (cleanedNumber.length === 10 || cleanedNumber.length === 11)
      );

    case Country.Australia:
      // Australian mobile number validation (starts with 04, 9 digits after)
      return /^(04\d{8})$/.test(cleanedNumber);

    case Country.Germany:
      // German mobile number validation (starts with +49 or 0, 10-11 digits)
      return /^(49|0)1\d{9}$/.test(cleanedNumber);

    case Country.France:
      // French mobile number validation (starts with 06 or 07, 9 digits after)
      return /^(06|07)\d{8}$/.test(cleanedNumber);

    case Country.Japan:
      // Japanese mobile number validation (starts with 090, 080, or 070, 10 digits)
      return /^(090|080|070)\d{7}$/.test(cleanedNumber);

    case Country.Brazil:
      // Brazilian mobile number validation (starts with 9, 11 digits total)
      return /^(9\d{10})$/.test(cleanedNumber);

    case Country.China:
      // Chinese mobile number validation (starts with 1, 11 digits)
      return /^1\d{10}$/.test(cleanedNumber);

    default:
      throw new Error("Unsupported country");
  }
}

// Utility function to format mobile number
export function formatMobileNumber(
  countryName: Country,
  phoneNumber: string
): string {
  // Remove all non-digit characters
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // For US numbers, strip leading 1 if present
  const normalizedNumber =
    countryName === Country.US && cleanedNumber.length === 11
      ? cleanedNumber.slice(1)
      : cleanedNumber;

  // Validate the normalized number before formatting
  if (!checkValidMobileNumber(countryName, normalizedNumber)) {
    throw new Error("Invalid mobile number");
  }

  switch (countryName) {
    case Country.US:
      return `+1 (${normalizedNumber.slice(0, 3)}) ${normalizedNumber.slice(
        3,
        6
      )}-${normalizedNumber.slice(6)}`;

    case Country.UK:
      return `+44 ${normalizedNumber.slice(1, 4)} ${normalizedNumber.slice(
        4,
        7
      )} ${normalizedNumber.slice(7)}`;

    case Country.India:
      return `+91 ${normalizedNumber.slice(0, 5)} ${normalizedNumber.slice(5)}`;

    // Add more country-specific formatting as needed
    default:
      return normalizedNumber;
  }
}
