const router = require('express').Router()
const StoreCtrl = require('../Controllers/StoreCtrl')

router.route('/Stores')
    .get(StoreCtrl.getStore)
    .post(StoreCtrl.createStore)

module.exports = router