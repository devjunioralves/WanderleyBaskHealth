import db from '@infra/mysql/MySQLConnection'
import { Url } from '../entities/Url'
import { IUrlRepository } from '../types/IUrlRepository'

export default class UrlRepository implements IUrlRepository {
  async create(urlSource: string, mappedUrl: string): Promise<Url[]> {
    const sql = `INSERT INTO mapped_urls (url_source, url_mapped) VALUES (?,?)`
    const [result] = await db.execute(sql, [urlSource, mappedUrl])
    const insertId = (result as any).insertId
    return await this.findById(insertId)
  }

  async findById(id: number): Promise<Url[]> {
    const sql = `SELECT * FROM mapped_urls WHERE id =? LIMIT 1`
    const [result] = await db.execute(sql, [id])
    return result as unknown as Url[]
  }

  async findByShortUrl(shortUrl: string): Promise<Url[]> {
    const sql = `SELECT * FROM mapped_urls WHERE url_mapped LIKE CONCAT('%', ?, '%') LIMIT 1`
    const [result] = await db.execute(sql, [shortUrl])
    return result as unknown as Url[]
  }
}
