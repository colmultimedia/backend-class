const conectarMaria = require('./mariadb.js')
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'mariadb',
      database : 'productos'
    }
  })


  ('lista').insert({name: 'Cafe'}).then( _ => console.log("creado"))
  knex("lista").select("*").then((d) => console.log(d))

// knex.schema.createTable('lista', (table)=> {
//     table.increments("id").notNullable();
//     table.string("nombre", 30)
// }).then (
//     (console.log('tabla creada'),


//     (err) => console.log(err),
//     () => knex.destroy())
// )


