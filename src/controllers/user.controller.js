'use strict'

const { responseWithNoTokens, responseWithTokens } = require("../utils/response");
const userService = require('../services/user.service')

class UserController {

    update = (req, res) => {
        const user = req.body
        userService.update(user)
            .then(userUpdated => responseWithTokens(req, res, userUpdated, 200))
            .catch(error => responseWithTokens(req, res, error.message, 500))
    }

}

module.exports = new UserController()