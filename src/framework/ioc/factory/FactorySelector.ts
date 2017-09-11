import * as _ from 'lodash';

import Identifier from '../Identifier';
import INewable from '../INewable';
import { getIdentifiers } from '../Metadata';
import LifecycleStrategySelector from '../provider/LifecycleStrategySelector';
import ClassDependencyFactory from './ClassDependencyFactory';
import DependencyFactory from './DependencyFactory';
import FactoryDependencyFactory from './FactoryDependencyFactory';
import ValueDependencyFactory from './ValueDependencyFactory';

/**
 * Select a way in which bound values will be instantiated.
 */
export default class FactorySelector {
  private handleSelect: (factory: DependencyFactory<any>) => LifecycleStrategySelector;
  private identifier: Identifier;

  /**
   * @param identifier Identifier for the dependency that will be created by the factory.
   * @param handleSelect Will be called with the factory instance when it is selected.
   */
  constructor(
    identifier: Identifier,
    handleSelect: (factory: DependencyFactory<any>) => LifecycleStrategySelector,
  ) {
    this.identifier = identifier;
    this.handleSelect = handleSelect;
  }

  /**
   * Can be used to bind identifiers that are classes. Instances can be requested with the class itself.
   */
  public toSelf(): LifecycleStrategySelector {
    return this.toClass(this.identifier as INewable<any>);
  }

  /**
   * Bind the identifier to a class. An instance will be provided by the ioc container.
   */
  public toClass(type: INewable<any>): LifecycleStrategySelector {
    if (!_.isFunction(type)) {
      throw new Error('You can only bind functions to a class.\nWhen binding ' + type);
    }
    const argumentCount = type.length;
    const dependencyCount = getIdentifiers(type).length;
    if (argumentCount !== dependencyCount) {
      throw new Error(
        type +
        ' cannot be bound as a class, since the constructor expects arguments that will not be injected.\n' +
        'Maybe you forgot to add an @inject or you meant to bind this value as a factory',
      );
    }

    const factory = new ClassDependencyFactory<any>(type);
    return this.handleSelect(factory);
  }

  /**
   * Bind the identifier to a factory function. This function will be provided by the container.
   * Factory functions are always resolved as singletons.
   */
  public toFactory<FactoryType>(type: INewable<any>): void {
    if (!_.isFunction(type)) {
      throw new Error('You can only bind functions to a class.\nWhen binding ' + type);
    }
    const factory = new FactoryDependencyFactory<any, FactoryType>(type);
    this.handleSelect(factory).asSingleton();
  }

  /**
   * Bind the identifier to a value, that will be provided by the container.
   */
  public toValue<ValueType>(value: ValueType): void {
    const factory = new ValueDependencyFactory<ValueType>(value);
    this.handleSelect(factory);
  }
}
