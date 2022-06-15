/*
 *
 * Component: `ClientLogo`.
 *
 */
import { memo } from "react";
// import { useCallback, memo, useState } from "react";
// import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
// import { QueryResponseValuesType } from "@exsys-patient-insurance/types";
// import { ClientLogoImg } from "../styled";

// const ClientLogo = () => {
//   const [clientLogoUrl, setClientLogo] = useState("");

//   const onResponse = useCallback(
//     ({ apiValues: { client_logo } }: QueryResponseValuesType) => {
//       setClientLogo(() => client_logo || "");
//     },
//     []
//   );

//   useBasicQuery({
//     apiId: "CLIENT_LOGO",
//     callOnFirstRender: true,
//     runQueryWhenLanguageChanged: false,
//     onResponse,
//     excludeAuthorization: true,
//     excludeUserDb: true,
//   });

//   if (!clientLogoUrl) {
//     return null;
//   }

//   return <ClientLogoImg src={clientLogoUrl} alt="client logo" />;
// };

const ClientLogo = () => {
  return null;
};

export default memo(ClientLogo);
