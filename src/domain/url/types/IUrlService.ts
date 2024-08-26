import { Url } from '../entities/Url'

export interface IUrlService {
  create(url: string): Promise<Url>
}
