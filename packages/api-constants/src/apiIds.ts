/*
 *
 * apiIds: `@exsys-patient-insurance/api-constants`.
 *
 */
const API_IDS = {
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_SECURITY/exsys_upload_file
  POST_EXSYS_UPLOAD_FILE: "EX_SECURITY/exsys_upload_file",
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_SECURITY/Ex_page_lable?pPageId=clinicalDoctorsSearch&planguageid=1&authorization=1634454
  QUERY_EXSYS_PAGE_LABELS: "EX_SECURITY/Ex_page_lable",
  // http://207.180.237.36:9090/ords/exsys_api/mi_web_user/mi_validate_user?username=admin&password=123456&location=my_ip
  MAKE_LOGIN: "mi_web_user/mi_validate_user",
  CHANGE_USER_PASSWORD: "",
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_CODES/POP_CODES_WITH_CODE?pcodetype=408&planguageid=1&authorization=1634454
  CODE_LIST: "EX_CODES/POP_CODES_WITH_CODE",
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_CODES/pop_codes_with_u_code?pcodetype=408&planguageid=1&authorization=1634454
  U_CODE_LIST: "EX_CODES/pop_codes_with_u_code",
  // http://207.180.237.36:9090/ords/exsys_api/mi_claim/pop_provider_tpa?authorization=3840267&provider_no=4&planguageid=1
  QUERY_TPA_PROVIDER_LIST: "mi_claim/pop_provider_tpa",
  // http://207.180.237.36:9090/ords/exsys_api/mi_web_user/pop_user_job_screen?authorization=3784948&planguageid=1&job_id=1&
  QUERY_JOB_SCREENS_LIST: "mi_web_user/pop_user_job_screen",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/get_ucaf_serial_request?authorization=3798723&root_organization_no=001&patient_card_no=CSA-0334-00-01-0055&planguageid=1&paper_serial=124&provider_no=4&pageType="D"
  QUERY_UCAF_REQUESTS_DATA: "mi_ucaf_request/get_ucaf_serial_request",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/pop_diagnosis_data?authorization=3574833&department_id=3&search_type=F&search_word=
  QUERY_MI_DIAGNOSIS_DATA: "mi_ucaf_request/pop_diagnosis_data",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/pop_provider_service_data?authorization=3574833&root_organization_no=001&patient_card_no=CSA-0334-00-01-0055&planguageid=1&ucaf_date=01-06-2022&provider_no=4&claim_flag=A&attendance_type=O&search_word=&poffset=0
  QUERY_MI_SERVICES_REQUESTS_TABLE_DATA:
    "mi_ucaf_request/pop_provider_service_data",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/mi_provider_ucaf_dml
  POST_SERVICES_REQUESTS_ITEM: "mi_ucaf_request/mi_provider_ucaf_dml",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/mi_provider_ucaf_delivery
  POST_DELIVER_SERVICES_REQUESTS_ITEM:
    "mi_ucaf_request/mi_provider_ucaf_delivery",
  // http://207.180.237.36:9090/ords/exsys_api/mi_claim/get_provider_batch?authorization=3840267&type=T&provider_no=4&year=2022&month=&planguageid=1&tpa_no=001
  QUERY_MI_BATCHES_TABLE_DATA: "mi_claim/get_provider_batch",
  // http://207.180.237.36:9090/ords/exsys_api/mi_claim/mi_provider_batch_auto_create
  POST_MI_BATCHES_TABLE_DATA: "mi_claim/mi_provider_batch_auto_create",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/pop_ucaf_providers_attachment?authorization=3574833&provider_no=&ucaf_id=
  QUERY_UCAF_ATTACHMENTS: "mi_ucaf_request/pop_ucaf_providers_attachment",
  // http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/ucaf_providers_attachment_dml
  POST_UCAF_ATTACHMENT: "mi_ucaf_request/ucaf_providers_attachment_dml",
  // http://207.180.237.36:9090/ords/exsys_api/mi_claim/get_patient_limits?authorization=3232107&planguageid=1&patient_card_no=1800
  QUERY_MI_PATIENT_LIMIT_DATA: "mi_claim/get_patient_limits",
  // http://149.102.140.8:9090/ords/exsys_api/mi_ucaf_request/pop_patient_card_data?authorization=1419715&planguageid=1&search_type=C&search_value=CSA-0334-00-06-0978
  QUERY_MI_UCAF_PATIENT_DATA: "mi_ucaf_request/pop_patient_card_data",
  // http://149.102.140.8:9090/ords/exsys_api/mi_provider_request/mi_patient_ucaf_query?authorization=1419715&planguageid=1&patient_card_no=CSA-0334-00-01-0055
  QUERY_MI_UCAF_PATIENTS_TABLE_DATA:
    "mi_provider_request/mi_patient_ucaf_query",
  // http://207.180.237.36:9090/ords/exsysexsysdba/mi_ucaf_request/get_patient_history?authorization=3840267&current_doctor_only=N&current_specialty_only=N&patientfileno=1900&organization_no=001&doctor_id
  QUERY_MI_PROVIDERS_APPROVAL_PATIENT_HISTORY:
    "mi_ucaf_request/get_patient_history",
  // http://207.180.237.36:9090/ords/exsysexsysdba/mi_pkg/pop_provider_data?provider_category=&planguageid=1&authorization=2687828&doctor_only=N
  QUERY_PROVIDER_NAMES_LIST: "mi_pkg/pop_provider_data",
  // http://5.1810.142.107:100100/ords/exsys_api/mi_pkg/pop_mi_invoice_department?authorization=2017102&planguageid=1
  QUERY_MI_DEPARTMENTS_LIST: "mi_pkg/pop_mi_invoice_department",
  // http://149.102.140.8:9090/ords/exsys_api/mi_ucaf_request/ucaf_providers_link_dml
  POST_LINK_MI_SERVICES: "mi_ucaf_request/ucaf_providers_link_dml",
  // http://149.102.140.8:9090/ords/exsys_api/mi_ucaf_request/get_ucafe_consultation?authorization=2073174&planguageid=1&root_organization_no=001&patient_card_no=2222&ucaf_date=31-10-2022&claim_flag=A&attendance_type=O&provider_no=11264
  QUERY_DEFAULT_SERVICES_DATA: "mi_ucaf_request/get_ucafe_consultation",
  // http://149.102.140.8:9090/ords/exsys_api/mi_web_user/pop_mi_web_user?authorization=1419715&planguageid=1&provider_no=&mobile_no=
  QUERY_TPA_USERS_TABLE_DATA: "mi_web_user/pop_mi_web_user",
  // http://149.102.140.8:9090/ords/exsys_api/mi_web_user/dml_web_user_data
  POST_TPA_USER_TABLE_DATA: "mi_web_user/dml_web_user_data",
  //http://207.180.237.36:9090/ords/exsys_api/ex_hr/pop_staff_code?authorization=2230910&planguageid=1&search_word=111
  QUERY_HR_STAFF_CODES_LIST: "ex_hr/pop_staff_code",
  // http://149.102.140.8:9090/ords/exsys_api/mi_web_user/pop_job_list?planguageid=1&authorization=1861562
  QUERY_JOB_ID_LIST: "mi_web_user/pop_job_list",
  // http://149.102.140.8:9090/ords/exsys_api/mi_ucaf_request/pop_patient_active_ucaf?authorization=201792&patient_card_no=2222&provider_no=11264
  QUERY_UCAF_SERIAL_LIST: "mi_ucaf_request/pop_patient_active_ucaf",
  // http://149.102.140.8:9090/ords/exsysexsysdba/mi_pkg/pop_mi_customers?planguageid=1&authorization=2036718
  QUERY_ACCOUNTS_LIST: "mi_pkg/pop_mi_customers",
  // http://149.102.140.8:9090/ords/exsys_api/mi_desk_top/mi_client_patient?authorization=3037948&client_id=100127&date_to=10-11-2023
  QUERY_CLIENT_DASHBOARD_PATIENT_CHART_DATA: "mi_desk_top/mi_client_patient",
  // http://149.102.140.8:9090/ords/exsys_api/mi_desk_top/mi_client_additions_patient?authorization=3037948&client_id=100127&date_from=01-01-2020&date_to=10-11-2020
  QUERY_CLIENT_DASHBOARD_ADDITION_PATIENT_CHART_DATA:
    "mi_desk_top/mi_client_additions_patient",
  // http://149.102.140.8:9090/ords/exsys_api/mi_desk_top/mi_client_cancelations_patient?authorization=3037948&client_id=100127&date_from=01-01-2020&date_to=10-11-2020
  QUERY_CLIENT_DASHBOARD_CANCELATION_PATIENT_CHART_DATA:
    "mi_desk_top/mi_client_cancelations_patient",
  // http://149.102.140.8:9090/ords/exsys_api/mi_desk_top/mi_client_top_patient_visit?authorization=3037948&client_id=100127&date_from=01-01-2020&date_to=10-11-2020&no_of_visit=5
  QUERY_CLIENT_DASHBOARD_PATIENT_TOP_VISITS_TABLE_DATA:
    "mi_desk_top/mi_client_top_patient_visit",
};

export default API_IDS;
