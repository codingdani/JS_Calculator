//Classes are like a Template for creating JavaScript Objects.
//Classes must be declared before one can use them. That's why Classes always are at the Top of the Code. (=> The Class itself is hoisted, but it's values are not initialized.)

class Calculator {
    //The constructor function is included in every class object and is a special method for assigning properties.
    //It's automatically called when creating an class object.
    //functions inside Objects are also called METHODS.
    constructor(previousOperandText, currentOperandText) {
        //In this constructor function we hand over two variables that store/save the numbers we need.
        //A constructor function automatically creates an Object called this. Inside the class object we can refer to this, which stores all our values.
        //We set the previousOperandText variable and the currentOperantText variable of the this object to the value of the variables we get handed with the creation of the class object.
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        //When a calculator Object gets declared in the code with the new statement (line 82), we want to "create" two variables inside the calculator (this) object: previousOperand and currentOperand (without the Text), by calling the allClear() method in the creation process.
        this.allClear();
    }
    //In the following methods we have an operandText variable and an operand variable. 
    //We can think of them as input/inside handler and output. The variable with the "Text" at the end displays the output in the browser.
    //The other one handles everything inside the class object & calculation.
    allClear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    appendInput(input){
        //Only allow one period in the input.
        if (input === '.' && this.currentOperand.includes('.')) return
        //We convert our input into strings, because JavaScript would try to actually ADD/calculate these NumberInputs, not append them.
        //EXAMPLE: WITHOUT .toString(): 1 + 1 equals 2  // WITH .toString(): 1 + 1 equals 11
        this.currentOperand = this.currentOperand.toString() + input.toString()
    }
    updateDisplay(){
        //The output on the display in the browser (currentOperandText) gets updated to the input.
        this.currentOperandText.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`
        }else {
            this.previousOperandText.innerText = this.previousOperand

        }
    }
    selectOperation(operation){
        if (this.currentOperand === '') return
        //Do the already existing operation, before accepting a new operation.
        if (this.previousOperand !== '') {
            this.calc()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    calc(){
        let calculation = 0;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '÷':
                calculation = prev / current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '+':
                calculation = prev + current
                break;
            case '-':
                calculation = prev - current;
                break;
            default: return
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
}

const previousOperandText = document.querySelector('#prev_operand');
const currentOperandText = document.querySelector('#curr_operand');
const allClearButton = document.querySelector('#all_clear_btn');
const deleteButton = document.querySelector('#delete_btn');
const numberButtons = document.querySelectorAll('.number_btn');
const operationButtons = document.querySelectorAll('.operation_btn');
const equalsButton = document.querySelector('#equals_btn');

const calculator = new Calculator(previousOperandText, currentOperandText);

Array.from(numberButtons).map(button => {
    button.addEventListener('click', () => {
        calculator.appendInput(button.innerText);
        calculator.updateDisplay();
    })
})
Array.from(operationButtons).map(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click', button => {
    calculator.calc()
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    calculator.allClear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})


