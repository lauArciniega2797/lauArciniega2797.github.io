const changeNumber = (name, opc) => {
    let input_number = document.querySelector('input[name='+name+']'),
        valor
    if(input_number){
        valor = parseInt(input_number.value)
    }
    switch (opc) {
        case 'minus':
            if(valor > 0){
                valor = parseInt(input_number.value) - 1
            }
            break;
            case 'plus':
            valor = parseInt(input_number.value) + 1            
            break;
    }

    input_number.value = valor
}