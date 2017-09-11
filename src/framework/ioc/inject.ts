import Identifier from './Identifier';
import { getIdentifiers, setIdentifiers } from './Metadata';

/**
 * Parameterdecorator that adds metadata to the parameter, so that the {@link IContainer} can inject correct
 * dependencies.
 * @param {Identifier} identifier for the bound {@link Provider}.
 */
export default function inject(identifier: Identifier) {
  return function addInjectionProperties(target: any, member: any, index: number) {
    const identifiers = getIdentifiers(target);
    identifiers[index] = identifier;
    setIdentifiers(identifiers, target);
  };
}
