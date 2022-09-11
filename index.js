(async () => {
    const TARGET_HOST = process.env.TARGET_HOST
    const STAT_HOST = process.env.STAT_HOST
    const SERVER_NAME = process.env.SERVER_NAME
    const PULLING_TIME = Number(process.env.PULLING_TIME)

    console.log(TARGET_HOST, STAT_HOST, SERVER_NAME, PULLING_TIME)

    while (true) {
        require('dotenv').config()
        const { setTimeout } = require('timers/promises')
        const axios = require('axios').default

        const ping = require('ping')

        try {
            const { time, packetLoss } = await ping.promise.probe(TARGET_HOST)
            await axios.post(STAT_HOST, { time, packetLoss: Number(packetLoss.replace('%', '')), serverName: SERVER_NAME })
            console.log('Data : ', { time, packetLoss })
        } catch (err) {
            console.log(err)
        }
        await setTimeout(PULLING_TIME)
    }
})()

