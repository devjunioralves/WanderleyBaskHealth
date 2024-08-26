import { tokens } from '@di/tokens'
import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'
import { Url } from '../entities/Url'
import { IUrlRepository } from '../types/IUrlRepository'
import { IUrlService } from '../types/IUrlService'

@injectable()
export default class UrlService implements IUrlService {
  private baseUrl: string

  constructor(
    @inject(tokens.UrlRepository)
    private urlRepository: IUrlRepository
  ) {
    this.baseUrl = 'http://short.url/'
  }

  private generateShortUrl(url: string): string {
    const hash = crypto.createHash('md5').update(url).digest('hex')
    const shortUrl = hash.slice(0, 6)
    return shortUrl
  }

  public async create(urlSource: string): Promise<Url> {
    const shortUrl = this.generateShortUrl(urlSource)
    return await this.urlRepository.create(
      urlSource,
      `${this.baseUrl}${shortUrl}`
    )
  }

  public async findByShortUrl(shortUrl: string): Promise<Url> {
    return await this.urlRepository.findByShortUrl(shortUrl)
  }
}
