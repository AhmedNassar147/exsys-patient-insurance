/*
 *
 * `groupArrayData`: `@exsys-patient-insurance/helpers`.
 *
 */
const groupArrayData = <T extends any[]>(data: T, groupByChunk = 2) => {
  let finalData: any[] = [];
  for (let item = 0; item < data.length; item += groupByChunk) {
    finalData = [...finalData, data.slice(item, item + groupByChunk)];
  }

  return finalData;
};

export default groupArrayData;
