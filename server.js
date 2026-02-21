const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let consultations = [];
let loginAttempts = 0;
let isFrozen = false;
let freezeUntil = null;
const SECRET_CODE = "2026";

function getCurrentDateTime() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRemainingFreezeTime() {
  if (!isFrozen || !freezeUntil) return 0;
  return Math.max(0, Math.ceil((freezeUntil - Date.now()) / 1000 / 60));
}

const getStyles = () => `
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  body {
    min-height: 100vh;
    background: linear-gradient(145deg, #f6f9fc 0%, #e9f1f8 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 32px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 20, 30, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  /* Header moderne */
  .header {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid rgba(0, 119, 182, 0.1);
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-icon {
    width: 50px;
    height: 50px;
    background: #0077b6;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: 0 10px 20px rgba(0, 119, 182, 0.2);
  }

  .company-details h1 {
    font-size: 1.4rem;
    color: #1e2b3c;
    font-weight: 600;
  }

  .company-details p {
    color: #5e6f8d;
    font-size: 0.9rem;
  }

  .date-display {
    background: white;
    padding: 0.8rem 1.5rem;
    border-radius: 100px;
    color: #0077b6;
    font-weight: 500;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Cartes statistiques */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 24px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 119, 182, 0.1);
    transition: transform 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-3px);
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #0077b6;
    margin-bottom: 0.3rem;
  }

  .stat-label {
    color: #5e6f8d;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Barre de recherche */
  .search-section {
    margin-bottom: 2rem;
  }

  .search-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 250px;
    padding: 1rem 1.5rem;
    border: 2px solid #e1e8f0;
    border-radius: 16px;
    font-size: 1rem;
    transition: all 0.2s;
    background: white;
  }

  .search-input:focus {
    outline: none;
    border-color: #0077b6;
    box-shadow: 0 0 0 4px rgba(0, 119, 182, 0.1);
  }

  .btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 16px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background: #0077b6;
    color: white;
    box-shadow: 0 8px 16px rgba(0, 119, 182, 0.2);
  }

  .btn-primary:hover {
    background: #005f94;
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: white;
    color: #1e2b3c;
    border: 2px solid #e1e8f0;
  }

  .btn-secondary:hover {
    background: #f8fafd;
    border-color: #0077b6;
  }

  /* Tableau */
  .table-container {
    overflow-x: auto;
    border-radius: 20px;
    background: white;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
  }

  th {
    text-align: left;
    padding: 1.2rem 1rem;
    background: #f8fafd;
    color: #1e2b3c;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #e1e8f0;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #eef2f6;
    color: #2c3e50;
  }

  tr:hover td {
    background: #f8fafd;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
  }

  .action-btn:hover {
    transform: scale(1.1);
  }

  .btn-view { background: #3498db; }
  .btn-edit { background: #2ecc71; }
  .btn-delete { background: #e74c3c; }

  /* Modal */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal.active {
    display: flex;
  }

  .modal-content {
    background: white;
    border-radius: 32px;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .modal-header h2 {
    color: #1e2b3c;
    font-size: 1.5rem;
  }

  .close-modal {
    font-size: 2rem;
    cursor: pointer;
    color: #5e6f8d;
    transition: color 0.2s;
  }

  .close-modal:hover {
    color: #e74c3c;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #1e2b3c;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .form-control {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid #e1e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .form-control:focus {
    outline: none;
    border-color: #0077b6;
    box-shadow: 0 0 0 4px rgba(0, 119, 182, 0.1);
  }

  .radio-group {
    display: flex;
    gap: 2rem;
  }

  .radio-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: normal;
    cursor: pointer;
  }

  /* Login page */
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-logo {
    width: 80px;
    height: 80px;
    background: #0077b6;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 auto 1rem;
  }

  .attempts {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin: 1.5rem 0;
  }

  .attempt-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #e1e8f0;
    transition: all 0.3s;
  }

  .attempt-dot.active {
    background: #0077b6;
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.2);
  }

  .attempt-dot.used {
    background: #e74c3c;
  }

  /* Pagination */
  .pagination {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .page-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 2px solid #e1e8f0;
    background: white;
    color: #1e2b3c;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .page-btn.active {
    background: #0077b6;
    color: white;
    border-color: #0077b6;
  }

  .page-btn:hover:not(.active) {
    background: #f8fafd;
    border-color: #0077b6;
  }

  /* Footer */
  .footer {
    margin-top: 2rem;
    padding: 1.5rem;
    text-align: center;
    color: #5e6f8d;
    font-size: 0.9rem;
    border-top: 2px solid rgba(0, 119, 182, 0.1);
    width: 100%;
    max-width: 1400px;
  }

  /* Toast */
  .toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: white;
    padding: 1rem 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #0077b6;
    animation: slideIn 0.3s ease;
    z-index: 2000;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
    
    .search-wrapper {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
    
    .modal-content {
      padding: 1.5rem;
      width: 95%;
    }
  }

  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .company-details h1 {
      font-size: 1.1rem;
    }
  }
</style>
`;

// Middleware de vérification
app.use((req, res, next) => {
  if (isFrozen && freezeUntil && Date.now() >= freezeUntil) {
    isFrozen = false;
    freezeUntil = null;
    loginAttempts = 0;
  }

  if (isFrozen && req.path !== "/") {
    return res.redirect("/");
  }
  
  next();
});

// Page de connexion
app.get("/", (req, res) => {
  const remainingMinutes = getRemainingFreezeTime();
  
  if (isFrozen && remainingMinutes > 0) {
    return res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SARPI - Accès temporairement bloqué</title>
      ${getStyles()}
    </head>
    <body>
      <div class="login-container container">
        <div style="text-align: center; padding: 2rem;">
          <div class="login-logo" style="background: #e74c3c;">⏰</div>
          <h2 style="color: #e74c3c; margin: 1rem 0;">Accès temporairement bloqué</h2>
          <p style="color: #5e6f8d; margin-bottom: 2rem;">Trop de tentatives échouées</p>
          <div style="font-size: 3rem; font-weight: 700; color: #0077b6; margin: 2rem 0;">
            ${remainingMinutes}:00
          </div>
          <p style="color: #5e6f8d;">minutes restantes avant déblocage</p>
        </div>
      </div>
      
      <script>
        let minutes = ${remainingMinutes};
        let seconds = 0;
        
        setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) location.reload();
            else { minutes--; seconds = 59; }
          } else seconds--;
          
          document.querySelector('div[style*="font-size: 3rem"]').textContent = 
            \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
        }, 1000);
      </script>
    </body>
    </html>
    `);
  }

  const attemptsLeft = 3 - loginAttempts;
  
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SARPI - Connexion</title>
  ${getStyles()}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <div class="login-container container">
    <div class="login-header">
      <div class="login-logo">SARPI</div>
      <h2>Bienvenue</h2>
      <p style="color: #5e6f8d;">Direction Régionale Hassi R'mel</p>
    </div>

    <div class="attempts">
      ${[1,2,3].map(i => `
        <div class="attempt-dot ${i <= attemptsLeft ? 'active' : i > attemptsLeft ? 'used' : ''}"></div>
      `).join('')}
    </div>

    <p style="text-align: center; color: #5e6f8d; margin-bottom: 1.5rem;">
      Tentatives restantes: <strong style="color: ${attemptsLeft > 1 ? '#2ecc71' : '#e74c3c'}">${attemptsLeft}</strong>
    </p>

    <form method="POST" action="/login">
      <div class="form-group">
        <label>Nom d'utilisateur</label>
        <input type="text" name="username" class="form-control" placeholder="admin" required>
      </div>
      
      <div class="form-group">
        <label>Mot de passe</label>
        <input type="password" name="password" class="form-control" placeholder="0000" required>
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%;">
        <i class="fas fa-sign-in-alt"></i>
        Se connecter
      </button>
    </form>

    <p style="text-align: center; margin-top: 1.5rem; color: #5e6f8d; font-size: 0.9rem;">
      <i class="fas fa-info-circle"></i> admin / 0000
    </p>
  </div>
</body>
</html>
  `);
});

// Traitement du login
app.post("/login", (req, res) => {
  if (isFrozen) return res.redirect("/");

  const { username, password } = req.body;
  
  if (username === "admin" && password === "0000") {
    loginAttempts = 0;
    return res.redirect("/consultations");
  }
  
  loginAttempts++;
  
  if (loginAttempts >= 3) {
    isFrozen = true;
    freezeUntil = Date.now() + (60 * 60 * 1000);
    return res.redirect("/");
  }
  
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erreur de connexion</title>
    ${getStyles()}
  </head>
  <body>
    <div class="login-container container">
      <div style="text-align: center;">
        <div class="login-logo" style="background: #e74c3c;">!</div>
        <h2 style="color: #e74c3c; margin: 1rem 0;">Identifiants incorrects</h2>
        <p style="color: #5e6f8d; margin-bottom: 2rem;">Tentatives restantes: ${3 - loginAttempts}</p>
        <a href="/" class="btn btn-primary">Réessayer</a>
      </div>
    </div>
  </body>
  </html>
  `);
});

// Page principale des consultations
app.get("/consultations", (req, res) => {
  const totalConsultations = consultations.length;
  const consultationsAvecOffres = consultations.filter(c => c.nombreOffres > 0).length;
  const consultationsSansOffres = totalConsultations - consultationsAvecOffres;
  
  let rows = consultations.map((c, i) => `
<tr>
  <td>${c.numero}</td>
  <td>${c.designation.substring(0, 50)}${c.designation.length > 50 ? '...' : ''}</td>
  <td>${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</td>
  <td>${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</td>
  <td><span style="padding: 0.3rem 0.8rem; background: ${c.prorogation === 'OUI' ? '#fff3cd' : '#e8f5e9'}; color: ${c.prorogation === 'OUI' ? '#856404' : '#2e7d32'}; border-radius: 20px; font-size: 0.85rem;">${c.prorogation || 'NON'}</span></td>
  <td style="font-weight: 600; color: ${c.nombreOffres > 0 ? '#2ecc71' : '#e74c3c'};">${c.nombreOffres || 0}</td>
  <td>${c.charge.split(' ').map(m => m[0]).join('')}</td>
  <td>
    <div class="action-buttons">
      <button class="action-btn btn-view" onclick="showConsultation(${i})"><i class="fas fa-eye"></i></button>
      <button class="action-btn btn-edit" onclick="editConsultation(${i})"><i class="fas fa-edit"></i></button>
      <button class="action-btn btn-delete" onclick="deleteConsultation(${i})"><i class="fas fa-trash"></i></button>
    </div>
  </td>
</tr>
`).join("");

  if (!consultations.length) {
    rows = `<tr><td colspan="8" style="text-align: center; padding: 3rem;">Aucune consultation enregistrée</td></tr>`;
  }

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SARPI - Suivi des consultations</title>
  ${getStyles()}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <!-- Modal consultation -->
  <div class="modal" id="consultationModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modalTitle">Nouvelle consultation</h2>
        <span class="close-modal" onclick="closeModal()">&times;</span>
      </div>
      
      <form id="consultationForm" method="POST" action="/add" onsubmit="return handleSubmit(event)">
        <input type="hidden" name="id" id="consultationId">
        <input type="hidden" name="secretCode" id="secretCode">
        
        <div class="form-group">
          <label>N° de consultation</label>
          <input type="number" name="numero" id="numero" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label>Désignation</label>
          <textarea name="designation" id="designation" class="form-control" rows="3" required></textarea>
        </div>
        
        <div class="form-group">
          <label>Date de lancement</label>
          <input type="date" name="dateLancement" id="dateLancement" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label>Date limite de remise</label>
          <input type="date" name="dateRemise" id="dateRemise" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label>Prorogation</label>
          <div class="radio-group">
            <label>
              <input type="radio" name="prorogation" value="NON" checked> Sans prorogation
            </label>
            <label>
              <input type="radio" name="prorogation" value="OUI"> Avec prorogation
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Nombre d'offres</label>
          <input type="number" name="nombreOffres" id="nombreOffres" class="form-control" min="0" value="0">
        </div>
        
        <div class="form-group">
          <label>Chargé(e) du dossier</label>
          <select name="charge" id="charge" class="form-control" required>
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
        
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button type="submit" class="btn btn-primary" style="flex: 1;">Enregistrer</button>
          <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeModal()">Annuler</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal visualisation -->
  <div class="modal" id="viewModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Détails de la consultation</h2>
        <span class="close-modal" onclick="closeViewModal()">&times;</span>
      </div>
      <div id="viewContent" style="line-height: 2;"></div>
      <button class="btn btn-secondary" style="margin-top: 2rem; width: 100%;" onclick="closeViewModal()">Fermer</button>
    </div>
  </div>

  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo-area">
        <div class="logo-icon">S</div>
        <div class="company-details">
          <h1>SARPI Spa</h1>
          <p><i class="fas fa-map-marker-alt"></i> Direction Régionale Hassi R'mel</p>
        </div>
      </div>
      
      <div class="date-display">
        <i class="far fa-calendar-alt"></i>
        <span id="currentDate">${getCurrentDateTime()}</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${totalConsultations}</div>
        <div class="stat-label">Total consultations</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${consultationsAvecOffres}</div>
        <div class="stat-label">Avec offres</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${consultationsSansOffres}</div>
        <div class="stat-label">Sans offres</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${new Set(consultations.map(c => c.charge)).size}</div>
        <div class="stat-label">Chargés actifs</div>
      </div>
    </div>

    <!-- Recherche et actions -->
    <div class="search-section">
      <div class="search-wrapper">
        <input type="text" class="search-input" id="searchInput" placeholder="Rechercher par n°, désignation ou chargé..." onkeyup="filterTable()">
        <button class="btn btn-primary" onclick="showAddModal()">
          <i class="fas fa-plus"></i> Nouvelle consultation
        </button>
        <button class="btn btn-secondary" onclick="exportTable()">
          <i class="fas fa-download"></i> Exporter
        </button>
      </div>
    </div>

    <!-- Tableau -->
    <div class="table-container">
      <table id="consultationsTable">
        <thead>
          <tr>
            <th onclick="sortTable(0)">N° <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(1)">Désignation <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(2)">Lancement <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(3)">Remise <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(4)">Prorogation <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(5)">Offres <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(6)">Chargé <i class="fas fa-sort"></i></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          ${rows}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" id="pagination"></div>
  </div>

  <footer class="footer">
    <p>© 2025 SARPI Spa - Tous droits réservés | Design by ABDELHAKEM LAMINE</p>
  </footer>

  <script>
    let currentEditId = null;
    const consultations = ${JSON.stringify(consultations)};

    // Mise à jour de la date
    function updateDate() {
      const now = new Date();
      document.getElementById('currentDate').textContent = now.toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }
    setInterval(updateDate, 1000);

    // Gestion des modals
    function showAddModal() {
      document.getElementById('modalTitle').textContent = 'Nouvelle consultation';
      document.getElementById('consultationForm').reset();
      document.getElementById('consultationId').value = '';
      currentEditId = null;
      document.getElementById('consultationModal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('consultationModal').classList.remove('active');
    }

    function closeViewModal() {
      document.getElementById('viewModal').classList.remove('active');
    }

    function showConsultation(index) {
      const c = consultations[index];
      const content = document.getElementById('viewContent');
      content.innerHTML = \`
        <p><strong>N° de consultation:</strong> \${c.numero}</p>
        <p><strong>Désignation:</strong> \${c.designation}</p>
        <p><strong>Date de lancement:</strong> \${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</p>
        <p><strong>Date limite:</strong> \${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</p>
        <p><strong>Prorogation:</strong> \${c.prorogation || 'NON'}</p>
        <p><strong>Nombre d'offres:</strong> \${c.nombreOffres || 0}</p>
        <p><strong>Chargé(e) du dossier:</strong> \${c.charge}</p>
      \`;
      document.getElementById('viewModal').classList.add('active');
    }

    function editConsultation(index) {
      const secret = prompt('Code secret (2026):');
      if (secret !== '2026') {
        alert('Code secret incorrect');
        return;
      }
      
      const c = consultations[index];
      document.getElementById('modalTitle').textContent = 'Modifier la consultation';
      document.getElementById('consultationId').value = index;
      document.getElementById('numero').value = c.numero;
      document.getElementById('designation').value = c.designation;
      document.getElementById('dateLancement').value = c.dateLancement;
      document.getElementById('dateRemise').value = c.dateRemise;
      document.querySelector(\`input[name="prorogation"][value="\${c.prorogation || 'NON'}"]\`).checked = true;
      document.getElementById('nombreOffres').value = c.nombreOffres || 0;
      document.getElementById('charge').value = c.charge;
      document.getElementById('consultationModal').classList.add('active');
    }

    function deleteConsultation(index) {
      const secret = prompt('Code secret (2026):');
      if (secret !== '2026') {
        alert('Code secret incorrect');
        return;
      }
      
      if (confirm('Confirmer la suppression ?')) {
        window.location.href = '/delete/' + index + '?secretCode=' + secret;
      }
    }

    function handleSubmit(event) {
      event.preventDefault();
      const secret = prompt('Code secret (2026):');
      
      if (secret !== '2026') {
        alert('Code secret incorrect');
        return false;
      }
      
      document.getElementById('secretCode').value = secret;
      const id = document.getElementById('consultationId').value;
      
      if (id) {
        document.getElementById('consultationForm').action = '/update/' + id;
      }
      
      document.getElementById('consultationForm').submit();
      return false;
    }

    // Recherche et filtres
    function filterTable() {
      const search = document.getElementById('searchInput').value.toLowerCase();
      const rows = document.querySelectorAll('#tableBody tr');
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
      });
    }

    // Tri du tableau
    function sortTable(column) {
      const table = document.getElementById('consultationsTable');
      const tbody = table.tBodies[0];
      const rows = Array.from(tbody.rows);
      
      const sorted = rows.sort((a, b) => {
        let aVal = a.cells[column].textContent;
        let bVal = b.cells[column].textContent;
        
        if (column === 2 || column === 3) { // Dates
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else if (column === 0 || column === 5) { // Nombres
          aVal = parseInt(aVal) || 0;
          bVal = parseInt(bVal) || 0;
        }
        
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });
      
      tbody.append(...sorted);
    }

    // Export
    function exportTable() {
      let csv = "N°,Désignation,Date lancement,Date remise,Prorogation,Offres,Chargé(e)\\n";
      
      consultations.forEach(c => {
        csv += \`\${c.numero},"\${c.designation.replace(/"/g, '""')}",\${c.dateLancement},\${c.dateRemise},\${c.prorogation || 'NON'},\${c.nombreOffres || 0},\${c.charge}\\n\`;
      });
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'consultations.csv';
      a.click();
    }

    // Désactiver clic droit
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Message console
    console.log('%cSARPI System v2.0', 'color: #0077b6; font-size: 16px; font-weight: bold;');
  </script>
</body>
</html>
  `);
});

// Routes API
app.post("/add", (req, res) => {
  const { numero, designation, dateLancement, dateRemise, prorogation, nombreOffres, charge, secretCode } = req.body;
  
  if (secretCode !== SECRET_CODE) {
    return res.redirect("/consultations?error=code_invalide");
  }
  
  consultations.push({
    numero,
    designation,
    dateLancement,
    dateRemise,
    prorogation,
    nombreOffres: nombreOffres || 0,
    charge
  });
  
  res.redirect("/consultations");
});

app.post("/update/:i", (req, res) => {
  const { numero, designation, dateLancement, dateRemise, prorogation, nombreOffres, charge, secretCode } = req.body;
  
  if (secretCode !== SECRET_CODE) {
    return res.redirect("/consultations?error=code_invalide");
  }
  
  consultations[req.params.i] = {
    numero,
    designation,
    dateLancement,
    dateRemise,
    prorogation,
    nombreOffres: nombreOffres || 0,
    charge
  };
  
  res.redirect("/consultations");
});

app.get("/delete/:i", (req, res) => {
  const secretCode = req.query.secretCode;
  
  if (secretCode !== SECRET_CODE) {
    return res.redirect("/consultations?error=code_invalide");
  }
  
  consultations.splice(req.params.i, 1);
  res.redirect("/consultations");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\x1b[36m🚀 Serveur démarré sur http://localhost:${PORT}\x1b[0m`);
  console.log(`\x1b[33m🔐 Code secret: ${SECRET_CODE}\x1b[0m`);
});
