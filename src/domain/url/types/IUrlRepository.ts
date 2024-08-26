import { Url } from '@domain/url/entities/UrlMapped'

export interface IUrlRepository {
  create(urlSource: string, mappedUrl: string): Promise<Url>
}
