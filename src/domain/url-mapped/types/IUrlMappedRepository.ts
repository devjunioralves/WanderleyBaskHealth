import { UrlMapped } from '../entities/UrlMapped'

export interface IUrlMappedRepository {
  create(urlSource: string, mappedUrl: string): Promise<UrlMapped>
}
