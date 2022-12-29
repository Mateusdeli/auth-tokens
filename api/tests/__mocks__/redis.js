module.exports = ({
    createClient: jest.fn(() => ({
        connect: jest.fn(),
        get: jest.fn((key) => key),
        set: jest.fn((key, value) => {}),
        on: jest.fn(),
    })),
})