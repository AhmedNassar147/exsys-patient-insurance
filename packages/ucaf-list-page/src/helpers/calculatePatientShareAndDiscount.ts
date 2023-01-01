/*
 *
 * Helper: `calculatePatientShareAndDiscount`.
 *
 */
const calculatePatientShareAndDiscount = (
  price?: number,
  patientSharePrc?: number,
  discountPrc?: number,
  newRequestPrice?: number
) => {
  let foundPrice = price || 0;
  const priceValue =
    typeof newRequestPrice === "number" || !!newRequestPrice
      ? newRequestPrice
      : foundPrice;
  patientSharePrc = patientSharePrc || 0;
  discountPrc = discountPrc || 0;

  return {
    price: foundPrice,
    new_request_price: newRequestPrice,
    patientShare: +((patientSharePrc / 100) * priceValue).toFixed(2),
    unit_discount: +((discountPrc / 100) * priceValue).toFixed(2),
  };
};

export default calculatePatientShareAndDiscount;
