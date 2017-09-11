import Identifier from './Identifier';

/**
 * IOC Container that can resolve bound values given an identifier.
 */
export default interface IContainer {
  /**
   * Returns an instance for the identifier.
   * @param identifier that was used to bind.
   */
  get<T>(identifier: Identifier): T;
}
