/*
 *
 * Component: `SideBarWithItem`.
 *
 */
import { memo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import AppSidebar, { SizeType } from "@exsys-patient-insurance/app-sidebar";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { useCurrentJobId } from "@exsys-patient-insurance/app-config-store";
import Modal from "@exsys-patient-insurance/modal";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import Flex from "@exsys-patient-insurance/flex";
import {
  OnResponseActionType,
  CapitalBooleanStringType,
} from "@exsys-patient-insurance/types";
import { SIDE_BAR_SIZES } from "../constants";
import { StyledLink, StyledText, ScreenItemContainer } from "../styled";

type JobScreenItemType = {
  key: string;
  value: string;
  icon_name: string;
  f_insert?: CapitalBooleanStringType;
  f_update?: CapitalBooleanStringType;
  f_delete?: CapitalBooleanStringType;
  screen_type: string;
};

const ICONS_PROPS = {
  "Ucaf.svg": {
    children: (
      <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" />
    ),
    viewBox: "64 64 896 896",
  },
  "Report.svg": {
    children: (
      <path
        d="M5,9h18v1H5V9z M5,13h8v9H5V13z M6,21h6v-7H6V21z M16,14h7v-1h-7V14z M16,16h7v-1h-7V16z M16,20h7v-1
          h-7V20z M16,18h7v-1h-7V18z M16,22h7v-1h-7V22z M32,7v17c0,2.206-1.794,4-4,4H4c-2.206,0-4-1.794-4-4V5c0-0.552,0.448-1,1-1h26
          c0.552,0,1,0.448,1,1v1h3C31.552,6,32,6.448,32,7z M30,8h-3v14h-1V7V6H2v18c0,1.103,0.897,2,2,2h24c1.103,0,2-0.897,2-2V8z"
      />
    ),
    viewBox: "0 0 32 32",
  },
  "Services.svg": {
    height: "1.7em",
    width: "2em",
    children: (
      <path
        d="M26.2,27H1.1C0.5,27,0,26.6,0,26.1V13.5c0-0.5,0.5-0.9,1.1-0.9h25.2c0.6,0,1.1,0.4,1.1,0.9v12.6C27.3,26.6,26.8,27,26.2,27z
        M26.8,13.5c0-0.2-0.2-0.5-0.5-0.5H1.1c-0.3,0-0.5,0.2-0.5,0.5v12.6c0,0.2,0.2,0.5,0.5,0.5h25.2c0.3,0,0.5-0.2,0.5-0.5
        C26.8,26.1,26.8,13.5,26.8,13.5z M25.2,25.7h-23c-0.3,0-0.5-0.2-0.5-0.5V14.4c0-0.2,0.2-0.4,0.5-0.4h23c0.3,0,0.5,0.2,0.5,0.4v10.8
        C25.7,25.5,25.4,25.7,25.2,25.7z M25.2,14.4h-23v10.8h23C25.2,25.2,25.2,14.4,25.2,14.4z M4.8,20.3c0.1,0,0.3,0.1,0.3,0.2
        c0,0.5,0.2,0.9,0.7,1.2c0.6,0.4,1.5,0.6,2.4,0.5c0.4,0,0.8-0.2,1.3-0.3c0.8-0.2,1.6-0.4,2.3-0.4c0.1,0,0.3,0.1,0.2,0.2
        c0,0.1-0.1,0.2-0.3,0.2c-0.6,0-1.4,0.2-2.1,0.3c-0.5,0.1-1,0.3-1.4,0.3c-0.2,0-0.4,0-0.6,0c-0.9,0-1.7-0.2-2.3-0.6
        c-0.5-0.4-0.8-0.9-0.8-1.6C4.5,20.4,4.7,20.3,4.8,20.3z M11.8,20.7c-0.6,0-1.3,0-1.8,0c-2.8,0-4.5-0.4-5.1-1.1
        c-0.4-0.4-0.2-0.8-0.2-0.8c0-0.1,0.2-0.2,0.3-0.1c0.1,0,0.2,0.2,0.2,0.3c0,0-0.1,0.2,0.1,0.4c0.4,0.4,1.7,1,6.5,0.8
        c0.1,0,0.3,0.1,0.3,0.2C12,20.6,11.9,20.7,11.8,20.7z M5.4,18c-0.4-0.5-0.2-1-0.2-1c0.1-0.1,0.2-0.2,0.4-0.1c0.1,0,0.2,0.2,0.1,0.3
        c0,0-0.1,0.3,0.1,0.6c0.4,0.4,1.7,1.1,6.2,0.9c0.1,0,0.3,0.1,0.3,0.2c0,0.1-0.1,0.2-0.3,0.2c-0.6,0-1.1,0-1.6,0
        C7.7,19.1,6,18.8,5.4,18z M13.1,23.2h1.1c0.1,0,0.3,0.1,0.3,0.2c0,0.1-0.1,0.2-0.3,0.2h-1.1c-0.1,0-0.3-0.1-0.3-0.2
        C12.8,23.3,13,23.2,13.1,23.2z M13.1,24.1h1.1c0.1,0,0.3,0.1,0.3,0.2c0,0.1-0.1,0.2-0.3,0.2h-1.1c-0.1,0-0.3-0.1-0.3-0.2
        C12.8,24.2,13,24.1,13.1,24.1z M15.3,18.7c4.6,0.2,5.9-0.5,6.2-0.9c0.2-0.3,0.1-0.5,0.1-0.5c-0.1-0.1,0-0.2,0.1-0.3
        c0.1,0,0.3,0,0.4,0.1c0,0,0.2,0.5-0.2,1c-0.6,0.8-2.3,1.1-5,1.1c-0.5,0-1.1,0-1.6,0c-0.1,0-0.3-0.1-0.3-0.2
        C15,18.7,15.1,18.6,15.3,18.7z M15.5,20.2c4.7,0.2,6.1-0.4,6.5-0.8c0.2-0.2,0.1-0.4,0.1-0.4c0-0.1,0-0.2,0.2-0.3
        c0.1,0,0.3,0,0.3,0.1c0,0,0.2,0.4-0.2,0.8c-0.6,0.7-2.3,1.1-5.1,1.1c-0.6,0-1.2,0-1.8,0c-0.1,0-0.3-0.1-0.3-0.2
        C15.3,20.3,15.4,20.2,15.5,20.2z M15.5,21.6c0.7-0.1,1.5,0.2,2.3,0.4c0.5,0.1,0.9,0.2,1.3,0.3c0.9,0.1,1.8-0.1,2.4-0.5
        c0.4-0.3,0.6-0.7,0.6-1.2c0-0.1,0.1-0.2,0.3-0.2c0.1,0,0.3,0.1,0.3,0.2c0,0.6-0.3,1.2-0.8,1.6c-0.6,0.4-1.4,0.6-2.3,0.6
        c-0.2,0-0.4,0-0.6,0c-0.4-0.1-0.9-0.2-1.4-0.3c-0.7-0.2-1.5-0.4-2.1-0.3c-0.2,0-0.3-0.1-0.3-0.2C15.2,21.7,15.3,21.6,15.5,21.6z
        M16.1,17.6c-0.5,0-1.1,0-1.6,0c-0.1,0-0.3-0.1-0.3-0.2c0-0.1,0.1-0.2,0.3-0.2c4.5,0.2,5.7-0.5,6-0.9c0.2-0.3,0.1-0.6,0.1-0.6
        c-0.1-0.1,0-0.2,0.1-0.3c0.1-0.1,0.3,0,0.4,0.1c0,0,0.3,0.5-0.1,1C20.4,17.2,18.7,17.6,16.1,17.6z M13.9,18v4.5
        c0,0.1-0.1,0.2-0.3,0.2s-0.3-0.1-0.3-0.2V18c0-0.1,0.1-0.2,0.3-0.2S13.9,17.9,13.9,18z M14.2,16.7h-1.1c-0.1,0-0.3-0.1-0.3-0.2
        c0-0.1,0.1-0.2,0.3-0.2h1.1c0.1,0,0.3,0.1,0.3,0.2C14.4,16.6,14.3,16.7,14.2,16.7z M14.2,15.8h-1.1c-0.1,0-0.3-0.1-0.3-0.2
        c0-0.1,0.1-0.2,0.3-0.2h1.1c0.1,0,0.3,0.1,0.3,0.2C14.4,15.7,14.3,15.8,14.2,15.8z M13.1,17.3c0,0.1-0.1,0.2-0.3,0.2
        c-0.6,0-1.1,0-1.6,0c-2.7,0-4.3-0.4-4.9-1.1c-0.4-0.5-0.1-1-0.1-1c0.1-0.1,0.2-0.2,0.4-0.1s0.2,0.2,0.1,0.3c0,0-0.2,0.3,0.1,0.6
        c0.3,0.4,1.5,1.1,6,0.9C13,17.1,13.1,17.2,13.1,17.3z M17.2,10.3c0.2-0.1,0.4-0.2,0.6-0.4c1.9,0.4,3.7,1.1,5.1,2.2H22
        C20.6,11.2,19,10.6,17.2,10.3z M10.1,10.3c-1.8,0.3-3.4,0.9-4.8,1.8H4.5c1.4-1.1,3.1-1.8,5.1-2.2C9.7,10.1,9.9,10.2,10.1,10.3z
        M13.6,10.8c-3.3,0-5.9-2.3-5.9-5.2s2.6-5.2,5.9-5.2s5.9,2.3,5.9,5.2S16.9,10.8,13.6,10.8z M13.6,0.9c-3,0-5.4,2.1-5.4,4.7
        c0,2.6,2.4,4.7,5.4,4.7S19,8.2,19,5.6C19,3,16.6,0.9,13.6,0.9z M1.6,28.5c0,0.2,0.2,0.4,0.5,0.4h23.2c0.1,0,0.2,0,0.3-0.1
        c0.1-0.1,0.1-0.2,0.1-0.3l0-1h0.5l0,1c0,0.5-0.4,0.8-1,0.8H2.1c-0.6,0-1-0.4-1-0.8v-1h0.5C1.6,27.5,1.6,28.5,1.6,28.5z"
      />
    ),
  },
  "Medication.svg": {
    height: "1.68em",
    children: (
      <path
        d="M20.3,6.2l-2.6,6.7l-7.5-3l2.6-6.7l0,0c0.8-2.1,3.2-3.2,5.2-2.3l0,0C20.1,1.7,21.1,4.1,20.3,6.2z M18,2.7
        c0,0-0.1,0-0.1-0.1c-0.3-0.1-0.6,0-0.7,0.3c-0.1,0.2,0,0.5,0.2,0.6c0.5,0.4,0.7,1.1,0.5,1.7l-1.6,4.3c-0.1,0.3,0,0.6,0.3,0.7
        c0.3,0.1,0.6,0,0.7-0.3l1.6-4.3C19.3,4.6,18.9,3.4,18,2.7z M14.6,21.1L14.6,21.1c-0.8,2.1-3.2,3.2-5.2,2.3l0,0
        c-2.1-0.8-3.1-3.2-2.3-5.3l2.6-6.7l7.5,3C17.1,14.4,14.6,21.1,14.6,21.1z M7.8,7.2L1.7,1l0.2-0.2C2.7,0.3,3.8,0,4.8,0.1l0,0
        c0.8,0.1,1.5,0.3,2.2,0.8C8.9,2.3,9.3,5,7.9,7C7.9,7,7.8,7.2,7.8,7.2z M8.1,4.1L8.1,4.1C7.9,2.4,6.6,1,5,0.8C4.8,0.7,4.6,0.9,4.6,1
        s0.1,0.3,0.3,0.3c1.4,0.2,2.5,1.4,2.6,2.8c0,0.4,0,0.7-0.1,1.1c-0.1,0.2,0,0.3,0.2,0.4c0.2,0,0.3,0,0.4-0.2C8,5,8.1,4.6,8.1,4.1z
        M7,8C6.3,8.4,5.6,8.7,4.7,8.8C2.4,9,0.3,7.2,0.1,4.7C0.1,3.7,0.3,2.7,1,1.8l0.2-0.2l6.1,6.2C7.2,7.8,7,8,7,8z"
      />
    ),
  },
  "Batches.svg": {
    viewBox: "0 0 1024 1024",
    children: (
      <>
        <path d="M220,389.3v433.4c0,18.4,13.8,32.3,32.3,32.3h555.6c18.4,0,32.3-13.8,32.3-32.3V389.3c0-18.4-13.8-32.3-32.3-32.3H252.3C233.9,357.1,220,373.2,220,389.3L220,389.3z M284.6,421.6L284.6,421.6h491v368.8h-491V421.6L284.6,421.6z M40.2,642.9L40.2,642.9c18.4,0,32.3-13.8,32.3-32.3V209.5h523.3c18.4,0,32.3-13.8,32.3-32.3S614.2,145,595.8,145H42.5l0,0c-18.4,0-32.3,13.8-32.3,32.3v433.4C7.9,626.8,21.8,642.9,40.2,642.9L40.2,642.9z M146.3,251L146.3,251c-18.4,0-32.3,13.8-32.3,32.3v433.4c0,18.4,13.8,32.3,32.3,32.3c18.4,0,32.3-13.8,32.3-32.3V315.6h523.3c18.4,0,32.3-13.8,32.3-32.3S720.3,251,701.8,251H146.3L146.3,251L146.3,251z" />
        <path d="M402.2,486.2l-66.9,50.7c0,0,172.9,145.2,267.4,281.2c0,0,59.9-237.4,387.3-532.5L976.2,251c0,0-191.3,89.9-415,371.2C558.9,622.2,501.3,564.5,402.2,486.2z" />
      </>
    ),
  },
  "Users.svg": {
    viewBox: "64 64 896 896",
    children: (
      <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
    ),
  },
  "Dboard.svg": {
    viewBox: "64 64 896 896",
    children: (
      <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-616-64h536c4.4 0 8-3.6 8-8V284c0-7.2-8.7-10.7-13.7-5.7L592 488.6l-125.4-124a8.03 8.03 0 00-11.3 0l-189 189.6a7.87 7.87 0 00-2.3 5.6V720c0 4.4 3.6 8 8 8z" />
    ),
  },
};

const initialState = {
  reports: [] as JobScreenItemType[],
  screens: [] as JobScreenItemType[],
};

type JobsResponseType = typeof initialState;

interface SideBarWithItemProps {
  sideBarSize: SizeType;
  setSideBarSize: React.Dispatch<React.SetStateAction<SizeType>>;
}

const SideBarWithItem = ({
  sideBarSize,
  setSideBarSize,
}: SideBarWithItemProps) => {
  const jobId = useCurrentJobId();
  const [{ screens, reports }, setScreens] = useState(initialState);
  const { visible, handleOpen, handleClose } = useOpenCloseActionsWithState();
  const { pathname } = useLocation() || {};

  const handleResponse: OnResponseActionType<JobsResponseType> = useCallback(
    ({ apiValues }) => {
      setScreens(() => apiValues);
    },
    []
  );

  const { loading } = useBasicQuery<JobsResponseType>({
    apiId: "QUERY_JOB_SCREENS_LIST",
    callOnFirstRender: !!jobId,
    onResponse: handleResponse,
    enableNetworkCache: true,
    params: {
      job_id: jobId,
    },
  });

  const shouldRenderScreens = !loading || !screens?.length;
  const isLargeSideBarSize = sideBarSize === "large";
  const hasReports = !loading && !!reports?.length;

  return (
    <AppSidebar
      minWidth={SIDE_BAR_SIZES.small}
      maxWidth={SIDE_BAR_SIZES.large}
      onChange={setSideBarSize}
    >
      {shouldRenderScreens
        ? screens?.map(({ value, key, icon_name }) => (
            <StyledLink key={key} to={`/${key}`} title={value}>
              <ScreenItemContainer
                height="33px"
                width="100%"
                align="center"
                gap="5px"
                selected={pathname === `/${key}`}
                justify={!isLargeSideBarSize ? "center" : undefined}
              >
                <svg
                  width="1.5em"
                  height="1.56em"
                  fill="currentColor"
                  {...ICONS_PROPS[icon_name as keyof typeof ICONS_PROPS]}
                />

                {isLargeSideBarSize ? (
                  <StyledText disableTranslation>{value}</StyledText>
                ) : null}
              </ScreenItemContainer>
            </StyledLink>
          ))
        : null}

      {hasReports && (
        <ScreenItemContainer
          height="33px"
          width="100%"
          align="center"
          gap="5px"
          justify={!isLargeSideBarSize ? "center" : undefined}
          title="rprts"
          onClick={handleOpen}
        >
          <svg
            width="1.5em"
            height="1.56em"
            fill="currentColor"
            {...ICONS_PROPS["Ucaf.svg"]}
          />

          {isLargeSideBarSize ? <StyledText>rprts</StyledText> : null}
        </ScreenItemContainer>
      )}

      <Modal
        onClose={handleClose}
        title="rprts"
        width="400px"
        noCancelButton
        visible={visible}
      >
        <Flex width="100%" gap="12px" wrap="true">
          {reports.map(({ key, value }) => (
            <ScreenItemContainer
              height="33px"
              width="calc(100% / 2 - 6px)"
              align="center"
              justify="center"
              gap="5px"
              bordered
              key={key}
            >
              <StyledText>{value}</StyledText>
            </ScreenItemContainer>
          ))}
        </Flex>
      </Modal>
    </AppSidebar>
  );
};

export default memo(SideBarWithItem);
