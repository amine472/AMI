const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let consultations = [];

// نظام تسجيل الدخول مع التجميد
let loginAttempts = 0;
let isFrozen = false;
let freezeUntil = null;

// الرقم السري للعمليات (2026)
const SECRET_CODE = "2026";

// دالة للحصول على التاريخ والوقت الحالي
function getCurrentDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return now.toLocaleDateString('fr-FR', options);
}

// دالة للحصول على الوقت المتبقي من التجميد
function getRemainingFreezeTime() {
  if (!isFrozen || !freezeUntil) return 0;
  const remaining = Math.max(0, Math.ceil((freezeUntil - Date.now()) / 1000 / 60));
  return remaining;
}

// دالة مساعدة لتوليد الستايل المشترك (CSS)
const getStyles = () => `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * { 
    box-sizing: border-box; 
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  body {
    background: linear-gradient(-45deg, #667eea, #764ba2, #6b8dd6, #8e37d7);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    min-height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    position: relative;
    overflow-x: hidden;
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .container {
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem;
    border-radius: 30px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.5);
    width: 100%;
    max-width: 1400px;
    animation: slideInUp 0.8s ease-out;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    position: relative;
    z-index: 1;
    transform-style: preserve-3d;
    transition: all 0.3s ease;
    margin: 20px auto;
  }

  .container:hover {
    transform: translateY(-5px) rotateX(2deg);
    box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 0 3px rgba(255,255,255,0.6);
  }

  /* Header */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea20, #764ba220);
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .logo-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ffd700;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    animation: rotate 10s linear infinite;
  }

  .logo-text {
    font-size: 1.8em;
    font-weight: 700;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .company-info {
    text-align: center;
  }

  .company-name {
    font-size: 1.2em;
    font-weight: 600;
    color: #2c3e50;
  }

  .company-subtitle {
    font-size: 1em;
    color: #667eea;
    font-weight: 500;
  }

  .company-location, .company-address {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #666;
    font-size: 0.9em;
    margin-top: 5px;
  }

  /* Clock Container */
  .clock-container {
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255,255,255,0.2);
    padding: 15px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .digital-clock {
    font-size: 1.5em;
    font-weight: 600;
    color: #2c3e50;
    background: white;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .analog-clock {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    position: relative;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .clock-face {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: bottom;
    background: #2c3e50;
    border-radius: 4px;
  }

  .hour-hand {
    width: 3px;
    height: 15px;
    background: #333;
  }

  .minute-hand {
    width: 2px;
    height: 20px;
    background: #666;
  }

  .second-hand {
    width: 1px;
    height: 25px;
    background: #ff4757;
  }

  .center-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #333;
  }

  /* Theme Toggle */
  .theme-toggle {
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  .theme-toggle i {
    font-size: 1.5em;
    color: #ffd700;
    transition: all 0.3s ease;
  }

  .theme-toggle i:hover {
    transform: scale(1.1);
  }

  .fa-moon {
    color: #2c3e50;
  }

  /* Page Title */
  .page-title {
    text-align: center;
    margin: 30px 0;
  }

  .page-title h2 {
    font-size: 2.2em;
    font-weight: 700;
    background: linear-gradient(45deg, #ffd700, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    position: relative;
    display: inline-block;
  }

  .page-title h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #ffd700, #ff6b6b, transparent);
    border-radius: 2px;
  }

  /* Search and Filters */
  .search-filters {
    margin-bottom: 30px;
  }

  .search-input-container {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  .search-input-container input {
    flex: 1;
    padding: 15px 20px;
    border: 2px solid rgba(102,126,234,0.3);
    border-radius: 15px;
    outline: none;
    transition: all 0.3s ease;
    font-size: 1em;
  }

  .search-input-container input:focus {
    border-color: #667eea;
    box-shadow: 0 0 20px rgba(102,126,234,0.3);
    transform: scale(1.02);
  }

  .btn-search {
    padding: 15px 30px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .btn-search:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(102,126,234,0.3);
  }

  .advanced-filters {
    position: relative;
  }

  .btn-toggle-filters {
    padding: 12px 25px;
    background: linear-gradient(45deg, #2ed573, #7bed9f);
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .filters-panel {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 1000;
    display: none;
    width: 300px;
  }

  .filters-panel.active {
    display: block;
    animation: slideInDown 0.3s ease;
  }

  .filter-group {
    margin-bottom: 15px;
  }

  .filter-group label {
    display: block;
    margin-bottom: 5px;
    color: #2c3e50;
    font-weight: 500;
  }

  .filter-group input,
  .filter-group select {
    width: 100%;
    padding: 10px;
    border: 2px solid #eee;
    border-radius: 10px;
    outline: none;
  }

  .btn-apply-filters,
  .btn-reset-filters {
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-right: 10px;
  }

  .btn-apply-filters {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
  }

  .btn-reset-filters {
    background: linear-gradient(45deg, #ff4757, #ff6b81);
    color: white;
  }

  /* Table */
  .table-container {
    overflow-x: auto;
    margin-bottom: 30px;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }

  th {
    padding: 18px;
    background: linear-gradient(135deg, #2c3e50, #3498db);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  th:first-child { border-radius: 15px 0 0 15px; }
  th:last-child { border-radius: 0 15px 15px 0; }

  th:hover {
    background: linear-gradient(135deg, #3498db, #2c3e50);
    transform: translateY(-2px);
  }

  td {
    padding: 15px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  tr:hover td {
    transform: scale(1.02);
    background: linear-gradient(135deg, #f6f9fc, #e6f0fa);
  }

  /* Admin Controls */
  .admin-controls {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .btn-admin {
    padding: 12px 25px;
    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .btn-admin:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255,107,107,0.3);
  }

  /* Modal */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    z-index: 9999;
    justify-content: center;
    align-items: center;
  }

  .modal.active {
    display: flex;
    animation: fadeIn 0.3s ease;
  }

  .modal-content {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3), 0 0 0 3px #ffd700;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: white;
  }

  .modal-header h3 {
    font-size: 1.8em;
  }

  .close-modal {
    font-size: 2em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .close-modal:hover {
    transform: scale(1.1);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: white;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 10px;
    background: rgba(255,255,255,0.9);
    outline: none;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: #ffd700;
    box-shadow: 0 0 20px rgba(255,215,0,0.3);
  }

  .radio-group {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  }

  .radio-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
  }

  .hidden {
    display: none;
  }

  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .btn-submit,
  .btn-cancel {
    padding: 12px 30px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-submit {
    background: linear-gradient(45deg, #2ed573, #7bed9f);
    color: white;
  }

  .btn-cancel {
    background: linear-gradient(45deg, #ff4757, #ff6b81);
    color: white;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .pagination button {
    padding: 8px 15px;
    border: none;
    border-radius: 8px;
    background: white;
    color: #2c3e50;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pagination button.active {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
  }

  .pagination button:hover:not(.active) {
    background: #eee;
    transform: translateY(-2px);
  }

  /* Toast Notifications */
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
  }

  .toast {
    background: white;
    padding: 15px 25px;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    animation: slideInRight 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .toast.success {
    border-left: 4px solid #2ed573;
  }

  .toast.error {
    border-left: 4px solid #ff4757;
  }

  .toast.info {
    border-left: 4px solid #667eea;
  }

  /* Footer */
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: white;
    width: 100%;
    max-width: 1400px;
    margin-top: 30px;
  }

  .social-links {
    display: flex;
    gap: 15px;
  }

  .social-link {
    color: white;
    font-size: 1.5em;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    color: #ffd700;
    transform: translateY(-3px);
  }

  .designer-name {
    color: #ffd700;
    font-weight: 600;
  }

  /* Animations */
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .header-container {
      flex-direction: column;
    }
    
    .company-info {
      text-align: center;
    }
    
    .clock-container {
      width: 100%;
      justify-content: center;
    }
    
    .search-input-container {
      flex-direction: column;
    }
    
    .filters-panel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
    }
    
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
`;

/* ===== MIDDLEWARE للتحقق من الرقم السري وحالة التجميد ===== */
app.use((req, res, next) => {
  // التحقق من حالة التجميد
  if (isFrozen && freezeUntil && Date.now() >= freezeUntil) {
    isFrozen = false;
    freezeUntil = null;
    loginAttempts = 0;
  }

  if (isFrozen && req.path !== '/') {
    return res.redirect('/');
  }
  
  next();
});

/* ===== PAGE D'ACCUEIL ===== */
app.get("/", (req, res) => {
  const remainingMinutes = getRemainingFreezeTime();
  
  if (isFrozen && remainingMinutes > 0) {
    return res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Site gelé - SARPI Spa</title>
      ${getStyles()}
    </head>
    <body>
      <div class="container error-box animate__animated animate__shakeX">
        <div class="freeze-bar" style="text-align: center; padding: 40px;">
          <span style="font-size: 4em;">❄️</span>
          <h1 style="color: white; margin: 20px 0;">Le site est temporairement gelé</h1>
          <div class="freeze-timer" style="font-size: 3em;">${remainingMinutes}:00</div>
          <p style="margin-top: 20px;">Trop de tentatives de connexion échouées</p>
        </div>
      </div>
      
      <script>
        let minutes = ${remainingMinutes};
        let seconds = 0;
        
        function updateTimer() {
          if (seconds === 0) {
            if (minutes === 0) {
              location.reload();
              return;
            }
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
          
          document.querySelector('.freeze-timer').textContent = 
            \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
        }
        
        setInterval(updateTimer, 1000);
      </script>
    </body>
    </html>
    `);
  }

  const attemptsLeft = 3 - loginAttempts;
  
  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SARPI Spa - Connexion</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    ${getStyles()}
</head>
<body>
    <div class="container login-box animate__animated animate__fadeInDown">
        <div class="datetime-bar" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; border-radius: 15px; margin-bottom: 20px; text-align: center;">
            <i class="fas fa-clock"></i>
            <span id="currentDateTime">${getCurrentDateTime()}</span>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://via.placeholder.com/100" alt="Logo SARPI" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #667eea;">
            <h2 style="margin-top: 15px;">SARPI Spa</h2>
            <p style="color: #666;">Direction Régionale Hassi R'mel</p>
        </div>
        
        <div class="attempts-indicator" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
            ${[1,2,3].map(i => `
                <div style="width: 15px; height: 15px; border-radius: 50%; background: ${i > attemptsLeft ? '#ff4757' : '#ffd700'}; box-shadow: ${i <= attemptsLeft ? '0 0 10px #ffd700' : 'none'};"></div>
            `).join('')}
        </div>
        
        <p style="text-align: center; color: #666; margin-bottom: 20px;">
            Tentatives restantes: <strong style="color: ${attemptsLeft > 1 ? '#2ed573' : '#ff4757'}">${attemptsLeft}</strong>
        </p>
        
        <form method="POST" action="/login" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="text" name="username" placeholder="Nom d'utilisateur (admin)" required style="padding: 15px; border: 2px solid #eee; border-radius: 10px;">
            <input type="password" name="password" placeholder="Mot de passe (0000)" required style="padding: 15px; border: 2px solid #eee; border-radius: 10px;">
            <button type="submit" style="padding: 15px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;">Se connecter</button>
        </form>
        
        <div style="text-align: center; margin-top: 20px; color: #666;">
            <small>admin / 0000</small>
        </div>
    </div>

    <script>
        function updateDateTime() {
            const now = new Date();
            document.getElementById('currentDateTime').textContent = now.toLocaleString('fr-FR');
        }
        setInterval(updateDateTime, 1000);
        
        document.addEventListener('contextmenu', e => e.preventDefault());
    </script>
</body>
</html>
`);
});

app.post("/login", (req, res) => {
  if (isFrozen) {
    return res.redirect("/");
  }

  const { username, password } = req.body;
  
  if (username === "admin" && password === "0000") {
    loginAttempts = 0;
    res.redirect("/consultations");
  } else {
    loginAttempts++;
    
    if (loginAttempts >= 3) {
      isFrozen = true;
      freezeUntil = Date.now() + (60 * 60 * 1000);
      
      return res.send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Site gelé</title>
        ${getStyles()}
      </head>
      <body>
        <div class="container error-box">
          <div style="text-align: center; padding: 40px;">
            <span style="font-size: 4em;">⚠️</span>
            <h1 style="color: #ff4757; margin: 20px 0;">Site gelé pour 1 heure</h1>
            <p>Trop de tentatives de connexion échouées</p>
            <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 10px;">Retour</a>
          </div>
        </div>
      </body>
      </html>
      `);
    }
    
    res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Erreur de connexion</title>
      ${getStyles()}
    </head>
    <body>
      <div class="container error-box">
        <div style="text-align: center; padding: 40px;">
          <span style="font-size: 3em;">❌</span>
          <h2 style="color: #ff4757; margin: 20px 0;">Identifiants incorrects!</h2>
          <p>Tentatives restantes: <strong>${3 - loginAttempts}</strong></p>
          <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 10px;">Réessayer</a>
        </div>
      </div>
    </body>
    </html>
    `);
  }
});

/* ===== CONSULTATIONS ===== */
app.get("/consultations", (req, res) => {
  const currentDateTime = getCurrentDateTime();
  
  let rows = consultations.map((c, i) => `
<tr>
  <td>${c.numero}</td>
  <td>${c.designation}</td>
  <td>${c.dateLancement}</td>
  <td>${c.dateRemise}</td>
  <td>${c.prorogation || 'NON'}</td>
  <td>${c.nombreOffres || 0}</td>
  <td>${c.charge}</td>
  <td class="action-links">
    <button onclick="showSecretModal('view', ${i})" class="action-btn" style="background: #3498db;">👁️</button>
    <button onclick="showSecretModal('edit', ${i})" class="action-btn" style="background: #2ed573;">✏️</button>
    <button onclick="showSecretModal('delete', ${i})" class="action-btn" style="background: #ff4757;">🗑️</button>
  </td>
</tr>
`).join("");

  if(consultations.length === 0) {
      rows = `<tr><td colspan="8"><div style="text-align: center; padding: 40px;">
        Aucune consultation enregistrée
      </div></td></tr>`;
  }

  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SARPI Spa - Suivi des Consultations</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    ${getStyles()}
</head>
<body>

<!-- Modal pour le code secret -->
<div class="modal" id="secretModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>🔐 Code secret requis</h3>
            <span class="close-modal" onclick="closeSecretModal()">&times;</span>
        </div>
        <div class="modal-body">
            <p>Veuillez entrer le code secret (2026) pour continuer:</p>
            <input type="password" id="secretCode" placeholder="****" style="width: 100%; padding: 15px; margin: 15px 0; border: 2px solid #667eea; border-radius: 10px; text-align: center; font-size: 1.2em;">
            <div class="form-actions">
                <button onclick="verifySecret()" class="btn-submit">Confirmer</button>
                <button onclick="closeSecretModal()" class="btn-cancel">Annuler</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal pour ajouter/modifier -->
<div class="modal" id="consultationModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modalTitle">Ajouter une consultation</h3>
            <span class="close-modal" onclick="closeModal('consultationModal')">&times;</span>
        </div>
        <div class="modal-body">
            <form id="consultationForm" method="POST" action="/add" onsubmit="return handleSubmit(event)">
                <input type="hidden" name="secretCode" id="formSecretCode">
                <input type="hidden" name="id" id="consultationId">
                <div class="form-group">
                    <label>N° de consultation:</label>
                    <input type="number" name="numero" id="numero" required>
                </div>
                <div class="form-group">
                    <label>Désignation de prestation:</label>
                    <textarea name="designation" id="designation" required></textarea>
                </div>
                <div class="form-group">
                    <label>Date de lancement:</label>
                    <input type="date" name="dateLancement" id="dateLancement" required>
                </div>
                <div class="form-group">
                    <label>Date limite de remise:</label>
                    <input type="date" name="dateRemise" id="dateRemise" required>
                </div>
                <div class="form-group">
                    <label>Prorogation:</label>
                    <div class="radio-group">
                        <label><input type="radio" name="prorogation" value="NON" checked> Non</label>
                        <label><input type="radio" name="prorogation" value="OUI"> Oui</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Nombre des offres:</label>
                    <input type="number" name="nombreOffres" id="nombreOffres" min="0">
                </div>
                <div class="form-group">
                    <label>Chargé(e) du dossier:</label>
                    <select name="charge" id="charge" required>
                        <option value="">Sélectionner</option>
                        <option value="OULD HAMOUDA DHEHBIYA">OULD HAMOUDA DHEHBIYA</option>
                        <option value="FAID KAMEL">FAID KAMEL</option>
                        <option value="MESSAHEL ABDELDJALIL">MESSAHEL ABDELDJALIL</option>
                        <option value="MEGAMEZ ABDALLAH">MEGAMEZ ABDALLAH</option>
                        <option value="CHELGHOUM HAMZA">CHELGHOUM HAMZA</option>
                        <option value="DAOUADI BELKACEM">DAOUADI BELKACEM</option>
                        <option value="KEDAID AHMED">KEDAID AHMED</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-submit">Enregistrer</button>
                    <button type="button" onclick="closeModal('consultationModal')" class="btn-cancel">Annuler</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal de visualisation -->
<div class="modal" id="viewModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Détails de la consultation</h3>
            <span class="close-modal" onclick="closeModal('viewModal')">&times;</span>
        </div>
        <div class="modal-body" id="viewDetails">
        </div>
        <div class="form-actions">
            <button onclick="closeModal('viewModal')" class="btn-cancel">Fermer</button>
        </div>
    </div>
</div>

<!-- Toast Container -->
<div id="toastContainer" class="toast-container"></div>

<div class="container">
    <!-- Header -->
    <div class="header-container">
        <div class="logo-section">
            <img src="https://via.placeholder.com/80" alt="Logo SARPI" class="logo-img">
            <div class="logo-text">SARPI Spa</div>
        </div>
        
        <div class="company-info">
            <div class="company-name">SOCIETE ALGERIENNE DE REALISATION DE PROJETS INDUSTRIELS</div>
            <div class="company-subtitle">FILIALE A 100% SONATRACH</div>
            <div class="company-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>DIRECTION REGIONALE HASSI R'MEL</span>
            </div>
        </div>
        
        <div class="controls-container">
            <div class="theme-toggle" id="themeToggle">
                <i class="fas fa-sun" id="sunIcon"></i>
            </div>
            <div class="clock-container">
                <div class="digital-clock" id="clock"></div>
            </div>
        </div>
    </div>

    <div class="page-title">
        <h2>TABLEAU DE SUIVI DES CONSULTATIONS 2025</h2>
    </div>

    <!-- Search and Filters -->
    <div class="search-filters">
        <div class="search-container">
            <div class="search-input-container">
                <input type="text" id="searchInput" placeholder="Rechercher...">
                <button class="btn-search" onclick="searchTable()">
                    <i class="fas fa-search"></i> Rechercher
                </button>
            </div>
            <div class="advanced-filters">
                <button class="btn-toggle-filters" onclick="toggleFilters()">
                    <i class="fas fa-filter"></i> Filtres avancés
                </button>
                <div class="filters-panel" id="filtersPanel">
                    <div class="filter-group">
                        <label>Date de lancement:</label>
                        <input type="date" id="dateFilter">
                    </div>
                    <div class="filter-group">
                        <label>Chargé(e) du dossier:</label>
                        <select id="chargeFilter">
                            <option value="">Tous</option>
                            <option value="OULD HAMOUDA DHEHBIYA">OULD HAMOUDA DHEHBIYA</option>
                            <option value="FAID KAMEL">FAID KAMEL</option>
                            <option value="MESSAHEL ABDELDJALIL">MESSAHEL ABDELDJALIL</option>
                            <option value="MEGAMEZ ABDALLAH">MEGAMEZ ABDALLAH</option>
                            <option value="CHELGHOUM HAMZA">CHELGHOUM HAMZA</option>
                            <option value="DAOUADI BELKACEM">DAOUADI BELKACEM</option>
                            <option value="KEDAID AHMED">KEDAID AHMED</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Statut:</label>
                        <select id="statusFilter">
                            <option value="">Tous</option>
                            <option value="prorogation">Avec prorogation</option>
                            <option value="sans-prorogation">Sans prorogation</option>
                        </select>
                    </div>
                    <button class="btn-apply-filters" onclick="applyFilters()">Appliquer</button>
                    <button class="btn-reset-filters" onclick="resetFilters()">Réinitialiser</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Table -->
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th onclick="sortTable(0)">N° <i class="fas fa-sort"></i></th>
                    <th onclick="sortTable(1)">Désignation <i class="fas fa-sort"></i></th>
                    <th onclick="sortTable(2)">Date lancement <i class="fas fa-sort"></i></th>
                    <th onclick="sortTable(3)">Date remise <i class="fas fa-sort"></i></th>
                    <th onclick="sortTable(4)">Prorogation <i class="fas fa-sort"></i></th>
                    <th onclick="sortTable(5)">Nbre offres <i class="fas fa-sort"></i></th>
                    <th onclick="sortTable(6)">Chargé(e) <i class="fas fa-sort"></i></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                ${rows}
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div id="pagination" class="pagination">
        <button onclick="changePage('prev')">Précédent</button>
        <button class="active">1</button>
        <button onclick="changePage('next')">Suivant</button>
    </div>

    <!-- Admin Controls -->
    <div class="admin-controls">
        <button class="btn-admin" onclick="showSecretModal('add')">
            <i class="fas fa-plus"></i> Ajouter
        </button>
        <button class="btn-admin" onclick="exportExcel()">
            <i class="fas fa-file-excel"></i> Exporter Excel
        </button>
        <button class="btn-admin" onclick="exportPDF()">
            <i class="fas fa-file-pdf"></i> Exporter PDF
        </button>
        <button class="btn-admin" onclick="window.print()">
            <i class="fas fa-print"></i> Imprimer
        </button>
    </div>
</div>

<footer>
    <div class="footer-content">
        <div class="copyright">
            © Copyright 2025 | SARPI Spa - Direction Régionale Hassi R'mel
        </div>
        <div class="designer">
            Design by <span class="designer-name">ABDELHAKEM LAMINE</span>
        </div>
        <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        </div>
    </div>
</footer>

<script>
let currentAction = null;
let currentId = null;
let currentPage = 1;
const itemsPerPage = 10;

// Clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('fr-FR');
}
setInterval(updateClock, 1000);
updateClock();

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

// Modal Functions
function showSecretModal(action, id = null) {
    currentAction = action;
    currentId = id;
    
    if (action === 'add') {
        document.getElementById('modalTitle').textContent = 'Ajouter une consultation';
        document.getElementById('consultationForm').reset();
        document.getElementById('consultationId').value = '';
        document.getElementById('consultationModal').classList.add('active');
    } else {
        document.getElementById('secretModal').classList.add('active');
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function closeSecretModal() {
    document.getElementById('secretModal').classList.remove('active');
    currentAction = null;
    currentId = null;
}

function verifySecret() {
    const secretCode = document.getElementById('secretCode').value;
    
    if (secretCode === '2026') {
        if (currentAction === 'add') {
            closeSecretModal();
            document.getElementById('modalTitle').textContent = 'Ajouter une consultation';
            document.getElementById('consultationForm').reset();
            document.getElementById('consultationId').value = '';
            document.getElementById('consultationModal').classList.add('active');
        } else if (currentAction === 'edit') {
            window.location.href = '/edit/' + currentId + '?secretCode=' + secretCode;
        } else if (currentAction === 'delete') {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette consultation?')) {
                window.location.href = '/delete/' + currentId + '?secretCode=' + secretCode;
            }
        } else if (currentAction === 'view') {
            fetch('/view/' + currentId)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('viewDetails').innerHTML = data;
                    document.getElementById('viewModal').classList.add('active');
                });
        }
        closeSecretModal();
    } else {
        showToast('Code secret incorrect!', 'error');
        document.getElementById('secretCode').value = '';
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const secretCode = prompt('Code secret (2026):');
    
    if (secretCode === '2026') {
        document.getElementById('formSecretCode').value = secretCode;
        event.target.submit();
    } else {
        showToast('Code secret incorrect!', 'error');
    }
}

// Toast function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<i class="fas fa-info-circle"></i> ' + message;
    document.getElementById('toastContainer').appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Search and Filter Functions
function searchTable() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    // Implémentez la logique de recherche ici
    showToast('Recherche en cours...', 'info');
}

function toggleFilters() {
    document.getElementById('filtersPanel').classList.toggle('active');
}

function applyFilters() {
    const date = document.getElementById('dateFilter').value;
    const charge = document.getElementById('chargeFilter').value;
    const status = document.getElementById('statusFilter').value;
    showToast('Filtres appliqués', 'success');
    document.getElementById('filtersPanel').classList.remove('active');
}

function resetFilters() {
    document.getElementById('dateFilter').value = '';
    document.getElementById('chargeFilter').value = '';
    document.getElementById('statusFilter').value = '';
    showToast('Filtres réinitialisés', 'info');
    document.getElementById('filtersPanel').classList.remove('active');
}

// Sort Function
let sortDirection = {};
function sortTable(column) {
    sortDirection[column] = !sortDirection[column];
    showToast('Tri en cours...', 'info');
}

// Pagination
function changePage(direction) {
    if (direction === 'next') {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    showToast('Page ' + currentPage, 'info');
}

// Export Functions
function exportExcel() {
    showToast('Export Excel en cours...', 'info');
}

function exportPDF() {
    showToast('Export PDF en cours...', 'info');
}

// Disable right click
document.addEventListener('contextmenu', e => e.preventDefault());

console.log('%cSARPI Spa - System v1.0', 'color: #667eea; font-size: 16px; font-weight: bold;');
</script>

</body>
</html>
`);
});

/* ===== API Endpoints ===== */
app.get("/view/:i", (req, res) => {
    const c = consultations[req.params.i];
    if (!c) return res.send('<p>Consultation non trouvée</p>');
    
    res.send(`
        <div style="padding: 20px;">
            <p><strong>N°:</strong> ${c.numero}</p>
            <p><strong>Désignation:</strong> ${c.designation}</p>
            <p><strong>Date lancement:</strong> ${c.dateLancement}</p>
            <p><strong>Date remise:</strong> ${c.dateRemise}</p>
            <p><strong>Prorogation:</strong> ${c.prorogation || 'NON'}</p>
            <p><strong>Nombre offres:</strong> ${c.nombreOffres || 0}</p>
            <p><strong>Chargé(e):</strong> ${c.charge}</p>
        </div>
    `);
});

app.post("/add", (req, res) => {
    const { numero, designation, dateLancement, dateRemise, prorogation, nombreOffres, charge, secretCode } = req.body;
    
    if (secretCode !== SECRET_CODE) {
        return res.redirect("/consultations?error=invalid_secret");
    }
    
    consultations.push({
        numero,
        designation,
        dateLancement,
        dateRemise,
        prorogation,
        nombreOffres,
        charge
    });
    
    res.redirect("/consultations");
});

app.get("/edit/:i", (req, res) => {
    const secretCode = req.query.secretCode;
    
    if (secretCode !== SECRET_CODE) {
        return res.redirect("/consultations?error=invalid_secret");
    }
    
    const c = consultations[req.params.i];
    
    res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modifier consultation</title>
    ${getStyles()}
</head>
<body>
    <div class="container login-box">
        <h2 style="text-align: center; margin-bottom: 30px;">Modifier la consultation</h2>
        
        <form method="POST" action="/update/${req.params.i}" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="number" name="numero" value="${c.numero}" placeholder="N° consultation" required style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">
            <textarea name="designation" placeholder="Désignation" required style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">${c.designation}</textarea>
            <input type="date" name="dateLancement" value="${c.dateLancement}" required style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">
            <input type="date" name="dateRemise" value="${c.dateRemise}" required style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">
            <select name="prorogation" style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">
                <option value="NON" ${c.prorogation === 'NON' ? 'selected' : ''}>Sans prorogation</option>
                <option value="OUI" ${c.prorogation === 'OUI' ? 'selected' : ''}>Avec prorogation</option>
            </select>
            <input type="number" name="nombreOffres" value="${c.nombreOffres || 0}" placeholder="Nombre d'offres" style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">
            <select name="charge" required style="padding: 15px; border: 2px solid #667eea; border-radius: 10px;">
                <option value="">Sélectionner</option>
                <option value="OULD HAMOUDA DHEHBIYA" ${c.charge === 'OULD HAMOUDA DHEHBIYA' ? 'selected' : ''}>OULD HAMOUDA DHEHBIYA</option>
                <option value="FAID KAMEL" ${c.charge === 'FAID KAMEL' ? 'selected' : ''}>FAID KAMEL</option>
                <option value="MESSAHEL ABDELDJALIL" ${c.charge === 'MESSAHEL ABDELDJALIL' ? 'selected' : ''}>MESSAHEL ABDELDJALIL</option>
                <option value="MEGAMEZ ABDALLAH" ${c.charge === 'MEGAMEZ ABDALLAH' ? 'selected' : ''}>MEGAMEZ ABDALLAH</option>
                <option value="CHELGHOUM HAMZA" ${c.charge === 'CHELGHOUM HAMZA' ? 'selected' : ''}>CHELGHOUM HAMZA</option>
                <option value="DAOUADI BELKACEM" ${c.charge === 'DAOUADI BELKACEM' ? 'selected' : ''}>DAOUADI BELKACEM</option>
                <option value="KEDAID AHMED" ${c.charge === 'KEDAID AHMED' ? 'selected' : ''}>KEDAID AHMED</option>
            </select>
            <input type="hidden" name="secretCode" value="${secretCode}">
            <button type="submit" style="padding: 15px; background: linear-gradient(45deg, #2ed573, #7bed9f); color: white; border: none; border-radius: 10px; cursor: pointer;">Enregistrer</button>
            <a href="/consultations" style="text-align: center; color: #666; text-decoration: none;">Annuler</a>
        </form>
    </div>
</body>
</html>
`);
});

app.post("/update/:i", (req, res) => {
    const { numero, designation, dateLancement, dateRemise, prorogation, nombreOffres, charge, secretCode } = req.body;
    
    if (secretCode !== SECRET_CODE) {
        return res.redirect("/consultations?error=invalid_secret");
    }
    
    consultations[req.params.i] = {
        numero,
        designation,
        dateLancement,
        dateRemise,
        prorogation,
        nombreOffres,
        charge
    };
    
    res.redirect("/consultations");
});

app.get("/delete/:i", (req, res) => {
    const secretCode = req.query.secretCode;
    
    if (secretCode !== SECRET_CODE) {
        return res.redirect("/consultations?error=invalid_secret");
    }
    
    consultations.splice(req.params.i, 1);
    res.redirect("/consultations");
});

/* ===== PORT ===== */
app.listen(process.env.PORT || 3000, () => {
    console.log("%c🚀 Serveur démarré sur le port 3000", "color: #2ed573; font-size: 16px; font-weight: bold;");
    console.log("%c🌐 http://localhost:3000", "color: #3498db;");
    console.log("%c🔐 Code secret: 2026", "color: #ffd700;");
});