import DependencyFactory from './DependencyFactory';

/**
 * Implements a factory that returns the bound value.
 */
export default class ValueDependencyFactory<T> extends DependencyFactory<T> {
  private value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }

  /**
   * Returns the bound value.
   * @return {T} Value.
   */
  public create() {
    return this.value;
  }
}
