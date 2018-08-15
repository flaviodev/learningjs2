class Mensagem {

    // valor default para o parametro
    constructor(texto='') {

        this._texto = texto;
    }

    get texto() {

        return this._texto;
    }

    set texto(texto) {

        this._texto = texto;
    }
}