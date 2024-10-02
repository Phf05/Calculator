const buttons = window.document.querySelectorAll("#botoes button")
const result = window.document.querySelector('.screen')

var currentNumber = ""
var firstOperand = ""
var operator = ""
var restart = false

function updateResult(oringinClear=false)
{
    result.innerHTML = oringinClear ? 0 : currentNumber.replace(".", ",") //com (?) e (:), tendo função de if e else
}

function addDigit(digit)
{
    if(digit == "," && (currentNumber.includes(",") || ! currentNumber))// includes() verificando se ah tal elemento na string
    {  return // vale lembra que esse return foi usado para parar a execução da função, se a condição for atendida
        //não podiamos utilizar o "break", pois, break: utilizado para a execução de loops e switch-case ; return: pode ser utilizado para parar a execução de uma função
    }

    if(restart)
    {
        currentNumber = digit
        restart = false

    } else {
        currentNumber += digit
    }
    updateResult()
}

function setOperator(newOperator)
{
    if(currentNumber)
    {
        calculate()

        firstOperand = parseFloat(currentNumber.replace(",", "."))
        currentNumber = ""
    }
    operator = newOperator
}

function calculate()
{
    if(operator === "" || firstOperand === "")
       {  
        return
       }
    var secondOperand = parseFloat(currentNumber.replace("," , "."))
    var resultValue

    switch (operator)
        {
            case "+":
                resultValue = firstOperand + secondOperand
                break

            case "-":
                resultValue = firstOperand - secondOperand
                break
                
            case "*":
                resultValue = firstOperand * secondOperand
                break

            case "/":
                resultValue = firstOperand / secondOperand
                break

            default:
                return    
        }
    
    if (resultValue.toString().split(".")[1]?.length > 5)/*1°toString comventendo para uma string, .split() fatiando uma string com tiver um ponto e pegar o indice [1] que seria a parte decimal e se(?) tiver verificar se o length é maior do que 5   */
    {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString()/*se a condição for atendida, parseFloat comverte a string em float e tira os zeros desnecessarios de resultValue que so pode ter no maximo 5 casas decimais(tiFixed(5)) e no final o comvertendo de volta em uma string(toString())  */
    } 
    else {
        currentNumber = resultValue.toString()
    }

    operator = ""
    firstOperand = ""
    restart = ""
    percetageValue = ""
    updateResult(true)

}

function clearCalculator()
{
    currentNumber = ""
    firstOperand = ""
    operator = ""
    updateResult(true)
}

function setPercentage()
{
    var result = parseFloat(currentNumber) / 100

    if(["+", "-"].includes(operator))
    {
        result = result * (firstOperand || 1)
    }

    if(result.toString().split(".")[1]?.length > 5)
    {
        result = result.toFixed(5).toString()
    }

    currentNumber = result.toString()
    updateResult()
}

buttons.forEach((button) =>/*exemplo de forEach: let numbers = [1, 2, 3, 4];
numbers.forEach((number) => {
    console.log(number);  // Isso imprimirá 1, 2, 3 e 4, um por linha
});
*/
{
    button.addEventListener('click', () =>
    {
        const buttonText = button.innerHTML
        if(/^[0-9,]+$/.test(buttonText))/*analise */
        {
            addDigit(buttonText)

        } else if (["+", "-", "*", "/"].includes(buttonText))
        {
            setOperator(buttonText)
        }

        else if(buttonText === "=")
        {
            calculate()
        }

        else if(buttonText === "C")
        {
            clearCalculator()
        }

        else if(buttonText === "±")
        {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString()
            updateResult()
        }
        else if(buttonText === "%")
        {
            setPercentage()
        
        }
    })
})