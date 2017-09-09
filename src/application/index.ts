import IocContainer from '../framework/my-ioc/IocContainer'

class Test {
  public id() {
    console.log('Its me!')
  }
}

const container = new IocContainer()
container.bind<Test>(Test)

const test = container.get<Test>(Test)
test.id()
