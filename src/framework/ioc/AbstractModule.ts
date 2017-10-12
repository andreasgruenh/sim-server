import DependencyFactory from './factory/DependencyFactory';
import FactorySelector from './factory/FactorySelector';
import IContainer from './IContainer';
import Identifier from './Identifier';
import DependencyProvider from './provider/DependencyProvider';
import LifecycleStrategySelector from './provider/LifecycleStrategySelector';

/**
 * Extend this class to bind your classes to the IOC Container.
 * Call Module#getContainer to receive an initialized container that can resolve dependencies.
 */
export default abstract class AbstractModule implements IContainer {
  private providersByIdentifier = new Map<Identifier, Array<DependencyProvider<any>>>();

  constructor() {
    this.configure();
  }

  /**
   * Creates and initializes the container.
   * @return {IContainer} the initialized container.
   */
  public getContainer(): IContainer {
    for (const [identifier, factory] of this.providers()) {
      factory.setContainer(this);
    }
    for (const [identifier, factory] of this.providers()) {
      factory.prepare();
    }
    return this;
  }

  /**
   * Override this method to do your bindings.
   */
  public abstract configure(): void;

  /**
   * Retrieve dependency for the given identifier. Recursivly resolves all required sub-dependencies.
   * @param identifier Provided identifier for the bound provider.
   */
  public get<T>(identifier: Identifier): T {
    const [provider] = this.providersByIdentifier.get(identifier) || [undefined];
    if (!provider) throw new Error(`Nothing bound to the identifier ${identifier.toString()}`);
    return provider.get();
  }

  public getAll<T>(identifier: Identifier): T[] {
    const providers = this.providersByIdentifier.get(identifier);
    if (!providers) throw new Error(`Nothing bound to the identifier ${identifier}`);
    return providers.map(p => p.get());
  }

  /**
   * Loads all bindings from the given module.
   * @param module Instance of a configured module.
   */
  protected loadModule(module: AbstractModule): void {
    for (const [identifier, provider] of module.providers()) {
      this.registerProvider(identifier, provider);
    }
  }

  /**
   * Start the binding process for a new value.
   * @param identifier Identifier which will be used to resolve values from the container.
   * @returns {FactorySelector} which will be used to select the way in which values are created.
   */
  protected bind(identifier: Identifier): FactorySelector {
    const handleSelect = (factory: DependencyFactory<any>) => {
      const provider = new DependencyProvider(factory);
      this.registerProvider(identifier, provider);
      return new LifecycleStrategySelector(provider);
    };
    const factorySelector = new FactorySelector(identifier, handleSelect);
    return factorySelector;
  }

  private *providers(): IterableIterator<[Identifier, DependencyProvider<any>]> {
    for (const [identifier, providers] of this.providersByIdentifier.entries()) {
      for (const provider of providers) {
        yield [identifier, provider];
      }
    }
  }

  private registerProvider(identifier: Identifier, provider: DependencyProvider<any>) {
    if (!this.providersByIdentifier.has(identifier)) this.providersByIdentifier.set(identifier, []);
    this.providersByIdentifier.get(identifier).unshift(provider);
  }
}
