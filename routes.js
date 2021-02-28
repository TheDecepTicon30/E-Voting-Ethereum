const routes = require('next-routes')()

routes.add('/elections/alreadyVoted', '/elections/alreadyVoted')

routes.add('/elections/sorry', '/elections/sorry')

routes.add('/elections/results', '/elections/results')

routes.add('/elections/manager', '/elections/manager')

routes.add('/elections/voting', '/elections/voting')

routes.add('/elections/manager', '/elections/manager')

routes.add('/elections/:address', '/elections/thankyou.js') // : represents wildcard

module.exports = routes
