const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let consultations = [];
let tentativesConnexion = 0;
let estGele = false;
let geleJusqua = null;
const CODE_SECRET = "********"; 

function getDateHeureActuelle() {
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

function getTempsRestantGele() {
    if (!estGele || !geleJusqua) return 0;
    return Math.max(0, Math.ceil((geleJusqua - Date.now()) / 1000 / 60));
}

// Styles CSS Modernes & Professionnels
const getStyles = () => `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    --secondary: #64748b;
    --bg: #f1f5f9;
    --surface: #ffffff;
    --text-main: #1e293b;
    --text-light: #64748b;
    --border: #e2e8f0;
    --success: #10b981;
    --danger: #ef4444;
    --warning: #f59e0b;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --radius: 12px;
    --radius-lg: 16px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg);
    color: var(--text-main);
    min-height: 100vh;
    line-height: 1.6;
}

/* Layout */
.container {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 0 1.5rem;
}

/* Cards */
.card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
    box-shadow: var(--shadow-lg);
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: var(--surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo-icon {
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.titre h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
}

.titre p {
    color: var(--text-light);
    font-size: 0.9rem;
}

.clock {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: var(--bg);
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    color: var(--text-main);
    font-size: 0.95rem;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: var(--surface);
    padding: 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background: #eff6ff;
    color: var(--primary);
}

.stat-info h3 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-main);
}

.stat-info p {
    color: var(--text-light);
    font-size: 0.9rem;
    font-weight: 500;
}

/* Search & Actions */
.actions-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.input-group {
    flex: 1;
    min-width: 300px;
    position: relative;
}

.input-group i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
}

.input-field {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 3rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
    font-size: 0.95rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.btn-secondary {
    background: white;
    border: 1px solid var(--border);
    color: var(--text-main);
}

.btn-secondary:hover {
    background: var(--bg);
}

.btn-danger {
    background: var(--danger);
    color: white;
}

/* Filters */
.filters-panel {
    background: var(--surface);
    padding: 1.5rem;
    border-radius: var(--radius);
    margin-bottom: 1.5rem;
    display: none;
    border: 1px solid var(--border);
    animation: slideDown 0.3s ease;
}

.filters-panel.active {
    display: block;
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-main);
}

/* Table */
.table-container {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow-x: auto;
    border: 1px solid var(--border);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-light);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border);
}

td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    color: var(--text-main);
    font-size: 0.95rem;
}

tr:last-child td {
    border-bottom: none;
}

tr:hover td {
    background: #f8fafc;
}

.badge {
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
}

.badge-yes {
    background: #dcfce7;
    color: #166534;
}

.badge-no {
    background: #f1f5f9;
    color: #64748b;
}

.action-btns {
    display: flex;
    gap: 0.5rem;
}

.icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: white;
    color: var(--text-light);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.icon-btn:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: #eff6ff;
}

.icon-btn.delete:hover {
    color: var(--danger);
    border-color: var(--danger);
    background: #fef2f2;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.modal.active {
    display: flex;
    opacity: 1;
}

.modal-content {
    background: var(--surface);
    padding: 2.5rem;
    border-radius: var(--radius-lg);
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    transform: scale(0.95);
    transition: transform 0.3s;
}

.modal.active .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.modal-header h2 {
    font-size: 1.5rem;
    color: var(--text-main);
}

.close-modal {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-light);
    cursor: pointer;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-control {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
}

.form-control:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Login Page */
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
}

.login-card {
    background: var(--surface);
    padding: 3rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 450px;
    text-align: center;
}

.login-logo {
    width: 80px;
    height: 80px;
    background: var(--primary);
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto 1.5rem;
}

.attempts-indicator {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 1.5rem 0;
}

.attempt-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border);
}

.attempt-dot.active {
    background: var(--primary);
}

.attempt-dot.used {
    background: var(--danger);
}

/* Footer */
.footer {
    margin-top: 3rem;
    padding: 2rem;
    text-align: center;
    color: var(--text-light);
    font-size: 0.9rem;
    border-top: 1px solid var(--border);
}

/* Toast */
.toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--surface);
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    border-left: 4px solid var(--primary);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 2000;
    animation: slideIn 0.3s ease;
}

.toast.success { border-left-color: var(--success); }
.toast.error { border-left-color: var(--danger); }

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
    .header { flex-direction: column; text-align: center; }
    .logo-section { flex-direction: column; }
    .actions-bar { flex-direction: column; }
    .input-group { width: 100%; }
    .btn { width: 100%; justify-content: center; }
    .stat-card { flex-direction: column; text-align: center; }
}
</style>
`;

// Middleware
app.use((req, res, next) => {
    if (estGele && geleJusqua && Date.now() >= geleJusqua) {
        estGele = false;
        geleJusqua = null;
        tentativesConnexion = 0;
    }
    if (estGele && req.path !== '/') {
        return res.redirect('/');
    }
    next();
});

// Page de connexion
app.get("/", (req, res) => {
    const minutesRestants = getTempsRestantGele();
    if (estGele && minutesRestants > 0) {
        return res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SARPI - Accès Temporairement Limité</title>
            ${getStyles()}
        </head>
        <body>
            <div class="login-container">
                <div class="login-card">
                    <div class="login-logo" style="background: var(--danger);">
                        <i class="fas fa-lock"></i>
                    </div>
                    <h1 style="margin-bottom: 1rem; color: var(--text-main);">Accès Limité</h1>
                    <p style="color: var(--text-light); margin-bottom: 2rem;">
                        Trop de tentatives de connexion échouées. Veuillez réessayer plus tard.
                    </p>
                    <div style="font-size: 3rem; font-weight: 700; color: var(--primary); margin: 1.5rem 0;">
                        ${minutesRestants}<span style="font-size: 1.5rem; color: var(--text-light);">min</span>
                    </div>
                    <div class="attempts-indicator">
                        <div class="attempt-dot used"></div>
                        <div class="attempt-dot used"></div>
                        <div class="attempt-dot used"></div>
                    </div>
                </div>
            </div>
            <script>
                let minutes = ${minutesRestants};
                let secondes = 0;
                setInterval(() => {
                    if (secondes === 0) {
                        if (minutes === 0) { location.reload(); } 
                        else { minutes--; secondes = 59; }
                    } else { secondes--; }
                    // Update UI logic simplified for brevity
                }, 1000);
            </script>
        </body>
        </html>
        `);
    }

    const tentativesRestantes = 3 - tentativesConnexion;
    res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SARPI - Connexion</title>
        ${getStyles()}
    </head>
    <body>
        <div class="login-container">
            <div class="login-card">
                <div class="login-logo">
                    <i class="fas fa-building"></i>
                </div>
                <h1 style="margin-bottom: 0.5rem; color: var(--text-main);">SARPI Spa</h1>
                <p style="color: var(--text-light); margin-bottom: 2rem;">Direction Régionale Hassi R'mel</p>
                
                <div class="attempts-indicator">
                    ${[1,2,3].map(i => `
                        <div class="attempt-dot ${i <= tentativesRestantes ? 'active' : 'used'}"></div>
                    `).join('')}
                </div>
                <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1.5rem;">
                    Tentatives restantes: <strong style="color: ${tentativesRestantes > 1 ? 'var(--primary)' : 'var(--danger)'};">${tentativesRestantes}</strong>
                </p>

                <form method="POST" action="/login">
                    <div class="form-group" style="text-align: left;">
                        <label class="form-label">Nom d'utilisateur</label>
                        <input type="text" name="username" class="form-control" placeholder="admin" required>
                    </div>
                    <div class="form-group" style="text-align: left;">
                        <label class="form-label">Mot de passe</label>
                        <input type="password" name="password" class="form-control" placeholder="••••" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
                        Se connecter
                    </button>
                </form>
                <p style="margin-top: 2rem; color: var(--text-light); font-size: 0.85rem;">
                    <i class="fas fa-info-circle"></i> Accès réservé au personnel autorisé
                </p>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Traitement de la connexion
app.post("/login", (req, res) => {
    if (estGele) return res.redirect("/");
    const { username, password } = req.body;
    if (username === "admin" && password === "0000") {
        tentativesConnexion = 0;
        return res.redirect("/consultations");
    }
    tentativesConnexion++;
    if (tentativesConnexion >= 3) {
        estGele = true;
        geleJusqua = Date.now() + (60 * 60 * 1000);
        return res.redirect("/");
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
        <div class="login-container">
            <div class="login-card">
                <div class="login-logo" style="background: var(--danger);">
                    <i class="fas fa-exclamation"></i>
                </div>
                <h2 style="color: var(--danger); margin: 1.5rem 0;">Identifiants incorrects</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">
                    Tentatives restantes: <strong style="color: var(--danger);">${3 - tentativesConnexion}</strong>
                </p>
                <a href="/" class="btn btn-primary" style="width: 100%; justify-content: center; text-decoration: none;">
                    Réessayer
                </a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Page principale
app.get("/consultations", (req, res) => {
    const totalConsultations = consultations.length;
    const consultationsAvecOffres = consultations.filter(c => c.nombreOffres > 0).length;
    const consultationsSansOffres = totalConsultations - consultationsAvecOffres;
    const chargesUniques = new Set(consultations.map(c => c.charge)).size;

    let lignes = consultations.map((c, i) => `
    <tr>
        <td><strong>#${c.numero}</strong></td>
        <td>${c.designation.length > 50 ? c.designation.substring(0,50) + '...' : c.designation}</td>
        <td>${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</td>
        <td>${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</td>
        <td>
            <span class="badge ${c.prorogation === 'OUI' ? 'badge-yes' : 'badge-no'}">
                ${c.prorogation || 'NON'}
            </span>
        </td>
        <td style="font-weight: 600; color: ${c.nombreOffres > 0 ? 'var(--success)' : 'var(--text-light)'}">
            ${c.nombreOffres || 0}
        </td>
        <td>
            <div style="display:flex; align-items:center; gap:0.5rem;">
                <div style="width:30px; height:30px; background:#eff6ff; color:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:700;">
                    ${c.charge.split(' ').map(m => m[0]).join('').substring(0,2)}
                </div>
                ${c.charge.split(' ').map(m => m[0]).join('')}
            </div>
        </td>
        <td>
            <div class="action-btns">
                <button class="icon-btn" onclick="voirConsultation(${i})" title="Voir"><i class="fas fa-eye"></i></button>
                <button class="icon-btn" onclick="modifierConsultation(${i})" title="Modifier"><i class="fas fa-edit"></i></button>
                <button class="icon-btn delete" onclick="supprimerConsultation(${i})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </td>
    </tr>
    `).join("");

    if (!consultations.length) {
        lignes = `<tr><td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-light);">
            <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
            Aucune consultation enregistrée
        </td></tr>`;
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SARPI - Tableau de Bord</title>
        ${getStyles()}
    </head>
    <body>
        <div class="container">
            <!-- Modal -->
            <div class="modal" id="consultationModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modalTitre">Nouvelle consultation</h2>
                        <button class="close-modal" onclick="fermerModal()">&times;</button>
                    </div>
                    <form id="consultationForm" method="POST" action="/add" onsubmit="return handleSubmit(event)">
                        <input type="hidden" name="id" id="consultationId">
                        <input type="hidden" name="secretCode" id="secretCode">
                        
                        <div class="form-group">
                            <label class="form-label">Numéro de consultation</label>
                            <input type="number" name="numero" id="numero" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Désignation de la prestation</label>
                            <textarea name="designation" id="designation" class="form-control" rows="3" required></textarea>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label class="form-label">Date de lancement</label>
                                <input type="date" name="dateLancement" id="dateLancement" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Date limite de remise</label>
                                <input type="date" name="dateRemise" id="dateRemise" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Prorogation</label>
                            <select name="prorogation" class="form-control">
                                <option value="NON">Sans prorogation</option>
                                <option value="OUI">Avec prorogation</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nombre d'offres</label>
                            <input type="number" name="nombreOffres" id="nombreOffres" class="form-control" min="0" value="0">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Chargé(e) du dossier</label>
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
                            <button type="submit" class="btn btn-primary" style="flex: 1; justify-content: center;">
                                Enregistrer
                            </button>
                            <button type="button" class="btn btn-secondary" style="flex: 1; justify-content: center;" onclick="fermerModal()">
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- View Modal -->
            <div class="modal" id="viewModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Détails de la consultation</h2>
                        <button class="close-modal" onclick="fermerViewModal()">&times;</button>
                    </div>
                    <div id="viewContenu" style="line-height: 2; color: var(--text-main);"></div>
                    <button class="btn btn-secondary" style="width: 100%; margin-top: 2rem; justify-content: center;" onclick="fermerViewModal()">
                        Fermer
                    </button>
                </div>
            </div>

            <!-- Header -->
            <div class="header">
                <div class="logo-section">
                    <div class="logo-icon">
                        <i class="fas fa-layer-group"></i>
                    </div>
                    <div class="titre">
                        <h1>SARPI Spa</h1>
                        <p><i class="fas fa-map-marker-alt"></i> Direction Régionale Hassi R'mel</p>
                    </div>
                </div>
                <div class="clock">
                    <i class="far fa-clock"></i>
                    <span id="horloge">${getDateHeureActuelle()}</span>
                </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-folder"></i></div>
                    <div class="stat-info">
                        <h3>${totalConsultations}</h3>
                        <p>Total consultations</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--success); background: #dcfce7;"><i class="fas fa-check"></i></div>
                    <div class="stat-info">
                        <h3>${consultationsAvecOffres}</h3>
                        <p>Avec offres</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--secondary); background: #f1f5f9;"><i class="fas fa-times"></i></div>
                    <div class="stat-info">
                        <h3>${consultationsSansOffres}</h3>
                        <p>Sans offres</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--warning); background: #fef3c7;"><i class="fas fa-users"></i></div>
                    <div class="stat-info">
                        <h3>${chargesUniques}</h3>
                        <p>Chargés actifs</p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="actions-bar">
                <div class="input-group">
                    <i class="fas fa-search"></i>
                    <input type="text" class="input-field" id="rechercheInput" placeholder="Rechercher par numéro, désignation ou chargé...">
                </div>
                <button class="btn btn-primary" onclick="afficherAjoutModal()">
                    <i class="fas fa-plus"></i> Ajouter
                </button>
                <button class="btn btn-secondary" onclick="toggleFiltres()">
                    <i class="fas fa-filter"></i> Filtres
                </button>
                <button class="btn btn-secondary" onclick="exporterTableau()">
                    <i class="fas fa-download"></i> Exporter
                </button>
            </div>

            <!-- Filters -->
            <div class="filters-panel" id="filtresPanel">
                <div class="filters-grid">
                    <div>
                        <label class="form-label">Date lancement</label>
                        <input type="date" id="filtreDateLancement" class="form-control">
                    </div>
                    <div>
                        <label class="form-label">Date remise</label>
                        <input type="date" id="filtreDateRemise" class="form-control">
                    </div>
                    <div>
                        <label class="form-label">Chargé</label>
                        <select id="filtreCharge" class="form-control">
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
                    <div>
                        <label class="form-label">Prorogation</label>
                        <select id="filtreProrogation" class="form-control">
                            <option value="">Tous</option>
                            <option value="OUI">Avec prorogation</option>
                            <option value="NON">Sans prorogation</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" onclick="appliquerFiltres()">Appliquer</button>
                    <button class="btn btn-secondary" onclick="reinitialiserFiltres()">Réinitialiser</button>
                </div>
            </div>

            <!-- Table -->
            <div class="table-container">
                <table class="tableau-royal" id="consultationsTable">
                    <thead>
                        <tr>
                            <th onclick="trierTableau(0)">N° <i class="fas fa-sort"></i></th>
                            <th onclick="trierTableau(1)">Désignation <i class="fas fa-sort"></i></th>
                            <th onclick="trierTableau(2)">Lancement <i class="fas fa-sort"></i></th>
                            <th onclick="trierTableau(3)">Remise <i class="fas fa-sort"></i></th>
                            <th onclick="trierTableau(4)">Prorogation <i class="fas fa-sort"></i></th>
                            <th onclick="trierTableau(5)">Offres <i class="fas fa-sort"></i></th>
                            <th onclick="trierTableau(6)">Chargé <i class="fas fa-sort"></i></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        ${lignes}
                    </tbody>
                </table>
            </div>

            <!-- Footer -->
            <footer class="footer">
                <div>© 2025 SARPI Spa - Tous droits réservés</div>
                <div style="margin-top: 0.5rem;">Design Modernisé</div>
            </footer>
        </div>

        <script>
            let editId = null;
            const consultations = ${JSON.stringify(consultations)};

            function genererParticules() {} // Removed heavy particles for performance/cleanliness

            function mettreJourHorloge() {
                const now = new Date();
                document.getElementById('horloge').textContent = now.toLocaleDateString('fr-FR', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                });
            }
            setInterval(mettreJourHorloge, 1000);

            function afficherAjoutModal() {
                document.getElementById('modalTitre').textContent = 'Nouvelle consultation';
                document.getElementById('consultationForm').reset();
                document.getElementById('consultationId').value = '';
                editId = null;
                document.getElementById('consultationModal').classList.add('active');
            }

            function fermerModal() {
                document.getElementById('consultationModal').classList.remove('active');
            }

            function fermerViewModal() {
                document.getElementById('viewModal').classList.remove('active');
            }

            function voirConsultation(index) {
                const c = consultations[index];
                const contenu = document.getElementById('viewContenu');
                contenu.innerHTML = \`
                    <div class="form-group"><label class="form-label">Numéro</label><p>\${c.numero}</p></div>
                    <div class="form-group"><label class="form-label">Désignation</label><p>\${c.designation}</p></div>
                    <div class="form-group"><label class="form-label">Date lancement</label><p>\${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</p></div>
                    <div class="form-group"><label class="form-label">Date remise</label><p>\${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</p></div>
                    <div class="form-group"><label class="form-label">Prorogation</label><p>\${c.prorogation || 'NON'}</p></div>
                    <div class="form-group"><label class="form-label">Nombre d'offres</label><p>\${c.nombreOffres || 0}</p></div>
                    <div class="form-group"><label class="form-label">Chargé(e)</label><p>\${c.charge}</p></div>
                \`;
                document.getElementById('viewModal').classList.add('active');
            }

            function modifierConsultation(index) {
                const secret = prompt('Code secret (8 chiffres):');
                if (secret !== '2026') {
                    afficherToast('Code secret incorrect!', 'error');
                    return;
                }
                const c = consultations[index];
                document.getElementById('modalTitre').textContent = 'Modifier la consultation';
                document.getElementById('consultationId').value = index;
                document.getElementById('numero').value = c.numero;
                document.getElementById('designation').value = c.designation;
                document.getElementById('dateLancement').value = c.dateLancement;
                document.getElementById('dateRemise').value = c.dateRemise;
                document.querySelector(\`select[name="prorogation"]\`).value = c.prorogation || 'NON';
                document.getElementById('nombreOffres').value = c.nombreOffres || 0;
                document.getElementById('charge').value = c.charge;
                document.getElementById('consultationModal').classList.add('active');
            }

            function supprimerConsultation(index) {
                const secret = prompt('Code secret (8 chiffres):');
                if (secret !== '2026') {
                    afficherToast('Code secret incorrect!', 'error');
                    return;
                }
                if (confirm('Êtes-vous sûr de vouloir supprimer cette consultation ?')) {
                    window.location.href = '/delete/' + index + '?secretCode=' + secret;
                }
            }

            function handleSubmit(event) {
                event.preventDefault();
                const secret = prompt('Code secret (8 chiffres):');
                if (secret !== '2026') {
                    afficherToast('Code secret incorrect!', 'error');
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

            function toggleFiltres() {
                document.getElementById('filtresPanel').classList.toggle('active');
            }

            function appliquerFiltres() {
                afficherToast('Filtres appliqués avec succès', 'success');
                document.getElementById('filtresPanel').classList.remove('active');
            }

            function reinitialiserFiltres() {
                document.getElementById('filtreDateLancement').value = '';
                document.getElementById('filtreDateRemise').value = '';
                document.getElementById('filtreCharge').value = '';
                document.getElementById('filtreProrogation').value = '';
                afficherToast('Filtres réinitialisés', 'success');
                document.getElementById('filtresPanel').classList.remove('active');
            }

            document.getElementById('rechercheInput').addEventListener('keyup', function() {
                const recherche = this.value.toLowerCase();
                const lignes = document.querySelectorAll('#tableBody tr');
                lignes.forEach(ligne => {
                    const texte = ligne.textContent.toLowerCase();
                    ligne.style.display = texte.includes(recherche) ? '' : 'none';
                });
            });

            function trierTableau(colonne) {
                const table = document.getElementById('consultationsTable');
                const tbody = table.tBodies[0];
                const lignes = Array.from(tbody.rows);
                const triees = lignes.sort((a, b) => {
                    let aVal = a.cells[colonne].textContent;
                    let bVal = b.cells[colonne].textContent;
                    if (colonne === 2 || colonne === 3) {
                        aVal = new Date(aVal.split('/').reverse().join('-'));
                        bVal = new Date(bVal.split('/').reverse().join('-'));
                    } else if (colonne === 0 || colonne === 5) {
                        aVal = parseInt(aVal.replace(/[^0-9]/g, '')) || 0;
                        bVal = parseInt(bVal.replace(/[^0-9]/g, '')) || 0;
                    }
                    if (aVal < bVal) return -1;
                    if (aVal > bVal) return 1;
                    return 0;
                });
                tbody.append(...triees);
                afficherToast('Tableau trié', 'success');
            }

            function exporterTableau() {
                let csv = "Numéro,Désignation,Date lancement,Date remise,Prorogation,Offres,Chargé(e)\\n";
                consultations.forEach(c => {
                    csv += \`\${c.numero},"\${c.designation.replace(/"/g, '""')}",\${c.dateLancement},\${c.dateRemise},\${c.prorogation || 'NON'},\${c.nombreOffres || 0},\${c.charge}\\n\`;
                });
                const blob = new Blob(["\\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'consultations.csv';
                a.click();
                window.URL.revokeObjectURL(url);
                afficherToast('Export réussi!', 'success');
            }

            function afficherToast(message, type = 'success') {
                const toast = document.createElement('div');
                toast.className = 'toast ' + type;
                let icone = 'info-circle';
                if (type === 'success') icone = 'check-circle';
                if (type === 'error') icone = 'exclamation-circle';
                toast.innerHTML = \`<i class="fas fa-\${icone}"></i> \${message}\`;
                document.body.appendChild(toast);
                setTimeout(() => { toast.remove(); }, 3000);
            }

            document.addEventListener('contextmenu', e => e.preventDefault());
        </script>
    </body>
    </html>
    `);
});

// Routes API
app.post("/add", (req, res) => {
    const { numero, designation, dateLancement, dateRemise, prorogation, nombreOffres, charge, secretCode } = req.body;
    if (secretCode !== "2026") {
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
    if (secretCode !== "2026") {
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
    if (secretCode !== "2026") {
        return res.redirect("/consultations?error=code_invalide");
    }
    consultations.splice(req.params.i, 1);
    res.redirect("/consultations");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Design Modernisé & Professionnel`);
});
