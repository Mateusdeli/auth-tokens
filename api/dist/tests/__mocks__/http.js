"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockRequest = ({ sessionData = {}, userData = {}, headers = {} }) => {
    const req = {};
    req.headers = headers;
    req.body = sessionData;
    req.user = userData;
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
exports.default = {
    mockRequest, mockResponse
};
