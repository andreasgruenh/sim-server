import * as _ from 'lodash';

import INewable from '../INewable';
import { getDependencyDescriptors } from '../Metadata';
import DependencyFactory from './DependencyFactory';

/**
 * Implements a factory that can create a factory that creates new instances from a class with arguments.
 */
export default class FactoryDependencyFactory<ResultType, FactoryType> extends DependencyFactory<FactoryType> {
  private type: INewable<ResultType>;

  constructor(type: INewable<ResultType>) {
    super();
    this.type = type;
  }

  /**
   * Returns a factory function that creates new values of the dependency with injected sub-dependencies.
   * @return {FactoryType} New factory that creates dependencies.
   */
  public create(): FactoryType {
    return this.factory.bind(this);
  }

  private factory(...args: any[]): ResultType {
    const descriptors = getDependencyDescriptors(this.type);
    const requiredArgs = new Array(this.type.length).fill(null).map((n, index) => {
      const descriptor = descriptors[index];
      if (_.isNil(descriptor)) return args.shift();
      return descriptor.resolve(this.container);
    });
    return new this.type(...requiredArgs);
  }
}
