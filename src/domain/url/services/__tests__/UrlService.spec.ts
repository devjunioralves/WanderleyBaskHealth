import { Url } from '@domain/url/entities/Url'
import { IUrlRepository } from '@domain/url/types/IUrlRepository'
import UrlService from '../UrlService'

describe('UrlService', () => {
  it('should call generateShortUrl with correct value', async () => {
    const findByShortUrlMock = jest.fn() as jest.MockedFunction<
      typeof urlRepository.findByShortUrl
    >
    const createMock = jest.fn() as jest.MockedFunction<
      typeof urlRepository.create
    >

    const urlRepository: IUrlRepository = {
      create: createMock,
      findByShortUrl: findByShortUrlMock,
      findById: jest.fn(),
    }

    const urlService = new UrlService(urlRepository)

    const generateShortUrlSpy = jest.spyOn(
      urlService as any,
      'generateShortUrl'
    )

    findByShortUrlMock.mockResolvedValue([])

    const mockUrl = {
      id: 1,
      urlSource: 'http://example.com',
      urlMapped: 'http://short.url/a9b9f0',
    } as Url
    createMock.mockResolvedValue([mockUrl])

    const result = await urlService.create('http://example.com')

    expect(generateShortUrlSpy).toHaveBeenCalledWith('http://example.com')
    expect(findByShortUrlMock).toHaveBeenCalledWith('http://short.url/a9b9f0')
    expect(createMock).toHaveBeenCalledWith(
      'http://example.com',
      'http://short.url/a9b9f0'
    )
    expect(result).toEqual(mockUrl)
  })
})
