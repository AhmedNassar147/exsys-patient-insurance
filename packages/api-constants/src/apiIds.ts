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
};

export default API_IDS;
