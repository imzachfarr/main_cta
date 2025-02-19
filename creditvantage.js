class CreditVantageCTA extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');
        * {
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
        }
        .cta-container {
          background: #111827;
          color: #eee;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
          margin: auto;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
        }
        h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0070FF;
          margin-bottom: 10px;
        }
        .benefits {
          text-align: left;
          margin-bottom: 20px;
        }
        .benefit {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .benefit-icon {
          width: 24px;
          height: 24px;
          background-color: #00C853;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(to right, #0070FF, #00A3FF);
          color: white;
          padding: 14px 24px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cta-button:hover {
          background: linear-gradient(to right, #00A3FF, #0070FF);
        }
      </style>

      <div class="cta-container">
        <h2>Lock in Your 70% OFF Today!</h2>
        <p>Join over 18,000 people who have successfully improved their credit score.</p>

        <div class="benefits">
          <div class="benefit">
            <span class="benefit-icon">✔</span>
            <span>90-Day Money Back Guarantee</span>
          </div>
          <div class="benefit">
            <span class="benefit-icon">✔</span>
            <span>See results in 30 days</span>
          </div>
          <div class="benefit">
            <span class="benefit-icon">✔</span>
            <span>Limited Time Offer</span>
          </div>
        </div>

        <a href="#signup" class="cta-button">START YOUR CREDIT REPAIR NOW</a>
      </div>
    `;
  }
}

customElements.define("credit-vantage-cta", CreditVantageCTA);
