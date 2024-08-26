import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'
import { IUrlMappedRepository } from '../types/IUrlMappedRepository'
import { IUrlMapperService } from '../types/IUrlMapperService'

@injectable()
export default class UrlMapperService implements IUrlMapperService {
  private baseUrl: string

  constructor(
    @inject('UrlMappedRepository')
    private urlMapperRepository: IUrlMappedRepository
  ) {
    this.baseUrl = 'http://short.url/'
  }

  private generateShortUrl(url: string): string {
    const hash = crypto.createHash('md5').update(url).digest('hex')
    const shortUrl = hash.slice(0, 6)
    return shortUrl
  }

  public async shortenUrl(url: string): Promise<string> {
    const shortUrl = this.generateShortUrl(url)
    const urlMapped = await this.urlMapperRepository.create(url, shortUrl)

    return `${this.baseUrl}${urlMapped.mappedUrl}`
  }
}
