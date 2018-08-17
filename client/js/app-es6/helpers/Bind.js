import {ProxyFactory} from '../services/ProxyFactory';

// o bind retorna um proxy do model relacionando-o com o seu respectivo view, e as propriedades do model que devem atualizar a view
export class Bind {

    constructor(model, view, ...props) {

       let proxy = ProxyFactory.create(model, props, model => view.update(model));

       view.update(model);
       
       // recurso interessanto do js, o qual permite um método construtor ter um retorno
       //    sendo que nesse caso o objeto do retorno é totalmente diferente do tipo da classe do construtor 
       return proxy;
    }
}