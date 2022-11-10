/*
 *
 * Helper: `calculatePatientShareAndDiscount`.
 *
 */
const calculatePatientShareAndDiscount = (
  price?: number,
  patientSharePrc?: number,
  discountPrc?: number
) => {
  price = price || 0;
  patientSharePrc = patientSharePrc || 0;
  discountPrc = discountPrc || 0;

  return {
    price,
    patientShare: +((patientSharePrc / 100) * price).toFixed(2),
    unit_discount: +((discountPrc / 100) * price).toFixed(2),
  };
};

export default calculatePatientShareAndDiscount;
