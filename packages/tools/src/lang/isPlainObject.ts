import isType from "./isType";
function isPlainObject(value: any): boolean {
  var isObject = isType(value, "Object");
  if (!isObject) {
    return false;
  }
  var constructor = value.constructor;
  //Object.getPrototypeOf(value)
  if (!constructor) {
    return true;
  }
  return constructor === Object;
}
export default isPlainObject;
