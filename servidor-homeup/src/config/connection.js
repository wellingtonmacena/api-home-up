const connection= require('knex')({
    client: 'mssql',
    connection: {
        host: "srvhomeup.database.windows.net",
        user: "localadmin",
        password: "#Gfgrupo4",
        database: "bd2adsa",
    }
})



module.exports = connection
