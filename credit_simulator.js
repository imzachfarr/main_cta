class CreditSimulator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // The base score & credit actions from your snippet:
    this.baseScore = 580;
    this.creditActions = [
      {
        name: "Collections Removed",
        minImpact: 67,
        maxImpact: 113,
        description: "Delete unfair collection accounts",
      },
      {
        name: "Late Payments Fixed",
        minImpact: 22,
        maxImpact: 46,
        description: "Remove inaccurate late payments",
      },
      {
        name: "Inquiries Removed",
        minImpact: 7,
        maxImpact: 16,
        description: "Remove unauthorized inquiries",
      },
    ];

    // We'll store toggles in an array of booleans
    this.toggleStates = [false, false, false];

    // Initial rendering of the component:
    this.render();
  }

  // Utility: calculate new score
  calculateNewScore() {
    const totalImprovement = this.toggleStates.reduce((sum, isEnabled, index) => {
      if (!isEnabled) return sum;
      const action = this.creditActions[index];
      const impact = Math.floor(
        Math.random() * (action.maxImpact - action.minImpact + 1) + action.minImpact
      );
      return sum + impact;
    }, 0);
    return Math.min(850, this.baseScore + totalImprovement);
  }

  // We'll call this every time the user toggles a switch
  updateScore() {
    this.render();
  }

  // The main render function
  render() {
    const newScore = this.calculateNewScore();
    const scoreIncrease = newScore - this.baseScore;

    // We'll define inline CSS here for self-containment:
    const style = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');
        * {
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
        }
        .sim-container {
          background: #000;
          color: #eee;
          padding: 20px;
          border-radius: 12px;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        h2 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 10px;
          color: #00A3FF;
        }
        .sim-subtitle {
          font-size: 16px;
          color: #999;
          margin-bottom: 20px;
        }
        .actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .action-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111;
          border-radius: 8px;
          padding: 12px;
        }
        .action-left {
          text-align: left;
        }
        .action-title {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .action-desc {
          font-size: 14px;
          color: #ccc;
        }
        .toggle {
          width: 50px;
          height: 28px;
          background: #444;
          border-radius: 14px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
        }
        .toggle::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          background: #999;
          border-radius: 50%;
          transition: transform 0.3s;
        }
        .toggle.active {
          background: #0055FF;
        }
        .toggle.active::before {
          background: #fff;
          transform: translateX(22px);
        }
        .score-box {
          background: #111;
          padding: 20px;
          border-radius: 8px;
          margin: 0 auto;
          width: 220px;
          text-align: center;
        }
        .score-number {
          font-size: 48px;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }
        .score-increase {
          font-size: 18px;
          color: #00FF00;
        }
        .cta-button {
          display: inline-block;
          margin-top: 20px;
          padding: 14px 24px;
          background: #00A3FF;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.3s;
        }
        .cta-button:hover {
          background: #0070FF;
        }
      </style>
    `;

    // We'll build the HTML for toggles
    const togglesHTML = this.creditActions
      .map((action, index) => {
        const isActive = this.toggleStates[index] ? "active" : "";
        return `
          <div class="action-item">
            <div class="action-left">
              <div class="action-title">${action.name}</div>
              <div class="action-desc">${action.description}</div>
            </div>
            <div class="toggle ${isActive}" data-index="${index}"></div>
          </div>
        `;
      })
      .join("");

    // Build the final HTML
    this.shadowRoot.innerHTML = `
      ${style}
      <div class="sim-container">
        <h2>See Your New Credit Score</h2>
        <p class="sim-subtitle">
          Toggle the items below to see how our credit repair service can improve your score
        </p>
        <div class="actions">
          ${togglesHTML}
        </div>
        <div class="score-box">
          <p class="score-number">${newScore}</p>
          ${
            scoreIncrease > 0
              ? `<p class="score-increase">+${scoreIncrease}</p>`
              : `<p style="font-size: 16px; color: #999;">No change</p>`
          }
        </div>
        <a href="#signup" class="cta-button">Start Your Free Analysis</a>
      </div>
    `;

    // Add toggle event listeners
    const toggles = this.shadowRoot.querySelectorAll(".toggle");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const idx = parseInt(toggle.getAttribute("data-index"), 10);
        this.toggleStates[idx] = !this.toggleStates[idx];
        this.updateScore();
      });
    });
  }
}

// Register the custom element
customElements.define("credit-simulator", CreditSimulator);
