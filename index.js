(async () => {
    const TARGET_HOST = process.env.TARGET_HOST
    const STAT_HOST = process.env.STAT_HOST
    const SERVER_NAME = process.env.SERVER_NAME

    console.log(TARGET_HOST, STAT_HOST, SERVER_NAME)

    while (true) {
        require('dotenv').config()
        const { setTimeout } = require('timers/promises')
        const axios = require('axios').default

        const ping = require('ping')
        const { time, packetLoss } = await ping.promise.probe(TARGET_HOST)

        await axios.post(STAT_HOST, { time, packetLoss: Number(packetLoss.replace('%', '')), serverName: SERVER_NAME })
        console.log('Data : ', { time, packetLoss })
        await setTimeout(3000)
    }
})()

