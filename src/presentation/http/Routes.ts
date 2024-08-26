import { tokens } from '@di/tokens'
import { IRouter } from '@presentation/http/routes/IRouter'
import { Router } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class Routes {
  constructor(
    @inject(tokens.UrlRouter)
    private urlRouter: IRouter
  ) {}

  public setupRouter(router: Router) {
    router.use('/api', this.urlRouter.setup())
  }
}
