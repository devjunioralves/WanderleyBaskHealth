import MetricJobAppService from '@application/metrics/MetricJobAppService'
import { tokens } from '@di/tokens'
import cron from 'node-cron'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CronJob {
  constructor(
    @inject(tokens.MetricJobAppService)
    private metricJobAppService: MetricJobAppService
  ) {}

  run() {
    cron.schedule('*/1 * * * *', () => {
      this.metricJobAppService.run()
    })
  }
}
