const cluster = require('cluster')

if (cluster.isMaster) {
    // spin up workers
    const coreCount = require('os').cpus().length
    console.log('CPUs:::', coreCount)

    for (let i = 0; i < coreCount; i++) {
        const worker = cluster.fork()
        worker.send('holala worker!!!')
        worker.on('message', (mes) => {
            if (mes._queryId) return
            console.log(mes)
        })
    }
} else {
    process.send('hola main process!')
    process.on('message', (mes) => {
        console.log(mes)
    })
}