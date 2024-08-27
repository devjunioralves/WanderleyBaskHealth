import db from '@infra/mysql/MySQLConnection'
import UrlRepository from '../UrlRepository'

jest.mock('@infra/mysql/MySQLConnection')

describe('UrlRepository', () => {
  let urlRepository: UrlRepository

  beforeEach(() => {
    urlRepository = new UrlRepository()
  })

  it('should insert a new URL mapping and return the insertId', async () => {
    const mockExecute = db.execute as jest.Mock
    mockExecute.mockResolvedValue([{ insertId: 1 }])

    const urlSource = 'http://example.com'
    const mappedUrl = 'http://short.url/abc123'

    const insertId = await urlRepository.create(urlSource, mappedUrl)

    expect(insertId).toStrictEqual({ insertId: 1 })
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO mapped_urls (url_source, url_mapped) VALUES (?,?)',
      [urlSource, mappedUrl]
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
