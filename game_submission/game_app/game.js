// Game State
const gameState = {
  year: 1,
  maxYears: 30,
  budget: 100,
  maxBudget: 100,
  emissions: 100,
  publicSupport: 50,
  technology: 1,
  maxTechnology: 5,
  score: 0,
  history: [],
  difficulty: "normal",
  actionsThisYear: 0,
  maxActionsPerYear: 2,
}

// Climate Actions with Tiers
const climateActions = [
  // Tier 1 - Basic Actions
  {
    id: 1,
    title: "Solar Farms",
    icon: "☀️",
    description: "Build large-scale solar energy infrastructure",
    cost: 15,
    emissionReduction: 8,
    supportGain: 5,
    techRequired: 1,
    tier: 1,
  },
  {
    id: 2,
    title: "Reforestation",
    icon: "🌲",
    description: "Plant millions of trees to absorb CO2",
    cost: 12,
    emissionReduction: 7,
    supportGain: 8,
    techRequired: 1,
    tier: 1,
  },
  {
    id: 3,
    title: "Public Transit",
    icon: "🚌",
    description: "Expand public transportation networks",
    cost: 18,
    emissionReduction: 10,
    supportGain: 6,
    techRequired: 1,
    tier: 1,
  },
  {
    id: 4,
    title: "Wind Energy",
    icon: "💨",
    description: "Install offshore and onshore wind turbines",
    cost: 16,
    emissionReduction: 9,
    supportGain: 5,
    techRequired: 1,
    tier: 1,
  },
  {
    id: 5,
    title: "Electric Vehicles",
    icon: "🚗",
    description: "Subsidize EV adoption and charging stations",
    cost: 14,
    emissionReduction: 8,
    supportGain: 7,
    techRequired: 1,
    tier: 1,
  },
  {
    id: 6,
    title: "Green Buildings",
    icon: "🏢",
    description: "Retrofit buildings with sustainable materials",
    cost: 15,
    emissionReduction: 7,
    supportGain: 4,
    techRequired: 1,
    tier: 1,
  },
  // Tier 2 - Advanced Actions
  {
    id: 7,
    title: "Carbon Capture",
    icon: "💨",
    description: "Deploy direct air capture technology",
    cost: 25,
    emissionReduction: 15,
    supportGain: 3,
    techRequired: 2,
    tier: 2,
  },
  {
    id: 8,
    title: "Nuclear Power",
    icon: "⚛️",
    description: "Build next-generation nuclear reactors",
    cost: 28,
    emissionReduction: 18,
    supportGain: 2,
    techRequired: 2,
    tier: 2,
  },
  {
    id: 9,
    title: "Ocean Cleanup",
    icon: "🌊",
    description: "Deploy ocean cleanup and restoration tech",
    cost: 22,
    emissionReduction: 12,
    supportGain: 6,
    techRequired: 2,
    tier: 2,
  },
  {
    id: 10,
    title: "Hydrogen Economy",
    icon: "⚡",
    description: "Transition to hydrogen fuel infrastructure",
    cost: 26,
    emissionReduction: 16,
    supportGain: 4,
    techRequired: 2,
    tier: 2,
  },
  // Tier 3 - Cutting Edge
  {
    id: 11,
    title: "Fusion Energy",
    icon: "🔥",
    description: "Develop commercial fusion power plants",
    cost: 35,
    emissionReduction: 25,
    supportGain: 5,
    techRequired: 3,
    tier: 3,
  },
  {
    id: 12,
    title: "Geoengineering",
    icon: "🌍",
    description: "Deploy atmospheric cooling technology",
    cost: 32,
    emissionReduction: 22,
    supportGain: 1,
    techRequired: 3,
    tier: 3,
  },
]

// Random Events
const randomEvents = [
  {
    title: "Oil Price Spike",
    description: "Global oil prices surge, increasing renewable energy demand",
    effect: { emissions: -5, support: 8, budget: -10 },
    type: "mixed",
  },
  {
    title: "Climate Summit Success",
    description: "International agreement boosts climate action momentum",
    effect: { emissions: -3, support: 15, budget: 0 },
    type: "positive",
  },
  {
    title: "Economic Recession",
    description: "Global economic downturn reduces available budget",
    effect: { emissions: 2, support: -5, budget: -20 },
    type: "negative",
  },
  {
    title: "Tech Breakthrough",
    description: "Major scientific breakthrough in renewable energy",
    effect: { emissions: 0, support: 5, technology: 1 },
    type: "positive",
  },
  {
    title: "Natural Disaster",
    description: "Extreme weather event damages infrastructure",
    effect: { emissions: 3, support: -3, budget: -15 },
    type: "negative",
  },
  {
    title: "Youth Climate Movement",
    description: "Global youth activism increases climate awareness",
    effect: { emissions: 0, support: 12, budget: 0 },
    type: "positive",
  },
  {
    title: "Corporate Resistance",
    description: "Major corporations lobby against climate policies",
    effect: { emissions: 2, support: -8, budget: 5 },
    type: "negative",
  },
  {
    title: "Green Jobs Boom",
    description: "Renewable energy sector creates millions of jobs",
    effect: { emissions: -2, support: 10, budget: 0 },
    type: "positive",
  },
]

// Difficulty Settings
const difficultySettings = {
  easy: {
    budgetMultiplier: 1.3,
    emissionGrowth: 1.5,
    eventFrequency: 0.3,
    supportRequired: 60,
  },
  normal: {
    budgetMultiplier: 1.0,
    emissionGrowth: 2.5,
    eventFrequency: 0.5,
    supportRequired: 80,
  },
  hard: {
    budgetMultiplier: 0.7,
    emissionGrowth: 3.5,
    eventFrequency: 0.7,
    supportRequired: 90,
  },
}

// Initialize Game
function startGame(difficulty = "normal") {
  gameState.year = 1
  gameState.budget = 100 * difficultySettings[difficulty].budgetMultiplier
  gameState.maxBudget = gameState.budget
  gameState.emissions = 100
  gameState.publicSupport = 50
  gameState.technology = 1
  gameState.score = 0
  gameState.history = []
  gameState.difficulty = difficulty
  gameState.actionsThisYear = 0

  document.getElementById("menuScreen").classList.remove("active")
  document.getElementById("gameScreen").classList.add("active")
  document.getElementById("gameOverScreen").classList.remove("active")

  renderGameScreen()
  triggerRandomEvent()
}

// Render Game Screen
function renderGameScreen() {
  updateStats()
  renderActionCards()
  clearMessage()
  gameState.actionsThisYear = 0
}

// Update Stats Display
function updateStats() {
  const yearPercent = (gameState.year / gameState.maxYears) * 100
  const budgetPercent = (gameState.budget / gameState.maxBudget) * 100
  const techPercent = (gameState.technology / gameState.maxTechnology) * 100
  const scorePercent = Math.min((gameState.score / 5000) * 100, 100)

  document.getElementById("yearDisplay").textContent = gameState.year
  document.getElementById("yearBar").style.width = yearPercent + "%"

  document.getElementById("budgetDisplay").textContent = "$" + Math.round(gameState.budget) + "B"
  document.getElementById("budgetBar").style.width = budgetPercent + "%"

  document.getElementById("emissionsDisplay").textContent = Math.round(gameState.emissions) + "%"
  document.getElementById("emissionsBar").style.width = 100 - gameState.emissions + "%"

  document.getElementById("supportDisplay").textContent = Math.round(gameState.publicSupport) + "%"
  document.getElementById("supportBar").style.width = gameState.publicSupport + "%"

  document.getElementById("techDisplay").textContent = gameState.technology
  document.getElementById("techBar").style.width = techPercent + "%"

  document.getElementById("scoreDisplay").textContent = gameState.score
  document.getElementById("scoreBar").style.width = scorePercent + "%"
}

// Render Action Cards
function renderActionCards() {
  const cardsGrid = document.getElementById("cardsGrid")
  cardsGrid.innerHTML = ""

  const availableActions = climateActions.filter((a) => a.techRequired <= gameState.technology)

  availableActions.forEach((action) => {
    const canAfford = gameState.budget >= action.cost
    const canAct = gameState.actionsThisYear < gameState.maxActionsPerYear
    const card = document.createElement("div")
    card.className = "action-card" + (canAfford && canAct ? "" : " disabled")
    card.setAttribute("data-action-id", action.id)

    card.innerHTML = `
            <div class="card-tier">Tier ${action.tier}</div>
            <div class="card-icon">${action.icon}</div>
            <div class="card-title">${action.title}</div>
            <div class="card-description">${action.description}</div>
            <div class="card-stats">
                <div class="card-stat">
                    <span class="card-stat-label">Cost</span>
                    <span class="card-stat-value">$${action.cost}B</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">Impact</span>
                    <span class="card-stat-value">-${action.emissionReduction}%</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">Support</span>
                    <span class="card-stat-value">+${action.supportGain}%</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">Tech Req</span>
                    <span class="card-stat-value">${action.techRequired}</span>
                </div>
            </div>
            <button class="card-button" ${canAfford && canAct ? "" : "disabled"}>
                ${canAfford && canAct ? "Select" : canAfford ? "Max Actions" : "Insufficient Budget"}
            </button>
        `

    cardsGrid.appendChild(card)
  })

  cardsGrid.removeEventListener("click", handleCardClick)
  cardsGrid.addEventListener("click", handleCardClick)
}

function handleCardClick(event) {
  const button = event.target.closest(".card-button")
  if (!button) return

  const card = button.closest(".action-card")
  if (!card || card.classList.contains("disabled")) return

  const actionId = Number.parseInt(card.getAttribute("data-action-id"))
  selectAction(actionId)
}

// Select Action
function selectAction(actionId) {
  const action = climateActions.find((a) => a.id === actionId)

  if (gameState.budget < action.cost) {
    showMessage("Insufficient budget!", "error")
    return
  }

  if (gameState.actionsThisYear >= gameState.maxActionsPerYear) {
    showMessage("Maximum actions per year reached!", "error")
    return
  }

  // Apply action
  gameState.budget -= action.cost
  gameState.emissions = Math.max(0, gameState.emissions - action.emissionReduction)
  gameState.publicSupport = Math.min(100, gameState.publicSupport + action.supportGain)
  gameState.score += action.emissionReduction * 15 + action.supportGain * 5
  gameState.actionsThisYear++

  // Record history
  gameState.history.push({
    year: gameState.year,
    action: action.title,
    cost: action.cost,
    reduction: action.emissionReduction,
  })

  showMessage(`✓ ${action.title} implemented! Emissions reduced by ${action.emissionReduction}%`, "success")

  // Check win condition
  if (
    gameState.emissions <= 20 &&
    gameState.publicSupport >= difficultySettings[gameState.difficulty].supportRequired
  ) {
    endGame(true)
    return
  }

  renderActionCards()
}

// Trigger Random Event
function triggerRandomEvent() {
  const eventChance = difficultySettings[gameState.difficulty].eventFrequency
  if (Math.random() > eventChance) return

  const event = randomEvents[Math.floor(Math.random() * randomEvents.length)]
  const notification = document.getElementById("eventNotification")

  notification.textContent = `📢 ${event.title}: ${event.description}`
  notification.className = `event-notification ${event.type}`

  // Apply event effects
  if (event.effect.emissions) gameState.emissions = Math.max(0, gameState.emissions + event.effect.emissions)
  if (event.effect.support)
    gameState.publicSupport = Math.max(0, Math.min(100, gameState.publicSupport + event.effect.support))
  if (event.effect.budget) gameState.budget = Math.max(0, gameState.budget + event.effect.budget)
  if (event.effect.technology)
    gameState.technology = Math.min(gameState.maxTechnology, gameState.technology + event.effect.technology)

  updateStats()
}

// Advance Year
function advanceYear() {
  gameState.year++
  gameState.budget = gameState.maxBudget
  gameState.actionsThisYear = 0

  // Emissions increase based on difficulty
  const emissionGrowth = difficultySettings[gameState.difficulty].emissionGrowth
  gameState.emissions = Math.min(100, gameState.emissions + emissionGrowth)

  // Gradual tech advancement
  if (gameState.year % 5 === 0 && gameState.technology < gameState.maxTechnology) {
    gameState.technology++
    showMessage("🔬 New technology tier unlocked!", "success")
  }

  // Public support decay if emissions are high
  if (gameState.emissions > 70) {
    gameState.publicSupport = Math.max(0, gameState.publicSupport - 3)
  }

  // Check lose condition
  if (gameState.publicSupport <= 0) {
    endGame(false, "Public support collapsed!")
  }

  if (gameState.year > gameState.maxYears) {
    endGame(false)
    return
  }

  renderGameScreen()
  triggerRandomEvent()
}

// Skip Year
function skipYear() {
  advanceYear()
}

// Show Message
function showMessage(text, type = "") {
  const messageEl = document.getElementById("gameMessage")
  messageEl.textContent = text
  messageEl.className = "game-message " + type
}

// Clear Message
function clearMessage() {
  const messageEl = document.getElementById("gameMessage")
  messageEl.textContent = ""
  messageEl.className = "game-message"
}

// End Game
function endGame(won, reason = "") {
  const gameOverTitle = document.getElementById("gameOverTitle")
  const gameOverMessage = document.getElementById("gameOverMessage")
  const gameOverStats = document.getElementById("gameOverStats")

  if (won) {
    gameOverTitle.textContent = "🎉 Victory!"
    gameOverTitle.style.color = "var(--primary)"
    gameOverMessage.textContent = `You successfully transformed the global economy! Emissions: ${Math.round(gameState.emissions)}% | Public Support: ${Math.round(gameState.publicSupport)}%`
  } else {
    gameOverTitle.textContent = "⏰ Game Over"
    gameOverTitle.style.color = "var(--accent)"
    gameOverMessage.textContent =
      reason || `You reached year ${gameState.year} with emissions at ${Math.round(gameState.emissions)}%. Try again!`
  }

  // Display stats
  gameOverStats.innerHTML = `
        <div class="game-over-stat">
            <span class="game-over-stat-label">Final Year</span>
            <span class="game-over-stat-value">${gameState.year} / ${gameState.maxYears}</span>
        </div>
        <div class="game-over-stat">
            <span class="game-over-stat-label">Final Emissions</span>
            <span class="game-over-stat-value">${Math.round(gameState.emissions)}%</span>
        </div>
        <div class="game-over-stat">
            <span class="game-over-stat-label">Public Support</span>
            <span class="game-over-stat-value">${Math.round(gameState.publicSupport)}%</span>
        </div>
        <div class="game-over-stat">
            <span class="game-over-stat-label">Technology Level</span>
            <span class="game-over-stat-value">${gameState.technology} / ${gameState.maxTechnology}</span>
        </div>
        <div class="game-over-stat">
            <span class="game-over-stat-label">Total Score</span>
            <span class="game-over-stat-value">${gameState.score}</span>
        </div>
        <div class="game-over-stat">
            <span class="game-over-stat-label">Actions Taken</span>
            <span class="game-over-stat-value">${gameState.history.length}</span>
        </div>
    `

  document.getElementById("gameScreen").classList.remove("active")
  document.getElementById("gameOverScreen").classList.add("active")
}

// Return to Menu
function returnToMenu() {
  document.getElementById("menuScreen").classList.add("active")
  document.getElementById("gameScreen").classList.remove("active")
  document.getElementById("gameOverScreen").classList.remove("active")
}
