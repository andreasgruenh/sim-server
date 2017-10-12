import INewable from '../INewable';
import { getDependencyDescriptors } from '../Metadata';
import DependencyFactory from './DependencyFactory';

/**
 * Implements a factory that can create new instances from a class.
 */
export default class ClassDependencyFactory<T> extends DependencyFactory<T> {
  private type: INewable<T>;

  constructor(type: INewable<T>) {
    super();
    this.type = type;
  }

  /**
   * Resolves dependencies of the given type and creates a new instance.
   * @return {T} New value with resolved dependencies.
   */
  public create() {
    const descriptors = getDependencyDescriptors(this.type);
    const dependencies = descriptors.map(descriptor => descriptor.resolve(this.container));
    return new this.type(...dependencies);
  }
}
