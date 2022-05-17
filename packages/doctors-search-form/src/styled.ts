/*
 *
 * Styled: `@exsys-clinio/doctors-search-form`.
 *
 */
import styled from "styled-components";
import { spacings } from "@exsys-clinio/theme-values";
import mediaQueries from "@exsys-clinio/media-queries";

export const DoctorsFormWrapper = styled.div`
  display: grid;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  width: 100%;
  > .specialty-input {
    grid-column: span 4 / auto;
  }

  > .period-input,
  .search-button {
    grid-column: span 2 / auto;
  }

  ${mediaQueries.md`
  > .specialty-input {
      grid-column: span 2 / auto;
    };
    > .period-input {
      grid-column: unset;
      width: ${spacings.sp29};
    }

    > .search-button {
      grid-column: unset;
    }
  `};
`;
