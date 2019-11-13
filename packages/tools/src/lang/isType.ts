var toString = {}.toString;
function isType(value: any, type: string): boolean {
  return toString.call(value) === `[object ${type}]`;
}

export default isType;
