/*
 *
 * apiIds: `@exsys-patient-insurance/api-constants`.
 *
 */
const API_IDS = {
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_SECURITY/Ex_page_lable?pPageId=clinicalDoctorsSearch&planguageid=1&authorization=1634454
  QUERY_EXSYS_PAGE_LABELS: "EX_SECURITY/Ex_page_lable",
  // http://207.180.237.36:9090/ords/exsys_api/mi_web_user/mi_validate_user?username=admin&password=123456&location=my_ip
  MAKE_LOGIN: "mi_web_user/mi_validate_user",
  CHANGE_USER_PASSWORD: "",
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_CODES/POP_CODES_WITH_CODE?pcodetype=408&planguageid=1&authorization=1634454
  CODE_LIST: "EX_CODES/POP_CODES_WITH_CODE",
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_CODES/pop_codes_with_u_code?pcodetype=408&planguageid=1&authorization=1634454
  U_CODE_LIST: "EX_CODES/pop_codes_with_u_code",
  // http://207.180.237.36:9090/ords/exsys_api/mi_web_user/pop_user_job_screen?authorization=3784948&planguageid=1&job_id=1&
  QUERY_JOB_SCREENS_LIST: "mi_web_user/pop_user_job_screen",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/pop_patient_card_data?authorization=3574833&planguageid=1&search_type=C&search_value=CSA-0334-00-06-0978
  QUERY_PATIENT_DATA: "mi_ucaf_request/pop_patient_card_data",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/get_ucaf_serial_request?authorization=3798723&root_organization_no=001&patient_card_no=CSA-0334-00-01-0055&planguageid=1&paper_serial=124&provider_no=4
  QUERY_UCAF_REQUESTS_DATA: "mi_ucaf_request/get_ucaf_serial_request",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/pop_diagnosis_data?authorization=3574833&department_id=3&search_type=F&search_word=
  QUERY_DIAGNOSIS_DATA: "mi_ucaf_request/pop_diagnosis_data",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/pop_provider_service_data?authorization=3574833&root_organization_no=001&patient_card_no=CSA-0334-00-01-0055&planguageid=1&ucaf_date=01-06-2022&provider_no=4&claim_flag=A&attendance_type=O&search_word=&poffset=0
  QUERY_SERVICES_REQUESTS_DATA: "mi_ucaf_request/pop_provider_service_data",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/mi_provider_ucaf_dml
  POST_SERVICES_REQUESTS_ITEM: "mi_ucaf_request/mi_provider_ucaf_dml",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/mi_provider_ucaf_delivery
  POST_DELIVER_SERVICES_REQUESTS_ITEM:
    "mi_ucaf_request/mi_provider_ucaf_delivery",
};

export default API_IDS;
