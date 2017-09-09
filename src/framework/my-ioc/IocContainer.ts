import { ClassBinding, IBinding } from './Binding'
import Identifier from './Identifier'
import INewable from './INewable'

export default class IocContainer {
  private bindingsByIdentifier = new Map<Identifier<any>, IBinding<any>>()

  public get<T>(identifier: Identifier<T>): T {
    const binding = this.bindingsByIdentifier.get(identifier)
    return binding.get()
  }

  public bind<T>(type: INewable<T>): void {
    const binding = new ClassBinding<T>(type)
    this.bindingsByIdentifier.set(type, binding)
  }
}
