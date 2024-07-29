const linesOfCodeEl = document.getElementById('lines-of-code');
const linesPerClickEl = document.getElementById('lines-per-click');
const linesPerSecondEl = document.getElementById('lines-per-second');
const prestigePointsEl = document.getElementById('prestige-points');
const characterEl = document.getElementById('character');
const clickSound = document.getElementById('click-sound');
const purchaseSound = document.getElementById('purchase-sound');
const achievementsListEl = document.getElementById('achievements-list');
const eventTimerEl = document.getElementById('event-timer');
const leaderboardListEl = document.getElementById('leaderboard-list');

let linesOfCode = 0;
let linesPerClick = 1;
let linesPerSecond = 0;
let prestigePoints = 0;
let achievements = 0;
let eventActive = false;

const upgrades = {
    autoCoder: { cost: 10, increment: 1 },
    betterKeyboard: { cost: 50, increment: 5 },
    fasterComputer: { cost: 100, increment: 10 },
    coffeeBoost: { cost: 200, increment: 20 },
    extraMonitor: { cost: 500, increment: 50 },
    codeBot: { cost: 1000, increment: 100 },
    aiAssistant: { cost: 5000, increment: 500 },
    hackerMode: { cost: 10000, increment: 1000 }
};

const achievementsList = [
    { name: "First Click", condition: () => linesOfCode >= 1, achieved: false },
    { name: "First 100 LOC", condition: () => linesOfCode >= 100, achieved: false },
    { name: "First 1,000 LOC", condition: () => linesOfCode >= 1000, achieved: false },
    { name: "First 10,000 LOC", condition: () => linesOfCode >= 10000, achieved: false },
    { name: "First Prestige", condition: () => prestigePoints > 0, achieved: false },
    { name: "Ultimate Coder", condition: () => linesPerSecond >= 500, achieved: false },
    { name: "Code Millionaire", condition: () => linesOfCode >= 1000000, achieved: false },
];

function updateStats() {
    linesOfCodeEl.textContent = linesOfCode;
    linesPerClickEl.textContent = linesPerClick;
    linesPerSecondEl.textContent = linesPerSecond;
    prestigePointsEl.textContent = prestigePoints;
    checkAchievements();
}

function checkAchievements() {
    achievementsList.forEach(achievement => {
        if (!achievement.achieved && achievement.condition()) {
            achievement.achieved = true;
            achievements++;
            updateAchievementsList();
            alert(`Achievement Unlocked: ${achievement.name}`);
        }
    });
    document.getElementById('achievements-earned').textContent = achievements;
}

function updateAchievementsList() {
    achievementsListEl.innerHTML = "";
    achievementsList.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement.name;
        li.style.color = achievement.achieved ? '#ff8c37' : '#555';
        achievementsListEl.appendChild(li);
    });
}

function clickCharacter() {
    linesOfCode += linesPerClick;
    updateStats();
    clickSound.currentTime = 0;
    clickSound.play();
}

characterEl.addEventListener('click', clickCharacter);

function purchaseUpgrade(upgradeName) {
    const upgrade = upgrades[upgradeName];
    if (linesOfCode >= upgrade.cost) {
        linesOfCode -= upgrade.cost;
        linesPerClick += upgrade.increment;
        linesPerSecond += upgradeName === 'autoCoder' || upgradeName === 'codeBot' || upgradeName === 'aiAssistant' || upgradeName === 'hackerMode' ? upgrade.increment : 0;
        upgrade.cost = Math.ceil(upgrade.cost * 1.15);
        updateStats();
        purchaseSound.currentTime = 0;
        purchaseSound.play();
        updateButtonCost(upgradeName);
    }
}

function updateButtonCost(upgradeName) {
    const button = document.getElementById(`buy-${upgradeName}`);
    button.textContent = `${capitalize(upgradeName)} (Cost: ${upgrades[upgradeName].cost} LOC)`;
    button.disabled = linesOfCode < upgrades[upgradeName].cost;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
}

document.getElementById('buy-auto-coder').addEventListener('click', () => purchaseUpgrade('autoCoder'));
document.getElementById('buy-better-keyboard').addEventListener('click', () => purchaseUpgrade('betterKeyboard'));
document.getElementById('buy-faster-computer').addEventListener('click', () => purchaseUpgrade('fasterComputer'));
document.getElementById('buy-coffee-boost').addEventListener('click', () => purchaseUpgrade('coffeeBoost'));
document.getElementById('buy-extra-monitor').addEventListener('click', () => purchaseUpgrade('extraMonitor'));
document.getElementById('buy-code-bot').addEventListener('click', () => purchaseUpgrade('codeBot'));
document.getElementById('buy-ai-assistant').addEventListener('click', () => purchaseUpgrade('aiAssistant'));
document.getElementById('buy-hacker-mode').addEventListener('click', () => purchaseUpgrade('hackerMode'));

setInterval(() => {
    if (linesPerSecond > 0) {
        linesOfCode += linesPerSecond;
        updateStats();
        Object.keys(upgrades).forEach((upgradeName) => updateButtonCost(upgradeName));
    }
}, 1000);

document.getElementById('prestige-button').addEventListener('click', () => {
    if (linesOfCode >= 10000) {
        prestigePoints += Math.floor(linesOfCode / 10000);
        linesOfCode = 0;
        linesPerClick = 1;
        linesPerSecond = 0;
        updateStats();
        alert('You have prestiged! Gain bonuses for starting over!');
    }
});

document.getElementById('start-event').addEventListener('click', () => {
    if (!eventActive) {
        eventActive = true;
        startEvent();
    }
});

function startEvent() {
    const eventDuration = 30;
    let timeLeft = eventDuration;
    const eventInterval = setInterval(() => {
        timeLeft--;
        eventTimerEl.textContent = `Event Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(eventInterval);
            eventActive = false;
            eventTimerEl.textContent = '';
            alert('Event ended! Claim your reward!');
            linesOfCode += 500; 
            updateStats();
        }
    }, 1000);
}

const leaderboardData = [
    { player: 'Alice', score: 1500 },
    { player: 'Bob', score: 1200 },
    { player: 'Charlie', score: 800 },
];

function updateLeaderboard() {
    leaderboardListEl.innerHTML = "";
    leaderboardData.sort((a, b) => b.score - a.score); 
    leaderboardData.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.player}: ${entry.score} LOC`;
        leaderboardListEl.appendChild(li);
    });
}

updateLeaderboard();

document.getElementById('customize-character').addEventListener('click', () => {
    alert('Character customization coming soon!');
});

Object.keys(upgrades).forEach(upgradeName => updateButtonCost(upgradeName));

updateStats();
updateAchievementsList();
const prestigeStatsEl = document.getElementById('prestige-stats');
const eventsRewardsEl = document.getElementById('events-rewards');

let prestigeStats = [];
let eventsRewards = [];

const prestigeMilestones = [
    { milestone: 1, bonus: 0.1 },
    { milestone: 5, bonus: 0.2 },
    { milestone: 10, bonus: 0.5 },
    { milestone: 20, bonus: 1 }
];

function calculatePrestigeBonus() {
    let bonus = 0;
    prestigeMilestones.forEach(milestone => {
        if (prestigePoints >= milestone.milestone) {
            bonus = milestone.bonus;
        }
    });
    return bonus;
}

function updatePrestigeStats() {
    prestigeStatsEl.innerHTML = "";
    prestigeMilestones.forEach(milestone => {
        const li = document.createElement('li');
        li.textContent = `Milestone ${milestone.milestone} Prestige Points: Bonus ${milestone.bonus * 100}%`;
        prestigeStatsEl.appendChild(li);
    });
}

function startEvent() {
    const eventDuration = 30;
    let timeLeft = eventDuration;
    const eventInterval = setInterval(() => {
        timeLeft--;
        eventTimerEl.textContent = `Event Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(eventInterval);
            eventActive = false;
            eventTimerEl.textContent = '';
            const reward = Math.floor(Math.random() * 1000) + 500;
            linesOfCode += reward;
            eventsRewards.push({ reward, timestamp: new Date().toLocaleTimeString() });
            alert(`Event ended! You earned ${reward} LOC!`);
            updateEventsRewards();
            updateStats();
        }
    }, 1000);
}

function updateEventsRewards() {
    eventsRewardsEl.innerHTML = "";
    eventsRewards.forEach(reward => {
        const li = document.createElement('li');
        li.textContent = `Reward: ${reward.reward} LOC at ${reward.timestamp}`;
        eventsRewardsEl.appendChild(li);
    });
}

function unlockSpecialAchievement() {
    if (linesOfCode >= 500000) {
        alert('Special Achievement Unlocked: Code Master!');
    }
}

function startCodeChallenge() {
    const challengeDuration = 10;
    let timeLeft = challengeDuration;
    const challengeInterval = setInterval(() => {
        timeLeft--;
        eventTimerEl.textContent = `Challenge Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(challengeInterval);
            eventTimerEl.textContent = '';
            const challengeReward = Math.floor(Math.random() * 2000) + 1000;
            linesOfCode += challengeReward;
            unlockSpecialAchievement();
            alert(`Challenge ended! You earned ${challengeReward} LOC!`);
            updateStats();
        }
    }, 1000);
}

function randomEvent() {
    const events = ['Start Event', 'Start Code Challenge'];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    if (randomEvent === 'Start Event') {
        startEvent();
    } else if (randomEvent === 'Start Code Challenge') {
        startCodeChallenge();
    }
}

document.getElementById('start-random-event').addEventListener('click', () => {
    randomEvent();
});

function updateStats() {
    linesOfCodeEl.textContent = linesOfCode;
    linesPerClickEl.textContent = linesPerClick;
    linesPerSecondEl.textContent = linesPerSecond;
    prestigePointsEl.textContent = prestigePoints;
    checkAchievements();
    updatePrestigeStats();
    unlockSpecialAchievement();
}

document.getElementById('start-random-event').addEventListener('click', () => {
    randomEvent();
});

document.getElementById('prestige-button').addEventListener('click', () => {
    if (linesOfCode >= 10000) {
        prestigePoints += Math.floor(linesOfCode / 10000);
        linesOfCode = 0;
        linesPerClick = 1;
        linesPerSecond = 0;
        updateStats();
        alert('You have prestiged! Gain bonuses for starting over!');
    }
});

setInterval(() => {
    if (linesPerSecond > 0) {
        linesOfCode += linesPerSecond;
        updateStats();
        Object.keys(upgrades).forEach((upgradeName) => updateButtonCost(upgradeName));
    }
}, 1000);

Object.keys(upgrades).forEach(upgradeName => updateButtonCost(upgradeName));

updateStats();
updateAchievementsList();
updatePrestigeStats();
updateEventsRewards();
