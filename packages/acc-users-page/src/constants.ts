/*
 *
 * Constants: `@exsys-patient-insurance/acc-users`.
 *
 */

export const initialValues = {
  new_password: "",
  account_no: "",
};

export const TABLE_COLUMNS = [
  {
    title: "usrid",
    dataIndex: "key",
    width: "30%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "usrnme",
    dataIndex: "user_name",
    width: "30%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "stts",
    dataIndex: "STATUS",
    width: "30%",
    totalCellProps: {
      isFragment: true,
    },
  },

  {
    title: "dtls",
    dataIndex: "action",
    width: "9%",
    totalCellProps: {
      isFragment: true,
    },
  },
];
