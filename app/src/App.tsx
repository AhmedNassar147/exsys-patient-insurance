/*
 *
 * Component: `App`.
 *
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppConfigProvider } from "@exsys-patient-insurance/app-config-store";
import LabelsProvider from "@exsys-patient-insurance/labels-provider";
import AppHeader from "@exsys-patient-insurance/app-header";
import DoctorsSearchPage from "@exsys-patient-insurance/doctors-search-page";

const App = () => (
  <BrowserRouter basename="/">
    <AppConfigProvider>
      <LabelsProvider componentName="webDoctorBooking">
        <AppHeader />
        <main>
          <Routes>
            <Route path="*" element={<DoctorsSearchPage />} />
          </Routes>
        </main>
      </LabelsProvider>
    </AppConfigProvider>
  </BrowserRouter>
);

export default App;
