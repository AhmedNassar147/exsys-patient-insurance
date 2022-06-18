/*
 *
 * `HomePage`: `@exsys-patient-insurance/home-page`.
 *
 */
import { memo } from "react";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import SideBarWithItem from "./partials/SideBarWithItem";
import { HomePageWrapper, HomePageContent } from "./styled";

const HomePage = () => {
  return (
    <HomePageWrapper>
      <SideBarWithItem />
      <HomePageContent>
        <FindPatientForm />
      </HomePageContent>
    </HomePageWrapper>
  );
};

export default memo(HomePage);
