import db from 'dotenv/config';
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import chalk from 'chalk'

import routes from './routes/index.js'


const app = express();
// const cors = require('cors');

const PORT = process.env.PORT || 5000;
//allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    next()
  })
//custom logging morgan middleware goodness
app.use(
    morgan(function (tokens, req, res) {
        var parenRegExp = /\(([^)]+)\)/;
        // let currTime = new Date(new Date(tokens.date(req, res, 'web')).getTime())
        let currTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
        let deviceInfo
        try {
            deviceInfo = parenRegExp.exec(tokens['user-agent'](req, res))[0]
        } catch (err) {
            deviceInfo = tokens['user-agent'](req, res) + "dunno 🤔"
        }
        return [
            '👉',
            tokens.method(req, res) === 'POST' ?
                chalk.yellow(tokens.method(req, res)) :
                chalk.green(tokens.method(req, res)),
            tokens.status(req, res) > 400 ?
                chalk.bgRed(tokens.status(req, res)) :
                chalk.bgGreen(tokens.status(req, res)),
            // chalk.bgBlueBright('⏳' + tokens.res(req, res, 'total-time'), '-'),
            chalk.bgBlueBright("⏰" + currTime.split(',')[1]),
            chalk.bgRedBright("📱" + deviceInfo),
            chalk.bgMagentaBright("🔗" + tokens.url(req, res)),
            chalk.bgBlueBright(tokens.referrer(req, res) ==
                'https://naresh-khatri.github.io/' ?
                "🧾 " + "Homepage" : "🧾 " + tokens.referrer(req, res)),
            chalk.bgCyan("📦" + tokens.res(req, res, 'content-length')),
            "⚡ " +
            chalk.greenBright(tokens['response-time'](req, res), 'ms')
        ].join(' ')
    })
)
app.use(express.json());

//add routes
app.use('',routes);

// Connect to database
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err == null)
            console.log('Connceted to DB!')
        else
            console.error(err)
    })



//start server
app.listen(PORT, () => { console.log(`Server up on http://localhost:${PORT}`) });
