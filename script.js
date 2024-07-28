const linesOfCodeEl = document.getElementById('lines-of-code');
const linesPerClickEl = document.getElementById('lines-per-click');
const linesPerSecondEl = document.getElementById('lines-per-second');
const prestigePointsEl = document.getElementById('prestige-points');
const characterEl = document.getElementById('character');
const clickSound = document.getElementById('click-sound');
const purchaseSound = document.getElementById('purchase-sound');

// Game Variables
let linesOfCode = 0;
let linesPerClick = 1;
let linesPerSecond = 0;
let prestigePoints = 0;

// Upgrades
const upgrades = {
    autoCoder: { cost: 10, increment: 1 },
    betterKeyboard: { cost: 50, increment: 5 },
    fasterComputer: { cost: 100, increment: 10 },
    coffeeBoost: { cost: 200, increment: 20 },
    extraMonitor: { cost: 500, increment: 50 },
    codeBot: { cost: 1000, increment: 100 },
    aiAssistant: { cost: 5000, increment: 500 }
};

// Update Stats on UI
function updateStats() {
    linesOfCodeEl.textContent = linesOfCode;
    linesPerClickEl.textContent = linesPerClick;
    linesPerSecondEl.textContent = linesPerSecond;
    prestigePointsEl.textContent = prestigePoints;
}

// Clicking the Character
function clickCharacter() {
    linesOfCode += linesPerClick;
    updateStats();
    clickSound.currentTime = 0; // Reset sound for rapid clicking
    clickSound.play();
}

characterEl.addEventListener('click', clickCharacter);

// Purchasing Upgrades
function purchaseUpgrade(upgradeName) {
    const upgrade = upgrades[upgradeName];
    if (linesOfCode >= upgrade.cost) {
        linesOfCode -= upgrade.cost;
        linesPerClick += upgrade.increment;
        linesPerSecond += upgradeName === 'autoCoder' || upgradeName === 'codeBot' || upgradeName === 'aiAssistant' ? upgrade.increment : 0;
        upgrade.cost = Math.ceil(upgrade.cost * 1.15); // Increase cost by 15% after purchase
        updateStats();
        purchaseSound.currentTime = 0;
        purchaseSound.play();
        updateButtonCost(upgradeName);
    }
}

// Update Button Costs
function updateButtonCost(upgradeName) {
    const button = document.getElementById(`buy-${upgradeName}`);
    button.textContent = `${capitalize(upgradeName)} (Cost: ${upgrades[upgradeName].cost} LOC)`;
    button.disabled = linesOfCode < upgrades[upgradeName].cost; // Disable button if not enough LOC
}

// Capitalize Function
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
}

// Assign buttons to purchase actions
document.getElementById('buy-auto-coder').addEventListener('click', () => purchaseUpgrade('autoCoder'));
document.getElementById('buy-better-keyboard').addEventListener('click', () => purchaseUpgrade('betterKeyboard'));
document.getElementById('buy-faster-computer').addEventListener('click', () => purchaseUpgrade('fasterComputer'));
document.getElementById('buy-coffee-boost').addEventListener('click', () => purchaseUpgrade('coffeeBoost'));
document.getElementById('buy-extra-monitor').addEventListener('click', () => purchaseUpgrade('extraMonitor'));
document.getElementById('buy-code-bot').addEventListener('click', () => purchaseUpgrade('codeBot'));
document.getElementById('buy-ai-assistant').addEventListener('click', () => purchaseUpgrade('aiAssistant'));

// Automatic line increase for auto-coder
setInterval(() => {
    if (linesPerSecond > 0) {
        linesOfCode += linesPerSecond;
        updateStats();
        // Re-enable purchase buttons when lines of code increase
        Object.keys(upgrades).forEach((upgradeName) => updateButtonCost(upgradeName));
    }
}, 1000);

// Prestige System
document.getElementById('prestige-button').addEventListener('click', () => {
    if (linesOfCode >= 10000) { // Minimum requirement for prestige
        prestigePoints += Math.floor(linesOfCode / 10000); // Gain prestige points
        linesOfCode = 0; // Reset lines of code
        linesPerClick = 1; // Reset lines per click
        linesPerSecond = 0; // Reset lines per second
        updateStats();
        alert('You have prestiged! Gain bonuses for starting over!');
    }
});
