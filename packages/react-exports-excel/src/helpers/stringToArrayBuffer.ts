/*
 *
 * Helper; `stringToArrayBuffer`.
 *
 */
const stringToArrayBuffer = (stringValue: string) => {
  const length = stringValue.length;

  var buf = new ArrayBuffer(length);
  var view = new Uint8Array(buf);

  for (var i = 0; i !== length; ++i) {
    view[i] = stringValue.charCodeAt(i) & 0xff;
  }

  return buf;
};

export default stringToArrayBuffer;
