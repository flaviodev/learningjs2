export class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        
        // programação defensiva que garante uma cópia do array no getter
        return [].concat(this._negociacoes);
    }

    esvazia()   {

        this._negociacoes = [];
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }

    ordena(criterio) {

        this._negociacoes.sort(criterio);        
    }
    
    inverteOrdem() {

        this._negociacoes.reverse();
    }   
}