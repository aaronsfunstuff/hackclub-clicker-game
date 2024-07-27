let linesOfCode = 0;
let linesPerClick = 1;
let autoCoderActive = false;
let autoCoderCost = 10;
let betterKeyboardCost = 50;
let fasterComputerCost = 100;
let coffeeBoostCost = 200;
let extraMonitorCost = 500;

const linesOfCodeEl = document.getElementById('lines-of-code');
const linesPerClickEl = document.getElementById('lines-per-click');
const characterEl = document.getElementById('character');
const buyAutoCoderBtn = document.getElementById('buy-auto-coder');
const buyBetterKeyboardBtn = document.getElementById('buy-better-keyboard');
const buyFasterComputerBtn = document.getElementById('buy-faster-computer');
const buyCoffeeBoostBtn = document.getElementById('buy-coffee-boost');
const buyExtraMonitorBtn = document.getElementById('buy-extra-monitor');

const clickSound = document.getElementById('click-sound');
const purchaseSound = document.getElementById('purchase-sound');

function updateStats() {
    linesOfCodeEl.textContent = linesOfCode;
    linesPerClickEl.textContent = linesPerClick;
}

function clickCharacter() {
    linesOfCode += linesPerClick;
    updateStats();
    clickSound.play();
}

function buyAutoCoder() {
    if (linesOfCode >= autoCoderCost) {
        linesOfCode -= autoCoderCost;
        autoCoderActive = true;
        autoCoderCost *= 2;
        buyAutoCoderBtn.disabled = true;
        startAutoCoder();
        updateStats();
        purchaseSound.play();
    }
}

function startAutoCoder() {
    setInterval(() => {
        if (autoCoderActive) {
            linesOfCode += linesPerClick;
            updateStats();
        }
    }, 1000);
}

function buyBetterKeyboard() {
    if (linesOfCode >= betterKeyboardCost) {
        linesOfCode -= betterKeyboardCost;
        linesPerClick += 1;
        betterKeyboardCost *= 2;
        buyBetterKeyboardBtn.disabled = true;
        updateStats();
        purchaseSound.play();
    }
}

function buyFasterComputer() {
    if (linesOfCode >= fasterComputerCost) {
        linesOfCode -= fasterComputerCost;
        linesPerClick += 2;
        fasterComputerCost *= 2;
        buyFasterComputerBtn.disabled = true;
        updateStats();
        purchaseSound.play();
    }
}

function buyCoffeeBoost() {
    if (linesOfCode >= coffeeBoostCost) {
        linesOfCode -= coffeeBoostCost;
        linesPerClick += 5;
        coffeeBoostCost *= 2;
        buyCoffeeBoostBtn.disabled = true;
        updateStats();
        purchaseSound.play();
    }
}

function buyExtraMonitor() {
    if (linesOfCode >= extraMonitorCost) {
        linesOfCode -= extraMonitorCost;
        linesPerClick += 10;
        extraMonitorCost *= 2;
        buyExtraMonitorBtn.disabled = true;
        updateStats();
        purchaseSound.play();
    }
}

characterEl.addEventListener('click', clickCharacter);
buyAutoCoderBtn.addEventListener('click', buyAutoCoder);
buyBetterKeyboardBtn.addEventListener('click', buyBetterKeyboard);
buyFasterComputerBtn.addEventListener('click', buyFasterComputer);
buyCoffeeBoostBtn.addEventListener('click', buyCoffeeBoost);
buyExtraMonitorBtn.addEventListener('click', buyExtraMonitor);
