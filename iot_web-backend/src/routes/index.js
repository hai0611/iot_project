const LedRouter = require('./led')
const siteRouter = require('./sensor')


function route(app) {
    app.use('/led',LedRouter)
    app.use('/',siteRouter)

}

module.exports = route