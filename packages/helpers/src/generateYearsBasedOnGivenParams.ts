/*
 *
 * `generateYearsBasedOnGivenParams`: `@exsys-patient-insurance/helpers`.
 *
 */
export interface GenerateYearsBasedOnGivenParamsType {
  startAtYear?: number;
  howManyYearsBefore?: number;
  howManyYearsAfter?: number;
  includeStartingYear?: boolean;
}

const getYearsAfterOrBefore = (
  years: number = 0,
  startYear: number,
  isCreatingYearsBefore?: boolean
) => {
  let generatedYearsArray: number[] = [];

  for (let i = 1; i <= years; i++) {
    const yearAddedOrSubtracted = isCreatingYearsBefore
      ? startYear - i
      : startYear + i;
    generatedYearsArray = [...generatedYearsArray, yearAddedOrSubtracted];
  }
  return generatedYearsArray;
};

export const generateYearsBasedOnGivenParams = ({
  startAtYear,
  howManyYearsBefore,
  howManyYearsAfter,
  includeStartingYear = true,
}: GenerateYearsBasedOnGivenParamsType) => {
  const currentYear = new Date().getFullYear();

  const finalStartYear = startAtYear || currentYear;
  let generatedYears: number[] = [
    ...(includeStartingYear ? [finalStartYear] : []),
  ];

  if (process.env.NODE_ENV === "development") {
    if (!howManyYearsBefore && !howManyYearsAfter) {
      throw new Error(
        "You should provide howManyYearsBefore or howManyYearsAfter "
      );
    }
  }

  if (howManyYearsBefore) {
    generatedYears = generatedYears.concat(
      getYearsAfterOrBefore(howManyYearsBefore, finalStartYear, true)
    );
  }

  if (howManyYearsAfter) {
    generatedYears = generatedYears.concat(
      getYearsAfterOrBefore(howManyYearsAfter, finalStartYear)
    );
  }

  return generatedYears.sort();
};
