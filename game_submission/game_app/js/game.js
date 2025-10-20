// Game State
const gameState = {
  year: 1,
  month: 1,
  maxYears: null, // null = unlimited
  economy: 50,
  environment: 50,
  publicSupport: 50,
  security: 50,
  totalDecisions: 0,
  gameMode: 'unlimited',
  currentProposalIndex: 0,
  proposalsDeck: [],
  swipeEnabled: true,
}

// Presidential Proposals Database
const presidentialProposals = [
  // Economic Proposals
  {
    id: 1,
    title: "National Infrastructure Plan",
    description: "A massive investment in roads, bridges, and public transportation to modernize the nation's infrastructure.",
    advisor: "Minister of Transportation",
    category: "Economy",
    image: "assets/proposals/1.png",
    approveEffect: { economy: 15, environment: -10, publicSupport: 10, security: 5 },
    rejectEffect: { economy: -5, environment: 5, publicSupport: -8, security: -3 },
  },
  {
    id: 2,
    title: "Corporate Tax Reform",
    description: "Reduce corporate tax rates to attract more businesses and stimulate economic growth.",
    advisor: "Treasury Secretary",
    category: "Economy",
    image: "assets/proposals/2.png",
    approveEffect: { economy: 20, environment: -5, publicSupport: -10, security: 0 },
    rejectEffect: { economy: -10, environment: 0, publicSupport: 15, security: 0 },
  },
  {
    id: 3,
    title: "Universal Basic Income Pilot",
    description: "Launch a nationwide pilot program providing monthly income to all citizens.",
    advisor: "Social Welfare Director",
    category: "Economy",
    image: "assets/proposals/3.png",
    approveEffect: { economy: -15, environment: 0, publicSupport: 20, security: -5 },
    rejectEffect: { economy: 5, environment: 0, publicSupport: -15, security: 0 },
  },
  {
    id: 4,
    title: "Small Business Grants",
    description: "Provide financial support to small and medium enterprises affected by economic challenges.",
    advisor: "Commerce Minister",
    category: "Economy",
    image: "assets/proposals/4.png",
    approveEffect: { economy: 10, environment: 0, publicSupport: 12, security: 0 },
    rejectEffect: { economy: -8, environment: 0, publicSupport: -10, security: 0 },
  },
  {
    id: 5,
    title: "Cryptocurrency Regulation",
    description: "Establish comprehensive regulations for cryptocurrency trading and taxation.",
    advisor: "Financial Regulatory Chief",
    category: "Economy",
    image: "assets/proposals/5.png",
    approveEffect: { economy: 8, environment: 5, publicSupport: -12, security: 10 },
    rejectEffect: { economy: -5, environment: -8, publicSupport: 8, security: -15 },
  },

  // Environmental Proposals
  {
    id: 6,
    title: "Green Energy Transition",
    description: "Invest heavily in renewable energy sources and phase out fossil fuels over the next decade.",
    advisor: "Environmental Minister",
    category: "Environment",
    image: "assets/proposals/6.png",
    approveEffect: { economy: -10, environment: 25, publicSupport: 15, security: -5 },
    rejectEffect: { economy: 10, environment: -20, publicSupport: -12, security: 5 },
  },
  {
    id: 7,
    title: "National Park Expansion",
    description: "Designate new protected areas and expand existing national parks.",
    advisor: "Conservation Director",
    category: "Environment",
    image: "assets/proposals/7.png",
    approveEffect: { economy: -8, environment: 20, publicSupport: 10, security: 0 },
    rejectEffect: { economy: 5, environment: -15, publicSupport: -8, security: 0 },
  },
  {
    id: 8,
    title: "Carbon Tax Implementation",
    description: "Introduce a carbon tax on industries to reduce greenhouse gas emissions.",
    advisor: "Climate Policy Advisor",
    category: "Environment",
    image: "assets/proposals/8.png",
    approveEffect: { economy: -12, environment: 22, publicSupport: -8, security: 0 },
    rejectEffect: { economy: 8, environment: -18, publicSupport: 5, security: 0 },
  },
  {
    id: 9,
    title: "Electric Vehicle Mandate",
    description: "Require all new vehicles sold to be electric by 2030.",
    advisor: "Transportation Secretary",
    category: "Environment",
    image: "assets/proposals/9.png",
    approveEffect: { economy: -5, environment: 18, publicSupport: 8, security: -3 },
    rejectEffect: { economy: 5, environment: -15, publicSupport: -5, security: 3 },
  },
  {
    id: 10,
    title: "Ocean Cleanup Initiative",
    description: "Fund large-scale projects to remove plastic waste from oceans and coastlines.",
    advisor: "Marine Conservation Director",
    category: "Environment",
    image: "assets/proposals/10.png",
    approveEffect: { economy: -10, environment: 15, publicSupport: 18, security: 0 },
    rejectEffect: { economy: 3, environment: -12, publicSupport: -10, security: 0 },
  },

  // Public Support Proposals
  {
    id: 11,
    title: "Universal Healthcare Plan",
    description: "Implement a comprehensive healthcare system accessible to all citizens at no direct cost.",
    advisor: "Health Minister",
    category: "Social",
    image: "assets/proposals/11.png",
    approveEffect: { economy: -20, environment: 0, publicSupport: 25, security: 0 },
    rejectEffect: { economy: 10, environment: 0, publicSupport: -20, security: 0 },
  },
  {
    id: 12,
    title: "Free University Education",
    description: "Make all public universities tuition-free for citizens.",
    advisor: "Education Secretary",
    category: "Social",
    image: "assets/proposals/12.png",
    approveEffect: { economy: -15, environment: 0, publicSupport: 22, security: 0 },
    rejectEffect: { economy: 5, environment: 0, publicSupport: -18, security: 0 },
  },
  {
    id: 13,
    title: "Affordable Housing Program",
    description: "Build thousands of affordable housing units in major cities.",
    advisor: "Housing Minister",
    category: "Social",
    image: "assets/proposals/13.png",
    approveEffect: { economy: -10, environment: -8, publicSupport: 20, security: 5 },
    rejectEffect: { economy: 5, environment: 3, publicSupport: -15, security: -3 },
  },
  {
    id: 14,
    title: "Minimum Wage Increase",
    description: "Raise the national minimum wage by 50% to improve living standards.",
    advisor: "Labor Secretary",
    category: "Social",
    image: "assets/proposals/14.png",
    approveEffect: { economy: -8, environment: 0, publicSupport: 18, security: 0 },
    rejectEffect: { economy: 5, environment: 0, publicSupport: -15, security: 0 },
  },
  {
    id: 15,
    title: "Mental Health Initiative",
    description: "Expand mental health services and awareness programs nationwide.",
    advisor: "Public Health Director",
    category: "Social",
    image: "assets/proposals/15.png",
    approveEffect: { economy: -5, environment: 0, publicSupport: 15, security: 3 },
    rejectEffect: { economy: 2, environment: 0, publicSupport: -10, security: -2 },
  },

  // Security Proposals
  {
    id: 16,
    title: "Defense Budget Increase",
    description: "Significantly increase military spending to strengthen national defense capabilities.",
    advisor: "Defense Minister",
    category: "Security",
    image: "assets/proposals/16.png",
    approveEffect: { economy: -10, environment: -8, publicSupport: -5, security: 25 },
    rejectEffect: { economy: 5, environment: 3, publicSupport: 5, security: -20 },
  },
  {
    id: 17,
    title: "Cybersecurity Infrastructure",
    description: "Invest in advanced cybersecurity systems to protect critical national infrastructure.",
    advisor: "Cyber Security Chief",
    category: "Security",
    image: "assets/proposals/17.png",
    approveEffect: { economy: -8, environment: 0, publicSupport: 5, security: 20 },
    rejectEffect: { economy: 3, environment: 0, publicSupport: -3, security: -18 },
  },
  {
    id: 18,
    title: "Border Security Enhancement",
    description: "Modernize border control with advanced surveillance and patrol systems.",
    advisor: "Homeland Security Secretary",
    category: "Security",
    image: "assets/proposals/18.png",
    approveEffect: { economy: -12, environment: -5, publicSupport: -8, security: 22 },
    rejectEffect: { economy: 5, environment: 2, publicSupport: 10, security: -15 },
  },
  {
    id: 19,
    title: "Intelligence Agency Expansion",
    description: "Expand intelligence gathering capabilities to counter emerging threats.",
    advisor: "Intelligence Director",
    category: "Security",
    image: "assets/proposals/19.png",
    approveEffect: { economy: -10, environment: 0, publicSupport: -10, security: 18 },
    rejectEffect: { economy: 5, environment: 0, publicSupport: 8, security: -15 },
  },
  {
    id: 20,
    title: "Emergency Response System",
    description: "Upgrade national emergency response capabilities for disasters and crises.",
    advisor: "Emergency Management Director",
    category: "Security",
    image: "assets/proposals/20.png",
    approveEffect: { economy: -8, environment: 0, publicSupport: 12, security: 15 },
    rejectEffect: { economy: 3, environment: 0, publicSupport: -8, security: -12 },
  },

  // Mixed/Controversial Proposals
  {
    id: 21,
    title: "Immigration Reform",
    description: "Streamline immigration processes and provide pathway to citizenship for undocumented residents.",
    advisor: "Immigration Services Director",
    category: "Social",
    image: "assets/proposals/1.png",
    approveEffect: { economy: 10, environment: 0, publicSupport: -15, security: -10 },
    rejectEffect: { economy: -5, environment: 0, publicSupport: 12, security: 8 },
  },
  {
    id: 22,
    title: "Nuclear Energy Expansion",
    description: "Build new nuclear power plants as a clean energy alternative.",
    advisor: "Energy Secretary",
    category: "Environment",
    image: "assets/proposals/2.png",
    approveEffect: { economy: 12, environment: 10, publicSupport: -12, security: 5 },
    rejectEffect: { economy: -8, environment: -8, publicSupport: 8, security: -3 },
  },
  {
    id: 23,
    title: "Space Program Investment",
    description: "Dramatically increase funding for space exploration and satellite technology.",
    advisor: "Space Agency Director",
    category: "Security",
    image: "assets/proposals/3.png",
    approveEffect: { economy: -15, environment: -5, publicSupport: 8, security: 12 },
    rejectEffect: { economy: 8, environment: 2, publicSupport: -5, security: -8 },
  },
  {
    id: 24,
    title: "Artificial Intelligence Regulation",
    description: "Establish strict regulations on AI development and deployment.",
    advisor: "Technology Policy Director",
    category: "Economy",
    image: "assets/proposals/4.png",
    approveEffect: { economy: -10, environment: 5, publicSupport: 10, security: 15 },
    rejectEffect: { economy: 15, environment: -3, publicSupport: -8, security: -12 },
  },
  {
    id: 25,
    title: "Surveillance Expansion",
    description: "Increase public surveillance systems in major cities to reduce crime.",
    advisor: "Public Safety Director",
    category: "Security",
    image: "assets/proposals/5.png",
    approveEffect: { economy: -5, environment: 0, publicSupport: -18, security: 20 },
    rejectEffect: { economy: 2, environment: 0, publicSupport: 15, security: -15 },
  },
  {
    id: 26,
    title: "Traditional Energy Subsidies",
    description: "Provide subsidies to coal and oil industries to maintain energy independence.",
    advisor: "Energy Industry Liaison",
    category: "Economy",
    image: "assets/proposals/6.png",
    approveEffect: { economy: 15, environment: -25, publicSupport: -10, security: 8 },
    rejectEffect: { economy: -12, environment: 18, publicSupport: 12, security: -5 },
  },
  {
    id: 27,
    title: "Public Transit Revolution",
    description: "Make all public transportation free for citizens.",
    advisor: "Urban Development Minister",
    category: "Environment",
    image: "assets/proposals/7.png",
    approveEffect: { economy: -18, environment: 20, publicSupport: 22, security: -3 },
    rejectEffect: { economy: 8, environment: -12, publicSupport: -15, security: 2 },
  },
  {
    id: 28,
    title: "Digital Privacy Act",
    description: "Implement strict data privacy laws protecting citizen information from corporations.",
    advisor: "Privacy Commissioner",
    category: "Social",
    image: "assets/proposals/8.png",
    approveEffect: { economy: -12, environment: 0, publicSupport: 20, security: 5 },
    rejectEffect: { economy: 10, environment: 0, publicSupport: -18, security: -3 },
  },
  {
    id: 29,
    title: "Agricultural Modernization",
    description: "Invest in sustainable farming technologies and support local farmers.",
    advisor: "Agriculture Minister",
    category: "Economy",
    image: "assets/proposals/9.png",
    approveEffect: { economy: 8, environment: 12, publicSupport: 10, security: 3 },
    rejectEffect: { economy: -5, environment: -10, publicSupport: -8, security: -2 },
  },
  {
    id: 30,
    title: "International Trade Alliance",
    description: "Join a major international trade alliance with neighboring countries.",
    advisor: "Foreign Affairs Minister",
    category: "Economy",
    image: "assets/proposals/10.png",
    approveEffect: { economy: 18, environment: -8, publicSupport: -5, security: -10 },
    rejectEffect: { economy: -15, environment: 5, publicSupport: 8, security: 12 },
  },
]

// Menu Functions
function showYearInput() {
  document.getElementById('yearInput').style.display = 'block'
}

function startGameWithYears() {
  const years = parseInt(document.getElementById('yearsToPlay').value)
  if (years && years > 0) {
    startGame('limited', years)
  }
}

// Initialize Game
function startGame(mode = 'unlimited', years = null) {
  gameState.year = 1
  gameState.month = 1
  gameState.maxYears = mode === 'limited' ? years : null
  gameState.economy = 50
  gameState.environment = 50
  gameState.publicSupport = 50
  gameState.security = 50
  gameState.totalDecisions = 0
  gameState.gameMode = mode
  gameState.currentProposalIndex = 0
  gameState.swipeEnabled = true

  // Shuffle proposals
  gameState.proposalsDeck = shuffleArray([...presidentialProposals])

  // Update UI (screens are managed via separate HTML files)
  updateUI()
  renderCurrentCard()
}

// Restart Game
function restartGame() {
  // Hide game over screen and show game screen
  document.getElementById('gameOverScreen').classList.remove('active')
  document.getElementById('gameOverScreen').style.display = 'none'
  document.getElementById('gameScreen').style.display = 'flex'
  document.getElementById('gameScreen').classList.add('active')

  // Restart the game with same mode and years
  startGame(gameState.gameMode, gameState.maxYears)
}

// Shuffle Array
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Update UI
function updateUI() {
  // Update year and month
  document.getElementById('yearDisplay').textContent = `Year ${gameState.year}`
  document.getElementById('monthDisplay').textContent = `Month ${gameState.month}/12`

  // Update mode display
  const modeText = gameState.maxYears ? `${gameState.maxYears} Years` : 'Unlimited'
  document.getElementById('modeDisplay').textContent = modeText

  // Update factor bars
  updateFactorBar('economy', gameState.economy)
  updateFactorBar('environment', gameState.environment)
  updateFactorBar('support', gameState.publicSupport)
  updateFactorBar('security', gameState.security)
}

// Update Factor Bar
function updateFactorBar(factor, value) {
  const barId = factor === 'support' ? 'supportBar' : `${factor}Bar`
  const bar = document.getElementById(barId)
  const clampedValue = Math.max(0, Math.min(100, value))
  bar.style.width = `${clampedValue}%`

  // Check for game over conditions
  if (clampedValue <= 0 || clampedValue >= 100) {
    setTimeout(() => endGame(factor, clampedValue), 500)
  }
}

// Render Current Card
function renderCurrentCard() {
  const cardStack = document.getElementById('cardStack')
  cardStack.innerHTML = ''

  if (gameState.currentProposalIndex >= gameState.proposalsDeck.length) {
    // Reshuffle deck
    gameState.proposalsDeck = shuffleArray([...presidentialProposals])
    gameState.currentProposalIndex = 0
  }

  const proposal = gameState.proposalsDeck[gameState.currentProposalIndex]
  const card = createProposalCard(proposal)
  cardStack.appendChild(card)

  // Add swipe handlers
  addSwipeHandlers(card, proposal)
}

// Create Proposal Card
function createProposalCard(proposal) {
  const card = document.createElement('div')
  card.className = 'proposal-card'
  card.innerHTML = `
    ${proposal.image ? `<img src="${proposal.image}" alt="${proposal.title}" class="card-image">` : ''}
    <div class="card-advisor">${proposal.advisor}</div>
    <div class="card-title">${proposal.title}</div>
    <div class="card-description">${proposal.description}</div>
    <div class="card-category">${proposal.category}</div>
  `
  return card
}

// Add Swipe Handlers
function addSwipeHandlers(card, proposal) {
  let startX = 0
  let currentX = 0
  let isDragging = false

  // Mouse events
  card.addEventListener('mousedown', (e) => {
    if (!gameState.swipeEnabled) return
    isDragging = true
    startX = e.clientX
    card.style.transition = 'none'
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    currentX = e.clientX - startX
    card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`

    // Visual feedback
    if (currentX < -50) {
      card.classList.add('swiping-left')
      card.classList.remove('swiping-right')
      showImpactPreview(proposal, 'reject')
    } else if (currentX > 50) {
      card.classList.add('swiping-right')
      card.classList.remove('swiping-left')
      showImpactPreview(proposal, 'approve')
    } else {
      card.classList.remove('swiping-left', 'swiping-right')
      hideImpactPreview()
    }
  })

  document.addEventListener('mouseup', () => {
    if (!isDragging) return
    isDragging = false
    card.style.transition = 'transform 0.3s ease'

    if (currentX < -100) {
      handleDecision(card, proposal, 'reject')
    } else if (currentX > 100) {
      handleDecision(card, proposal, 'approve')
    } else {
      card.style.transform = ''
      card.classList.remove('swiping-left', 'swiping-right')
      hideImpactPreview()
    }
  })

  // Touch events
  card.addEventListener('touchstart', (e) => {
    if (!gameState.swipeEnabled) return
    isDragging = true
    startX = e.touches[0].clientX
    card.style.transition = 'none'
  })

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return
    currentX = e.touches[0].clientX - startX
    card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`

    if (currentX < -50) {
      card.classList.add('swiping-left')
      card.classList.remove('swiping-right')
      showImpactPreview(proposal, 'reject')
    } else if (currentX > 50) {
      card.classList.add('swiping-right')
      card.classList.remove('swiping-left')
      showImpactPreview(proposal, 'approve')
    } else {
      card.classList.remove('swiping-left', 'swiping-right')
      hideImpactPreview()
    }
  })

  document.addEventListener('touchend', () => {
    if (!isDragging) return
    isDragging = false
    card.style.transition = 'transform 0.3s ease'

    if (currentX < -100) {
      handleDecision(card, proposal, 'reject')
    } else if (currentX > 100) {
      handleDecision(card, proposal, 'approve')
    } else {
      card.style.transform = ''
      card.classList.remove('swiping-left', 'swiping-right')
      hideImpactPreview()
    }
  })

  // Keyboard controls
  const keyHandler = (e) => {
    if (!gameState.swipeEnabled) return
    if (e.key === 'ArrowLeft') {
      handleDecision(card, proposal, 'reject')
      document.removeEventListener('keydown', keyHandler)
    } else if (e.key === 'ArrowRight') {
      handleDecision(card, proposal, 'approve')
      document.removeEventListener('keydown', keyHandler)
    }
  }
  document.addEventListener('keydown', keyHandler)
}

// Show Impact Preview
function showImpactPreview(proposal, decision) {
  const preview = document.getElementById('impactPreview')
  const leftPanel = document.getElementById('impactLeft')
  const rightPanel = document.getElementById('impactRight')

  if (decision === 'reject') {
    leftPanel.innerHTML = generateImpactHTML(proposal.rejectEffect)
    rightPanel.innerHTML = ''
  } else {
    rightPanel.innerHTML = generateImpactHTML(proposal.approveEffect)
    leftPanel.innerHTML = ''
  }

  preview.style.display = 'flex'
}

// Hide Impact Preview
function hideImpactPreview() {
  document.getElementById('impactPreview').style.display = 'none'
}

// Generate Impact HTML
function generateImpactHTML(effect) {
  const icons = {
    economy: '💰',
    environment: '🌱',
    publicSupport: '❤️',
    security: '🛡️',
  }

  let html = ''
  for (const [key, value] of Object.entries(effect)) {
    if (value !== 0) {
      const sign = value > 0 ? '+' : ''
      html += `<div class="impact-item">${icons[key]} ${sign}${value}%</div>`
    }
  }
  return html
}

// Handle Decision
function handleDecision(card, proposal, decision) {
  if (!gameState.swipeEnabled) return
  gameState.swipeEnabled = false

  hideImpactPreview()

  // Animate card
  if (decision === 'reject') {
    card.classList.add('card-swipe-left')
  } else {
    card.classList.add('card-swipe-right')
  }

  // Apply effects
  const effect = decision === 'approve' ? proposal.approveEffect : proposal.rejectEffect
  gameState.economy = Math.max(0, Math.min(100, gameState.economy + effect.economy))
  gameState.environment = Math.max(0, Math.min(100, gameState.environment + effect.environment))
  gameState.publicSupport = Math.max(0, Math.min(100, gameState.publicSupport + effect.publicSupport))
  gameState.security = Math.max(0, Math.min(100, gameState.security + effect.security))

  gameState.totalDecisions++
  gameState.month++

  // Check for year end
  if (gameState.month > 12) {
    gameState.month = 1
    gameState.year++

    // Check for game end (limited mode)
    if (gameState.maxYears && gameState.year > gameState.maxYears) {
      setTimeout(() => endGameSuccess(), 500)
      return
    }
  }

  // Update UI and load next card
  setTimeout(() => {
    updateUI()
    gameState.currentProposalIndex++
    gameState.swipeEnabled = true
    renderCurrentCard()
  }, 300)
}

// End Game (Loss)
function endGame(factor, value) {
  const factorNames = {
    economy: 'Economy',
    environment: 'Environment',
    support: 'Public Support',
    security: 'Security',
  }

  const gameOverTitle = document.getElementById('gameOverTitle')
  const gameOverMessage = document.getElementById('gameOverMessage')
  const gameOverStats = document.getElementById('gameOverStats')

  gameOverTitle.textContent = '💔 Presidential Term Ended'
  gameOverTitle.style.background = 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)'
  gameOverTitle.style.webkitBackgroundClip = 'text'
  gameOverTitle.style.webkitTextFillColor = 'transparent'

  const reason = value <= 0
    ? `${factorNames[factor]} collapsed to 0%! The nation can no longer sustain your leadership.`
    : `${factorNames[factor]} reached 100%! Extreme conditions have destabilized the nation.`

  gameOverMessage.textContent = reason

  gameOverStats.innerHTML = `
    <div class="game-over-stat">
      <span class="game-over-stat-label">Years Served</span>
      <span class="game-over-stat-value">${gameState.year}</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Months Served</span>
      <span class="game-over-stat-value">${(gameState.year - 1) * 12 + gameState.month - 1}</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Total Decisions</span>
      <span class="game-over-stat-value">${gameState.totalDecisions}</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Economy</span>
      <span class="game-over-stat-value">${Math.round(gameState.economy)}%</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Environment</span>
      <span class="game-over-stat-value">${Math.round(gameState.environment)}%</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Public Support</span>
      <span class="game-over-stat-value">${Math.round(gameState.publicSupport)}%</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Security</span>
      <span class="game-over-stat-value">${Math.round(gameState.security)}%</span>
    </div>
  `

  document.getElementById('gameScreen').style.display = 'none'
  document.getElementById('gameOverScreen').classList.add('active')
}

// End Game (Success)
function endGameSuccess() {
  const gameOverTitle = document.getElementById('gameOverTitle')
  const gameOverMessage = document.getElementById('gameOverMessage')
  const gameOverStats = document.getElementById('gameOverStats')

  gameOverTitle.textContent = '🎉 Term Completed!'
  gameOverTitle.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
  gameOverTitle.style.webkitBackgroundClip = 'text'
  gameOverTitle.style.webkitTextFillColor = 'transparent'

  gameOverMessage.textContent = `Congratulations! You successfully completed your ${gameState.maxYears}-year presidential term while keeping all factors balanced.`

  gameOverStats.innerHTML = `
    <div class="game-over-stat">
      <span class="game-over-stat-label">Years Served</span>
      <span class="game-over-stat-value">${gameState.maxYears}</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Total Decisions</span>
      <span class="game-over-stat-value">${gameState.totalDecisions}</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Economy</span>
      <span class="game-over-stat-value">${Math.round(gameState.economy)}%</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Environment</span>
      <span class="game-over-stat-value">${Math.round(gameState.environment)}%</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Public Support</span>
      <span class="game-over-stat-value">${Math.round(gameState.publicSupport)}%</span>
    </div>
    <div class="game-over-stat">
      <span class="game-over-stat-label">Final Security</span>
      <span class="game-over-stat-value">${Math.round(gameState.security)}%</span>
    </div>
  `

  document.getElementById('gameScreen').style.display = 'none'
  document.getElementById('gameOverScreen').classList.add('active')
}

// Return to Menu
function returnToMenu() {
  window.location.href = 'index.html';
}

// Initialize game on page load
window.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const years = urlParams.get('years');

  if (mode) {
    if (mode === 'unlimited') {
      startGame('unlimited');
    } else if (mode === 'limited' && years) {
      startGame('limited', parseInt(years));
    }
  }
});
