import db from '@infra/mysql/MySQLConnection'
import { UrlMapped } from '../entities/UrlMapped'
import { IUrlMappedRepository } from '../types/IUrlMappedRepository'

export class UrlMappedRepository implements IUrlMappedRepository {
  async create(urlSource: string, mappedUrl: string): Promise<UrlMapped> {
    const sql = `INSERT INTO mapped_urls (url_source, url_mapped) VALUES (?,?)`
    const [result] = await db.execute(sql, [urlSource, mappedUrl])
    const insertId = (result as any).insertId
    return insertId
  }
}
