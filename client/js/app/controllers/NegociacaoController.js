class NegociacaoController {

    constructor() {

        // bind do querySelector para o $ 'like jquery'
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind (
            new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');  

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._service = new NegociacaoService();

        this._init();
    }

    // boa prática: deixar somente a atribuiçõe dos atributos no método construtor
    _init() {

        this._service.lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
            
        setInterval(() => {
            this.importaNegociacoes();
        }, 15000);
    }

    adiciona(event) {

        event.preventDefault();
        this._adicionaNegociacao(this._criaNegociacao())
            .then(mensagem => {
                this._mensagem.texto = mensagem; 
                this._limpaFormulario();  
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _adicionaNegociacao(negociacao) {

        return new Promise((resolve,reject) =>
            this._service.cadastra(negociacao)
                .then(mensagem => {
                    this._listaNegociacoes.adiciona(negociacao);
                    resolve(mensagem);
                }).catch(erro => reject(erro))
        );
    }

    apaga() {

        this._service.apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
     }

    importaNegociacoes() {

        // funcao some itera o array e quando encontra o elemento para de efetaur a iteracao
        // nesse caso a filtragem é para buscar o diff da importação com o que já existe (por isso a negação no some)
        this._service.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
            .then(negociacoes => negociacoes.forEach(negociacao => 
                this._adicionaNegociacao(negociacao)
                    .then(mensagem => this._mensagem.texto = 'Importação de negociações realizada com sucesso')
                    .catch(erro => this._mensagem.texto = 'Erro ao tentar importar negociações')))
            .catch(erro => this._mensagem.texto = erro);  
    }

}