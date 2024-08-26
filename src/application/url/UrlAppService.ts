import { tokens } from '@di/tokens'
import { Url } from '@domain/url/entities/Url'
import { IUrlService } from '@domain/url/types/IUrlService'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class UrlAppService {
  constructor(
    @inject(tokens.UrlService)
    private urlService: IUrlService
  ) {}
  async create(data: string): Promise<Url> {
    return await this.urlService.create(data)
  }
}
