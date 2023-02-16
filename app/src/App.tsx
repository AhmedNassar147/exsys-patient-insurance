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
import MiBatchesPage from "@exsys-patient-insurance/mi-batches-page";
import UsersListPage from "@exsys-patient-insurance/users-list-page";
import ClientDashboardPage from "@exsys-patient-insurance/client-dashboard-page";
import SalesDetailsPage from "@exsys-patient-insurance/sales-details-page";

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
                  <Route path="tpaUcaf/:pageType" element={<UcafListPage />} />
                  <Route path="tpaMiBatches" element={<MiBatchesPage />} />
                  <Route path="tpaUsers" element={<UsersListPage />} />
                  <Route
                    path="clientDBoard"
                    element={<ClientDashboardPage />}
                  />
                  <Route path="salesDetails" element={<SalesDetailsPage />} />
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
