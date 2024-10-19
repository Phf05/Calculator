const btns = window.document.querySelectorAll('.botoes button')
let tela = window.document.querySelector('.screen p')
let inicial_zero = true
let operadores = ["+", "-", "*", "/"]

tela.style.color = 'white' 

btns.forEach((btn) => { btn.addEventListener('click', () => {
 
    if(tela.innerHTML.length <= 11)
    {
        if(btn.innerHTML == '='){
            try
            {   
                let telaa = tela.innerHTML.replace(/,/g, '.') //trocando todas as aparições do item, e não só a 1°
                
                let resultado = eval(telaa) //armazenar o eval() em uma variavel para impedir perda de previsão com as multiplas chamadas
                
                if(resultado % 1 !== 0 )
                {
                    console.log('resultado:', resultado)
                    tela.innerHTML = resultado.toFixed(2)
                    tela.innerHTML = tela.innerHTML.toString().replace('.', ',')
                }

                else {
                    tela.innerHTML = resultado
                }
            }

            catch
            {
                tela.innerHTML = '[Erro]'
                inicial_zero = true
            }

            return
            
        }

        else if(btn.innerHTML == 'C')
        {
            tela.innerHTML = '0'
            inicial_zero = true
            return
        }

        else if(btn.innerHTML == 'x')
        {   
            if(tela.innerHTML.length > 1)
            {
                tela.innerHTML = tela.innerHTML.slice(0, -1)//removendo ultimo caracterie da string atual(0)
            }

            else 
            {
                tela.innerHTML ='0'
                inicial_zero = true
            }

            return
        }


        else if(operadores.includes(btn.innerHTML))
        {
            if(operadores.includes(tela.innerHTML.slice(-1)))
                {
                    return
                }

            if(inicial_zero)
                {
                    return
                }
        }

        else if(inicial_zero){
            tela.innerHTML = ''
            inicial_zero = false
            
        }


        tela.innerHTML += btn.innerHTML 
    }

else {
    window.alert('Limite de caracteries atingido')
    tela.innerHTML = '0'
}   
})

})