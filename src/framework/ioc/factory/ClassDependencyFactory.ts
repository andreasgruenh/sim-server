import INewable from '../INewable';
import { getIdentifiers } from '../Metadata';
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
    const identifiers = getIdentifiers(this.type);
    const dependencies = identifiers.map(identifier => this.container.get(identifier));
    return new this.type(...dependencies);
  }
}
