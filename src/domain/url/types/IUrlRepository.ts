import { Url } from '@domain/url/entities/Url'

export interface IUrlRepository {
  create(urlSource: string, mappedUrl: string): Promise<Url>
  findById(id: number): Promise<Url>
  findByShortUrl(shortUrl: string): Promise<Url>
}
