import db from '@infra/mysql/MySQLConnection'
import { UrlMappedRepository } from '../UrlMappedRepository'

jest.mock('@infra/mysql/MySQLConnection')

describe('UrlMappedRepository', () => {
  let urlMappedRepository: UrlMappedRepository

  beforeEach(() => {
    urlMappedRepository = new UrlMappedRepository()
  })

  it('should insert a new URL mapping and return the insertId', async () => {
    const mockExecute = db.execute as jest.Mock
    mockExecute.mockResolvedValue([{ insertId: 1 }])

    const urlSource = 'http://example.com'
    const mappedUrl = 'http://short.url/abc123'

    const insertId = await urlMappedRepository.create(urlSource, mappedUrl)

    expect(insertId).toBe(1)
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO mapped_urls (url_source, url_mapped) VALUES (?,?)',
      [urlSource, mappedUrl]
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
