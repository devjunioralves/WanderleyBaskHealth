import UrlService from '@domain/url/services/UrlService'
import { IUrlRepository } from '@domain/url/types/IUrlRepository'
import crypto from 'crypto'

const mockUrlRepository: jest.Mocked<IUrlRepository> = {
  create: jest.fn(),
}

describe('UrlService', () => {
  let urlService: UrlService

  beforeEach(() => {
    urlService = new UrlService(mockUrlRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should generate a short URL using MD5 hash', () => {
    const url = 'http://example.com'
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 6)

    const generatedShortUrl = (urlService as any).generateShortUrl(url)

    expect(generatedShortUrl).toBe(hash)
  })

  it('should save the original and short URL in the repository', async () => {
    const url = 'http://example.com'
    const mockShortUrl = 'abc123'

    jest
      .spyOn(urlService as any, 'generateShortUrl')
      .mockReturnValue(mockShortUrl)

    mockUrlRepository.create.mockResolvedValue({
      id: 1,
      urlSource: url,
      mappedUrl: mockShortUrl,
    })

    const result = await urlService.create(url)

    expect(mockUrlRepository.create).toHaveBeenCalledWith(url, mockShortUrl)
    expect(result).toBe(`http://short.url/${mockShortUrl}`)
  })

  it('should generate a unique short URL for different URLs', () => {
    const url1 = 'http://example.com/1'
    const url2 = 'http://example.com/2'

    const shortUrl1 = (urlService as any).generateShortUrl(url1)
    const shortUrl2 = (urlService as any).generateShortUrl(url2)

    expect(shortUrl1).not.toBe(shortUrl2)
  })
})
