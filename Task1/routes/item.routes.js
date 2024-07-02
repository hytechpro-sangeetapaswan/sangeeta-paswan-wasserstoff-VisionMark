const express = require ('express')
const { createItem, fetchItemList, fetchItemDetails, updateItem, deleteItem } = require('../controllers/item.controller')
const { validate } = require('../middleware/validate')
const { createItemSchema, updateItemById } = require('../validations/item.validation')
const route = express.Router()

route.post('/add-new-item',validate(createItemSchema),createItem)
route.get('/fetch-item-list',fetchItemList)
route.get('/fetch-item-by-id',fetchItemDetails)
route.put('/update-item-by-id',validate(updateItemById),updateItem)
route.delete('/delete-item-by-id',deleteItem)

module.exports=route