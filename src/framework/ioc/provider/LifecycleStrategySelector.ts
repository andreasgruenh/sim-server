import DependencyProvider from './DependencyProvider';

/**
 * Select the lifecycle for your dependencies.
 */
export default class LifecycleStrategySelector {
  private provider: DependencyProvider<any>;

  constructor(provider: DependencyProvider<any>) {
    this.provider = provider;
  }

  /**
   * Provides dependency as singleton. Following requests will receive the same identity.
   */
  public asSingleton() {
    this.provider.asSingleton();
  }

  /**
   * Provides dependency as singleton. Instance is created directly when the container is created.
   */
  public asEagerSingleton() {
    this.provider.asEagerSingleton();
  }
}
