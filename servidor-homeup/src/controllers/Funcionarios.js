const connection = require('../config/connection')

module.exports = {

    async create(req, res) {

        const {nomeFuncionario, cpfFuncionario, cargo, salario, emailFuncionario, senhaFuncionario, fkGestor } = req.body;
        try {
            const response = await connection('funcionario')
                .insert({

                    nomeFuncionario,
                    cpfFuncionario,
                    cargo,
                    salario,
                    emailFuncionario,
                    senhaFuncionario,
                    fkGestor
                })

            return res.json({message: "Registro inserido com sucesso"})
        }
        catch(error){
            return res.json({message: "Ocorreu um erro: "+ error})
        }        
    },

    async index(req, res) {

        const response = await connection('funcionario')
        .select('*')

        return res.json(response)
    },

    async show(req, res) {

        const { idFuncionario } = req.params

        const response = await connection('funcionario')
            .select('*')
            .where("idFuncionario", idFuncionario)
            
        return res.json(response)
    }
}

