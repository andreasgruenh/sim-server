import DependencyDescriptor from './DependencyDescriptor';
import Identifier from './Identifier';
import { getDependencyDescriptors, setDependencyDescriptors } from './Metadata';

/**
 * Parameterdecorator that adds metadata to the parameter, so that the {@link IContainer} can inject correct
 * dependencies.
 * @param {Identifier} identifier for the bound {@link Provider}.
 */
export default function injectAll(identifier: Identifier) {
  return function addInjectionProperties(target: any, member: any, index: number) {
    const descriptors = getDependencyDescriptors(target);
    descriptors[index] = new DependencyDescriptor(identifier, 'COLLECTION');
    setDependencyDescriptors(descriptors, target);
  };
}
