/**
 * BIRYANI WARS HYDERABAD — MAIN APP LOGIC
 * Solves the classic group argument using live voting, distance filters,
 * secret spots database, and Hyderabadi street slang rule engine.
 */

class BiryaniWarsApp {
  constructor() {
    this.spots = [...BIRYANI_SPOTS];
    this.userVotes = {}; // Track user votes: { [spotId]: voteCount }
    this.maxDistanceKm = 12;
    this.currentCategory = "all";
    this.currentArea = "all";
    this.searchQuery = "";
    this.isSimulating = true;
    this.simulationInterval = null;

    // Sullah Wheel State
    this.wheelCanvas = null;
    this.wheelCtx = null;
    this.wheelSpots = [];
    this.wheelAngle = 0;
    this.wheelSpeed = 0;
    this.isSpinning = false;
    this.lastTickSegment = -1;

    // Aroma Canvas State
    this.aromaCanvas = null;
    this.aromaCtx = null;
    this.particles = [];

    this.init();
  }

  init() {
    this.setupAromaCanvas();
    this.setupEventListeners();
    this.renderSpots();
    this.updateStats();
    this.startSquadSimulation();
    this.initWheel();
  }

  /* ==========================================================================
     BACKGROUND STEAM & AROMA PARTICLES
     ========================================================================== */
  setupAromaCanvas() {
    this.aromaCanvas = document.getElementById("aroma-canvas");
    if (!this.aromaCanvas) return;
    this.aromaCtx = this.aromaCanvas.getContext("2d");

    const resize = () => {
      this.aromaCanvas.width = window.innerWidth;
      this.aromaCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create 35 aroma & spice particles
    for (let i = 0; i < 35; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? "245, 158, 11" : "225, 29, 72" // Saffron or Degh red
      });
    }

    const animate = () => {
      if (!this.aromaCtx) return;
      this.aromaCtx.clearRect(0, 0, this.aromaCanvas.width, this.aromaCanvas.height);

      this.particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = this.aromaCanvas.height + 10;
          p.x = Math.random() * this.aromaCanvas.width;
        }

        this.aromaCtx.beginPath();
        this.aromaCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.aromaCtx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        this.aromaCtx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ==========================================================================
     EVENT LISTENERS & BINDINGS
     ========================================================================== */
  setupEventListeners() {
    // Distance Range Slider
    const distanceRange = document.getElementById("distance-range");
    const distanceBadge = document.getElementById("distance-val-badge");
    const distanceSlang = document.getElementById("distance-slang-label");

    if (distanceRange) {
      distanceRange.addEventListener("input", (e) => {
        this.maxDistanceKm = parseFloat(e.target.value);
        if (distanceBadge) distanceBadge.textContent = `${this.maxDistanceKm} km`;
        
        // Update Dakhni distance mood label
        if (distanceSlang) {
          if (this.maxDistanceKm <= 2.5) {
            distanceSlang.textContent = "👟 'Chappal pehno aur nikal pado — paidal/auto distance'";
          } else if (this.maxDistanceKm <= 5) {
            distanceSlang.textContent = "🛵 'Activa nikaalo miyan — choti ride me pahunch jaate'";
          } else if (this.maxDistanceKm <= 9) {
            distanceSlang.textContent = "🚗 'Car me AC chala ke niklo — traffic jhelna padega'";
          } else {
            distanceSlang.textContent = "👑 'Biryani ke liye jaan bhi hazir — poora Hyderabad apna hai!'";
          }
        }

        this.renderSpots();
      });
    }

    // Search Input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderSpots();
      });
    }

    // Category Filter Pills
    document.querySelectorAll(".filter-pill[data-category]").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".filter-pill[data-category]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentCategory = pill.dataset.category;
        audio.playVoteSound();
        this.renderSpots();
      });
    });

    // Locality Filter Pills
    document.querySelectorAll(".filter-pill[data-area]").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".filter-pill[data-area]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentArea = pill.dataset.area;
        audio.playVoteSound();
        this.renderSpots();
      });
    });

    // Sound Toggle Button
    const soundBtn = document.getElementById("btn-sound-toggle");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const isMuted = audio.toggleMute();
        soundBtn.innerHTML = isMuted ? "🔇 Unmute" : "🔊 Sound On";
        this.showToast({
          title: isMuted ? "Awaaz Band!" : "Awaaz Shuru!",
          message: isMuted ? "Sound effects mute kardiye miyan." : "Shahi sound effects chalu hogaye!"
        });
      });
    }

    // Simulate Squad Toggle
    const simBtn = document.getElementById("btn-toggle-sim");
    if (simBtn) {
      simBtn.addEventListener("click", () => {
        this.isSimulating = !this.isSimulating;
        if (this.isSimulating) {
          simBtn.innerHTML = "⏸️ Pause Squad Chatter";
          this.startSquadSimulation();
          this.showToast({
            title: "🗣️ Squad Argument Live!",
            message: "Dost log bahas shuru kardiye! Votes change ho rahe hain."
          });
        } else {
          simBtn.innerHTML = "▶️ Resume Squad Chatter";
          clearInterval(this.simulationInterval);
          this.showToast({
            title: "🤫 Sannata!",
            message: "Group chatter pause kardiye. Aap vote daalo!"
          });
        }
      });
    }

    // Sullah (Spin The Degh) Modal Open & Close
    const openWheelBtn = document.getElementById("btn-open-wheel");
    const wheelModal = document.getElementById("modal-wheel");
    const closeWheelBtn = document.getElementById("btn-close-wheel");
    const spinWheelBtn = document.getElementById("btn-spin-wheel");

    if (openWheelBtn && wheelModal) {
      openWheelBtn.addEventListener("click", () => {
        this.openWheelModal();
      });
    }
    if (closeWheelBtn && wheelModal) {
      closeWheelBtn.addEventListener("click", () => {
        wheelModal.classList.remove("active");
      });
    }
    if (spinWheelBtn) {
      spinWheelBtn.addEventListener("click", () => {
        this.spinWheel();
      });
    }

    // Slang Rule Engine Lab Modal Open & Close
    const openSlangBtn = document.getElementById("btn-open-slang-lab");
    const slangModal = document.getElementById("modal-slang-lab");
    const closeSlangBtn = document.getElementById("btn-close-slang");

    if (openSlangBtn && slangModal) {
      openSlangBtn.addEventListener("click", () => {
        slangModal.classList.add("active");
        audio.playSizzleSound();
      });
    }
    if (closeSlangBtn && slangModal) {
      closeSlangBtn.addEventListener("click", () => {
        slangModal.classList.remove("active");
      });
    }

    // Slang Lab Converter Test
    const slangInput = document.getElementById("slang-test-input");
    const slangConvertBtn = document.getElementById("btn-convert-slang");
    if (slangConvertBtn && slangInput) {
      slangConvertBtn.addEventListener("click", () => {
        this.testSlangConversion(slangInput.value);
      });
    }

    // Slang Preset Chips
    document.querySelectorAll(".preset-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const text = chip.getAttribute("data-error");
        if (slangInput) slangInput.value = text;
        this.testSlangConversion(text);
      });
    });

    // Speak Slang Aloud Button
    const speakBtn = document.getElementById("btn-speak-slang");
    if (speakBtn) {
      speakBtn.addEventListener("click", () => {
        const bodyEl = document.getElementById("slang-lab-body");
        if (bodyEl && bodyEl.textContent) {
          audio.speakText(bodyEl.textContent);
        }
      });
    }

    // Copy Slang Button
    const copySlangBtn = document.getElementById("btn-copy-slang");
    if (copySlangBtn) {
      copySlangBtn.addEventListener("click", () => {
        const titleEl = document.getElementById("slang-lab-title");
        const bodyEl = document.getElementById("slang-lab-body");
        if (titleEl && bodyEl) {
          const text = `${titleEl.textContent}\n${bodyEl.textContent}`;
          navigator.clipboard.writeText(text);
          this.showToast({
            title: "📋 Copy Hogaya!",
            message: "Street slang message clipboard pe copy hogaya. WhatsApp pe chipkao!"
          });
        }
      });
    }

    // Add Secret Spot Modal
    const openAddBtn = document.getElementById("btn-open-add-spot");
    const addModal = document.getElementById("modal-add-spot");
    const closeAddBtn = document.getElementById("btn-close-add");
    const addForm = document.getElementById("form-add-spot");

    if (openAddBtn && addModal) {
      openAddBtn.addEventListener("click", () => {
        addModal.classList.add("active");
      });
    }
    if (closeAddBtn && addModal) {
      closeAddBtn.addEventListener("click", () => {
        addModal.classList.remove("active");
      });
    }
    if (addForm) {
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAddCustomSpot();
      });
    }

    // WhatsApp Verdict Share
    const exportShareBtn = document.getElementById("btn-share-verdict");
    if (exportShareBtn) {
      exportShareBtn.addEventListener("click", () => {
        this.exportWhatsAppVerdict();
      });
    }
  }

  /* ==========================================================================
     FILTERING & RENDERING BIRYANI SPOTS
     ========================================================================== */
  getFilteredSpots() {
    return this.spots.filter(spot => {
      // Distance filter
      if (spot.distanceKm > this.maxDistanceKm) return false;

      // Category filter
      if (this.currentCategory === "secret" && !spot.isSecret) return false;
      if (this.currentCategory === "titan" && spot.isSecret) return false;
      if (this.currentCategory === "late" && !spot.openLate) return false;
      if (this.currentCategory === "spicy" && !spot.spiceLevel.includes("🔥")) return false;

      // Locality area filter
      if (this.currentArea !== "all" && spot.area !== this.currentArea) return false;

      // Search query filter
      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchName = spot.name.toLowerCase().includes(q);
        const matchLoc = spot.location.toLowerCase().includes(q);
        const matchSpec = spot.specialty.toLowerCase().includes(q);
        const matchTip = spot.insiderTip.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchSpec && !matchTip) return false;
      }

      return true;
    }).sort((a, b) => b.votes - a.votes);
  }

  renderSpots() {
    const grid = document.getElementById("spots-grid");
    const countEl = document.getElementById("results-count");
    if (!grid) return;

    const filtered = this.getFilteredSpots();
    if (countEl) countEl.textContent = `${filtered.length} Spot${filtered.length === 1 ? '' : 's'} Ready`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1rem; background: rgba(18,23,34,0.6); border-radius: 20px; border: 1px dashed var(--border-saffron);">
          <div style="font-size: 3rem; margin-bottom: 0.8rem;">🗺️🤷‍♂️</div>
          <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #ffffff; margin-bottom: 0.5rem;">Outer Ring Road ke aage nikal gaye kya?</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">Distance slider thoda badhao ya 'All Spots' select karo. Hyderabad me biryani ki kami thodi hai!</p>
          <button class="btn btn-primary" onclick="app.resetFilters()">🔄 Filters Reset Karo Miyan</button>
        </div>
      `;
      return;
    }

    const topVoteCount = filtered[0].votes;

    grid.innerHTML = filtered.map((spot, index) => {
      const isLeader = index === 0 && spot.votes > 0;
      const userHasVoted = this.userVotes[spot.id] || 0;

      return `
        <article class="spot-card ${spot.isSecret ? 'secret-gem' : ''} ${isLeader ? 'leader-card' : ''}" id="card-${spot.id}">
          ${isLeader ? `
            <div class="leader-ribbon">
              <span>👑 Majority Favorite</span>
            </div>
          ` : ''}

          <div>
            <div class="card-header">
              <div>
                <div class="spot-badges-row">
                  ${spot.isSecret 
                    ? `<span class="badge-secret">🤫 AI Doesn't Know (Secret Cult)</span>` 
                    : `<span class="badge-titan">👑 Legendary Titan</span>`
                  }
                  <span class="badge-distance">📍 ${spot.distanceKm} km</span>
                  <span class="badge-distance">${spot.priceRange.split(' ')[0]}</span>
                </div>
                <h3 class="spot-name">${spot.name}</h3>
                <div class="spot-location">
                  <span>📍 ${spot.location}</span>
                </div>
              </div>
            </div>

            <div class="spot-specialty">
              <div class="specialty-title">Ustaad ki Specialty</div>
              <div class="specialty-text">${spot.specialty}</div>
            </div>

            <!-- Secret Insider Foodie Lore -->
            <div class="secret-tip-box">
              <span class="secret-tip-label">💡 Local Insider Secret (Secret Tip)</span>
              <div>${spot.insiderTip}</div>
            </div>

            <!-- Real Local Street Alerts (Parking & Traffic) -->
            <div class="street-alerts-box">
              <div class="alert-pill alert-parking">
                <span>${spot.parkingStatus}</span>
              </div>
              <div class="alert-pill alert-traffic">
                <span>🚦 ${spot.trafficAlert}</span>
              </div>
            </div>
          </div>

          <!-- Card Voting Footer -->
          <div class="card-vote-footer">
            <div class="live-tally-box">
              <div class="live-votes-count" id="vote-count-${spot.id}">${spot.votes}</div>
              <div class="live-votes-label">Live Squad Votes</div>
            </div>

            <div class="voting-buttons-group">
              <button class="vote-btn btn-upvote" onclick="app.handleVote('${spot.id}', 1)" title="Vote for this spot">
                <span>👍</span>
                <span>+1</span>
              </button>
              <button class="vote-btn btn-supervote" onclick="app.handleVote('${spot.id}', 3)" title="Double Masala Super Vote (+3)">
                <span>🔥</span>
                <span>+3 Double Masala</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  resetFilters() {
    this.maxDistanceKm = 15;
    const distanceRange = document.getElementById("distance-range");
    if (distanceRange) distanceRange.value = 15;
    const badge = document.getElementById("distance-val-badge");
    if (badge) badge.textContent = "15 km";
    this.currentCategory = "all";
    this.currentArea = "all";
    this.searchQuery = "";
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    document.querySelector(".filter-pill[data-category='all']")?.classList.add("active");
    document.querySelector(".filter-pill[data-area='all']")?.classList.add("active");
    this.renderSpots();
  }

  /* ==========================================================================
     VOTING LOGIC & ARGUMENT DEADLOCK RESOLUTION
     ========================================================================== */
  handleVote(spotId, amount = 1) {
    const spot = this.spots.find(s => s.id === spotId);
    if (!spot) return;

    // Check if user is spamming single votes
    const prevVotes = this.userVotes[spotId] || 0;
    if (amount === 1 && prevVotes >= 2) {
      // Trigger funny Street Slang Duplicate Error Warning!
      const slangError = translateErrorToSlang("You already voted! Duplicate vote entry forbidden.", {
        spotName: spot.name
      });
      audio.playErrorBuzzer();
      this.showToast({
        title: slangError.slangTitle,
        message: slangError.slangMessage,
        type: "danger"
      });
      return;
    }

    spot.votes += amount;
    this.userVotes[spotId] = prevVotes + amount;

    if (amount > 1) {
      audio.playVoteSound(true);
      this.showToast({
        title: "🔥 DOUBLE MASALA SUPER VOTE!",
        message: `${spot.name} ko +3 vote mil gaye! Khushboo poori colony me phail gayi!`,
        type: "warning"
      });
    } else {
      audio.playVoteSound(false);
    }

    this.renderSpots();
    this.updateStats();
    this.checkDeadlock();
  }

  updateStats() {
    const totalVotes = this.spots.reduce((sum, s) => sum + s.votes, 0);
    const sorted = [...this.spots].sort((a, b) => b.votes - a.votes);
    const leader = sorted[0];

    const totalVotesEl = document.getElementById("stat-total-votes");
    const leadingSpotEl = document.getElementById("stat-leading-spot");
    if (totalVotesEl) totalVotesEl.textContent = totalVotes;
    if (leadingSpotEl && leader) leadingSpotEl.textContent = leader.name.split(" ")[0] || "None";
  }

  checkDeadlock() {
    const sorted = [...this.spots].sort((a, b) => b.votes - a.votes);
    if (sorted.length >= 2 && sorted[0].votes === sorted[1].votes && sorted[0].votes > 0) {
      // Deadlock!
      const deadlockBanner = document.getElementById("deadlock-indicator");
      if (deadlockBanner) {
        deadlockBanner.style.display = "flex";
      }
    } else {
      const deadlockBanner = document.getElementById("deadlock-indicator");
      if (deadlockBanner) {
        deadlockBanner.style.display = "none";
      }
    }
  }

  /* ==========================================================================
     SQUAD ARGUMENT SIMULATOR (FRIENDS CHATTER)
     ========================================================================== */
  startSquadSimulation() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);

    this.simulationInterval = setInterval(() => {
      if (!this.isSimulating) return;

      // Pick a random friend
      const friend = SQUAD_FRIENDS[Math.floor(Math.random() * SQUAD_FRIENDS.length)];
      const targetSpot = this.spots.find(s => s.id === friend.favorite) || this.spots[Math.floor(Math.random() * this.spots.length)];

      if (targetSpot) {
        targetSpot.votes += 1;
        this.addChatterMessage(friend, targetSpot);
        this.renderSpots();
        this.updateStats();
        this.checkDeadlock();
      }
    }, 7500);
  }

  addChatterMessage(friend, spot) {
    const chatBox = document.getElementById("squad-chat-box");
    if (!chatBox) return;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.innerHTML = `
      <div class="chat-avatar">${friend.avatar}</div>
      <div class="chat-content">
        <div class="chat-author">${friend.name} (${friend.tag})</div>
        <div>"${friend.comment}" ➔ <strong>+1 for ${spot.name}</strong></div>
      </div>
    `;

    chatBox.prepend(bubble);

    // Keep chat box clean (max 6 bubbles)
    while (chatBox.children.length > 6) {
      chatBox.removeChild(chatBox.lastChild);
    }
  }

  /* ==========================================================================
     THE SULLAH (TIE BREAKER) WHEEL / SPIN THE DEGH
     ========================================================================== */
  initWheel() {
    this.wheelCanvas = document.getElementById("wheel-canvas");
    if (!this.wheelCanvas) return;
    this.wheelCtx = this.wheelCanvas.getContext("2d");
  }

  openWheelModal() {
    const modal = document.getElementById("modal-wheel");
    if (!modal) return;
    modal.classList.add("active");

    // Take top 6 contended spots
    const topContenders = [...this.spots].sort((a, b) => b.votes - a.votes).slice(0, 6);
    this.wheelSpots = topContenders;
    this.drawWheel();
  }

  drawWheel() {
    if (!this.wheelCtx || !this.wheelCanvas) return;
    const ctx = this.wheelCtx;
    const width = this.wheelCanvas.width;
    const height = this.wheelCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = width / 2 - 12;

    ctx.clearRect(0, 0, width, height);

    const count = this.wheelSpots.length;
    if (count === 0) return;
    const arc = (Math.PI * 2) / count;

    const sliceColors = [
      ["#f59e0b", "#d97706"], // Saffron
      ["#e11d48", "#be123c"], // Degh Red
      ["#10b981", "#059669"], // Mint Jade
      ["#8b5cf6", "#6d28d9"], // Royal Purple
      ["#f97316", "#c2410c"], // Sunset Amber
      ["#06b6d4", "#0891b2"]  // Blue lagoon
    ];

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.wheelAngle);

    for (let i = 0; i < count; i++) {
      const startAngle = i * arc;
      const endAngle = startAngle + arc;

      // Slice background gradient
      const grad = ctx.createRadialGradient(0, 0, 20, 0, 0, radius);
      const [col1, col2] = sliceColors[i % sliceColors.length];
      grad.addColorStop(0, col1);
      grad.addColorStop(1, col2);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.rotate(startAngle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 5;

      const spotName = this.wheelSpots[i].name;
      const truncated = spotName.length > 16 ? spotName.slice(0, 15) + "…" : spotName;
      ctx.fillText(truncated, radius - 20, 5);
      ctx.restore();
    }

    ctx.restore();
  }

  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    audio.playSizzleSound();

    // Random initial speed between 0.35 and 0.55
    this.wheelSpeed = Math.random() * 0.2 + 0.38;
    const deceleration = 0.988;

    const winnerBanner = document.getElementById("wheel-winner-banner");
    if (winnerBanner) winnerBanner.style.display = "none";

    const animateSpin = () => {
      this.wheelAngle += this.wheelSpeed;
      this.wheelSpeed *= deceleration;

      // Tick audio calculation
      const count = this.wheelSpots.length;
      const arc = (Math.PI * 2) / count;
      const normalizedAngle = (this.wheelAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const currentSegment = Math.floor(normalizedAngle / arc);
      if (currentSegment !== this.lastTickSegment) {
        audio.playWheelTickSound();
        this.lastTickSegment = currentSegment;
      }

      this.drawWheel();

      if (this.wheelSpeed > 0.002) {
        requestAnimationFrame(animateSpin);
      } else {
        this.isSpinning = false;
        this.declareWheelWinner();
      }
    };

    animateSpin();
  }

  declareWheelWinner() {
    const count = this.wheelSpots.length;
    const arc = (Math.PI * 2) / count;

    // The pointer is at top (which corresponds to 3*PI/2 or -PI/2)
    // Pointer angle in wheel coordinates:
    const pointerAngle = (Math.PI * 1.5 - this.wheelAngle) % (Math.PI * 2);
    const normalizedPointer = (pointerAngle + Math.PI * 2) % (Math.PI * 2);
    const winningIndex = Math.floor(normalizedPointer / arc) % count;

    const winner = this.wheelSpots[winningIndex];
    if (!winner) return;

    audio.playVictoryDhol();

    const banner = document.getElementById("wheel-winner-banner");
    const winnerNameEl = document.getElementById("wheel-winner-name");
    const winnerTipEl = document.getElementById("wheel-winner-tip");

    if (banner && winnerNameEl && winnerTipEl) {
      winnerNameEl.textContent = winner.name;
      winnerTipEl.textContent = `💡 Secret Insider Tip: ${winner.insiderTip}`;
      banner.style.display = "block";
    }

    // Award +5 victory bonus votes!
    winner.votes += 5;
    this.renderSpots();
    this.updateStats();

    this.showToast({
      title: "🎉 SULLAH HO GAYI!",
      message: `Aakhri faisla: ${winner.name}! Gaddi nikaalo jaldi, table book karo!`,
      type: "warning"
    });
  }

  /* ==========================================================================
     SLANG RULE ENGINE LAB / TESTER
     ========================================================================== */
  testSlangConversion(inputText) {
    if (!inputText) inputText = "Standard vehicle parking unavailable at venue";

    const result = translateErrorToSlang(inputText, {
      location: "Hotel spot",
      area: "Masab Tank / Tolichowki",
      spotName: "Biryani adda"
    });

    const titleEl = document.getElementById("slang-lab-title");
    const bodyEl = document.getElementById("slang-lab-body");
    const ruleEl = document.getElementById("slang-lab-rule-id");
    const adviceEl = document.getElementById("slang-lab-advice");

    if (titleEl) titleEl.textContent = result.slangTitle;
    if (bodyEl) bodyEl.textContent = result.slangMessage;
    if (ruleEl) ruleEl.textContent = `Applied: ${result.ruleName} (${result.category})`;
    if (adviceEl) adviceEl.textContent = `💡 Asli Street Salah: ${result.streetSlangAdvice}`;

    audio.playVoteSound(true);
  }

  /* ==========================================================================
     ADD CUSTOM SECRET SPOT
     ========================================================================== */
  handleAddCustomSpot() {
    const name = document.getElementById("new-spot-name")?.value.trim();
    const location = document.getElementById("new-spot-location")?.value.trim();
    const area = document.getElementById("new-spot-area")?.value;
    const distanceKm = parseFloat(document.getElementById("new-spot-dist")?.value || 3.5);
    const specialty = document.getElementById("new-spot-specialty")?.value.trim();
    const insiderTip = document.getElementById("new-spot-tip")?.value.trim();
    const parkingStatus = document.getElementById("new-spot-parking")?.value.trim();

    if (!name || !location || !specialty) {
      const slangError = translateErrorToSlang("Invalid input! Required fields empty.");
      audio.playErrorBuzzer();
      this.showToast({
        title: slangError.slangTitle,
        message: slangError.slangMessage,
        type: "danger"
      });
      return;
    }

    const newSpot = {
      id: "custom-" + Date.now(),
      name: name,
      location: location,
      area: area || "Tolichowki / Mehdipatnam",
      distanceKm: distanceKm,
      isSecret: true,
      rating: 5.0,
      votes: 1,
      priceRange: "₹₹ (Secret Gem)",
      specialty: specialty,
      spiceLevel: "High Masala 🔥🔥🔥",
      bestTime: "8:00 PM - Midnight",
      openLate: true,
      category: "secret",
      insiderTip: insiderTip || "Directly bolo degh ka fresh masala nikaal ke de!",
      parkingStatus: parkingStatus || "⚠️ Bike parking recommended; road is narrow.",
      trafficAlert: "Evening rush hour traffic.",
      vibeQuote: "Local foodie recommendation."
    };

    this.spots.unshift(newSpot);
    this.renderSpots();
    this.updateStats();

    const addModal = document.getElementById("modal-add-spot");
    if (addModal) addModal.classList.remove("active");

    audio.playVoteSound(true);
    this.showToast({
      title: "🤫 Naya Secret Spot Add Hogaya!",
      message: `${name} list me shaamil hogaya. AI ko yeh bilkul pata nahi tha!`
    });

    document.getElementById("form-add-spot")?.reset();
  }

  /* ==========================================================================
     EXPORT WHATSAPP SQUAD VERDICT
     ========================================================================== */
  exportWhatsAppVerdict() {
    const sorted = [...this.spots].sort((a, b) => b.votes - a.votes);
    const winner = sorted[0];

    const message = 
`🍗 *HYDERABAD BIRYANI GROUP FAISLA (AAKHRI DECISION)* 🍗
===================================
🏆 *WINNER:* ${winner.name} (${winner.location})
🗳️ *VOTES:* ${winner.votes} Live Squad Votes!
📍 *DISTANCE:* ${winner.distanceKm} km
🔥 *SPECIALTY:* ${winner.specialty}

🤫 *INSIDER SECRET (AI DOESN'T KNOW):*
"${winner.insiderTip}"

⚠️ *LOCAL STREET ALERTS:*
• Parking: ${winner.parkingStatus}
• Traffic: ${winner.trafficAlert}

🚗 *PLAN OF ACTION:*
Activa/Car nikaalo jaldi, 11:30 baje degh khatam hojati! Late aane wala bill bharega!
===================================
_Generated via Potluck Biryani Wars Hyderabad_`;

    navigator.clipboard.writeText(message);
    audio.playVoteSound(true);
    this.showToast({
      title: "📱 WhatsApp Verdict Ready!",
      message: "Group chat format copy hogaya! Doston ke WhatsApp group me paste karo!"
    });
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */
  showToast({ title, message, type = "normal" }) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type === 'danger' ? 'toast-danger' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.innerHTML = `
      <div class="toast-icon">${type === 'danger' ? '🚨' : type === 'warning' ? '🍲' : '✨'}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}

// Global app instance initialization
let app = null;
window.addEventListener("DOMContentLoaded", () => {
  app = new BiryaniWarsApp();
});
