// parse int eg 1 into true
const toBool = <T>(val: T) => Boolean(val).valueOf();
// parse bool eg boolean into 1
const toNumber = <T>(val: T) => Number(val).valueOf();

export default { toBool, toNumber };
