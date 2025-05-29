"use client"

export default function NayataPatelCard() {
  return (
    <div className="card-container">
      <div className="card">
        {/* Main heading */}
        <h1 className="main-title">नायता पटेल नेटवर्क</h1>

        {/* Subtitle */}
        <p className="subtitle">समाज को जोड़ने का डिजिटल मंच</p>

        {/* Checklist items */}
        <div className="checklist">
          <div className="checklist-item">
            <span className="checkbox">✓</span>
            <span className="item-text">मंडी भाव</span>
          </div>
          <div className="checklist-item">
            <span className="checkbox">✓</span>
            <span className="item-text">सफलता की कहानियाँ</span>
          </div>
          <div className="checklist-item">
            <span className="checkbox">✓</span>
            <span className="item-text">ब्लॉग्स</span>
          </div>
          <div className="checklist-item">
            <span className="checkbox">✓</span>
            <span className="item-text">गाँव की जानकारी</span>
          </div>
        </div>

        {/* Call to action text */}
        <div className="cta-section">
          <p className="cta-text">सामाजिक मुद्दे पर चर्चा करें</p>
          <p className="cta-text">अपने गाँव के एम्बेसडर बनें</p>
        </div>

        {/* Dark banner */}
        <div className="dark-banner">
          <p className="banner-text">आज ही जुड़ें और पंजीकरण करें</p>
        </div>

        {/* Repeat text */}
        <p className="repeat-text">आज ही जुड़ें और पंजीकरण करें</p>

        {/* Website URL */}
        <div className="website-url flex flex-col">
          <span>Nayta Patel Network</span>
          <span className="">🌐 https://naytapatelnetwork.vercel.app/</span>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }
        
        .card {
          width: 400px;
          background: linear-gradient(135deg, #ff9a56 0%, #ff7b39 50%, #ff6b2b 100%);
          border-radius: 1px;
          padding: 30px;
          color: #4a2c2a;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .main-title {
          font-size: 32px;
          font-weight: bold;
          margin: 0 0 15px 0;
          text-align: center;
          line-height: 1.2;
          color: #4a2c2a;
        }
        
        .subtitle {
          font-size: 18px;
          text-align: center;
          margin: 0 0 25px 0;
          font-weight: 500;
          color: #4a2c2a;
        }
        
        .checklist {
          display:flex;
          flex-direction:column;
          align-items:start;
          justify-content:center;
          margin-left: 55px;
        }
        
        .checklist-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 500;
        }
        
        .checkbox {
          width: 25px;
          height: 25px;
          border:1.5px solid #4a2c2a;
          color: ##4a2c2a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 3px;
        }
        
        .item-text {
          color: #4a2c2a;
          font-weight: 600;
        }
        
        .cta-section {
          margin: 20px 0 10px 0;
        }
        
        .cta-text {
          font-size: 20px;
          font-weight: bold;
          margin: 8px 0;
          text-align: center;
          color: #4a2c2a;
          line-height: 1.3;
        }
        
        .dark-banner {
          background-color: #4a2c2a;
          margin: 20px -30px;
          padding: 15px 30px;
          color: #ff9a56;
        }
        
        .banner-text {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          text-align: center;
        }
        
        .repeat-text {
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0;
          display:none;
          color: #4a2c2a;
          text-align: center;
        }
        
        .website-url {
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 25px;
          padding: 12px 20px;
          text-align: center;
          margin-top: 20px;
          width:370px;
          margin-left:-15px;
        }
        
        .website-url  {
          font-size: 16px;
          font-weight: bold;
          color: #4a2c2a;
        }
        
        @media (max-width: 480px) {
          .card {
            width: 100%;
            max-width: 350px;
            padding: 25px;
          }
          
          .main-title {
            font-size: 28px;
          }
          
          .subtitle {
            font-size: 16px;
          }
          
          .checklist-item {
            font-size: 16px;
          }
          
          .cta-text {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  )
}
