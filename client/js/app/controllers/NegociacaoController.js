class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
    }


    adiciona(event) {
        event.preventDefault();

        let negociacao = new Negociacao(
            strToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
          );
    
          console.log(negociacao);
    }
}
//  spread operator -> cada item do array passa a ser um parametro para o new Date
const strToDate = (strDate) =>  new Date(...strDate.split('-').map((item,i) => item - i % 2));
