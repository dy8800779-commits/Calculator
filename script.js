
const display = document.getElementById("display");
const expression = document.getElementById("expression");
const displayLabel = document.getElementById("displayLabel");
const historyList = document.getElementById("historyList");

let current = "0";
let storedValue = null;
let pendingOperator = null;
let waitingForNumber = false;
let justCalculated = false;

function updateDisplay() {
    display.value = current;
}

function formatNumber(value) {
    if (!Number.isFinite(value)) {
        throw new Error("Result is not a finite number.");
    }
    return String(Number(value.toPrecision(12)));
}

function resetCalculator() {
    current = "0";
    storedValue = null;
    pendingOperator = null;
    waitingForNumber = false;
    justCalculated = false;
    expression.textContent = "";
    updateDisplay();
}

function addHistory(description, result) {
    const empty = historyList.querySelector(".empty");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "history-item";

    const detail = document.createElement("p");
    detail.textContent = description;

    const answer = document.createElement("strong");
    answer.textContent = "= " + result;

    item.append(detail, answer);
    historyList.prepend(item);
}

function enterDigit(digit) {
    if (waitingForNumber || justCalculated) {
        current = digit;
        waitingForNumber = false;
        justCalculated = false;
    } else if (current === "0") {
        current = digit;
    } else if (current.length < 16) {
        current += digit;
    }

    updateDisplay();
}

function enterDecimal() {
    if (waitingForNumber || justCalculated) {
        current = "0.";
        waitingForNumber = false;
        justCalculated = false;
    } else if (!current.includes(".")) {
        current += ".";
    }
    updateDisplay();
}

function calculate(a, b, operator) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/":
            if (b === 0) throw new Error("Cannot divide by zero.");
            return a / b;
        case "%":
            if (b === 0) throw new Error("Cannot use remainder with zero.");
            return a % b;
        case "^": return Math.pow(a, b);
        default: throw new Error("Unknown operator.");
    }
}

function chooseOperator(operator) {
    const value = Number(current);

    try {
        if (pendingOperator && !waitingForNumber) {
            const result = calculate(storedValue, value, pendingOperator);
            current = formatNumber(result);
            storedValue = result;
            updateDisplay();
        } else {
            storedValue = value;
        }

        pendingOperator = operator;
        waitingForNumber = true;
        justCalculated = false;
        expression.textContent = `${current} ${operator}`;
    } catch (error) {
        showError(error.message);
    }
}

function equals() {
    if (!pendingOperator || waitingForNumber) return;

    const first = storedValue;
    const second = Number(current);
    const operator = pendingOperator;

    try {
        const result = calculate(first, second, operator);
        const formatted = formatNumber(result);

        expression.textContent = `${first} ${operator} ${second} =`;
        current = formatted;
        addHistory(`${first} ${operator} ${second}`, formatted);

        storedValue = null;
        pendingOperator = null;
        waitingForNumber = false;
        justCalculated = true;
        updateDisplay();
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    expression.textContent = message;
    current = "0";
    storedValue = null;
    pendingOperator = null;
    waitingForNumber = false;
    justCalculated = false;
    updateDisplay();
}

function factorial(n) {
    if (n < 0 || !Number.isInteger(n) || n > 170) {
        throw new Error("Factorial requires an integer from 0 to 170.");
    }

    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function scientific(operation) {
    const value = Number(current);
    let result;
    let label;

    try {
        switch (operation) {
            case "sin":
                result = Math.sin(value * Math.PI / 180);
                label = `sin(${value}°)`;
                break;
            case "cos":
                result = Math.cos(value * Math.PI / 180);
                label = `cos(${value}°)`;
                break;
            case "tan":
                if (Math.abs(Math.cos(value * Math.PI / 180)) < 1e-10) {
                    throw new Error("tan is undefined at this angle.");
                }
                result = Math.tan(value * Math.PI / 180);
                label = `tan(${value}°)`;
                break;
            case "sqrt":
                if (value < 0) throw new Error("Square root requires a non-negative number.");
                result = Math.sqrt(value);
                label = `√(${value})`;
                break;
            case "square":
                result = value * value;
                label = `(${value})²`;
                break;
            case "log":
                if (value <= 0) throw new Error("log requires a positive number.");
                result = Math.log10(value);
                label = `log(${value})`;
                break;
            case "ln":
                if (value <= 0) throw new Error("ln requires a positive number.");
                result = Math.log(value);
                label = `ln(${value})`;
                break;
            case "factorial":
                result = factorial(value);
                label = `${value}!`;
                break;
            case "pi":
                result = Math.PI;
                label = "π";
                break;
            case "power": {
                const exponent = prompt("Enter exponent:");
                if (exponent === null || exponent.trim() === "") return;
                const power = Number(exponent);
                if (!Number.isFinite(power)) throw new Error("Invalid exponent.");
                result = Math.pow(value, power);
                label = `${value}^${power}`;
                break;
            }
            default:
                return;
        }

        const formatted = formatNumber(result);
        expression.textContent = `${label} =`;
        current = formatted;
        addHistory(label, formatted);

        storedValue = null;
        pendingOperator = null;
        waitingForNumber = false;
        justCalculated = true;
        updateDisplay();
    } catch (error) {
        showError(error.message);
    }
}

document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => enterDigit(button.dataset.number));
});

document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => chooseOperator(button.dataset.operator));
});

document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (action === "clear") resetCalculator();
        if (action === "delete") {
            if (waitingForNumber || justCalculated) return;
            current = current.length > 1 ? current.slice(0, -1) : "0";
            if (current === "-") current = "0";
            updateDisplay();
        }
        if (action === "decimal") enterDecimal();
        if (action === "equals") equals();
        if (action === "sign") {
            current = formatNumber(-Number(current));
            updateDisplay();
        }
    });
});

document.querySelectorAll("[data-science]").forEach(button => {
    button.addEventListener("click", () => scientific(button.dataset.science));
});

document.getElementById("clearHistory").addEventListener("click", () => {
    historyList.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Your calculations will appear here.";
    historyList.append(empty);
});

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(item => item.classList.remove("active"));
        tab.classList.add("active");

        const converter = tab.dataset.tab === "converter";
        document.getElementById("calculatorPanel").classList.toggle("hidden", converter);
        document.querySelector(".history-panel").classList.toggle("hidden", converter);
        document.getElementById("converterPanel").classList.toggle("hidden", !converter);

        displayLabel.textContent =
            tab.dataset.tab === "scientific" ? "SCIENTIFIC MODE" : "STANDARD MODE";
    });
});

// Unit converter
const units = {
    length: {
        km: { label: "Kilometer (km)", factor: 1000 },
        m: { label: "Meter (m)", factor: 1 },
        cm: { label: "Centimeter (cm)", factor: 0.01 },
        mile: { label: "Mile", factor: 1609.344 },
        ft: { label: "Foot (ft)", factor: 0.3048 }
    },
    weight: {
        kg: { label: "Kilogram (kg)", factor: 1000 },
        g: { label: "Gram (g)", factor: 1 },
        mg: { label: "Milligram (mg)", factor: 0.001 },
        lb: { label: "Pound (lb)", factor: 453.59237 }
    },
    speed: {
        kmh: { label: "Kilometer/hour", factor: 1 },
        ms: { label: "Meter/second", factor: 3.6 },
        mph: { label: "Mile/hour", factor: 1.609344 }
    },
    temperature: {
        C: { label: "Celsius (°C)" },
        F: { label: "Fahrenheit (°F)" },
        K: { label: "Kelvin (K)" }
    }
};

const unitType = document.getElementById("unitType");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const unitValue = document.getElementById("unitValue");
const conversionResult = document.getElementById("conversionResult");
const conversionDetails = document.getElementById("conversionDetails");

function fillUnitOptions() {
    const category = units[unitType.value];

    fromUnit.replaceChildren();
    toUnit.replaceChildren();

    Object.entries(category).forEach(([key, unit]) => {
        fromUnit.add(new Option(unit.label, key));
        toUnit.add(new Option(unit.label, key));
    });

    const keys = Object.keys(category);
    if (keys.length > 1) toUnit.value = keys[1];

    convertUnits();
}

function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    return value - 273.15;
}

function fromCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return value * 9 / 5 + 32;
    return value + 273.15;
}

function convertUnits() {
    const value = Number(unitValue.value);
    const category = unitType.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    if (unitValue.value.trim() === "" || !Number.isFinite(value)) {
        conversionResult.textContent = "Enter a valid value";
        conversionDetails.textContent = "";
        return;
    }

    let result;

    if (category === "temperature") {
        result = fromCelsius(toCelsius(value, from), to);
    } else {
        const group = units[category];
        result = value * group[from].factor / group[to].factor;
    }

    if (category === "temperature" && to === "K" && result < 0) {
        conversionResult.textContent = "Invalid temperature";
        conversionDetails.textContent = "Kelvin cannot be negative.";
        return;
    }

    const formatted = formatNumber(result);
    conversionResult.textContent = formatted;
    conversionDetails.textContent = `${value} ${from} = ${formatted} ${to}`;
}

unitType.addEventListener("change", fillUnitOptions);
fromUnit.addEventListener("change", convertUnits);
toUnit.addEventListener("change", convertUnits);
unitValue.addEventListener("input", convertUnits);

document.getElementById("swapUnits").addEventListener("click", () => {
    const previous = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = previous;
    convertUnits();
});

document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (document.activeElement === unitValue) return;

    if (/^[0-9]$/.test(event.key)) enterDigit(event.key);
    else if (event.key === ".") enterDecimal();
    else if (["+", "-", "*", "/", "%"].includes(event.key)) chooseOperator(event.key);
    else if (event.key === "Enter" || event.key === "=") equals();
    else if (event.key === "Backspace") {
        current = current.length > 1 ? current.slice(0, -1) : "0";
        updateDisplay();
    }
    else if (event.key === "Escape") resetCalculator();
});

fillUnitOptions();
updateDisplay();