import { NextFunction, Request, Response } from 'express'

interface RateLimitEntry {
  count: number
  lastRequest: Date
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

export function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip: string = req.ip || 'unknown_ip'
  const currentTime = new Date().getTime()

  const rateLimitEntry = rateLimitMap.get(ip)

  if (rateLimitEntry) {
    const timeSinceLastRequest =
      currentTime - rateLimitEntry.lastRequest.getTime()

    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS) {
      rateLimitEntry.count += 1

      if (rateLimitEntry.count > RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({
          error: 'Too many requests, please try again later.',
        })
      }
    } else {
      rateLimitEntry.count = 1
    }

    rateLimitEntry.lastRequest = new Date(currentTime)
  } else {
    rateLimitMap.set(ip, { count: 1, lastRequest: new Date(currentTime) })
  }

  next()
}
