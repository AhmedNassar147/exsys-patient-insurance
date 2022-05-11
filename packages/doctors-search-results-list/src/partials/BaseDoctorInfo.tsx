/*
 *
 *
 * Package: `@exsys-clinio/doctors-search-results-list`.
 *
 */
import { memo } from "react";
import Image from "@exsys-clinio/image";
import Text from "@exsys-clinio/text";
import Flex from "@exsys-clinio/flex";
import { colors, spacings } from "@exsys-clinio/theme-values";
import DoctorSessionsView from "@exsys-clinio/doctor-sessions-view";
import TimeIcon from "./TimeIcon";
import EarplugIcon from "./EarplugIcon";
import TextWithIcon from "./TextWithIcon";
import {
  DoctorInfoContianerWrapper,
  DoctorInfoWrapper,
  AllDoctorInfoWrapper,
} from "../styled";
import { DoctorInfoType } from "../index.interface";

interface DoctorInfoViewProps {
  periodType: string;
  doctorInfo: DoctorInfoType;
}

// for save =>
// remove "appointment_type": "N",
// remove "session_length": 0

const DoctorInfoView = ({
  periodType,
  doctorInfo: {
    image_id,
    clinical_name,
    about_doctor,
    clinic_time,
    clinical_entity_no,
    session_code,
    seniority_level,
    specialty_name,
    nationality_flag,
  },
}: DoctorInfoViewProps) => (
  <DoctorInfoContianerWrapper>
    <AllDoctorInfoWrapper>
      <Image
        src={image_id}
        alt="doc"
        height="sp20"
        width="sp20"
        borderRadius="4px"
      />
      <DoctorInfoWrapper>
        <Flex align="center" gap={spacings.sp2}>
          <Image
            src={nationality_flag}
            alt="nationality"
            height="sp7"
            width="sp9"
            borderRadius="4px"
          />

          <Text
            disableTranslation
            children={clinical_name}
            fontSize="ff8"
            weight="700"
            lines={3}
          />
        </Flex>

        <TextWithIcon
          icon={EarplugIcon}
          disableTranslation
          textValue={about_doctor}
          color={colors.black2}
          lines={4}
        />

        {clinic_time && (
          <TextWithIcon
            icon={TimeIcon}
            disableTranslation
            textValue={clinic_time}
            color={colors.lightGreen}
            fontSize="ff9"
            weight="400"
          />
        )}

        <Text
          children={`__t__senioritylvl : ${seniority_level}`}
          fontSize="ff9"
          weight="400"
        />

        <Text
          children={`__t__spec : ${specialty_name}`}
          fontSize="ff9"
          weight="400"
        />
      </DoctorInfoWrapper>
    </AllDoctorInfoWrapper>
    <DoctorSessionsView
      periodType={periodType}
      clinicalEntityNo={clinical_entity_no}
      sessionCode={session_code}
    />
  </DoctorInfoContianerWrapper>
);

export default memo(DoctorInfoView);
