'use strict'

const { responseWithNoTokens, responseWithTokens } = require("../utils/response");
const broadCastService = require('../services/broadcast.service')
class BroadCastController {

    insert = (req, res) => {
        const { urlVideo, title, channelName, thum, duration } = req.body
        const srts = req.files
        const englishSrtFile = srts[0]
        const vietnameseSrtFile = srts[1]
        broadCastService.insert(englishSrtFile, vietnameseSrtFile, urlVideo, title, duration, channelName, thum)
    }
}

module.exports = new BroadCastController()