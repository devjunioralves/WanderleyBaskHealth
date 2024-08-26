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
    private createUrlController: BaseController,
    @inject(tokens.GetOneUrlController)
    private getOneUrlController: BaseController
  ) {
    super(Router())
  }

  setup(): Router {
    this.post('/v1/shorten', this.createUrlController)
    this.get('/v1/shorten/:url', this.getOneUrlController)
    return this.getRouter()
  }
}
