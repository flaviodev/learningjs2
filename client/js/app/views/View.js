class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    // como não há método estático no es6 a forma de 'obrigar' o desenvolvedor a implementar um método é lançar uma exceção
    template() {
        throw new Error('O método template deve ser implementado');
    }

    update(model) {

        this._elemento.innerHTML = this.template(model);
    }
}