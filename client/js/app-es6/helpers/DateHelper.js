class DateHelper {

    constructor() {

        throw new Error('Esta classe não pode ser instanciada');
    }

    static textoParaData(dataTexto) {

        if(!/\d{4}-\d{2}-\d{2}/.test(dataTexto))
            throw new Error('Deve estar no formato aaaa-mm-dd');

        // spread (esparrama) operator -> cada item do array passa a ser um parametro para o new Date
        //    ex: o split devolve 3 elementos no array, o spread faz com que cada item do array seja 
        //    um argumento da chamada de função -> new f(...a) = new f(a[0],a[1],a[2])
        return new Date(...dataTexto.split('-').map((item,i) => item - i % 2));
    }

    static dataParaTexto(data) {
        
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
}
