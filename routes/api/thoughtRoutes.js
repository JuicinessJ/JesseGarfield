const router = require('express').Router();
const {} = require('../../controllers/thoughtController')

router.route('/').get(get)

module.exports = router;