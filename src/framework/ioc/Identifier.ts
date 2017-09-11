import INewable from './INewable';

/**
 * Identifies the bound dependencyProvider.
 */
type Identifier = INewable<any> | string | symbol;

export default Identifier;
