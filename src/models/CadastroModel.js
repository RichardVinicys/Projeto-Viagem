const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const CadastroSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    email: {type: String, require:true},
    password: {type: String, require:true}    
})

const CadastroModel = mongoose.model('Cadastro', CadastroSchema)

class Cadastro {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }
    async login(){
       this.valida();
        if (this.errors.length > 0) return;
        this.user = await CadastroModel.findOne({ email: this.body.email })

        if (!this.user) {
            this.errors.push('Usuario não existe.');
            return;
        }
        if (!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida!');
            this.user = null;
            return;
        }

    }

    async register(){
        this.valida();

        if(this.errors.length > 0) return;

        await this.userExist()

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await CadastroModel.create(this.body)


    }

    async userExist(){
       this.user = await CadastroModel.findOne({email:this.body.email})

       if(this.user) this.errors.push('Usuario ja existe');

    }

    valida(){
        this.cleanUp()

        if(this.body.nome && this.body.nome.length <3) this.errors.push('Nome deve conter pelo menos 3 caracteres')

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido')

        if (this.body.password.length < 4 || this.body.password.length >= 20) {
            this.errors.push('A senha precisa ter entre 4 e 20 caracteres')
        }

    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Cadastro