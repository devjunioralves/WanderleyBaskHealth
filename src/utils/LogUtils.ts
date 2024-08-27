import fs from 'fs'
import path from 'path'

const logFilePath = path.join(__dirname, 'click_logs.txt')

function ensureLogFileExists() {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '', { flag: 'w' })
  }
}

export function logClick(shortUrl: string): void {
  ensureLogFileExists()
  const logEntry = `${shortUrl},${new Date().toISOString()}\n`

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write click log:', err)
    }
  })
}
