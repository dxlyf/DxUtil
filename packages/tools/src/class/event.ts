import Class from "./class";
import isObject from "../lang/isObject";

type eventObjectType = { [key: string]: eventHandler };
type eventType = string | eventObjectType | undefined;
type eventHandler = (e: any) => void;
class EventEmiter extends Class {
  protected __events: { [key: string]: Array<eventHandler> | null };
  constructor(...args: any) {
    super(...args);
    this.__events = {};
  }
  on(
    type: eventType,
    handler?: eventHandler | boolean,
    once: boolean = false
  ): this {
    if (isObject(type)) {
      once = handler as boolean;
      for (let name in type as eventObjectType) {
        this.on(name, (type as eventObjectType)[name], once);
      }
      return this;
    }
    let events = this.__events[type as string];
    if (events) {
      if (once) {
        handler = (function(
          type,
          orignHandler: eventHandler,
          context
        ): eventHandler {
          return function handler(...args: any) {
            orignHandler.apply(context, args);
            context.off(type, handler);
          };
        })(type, handler as eventHandler, this);
      }
      events.push(handler as eventHandler);
    }
    return this;
  }
  off(type?: eventType, handler?: eventHandler): this {
    if (!type) {
      this.__events = {};
      return this;
    }
    if (!handler) {
      this.__events[type as string] = null;
    }
    if (isObject(type)) {
      for (let name in type as eventObjectType) {
        this.off(name, (type as eventObjectType)[name]);
      }
      return this;
    }
    let events = this.__events[type as string] as Array<any>;
    if (events) {
      let len = events.length;
      for (let i = len - 1; i >= 0; i--) {
        if (events[i] === handler) {
          events.splice(i, 1);
        }
      }
    }
    return this;
  }
  emit(type: string, ...args: any) {
    let events = this.__events[type] as Array<any>;
    if (events) {
      events = [...events];
      let len = events.length;
      for (let i = 0; i < len; i++) {
        events[i].apply(this, args);
      }
    }
    return this;
  }
}
export default EventEmiter;
