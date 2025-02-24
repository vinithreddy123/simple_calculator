const display = document.getElementById("display");

// Append numbers & operators to display
function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);
    
    // Prevent consecutive operators
    if (isOperator(input) && isOperator(lastChar)) return;
    
    // Prevent leading zeros
    if (display.value === "0" && input !== ".") {
        display.value = input;
    } else {
        display.value += input;
    }
}

// Clear entire display
function clearDisplay() {
    display.value = "";
}

// Delete last character (Backspace)
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Perform calculation safely
function calculate() {
    try {
        if (display.value.trim() === "") return; // Prevent evaluation of empty input

        // Check for division by zero
        if (display.value.includes("/0")) {
            display.value = "Error";
            return;
        }

        display.value = new Function(`return ${display.value}`)();
    } catch (error) {
        display.value = "Error";
    }
}

// Handle percentage calculation
function percentage() {
    try {
        display.value = eval(display.value + "/100");
    } catch (error) {
        display.value = "Error";
    }
}

// Check if input is an operator
function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

// Enable keyboard input support
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || isOperator(key) || key === ".") {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "%") {
        percentage();
    }
});
