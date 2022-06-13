/*
 *
 * `sortDeps`: `@exsys-patient-insurance/validate-yarn-workspaces-deps`.
 *
 */
const sortDeps = (depsObject) => {
  const keys = Object.keys(depsObject || {});

  if (keys.length) {
    return keys.sort().reduce((obj, key) => {
      obj[key] = depsObject[key];
      return obj;
    }, {});
  }

  return {};
};

module.exports = sortDeps;
