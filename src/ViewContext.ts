import { Macroable } from 'macroable'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { RouterContract } from '@ioc:Adonis/Core/Route'
import { AssetsManagerContract } from '@ioc:Adonis/Core/AssetsManager'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ViewContextContract } from '@ioc:ViewContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { EnvContract } from '@ioc:Adonis/Core/Env'
import { DriveManagerContract } from '@ioc:Adonis/Core/Drive'

export class ViewContext extends Macroable implements ViewContextContract {
  protected static macros = {}
  protected static getters = {}
  public static app: ApplicationContract
  public app: ApplicationContract
  public data: any
  public request: RequestContract
  public config: ConfigContract
  public env: EnvContract
  public drive: DriveManagerContract
  public router: RouterContract
  public assets: AssetsManagerContract

  public static create(request: HttpContextContract['request'], data?: any): ViewContextContract {
    const ctx = new ViewContext()

    ctx.app = this.app

    ctx.data = data
    ctx.request = request

    ctx.config = this.app.container.resolveBinding('Adonis/Core/Config')
    ctx.env = this.app.container.resolveBinding('Adonis/Core/Env')
    ctx.drive = this.app.container.resolveBinding('Adonis/Core/Drive')
    ctx.router = this.app.container.resolveBinding('Adonis/Core/Route')
    ctx.assets = this.app.container.resolveBinding('Adonis/Core/AssetsManager')

    return ctx
  }
}
