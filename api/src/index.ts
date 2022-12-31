import app from './app'

const PORT = process.env.PORT ?? 8000

const server = app.listen(PORT, () => {
    console.log(`Server listering in port ${PORT}`);
})

server.on('error', (erro) => {
    console.log(`Server error: ${erro}`);
})

server.on('clientError', (erro) => {
    console.log(`Client error: ${erro}`);
})