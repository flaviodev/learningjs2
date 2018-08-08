class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static textoParaData(dataTexto) {
        //  spread operator -> cada item do array passa a ser um parametro para o new Date
        return new Date(...dataTexto.split('-').map((item,i) => item - i % 2));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}
