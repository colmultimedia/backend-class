const conectarMaria = require('./mariadb.js')

const knex = require('knex')(conectarMaria)


  
  // knex("lista").select("*").then((d) => console.log(d))




// knex.schema.createTable('lista', (table)=> {
//     table.increments("id").primary();
//     table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
//     table.integer("qty").notNullable();
//     table.string("name", 100).notNullable();
//     table.string("description", 250);
//     table.integer("code").notNullable();
//     table.string("picture", 255);
//     table.integer("price").notNullable();
//     table.integer("stock").notNullable();
// }).then (
//     (console.log('tabla creada'),


//     (err) => console.log(err),
//     () => knex.destroy())
// )




// knex.schema.createTable('carrito', (table)=> {
//     table.increments("id").primary();
//     table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
// }).then (
//     (console.log('tabla creada'),

//     (err) => console.log(err),
//     () => knex.destroy())
//   )
    
  //   knex.schema.createTable('relprod', (table)=> {
  //     table.integer("id-carrito");
  //     table.integer("id-producto");
  //     table.integer("qty");
  //     table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
  // }).then (
  //     (console.log('tabla creada'),
  

  //   (err) => console.log(err),
  //   () => knex.destroy())
  // )

// knex("carrito").insert({}).then(_ => console.log("carrito creado"))
    

module.exports = {knex, conectarMaria}