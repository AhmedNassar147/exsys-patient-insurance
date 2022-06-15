/*
 *
 * `HomePage`: `@exsys-patient-insurance/home-page`.
 *
 */
import { memo } from "react";
import AppSidebar from "@exsys-patient-insurance/app-sidebar";
import { HomePageWrapper, HomePageContent } from "./styled";

const HomePage = () => {
  return (
    <HomePageWrapper>
      <AppSidebar minWidth="80px" maxWidth="200px">
        <p>ahmed</p>
        <p>ahmed</p>
        <p>ahmed</p>
        <p>ahmed</p>
        <p>ahmed</p>
        <p>ahmed</p>
      </AppSidebar>

      <HomePageContent>
        <p>ahmed</p>
      </HomePageContent>
    </HomePageWrapper>
  );
};

export default memo(HomePage);
