
// o proxy encapsula nesse projeto o tratamento de autalização da view em virtude 
//     da modificação do estado da propriedades do model
export class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            // interceptando invocação da função
            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._isFuncao(target[prop])) {
                    return function() {

                        console.log(`a propriedade "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);       
            },

            // interceptado alteração do atributo
            set(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    console.log(`a propriedade "${prop}" foi interceptada`);
                    target[prop] = value;
                    acao(target);
                }
            
                return Reflect.set(target, prop, value, receiver);
            }
        })
    }

    static _isFuncao(func) {

        return typeof(func) == typeof(Function);
    
    }
}