interface Request {
    headers: Object,
    body: Object,
    user: Object
}

interface Response {
    status: () => void,
    send: () => void,
}

const mockRequest = ({ sessionData = {}, userData = {}, headers = {} }) => {
    const req = {} as Request
    req.headers = headers
    req.body = sessionData
    req.user = userData
    return req
}

const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
};

export default {
    mockRequest, mockResponse
}
