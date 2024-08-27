import db from '@infra/mysql/MySQLConnection'
import fs from 'fs'
import cron from 'node-cron'
import path from 'path'

const logFilePath = path.join(__dirname, '@utils/click_logs.txt')

async function processLogs() {
  if (!fs.existsSync(logFilePath)) return

  const logs = fs.readFileSync(logFilePath, 'utf-8').split('\n')
  fs.truncateSync(logFilePath, 0)

  for (const log of logs) {
    if (!log) continue

    const [shortUrl, timestamp] = log.split(',')

    await db.execute(
      `UPDATE mapped_urls SET click_count = click_count + 1 WHERE url_mapped = ?`,
      [shortUrl]
    )

    await db.execute(
      `INSERT INTO click_analytics (mapped_url_id, clicked_at)
       VALUES ((SELECT id FROM mapped_urls WHERE url_mapped = ?), ?)`,
      [shortUrl, timestamp]
    )
  }
}

cron.schedule('*/1 * * * *', () => {
  processLogs().catch((err) => console.error('Failed to process logs:', err))
})
