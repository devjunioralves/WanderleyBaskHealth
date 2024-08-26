import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'

import UrlAppService from '@application/url/UrlAppService'
import { tokens } from '@di/tokens'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class CreateUrlController extends BaseController {
  constructor(
    @inject(tokens.UrlAppService)
    private urlAppService: UrlAppService
  ) {
    super()
  }

  public async execute(request: IRequest) {
    try {
      const { url } = request.body

      const result = await this.urlAppService.create(url as string)

      return this.send(result)
    } catch (err) {
      return this.error(err as BaseError)
    }
  }
}
