/**
 * Values on which @method new can be called.
 */
export default interface INewable<T> {
  new (...args: any[]): T;
}
