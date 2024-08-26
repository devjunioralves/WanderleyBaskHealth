export interface IUrlService {
  create(url: string): Promise<string>
}
