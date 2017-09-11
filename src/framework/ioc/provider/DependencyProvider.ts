import DependencyFactory from '../factory/DependencyFactory';
import IContainer from '../IContainer';
import {
  EagerSingletonLifecycleStrategy,
  LifecycleStrategy,
  SingletonLifecycleStrategy,
  TransientLifecycleStrategy,
} from './LifecycleStrategy';

/**
 * Provides instances for requested identifiers.
 */
export default class DependencyProvider<T> {

  protected container: IContainer;
  protected lifecycleStrategy: LifecycleStrategy<T>;

  private factory: DependencyFactory<T>;

  /**
   * @param factory Factory that will be used to create values.
   */
  constructor(factory: DependencyFactory<T>) {
    this.factory = factory;
    this.lifecycleStrategy = new TransientLifecycleStrategy<T>(factory);
  }

  /**
   * Has to be called before dependencies can be retrieved.
   */
  public setContainer = (container: IContainer) => {
    this.container = container;
    this.factory.setContainer(container);
  }

  /**
   * Gives concrete the option to react to the initialization of the module.
   */
  public prepare = () => {
    this.lifecycleStrategy.prepare();
  }

  /**
   * Returns value from the provider.
   * @throws {Error} When the container has not been set previously. This is needed to resolve dependencies.
   * @return {T}
   */
  public get() {
    if (!this.container) throw new Error('You cannot get a value from this factory when no container is set.');
    return this.lifecycleStrategy.get();
  }

  /**
   * Provides dependency as singleton. Following requests will receive the same identity.
   */
  public asSingleton = () => { this.lifecycleStrategy = new SingletonLifecycleStrategy(this.factory); };

  /**
   * Provides dependency as singleton. Instance is created directly when the container is created.
   */
  public asEagerSingleton = () => { this.lifecycleStrategy = new EagerSingletonLifecycleStrategy(this.factory); };
}
