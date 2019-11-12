import Class from "./class";

type eventType = string | object | undefined;
class EventEmiter extends Class {
  protected __events: object;
  constructor(...args) {
    super(...args);
    this.__events = {};
  }
  on(type: eventType, handler?: Function): this {
    return this;
  }
  off(type?: eventType): this {
    if (type === undefined) {
      this.__events = {};
      return;
    }
    return this;
  }
  emit() {}
}
export default EventEmiter;
