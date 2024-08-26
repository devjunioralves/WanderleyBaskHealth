import db from '@infra/mysql/MySQLConnection'
import { Url } from '../entities/Url'
import { IUrlRepository } from '../types/IUrlRepository'

export default class UrlRepository implements IUrlRepository {
  async create(urlSource: string, mappedUrl: string): Promise<Url> {
    const sql = `INSERT INTO mapped_urls (url_source, url_mapped) VALUES (?,?)`
    const [result] = await db.execute(sql, [urlSource, mappedUrl])
    const insertId = (result as any).insertId
    return insertId
  }
}
