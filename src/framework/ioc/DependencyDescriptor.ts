import IContainer from './IContainer';
import Identifier from './Identifier';

type DependencyType = 'SINGLE' | 'COLLECTION';

export default class DependencyDescriptor {

  private type: string;

  private identifier: any;

  constructor(identifier: Identifier, type: DependencyType) {
    this.identifier = identifier;
    this.type = type;
  }

  public resolve<T>(container: IContainer): T | T[] {
    if (this.type === 'SINGLE') return container.get<T>(this.identifier);
    return container.getAll<T>(this.identifier);
  }
}
