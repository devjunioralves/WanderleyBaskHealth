import { injectable } from 'tsyringe'

import db from '@infra/mysql/MySQLConnection'
import fs from 'fs'
import moment from 'moment'
import path from 'path'

const logFilePath = path.join('src/utils/click_logs.txt')

@injectable()
export default class MetricJobAppService {
  constructor() {}

  async run(): Promise<void> {
    if (!fs.existsSync(logFilePath)) return

    const logs = fs.readFileSync(logFilePath, 'utf-8').split('\n')
    fs.truncateSync(logFilePath, 0)

    for (const log of logs) {
      if (!log) continue

      const [shortUrl, timestamp] = log.split(',')

      const formattedTimestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss')

      await db.execute(
        `UPDATE mapped_urls SET click_count = click_count + 1 WHERE url_mapped = ?`,
        [shortUrl]
      )

      await db.execute(
        `INSERT INTO click_analytics (mapped_url_id, clicked_at)
       VALUES ((SELECT id FROM mapped_urls WHERE url_mapped = ?), ?)`,
        [shortUrl, formattedTimestamp]
      )
    }
  }
}
