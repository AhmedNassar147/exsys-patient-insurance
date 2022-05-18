/*
 *
 * Component: `App`.
 *
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppConfigProvider } from "@exsys-clinio/app-config-store";
import LabelsProvider from "@exsys-clinio/labels-provider";
import AppHeader from "@exsys-clinio/app-header";
import DoctorsSearchPage from "@exsys-clinio/doctors-search-page";

const App = () => (
  <BrowserRouter basename="/">
    <AppConfigProvider>
      <LabelsProvider componentName="webDoctorBooking">
        <AppHeader />
        <main>
          <div className="main-clinio-app-wrapper">
            <Routes>
              <Route path="*" element={<DoctorsSearchPage />} />
            </Routes>
          </div>
        </main>
      </LabelsProvider>
    </AppConfigProvider>
  </BrowserRouter>
);

export default App;
