const knex = require('knex')

const itemSchema = knex.schema.createTable('items',function(table){
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('description').notNullable()
})


module.exports={
    itemSchema
}