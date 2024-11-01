import { tokens } from '@di/tokens'
import { Routes } from '@presentation/http/Routes'
import { container } from 'tsyringe'

const childContainer = container.createChildContainer()

childContainer.registerSingleton(tokens.Routes, Routes)

//Url
import MetricJobAppService from '@application/metrics/MetricJobAppService'
import UrlAppService from '@application/url/UrlAppService'
import UrlRepository from '@domain/url/infra/UrlRepository'
import UrlService from '@domain/url/services/UrlService'
import CreateUrlController from '@presentation/http/controllers/url/CreateUrlController'
import GetOneUrlController from '@presentation/http/controllers/url/GetOneUrlController'
import { UrlRouter } from '@presentation/http/routes/UrlRouter'
import { CronJob } from '@presentation/job/CronJob'

childContainer.registerSingleton(tokens.UrlRouter, UrlRouter)
childContainer.registerSingleton(
  tokens.CreateUrlController,
  CreateUrlController
)
childContainer.registerSingleton(tokens.UrlAppService, UrlAppService)
childContainer.registerSingleton(tokens.UrlService, UrlService)
childContainer.registerSingleton(tokens.UrlRepository, UrlRepository)
childContainer.registerSingleton(
  tokens.GetOneUrlController,
  GetOneUrlController
)
childContainer.registerSingleton(
  tokens.MetricJobAppService,
  MetricJobAppService
)
childContainer.registerSingleton(tokens.CronJob, CronJob)

export { childContainer as container }
