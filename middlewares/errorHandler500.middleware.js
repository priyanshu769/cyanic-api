const express = require('express')

const errorHandler500 = (error, req, res, next) => {
    res.status(500).json({ status: false, message: "The server returned an error! ", error: error.message })
}

module.exports = errorHandler500