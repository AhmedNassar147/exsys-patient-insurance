/*
 *
 * Component: `App`.
 *
 */
import { AppConfigProvider } from "@exsys-clinio/app-config-store";
import LabelsProvider from "@exsys-clinio/labels-provider";
import AppHeader from "@exsys-clinio/app-header";
import DoctorsSearchPage from "@exsys-clinio/doctors-search-page";

const App = () => (
  <AppConfigProvider>
    <LabelsProvider>
      <AppHeader />
      <main>
        <DoctorsSearchPage />
      </main>
    </LabelsProvider>
  </AppConfigProvider>
);

export default App;
