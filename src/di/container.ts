import { tokens } from '@di/tokens'
import { container } from 'tsyringe'

require('dotenv').config()

const childContainer = container.createChildContainer()

//Url
import UrlAppService from '@application/url/UrlAppService'
import UrlRepository from '@domain/url/infra/UrlRepository'
import UrlService from '@domain/url/services/UrlService'
import CreateUrlController from '@presentation/http/controllers/url/CreateUrlController'

childContainer.registerSingleton(
  tokens.CreateUrlController,
  CreateUrlController
)
childContainer.registerSingleton(tokens.UrlAppService, UrlAppService)
childContainer.registerSingleton(tokens.UrlService, UrlService)
childContainer.registerSingleton(tokens.UrlRepository, UrlRepository)

export { childContainer as container }
