import { Request as ExpressRequest } from 'express'

export default interface Request extends ExpressRequest {
    user: any
}
