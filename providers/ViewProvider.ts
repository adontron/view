import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type {
  HttpContextConstructorContract,
  HttpContextContract,
} from '@ioc:Adonis/Core/HttpContext'
import type { ViewContextConstructorContract } from '@ioc:ViewContext'
import type { RouterContract } from '@ioc:Adonis/Core/Route'

export default class ViewProvider {
  constructor(protected app: ApplicationContract) {}

  private registerView(
    HttpContext: HttpContextConstructorContract,
    ViewContext: ViewContextConstructorContract
  ) {
    const templatePath = (viewPath: string) => this.app.viewsPath(viewPath)

    HttpContext.getter(
      'view',
      function () {
        return (viewPath: string, ...data) =>
          require(templatePath(viewPath)).default(ViewContext.create(this.request, data))
      },
      true
    )
  }

  private registerBriskRoute(Route: RouterContract) {
    Route.BriskRoute.macro('render', function renderView(viewPath: string, ...data) {
      return this.setHandler(({ view }: { view: HttpContextContract['view'] }) => {
        return view(viewPath, ...data)
      }, 'render')
    })
  }

  public register() {
    this.app.container.bind('ViewContext', () => {
      const { ViewContext } = require('../src/ViewContext')
      ViewContext.app = this.app
      return ViewContext
    })
  }

  public async boot() {
    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    const ViewContext = this.app.container.resolveBinding('ViewContext')
    const Route = this.app.container.resolveBinding('Adonis/Core/Route')

    this.registerView(HttpContext, ViewContext)
    this.registerBriskRoute(Route)
  }
}
