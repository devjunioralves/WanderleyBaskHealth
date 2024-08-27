import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'

import UrlAppService from '@application/url/UrlAppService'
import { tokens } from '@di/tokens'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'
import { logClick } from '@src/utils/LogUtils'

@injectable()
export default class GetOneUrlController extends BaseController {
  constructor(
    @inject(tokens.UrlAppService)
    private urlAppService: UrlAppService
  ) {
    super()
  }

  public async execute(request: IRequest) {
    try {
      const { url } = request.params
      logClick(url)

      const result = await this.urlAppService.findByShortUrl(url as string)

      return this.send(result)
    } catch (err) {
      return this.error(err as BaseError)
    }
  }
}
