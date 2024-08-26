import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'

import UrlMapperAppService from '@application/url-mapper/UrlMapperAppService'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class CreateUrlController extends BaseController {
  constructor(
    @inject('UrlMapperAppService')
    private urlMapperAppService: UrlMapperAppService
  ) {
    super()
  }

  public async execute(request: IRequest) {
    try {
      const { url } = request.body

      const result = await this.urlMapperAppService.create(url as string)

      return this.send(result)
    } catch (err) {
      return this.error(err as BaseError)
    }
  }
}
