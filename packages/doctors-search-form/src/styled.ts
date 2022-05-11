/*
 *
 * Styled: `@exsys-clinio/doctors-search-form`.
 *
 */
import styled from "styled-components";
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

  > .period-and-button {
    grid-column: span 2 / auto;
  }

  ${mediaQueries.md`
  > .specialty-input {
      grid-column: span 2 / auto;
    };
    > .period-and-button {
      grid-column: unset;
    }
  `};
`;
