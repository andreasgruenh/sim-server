import DependencyFactory from '../factory/DependencyFactory';

/**
 * When the get method is called, the dependencies are created with help of a DependencyFactory with different
 * lifecycles.
 * - TransientLifecycleStrategy: Each call creates a new instance of the dependency
 * - SingletonLifecycleStrategy: The dependency is created after the first call and is reused from this moment on.
 * - EagerSingletonLifecycleStrategy: The dependency is created after the call to prepare and is reused.
 */
export abstract class LifecycleStrategy<T> {

  protected factory: DependencyFactory<T>;

  constructor(factory: DependencyFactory<T>) {
    this.factory = factory;
  }

  /**
   * Implements the logic of the lifecycle management
   * @return {T} The generic type of this strategy
   */
  public abstract get(): T;

  /**
   * This method will be overridden if a LifecycleStrategy needs to prepare itself after the container is set
   * @example eagerSingletons will be instantiated here.
   */
  public prepare() {
    // Do nothing in the base case
  }
}

/**
 * Each call to get returns a new value
 */
export class TransientLifecycleStrategy<T> extends LifecycleStrategy<T> {
  public get() { return this.factory.create(); }
}

/**
 * Each call after the first returns the new value
 */
export class SingletonLifecycleStrategy<T> extends LifecycleStrategy<T> {
  private cache: T;
  public get() {
    if (!this.cache) this.cache = this.factory.create();
    return this.cache;
  }
}

/**
 * Each call returns the same value. Instantiated when the container is created.
 */
export class EagerSingletonLifecycleStrategy<T> extends LifecycleStrategy<T> {
  private cache: T;

  public prepare() {
    this.cache = this.factory.create();
  }

  public get() { return this.cache; }
}
