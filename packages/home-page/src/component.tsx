/*
 *
 * `HomePage`: `@exsys-patient-insurance/home-page`.
 *
 */
import { memo } from "react";
import SideBarWithItem from "./partials/SideBarWithItem";
import { HomePageWrapper, HomePageContent } from "./styled";

const HomePage = () => {
  return (
    <HomePageWrapper>
      <SideBarWithItem />
      <HomePageContent>
        <p>ahmed</p>
      </HomePageContent>
    </HomePageWrapper>
  );
};

export default memo(HomePage);
