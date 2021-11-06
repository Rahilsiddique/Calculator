class Calculator{
    constructor(preOppTextElem,currOppTextElem){
        this.preOppTextElem=preOppTextElem
        this.currOppTextElem=currOppTextElem
        this.clear()
    }

    clear(){
        this.currOpp = ''
        this.preOpp = ''
        this.operation = undefined
    }

    delete(){
        this.currOpp = this.currOpp.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currOpp.includes('.')) return
        this.currOpp = this.currOpp.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currOpp === '') return
        if(this.preOpp !== ''){
            this.compute()
        }
        this.operation = operation
        this.preOpp = this.currOpp
        this.currOpp = ''
    }

    compute(){
        let computation
        const pre = parseFloat(this.preOpp)
        const curr = parseFloat(this.currOpp)
        if(isNaN(pre) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = pre + curr
                break;
            case '-':
                computation = pre - curr
                break;
            case '*':
                computation = pre * curr
                break;
            case '÷':
                computation = pre / curr
                break;
            default:
                return
        }
        this.currOpp = computation
        this.operation = undefined
        this.preOpp = ''

    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currOppTextElem.innerText = this.getDisplayNumber(this.currOpp)
        if(this.operation != null){
            this.preOppTextElem.innerText = `${this.getDisplayNumber(this.preOpp)} ${this.operation}`
        }else{
            this.preOppTextElem.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const preOppTextElem = document.querySelector('[data-pre-opp]')
const currOppTextElem = document.querySelector('[data-curr-opp]')

const calculator = new Calculator(preOppTextElem,currOppTextElem)

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})