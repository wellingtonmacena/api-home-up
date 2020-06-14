const connection = require('../config/connection')

module.exports = {

    async index(req, res) {

        const response = await connection('logs')
        .select('*')
        
        return res.json(response)
    },

    async show(req, res) {

        const { idLog } = req.params

        const response = await connection('logs')
            .select('*')
            .where({
                idLog
            })
            
        return res.json(response)
    }
}

