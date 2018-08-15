class MensagemView extends View {

    constructor(elemento) {
         super(elemento);
    }
  
    template(model) {
  
        // interpolação usando template string
        return model.texto ?`<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
  }