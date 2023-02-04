const express = require('express')

const errorHandler404 = (req, res) => {
    res.status(404).json({success: false, message: "Page Not Found!"})
}

module.exports = errorHandler404