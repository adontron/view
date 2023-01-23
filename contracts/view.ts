declare module '@ioc:Adonis/Core/Application' {
  import { ViewContextConstructorContract } from '@ioc:Adontron/ViewContext'

  interface ContainerBindings {
    'Adontron/ViewContext': ViewContextConstructorContract
  }
}

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    view: (viewPath: string, data?: any) => string
  }
}

declare module '@ioc:Adonis/Core/Route' {
  interface BriskRouteContract {
    render: (viewPath: string, data?: any) => Exclude<this['route'], null>
  }
}

declare module '@ioc:Adontron/ViewContext' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  import { RequestContract } from '@ioc:Adonis/Core/Request'
  import { ConfigContract } from '@ioc:Adonis/Core/Config'
  import { EnvContract } from '@ioc:Adonis/Core/Env'
  import { DriveManagerContract } from '@ioc:Adonis/Core/Drive'
  import { RouterContract } from '@ioc:Adonis/Core/Route'
  import { AssetsManagerContract } from '@ioc:Adonis/Core/AssetsManager'
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  import { MacroableConstructorContract } from 'macroable'

  export interface ViewContextContract {
    app: ApplicationContract
    data: any
    request: RequestContract
    config: ConfigContract
    env: EnvContract
    drive: DriveManagerContract
    router: RouterContract
    assets: AssetsManagerContract
  }

  export interface ViewContextConstructorContract
    extends MacroableConstructorContract<ViewContextContract> {
    app: ApplicationContract

    create(request: HttpContextContract['request'], data?: any): ViewContextContract

    new (): ViewContextContract
  }

  const ViewContext: ViewContextConstructorContract
  export default ViewContext
}
