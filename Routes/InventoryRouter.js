
const router = require('express').Router()
const InventoryCtrl = require('../Controllers/InventoryCtrl')

router.route('/Books')
    .get(InventoryCtrl.getBooks)
    .post(InventoryCtrl.createBook)


router.route('/Books/:id')
    .delete(InventoryCtrl.deleteBook)
    .put(InventoryCtrl.updateBook)



module.exports = route