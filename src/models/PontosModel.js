const mongoose = require('mongoose')

const PontosSchema = mongoose.Schema({
    nome: { type: String, require: true },
    endereco: { type: String, require: true },
    status: { type: String, require: true },
    coordenada : {type: String, require: true},
    criadoEm: { type: Date, default: Date.now() },
    dono: { type: mongoose.Schema.Types.ObjectId, ref: 'Cadastro' }
})

const PontosModel = mongoose.model('Pontos', PontosSchema)

class Ponto {
    constructor(body) {
        this.body = body
        this.errors = []
        this.ponto = null
    }


    async criar(donoID){
        this.valida()

        if(this.errors.length > 0) return;

        this.body.dono = donoID;

        this.ponto = await PontosModel.create(this.body)

    }

    

    valida() {
        this.cleanUp()

        if(this.body.nome.length <4) this.errors.push('Nome deve conter pelo menos 4 caracteres')
        
        if(this.body.endereco.length < 4) this.errors.push('Endereço deve conter pelo menos 4 caracteres')

        if(!this.body.status) this.errors.push('Status obrigatorio')

        if(!this.body.coordenada) this.errors.push('Coordenadas Obrigatoria!')

    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            endereco: this.body.endereco,
            status: this.body.status,
            coordenada: this.body.coordenada
        }
    }

}

Ponto.buscaPontos = async function(req){
    const pontos = await PontosModel.find({dono: req.session.user._id})
    return pontos
}

Ponto.delete = async function (req) {
    const pontos = await PontosModel.deleteOne({_id: req.params.id, dono:req.session.user._id})
    return pontos
}

Ponto.edit = async function (req) {
    const ponto = await PontosModel.findOne({_id: req.params.id, dono:req.session.user._id});
    return ponto
}

Ponto.prototype.editando = async function (id, donoID) {
    this.valida();
    if (this.errors.length > 0) return;

    this.ponto = await PontosModel.findOneAndUpdate(
        { _id: id, dono: donoID },
        this.body,
        { new: true }
    );
};

    



module.exports = Ponto;