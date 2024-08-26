import UrlMapperService from '@domain/url-mapped/services/UrlMappedService'
import { IUrlMappedRepository } from '@domain/url-mapped/types/IUrlMappedRepository'
import crypto from 'crypto'

const mockUrlMappedRepository: jest.Mocked<IUrlMappedRepository> = {
  create: jest.fn(),
}

describe('UrlMapperService', () => {
  let urlMapperService: UrlMapperService

  beforeEach(() => {
    urlMapperService = new UrlMapperService(mockUrlMappedRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should generate a short URL using MD5 hash', () => {
    const url = 'http://example.com'
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 6)

    const generatedShortUrl = (urlMapperService as any).generateShortUrl(url)

    expect(generatedShortUrl).toBe(hash)
  })

  it('should save the original and short URL in the repository', async () => {
    const url = 'http://example.com'
    const mockShortUrl = 'abc123'

    jest
      .spyOn(urlMapperService as any, 'generateShortUrl')
      .mockReturnValue(mockShortUrl)

    mockUrlMappedRepository.create.mockResolvedValue({
      id: 1,
      urlSource: url,
      mappedUrl: mockShortUrl,
    })

    const result = await urlMapperService.shortenUrl(url)

    expect(mockUrlMappedRepository.create).toHaveBeenCalledWith(
      url,
      mockShortUrl
    )
    expect(result).toBe(`http://short.url/${mockShortUrl}`)
  })

  it('should generate a unique short URL for different URLs', () => {
    const url1 = 'http://example.com/1'
    const url2 = 'http://example.com/2'

    const shortUrl1 = (urlMapperService as any).generateShortUrl(url1)
    const shortUrl2 = (urlMapperService as any).generateShortUrl(url2)

    expect(shortUrl1).not.toBe(shortUrl2)
  })
})
