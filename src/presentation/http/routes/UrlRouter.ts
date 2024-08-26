import { Router } from 'express'

import BaseController from '@shared/http/controller/BaseController'
import BaseRouter from '@shared/http/controller/BaseRouter'

import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import { IRouter } from './IRouter'

@injectable()
export class UrlRouter extends BaseRouter implements IRouter {
  constructor(
    @inject(tokens.CreateUrlController)
    private createUrlController: BaseController
  ) {
    super(Router())
  }

  setup(): Router {
    this.post('/v1/url', this.createUrlController)
    return this.getRouter()
  }
}
