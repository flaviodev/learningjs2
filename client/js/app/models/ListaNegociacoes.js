class ListaNegociacoes {

    constructor(contexto, armadilha) {

        this._contexto = contexto;
        this._armadilha = armadilha;
        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        // invocando o método no contexto (this) passado
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    esvazia()   {

        this._negociacoes = [];
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get armadilha() {

        this._armadilha;
    }

    get contexto() {
        this._contexto;
    }
}