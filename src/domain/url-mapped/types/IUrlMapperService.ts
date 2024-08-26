export interface IUrlMapperService {
  shortenUrl(url: string): Promise<string>
}
