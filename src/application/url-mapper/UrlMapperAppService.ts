import { IUrlMapperService } from '@domain/url-mapped/types/IUrlMapperService'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class UrlMapperAppService {
  constructor(
    @inject('UrlMapperService')
    private urlMapperService: IUrlMapperService
  ) {}
  async create(data: string): Promise<string> {
    return await this.urlMapperService.shortenUrl(data)
  }
}
