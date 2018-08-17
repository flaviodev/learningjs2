import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';


export class NegociacaoController {

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

        this._service.importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => 
                this._adicionaNegociacao(negociacao)
                    .then(mensagem => this._mensagem.texto = 'Importação de negociações realizada com sucesso')
                    .catch(erro => this._mensagem.texto = 'Erro ao tentar importar negociações')))
            .catch(erro => this._mensagem.texto = erro);  
    }
}