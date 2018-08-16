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

        this._init();
    }

    // boa prática: deixar somente a atribuiçõe dos atributos no método construtor
    _init() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {

                console.log(erro);
                this._mensagem.texto = erro;
            });

            
        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
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
            new NegociacaoService()
                .cadastra(negociacao)
                .then(mensagem => {
                    this._listaNegociacoes.adiciona(negociacao);
                    resolve(mensagem);
                }).catch(erro => reject(erro))
        );
    }

    apaga() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {

                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            });
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {
    
            let request = this._connection
                .transaction([this_store], 'readwrite')
                .objectStore(this._store)
                .clear();
    
            request.onsuccess = e => resolve('Negociações removidas com sucesso');
    
            request.onerror = e => {

              console.log(e.target.error);
              reject('Não foi possível remover as negociações');
            }
          });
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

        let service = new NegociacaoService();

        // funcao some itera o array e quando encontra o elemento para de efetaur a iteracao
        // nesse caso a filtragem é para buscar o diff da importação com o que já existe (por isso a negação no some)
        service
            .obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoes => negociacoes.forEach(negociacao => 
                this._adicionaNegociacao(negociacao)
                    .then(mensagem => this._mensagem.texto = 'Importação de negociações realizada com sucesso')
                    .catch(erro => this._mensagem.texto = 'Erro ao tentar importar negociações')
            )).catch(erro => this._mensagem.texto = erro);  
    }

}