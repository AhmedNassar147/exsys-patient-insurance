/*
 *
 * Component: `App`.
 *
 */
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppConfigProvider } from "@exsys-patient-insurance/app-config-store";
import LabelsProvider from "@exsys-patient-insurance/labels-provider";
import AppHeader from "@exsys-patient-insurance/app-header";
import AppFooter from "@exsys-patient-insurance/app-footer";
import LoginPage from "@exsys-patient-insurance/login-page";
// import HomePage from "@exsys-patient-insurance/home-page";

const App = () => (
  <>
    <BrowserRouter basename="/">
      <AppConfigProvider>
        <LabelsProvider componentName="webDoctorBooking">
          <AppHeader />
          <main>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                {/* <Route path="/home" element={<HomePage />}>
                  <Route path=":contentRouteName" />
                </Route> */}
              </Routes>
            </Suspense>
          </main>
        </LabelsProvider>
      </AppConfigProvider>
    </BrowserRouter>
    <AppFooter />
  </>
);

export default App;
