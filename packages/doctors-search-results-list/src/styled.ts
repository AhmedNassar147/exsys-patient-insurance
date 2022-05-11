/*
 *
 * Styled: `@exsys-clinio/doctors-search-results-list`.
 *
 */
import styled from "styled-components";
import { spacings, colors } from "@exsys-clinio/theme-values";
import mediaQueries from "@exsys-clinio/media-queries";

export const DoctorInfoContianerWrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${colors.inputBorderColor};
  border-radius: ${spacings.sp2};
  margin-bottom: ${spacings.sp5};
  padding: ${spacings.sp3};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacings.sp4};
  ${mediaQueries.lg`
    gap: unset;
    padding: ${spacings.sp5};
    margin-bottom: ${spacings.sp4};
  `};
`;

export const DoctorInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.sp2};
  margin-inline-start: ${spacings.sp5};
  width: ${spacings.sp30};
`;

export const AllDoctorInfoWrapper = styled.div`
  display: flex;
  gap: ${spacings.sp4};
  flex: 1;
  width: 100%;
  grid-column: span 2 / auto;
  ${mediaQueries.lg`
    width: unset;
    grid-column: unset;
  `};
`;
