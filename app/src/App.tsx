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
import BasePageWrapper from "@exsys-patient-insurance/base-page-wrapper";
import AppFooter from "@exsys-patient-insurance/app-footer";
import LoginPage from "@exsys-patient-insurance/login-page";
import UcafListPage from "@exsys-patient-insurance/ucaf-list-page";

const App = () => (
  <>
    <BrowserRouter basename="/">
      <AppConfigProvider>
        <LabelsProvider>
          <AppHeader />
          <main>
            <Suspense fallback={null}>
              <BasePageWrapper>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="tpaUcaf" element={<UcafListPage />} />
                </Routes>
              </BasePageWrapper>
            </Suspense>
          </main>
        </LabelsProvider>
      </AppConfigProvider>
    </BrowserRouter>
    <AppFooter />
  </>
);

export default App;
