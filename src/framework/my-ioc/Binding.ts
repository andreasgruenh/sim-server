import INewable from './INewable'

export interface IBinding<T> {
  get: () => T
}

export class ClassBinding<T> implements IBinding<T> {
  private type: INewable<T>

  constructor(type: INewable<T>) {
    this.type = type
  }

  public get(): T {
    return new this.type()
  }
}
