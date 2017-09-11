import IContainer from '../IContainer';

/**
 * Returns new instances for a dependency.
 */
export default abstract class DependencyFactory<T> {
  protected container: IContainer;
  public abstract create(): T;

  /**
   * Container needs to be set, so that concrete factories can request dependencies of the created object.
   */
  public setContainer(container: IContainer): void {
    this.container = container;
  }
}
