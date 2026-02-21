const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let consultations = [];
let tentativesConnexion = 0;
let estGele = false;
let geleJusqua = null;
const CODE_SECRET = "2026";

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

// Styles CSS créatifs et élégants
const getStyles = () => `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(145deg, #f8faff 0%, #eef2f9 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* Arrière-plan artistique */
  .art-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .art-circle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    filter: blur(60px);
  }

  .art-circle-1 {
    width: 500px;
    height: 500px;
    top: -200px;
    right: -200px;
    animation: floatCircle 20s infinite alternate;
  }

  .art-circle-2 {
    width: 600px;
    height: 600px;
    bottom: -300px;
    left: -200px;
    background: linear-gradient(145deg, rgba(255, 107, 107, 0.1), rgba(255, 142, 83, 0.1));
    animation: floatCircle 25s infinite alternate-reverse;
  }

  .art-circle-3 {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(145deg, rgba(46, 213, 115, 0.05), rgba(123, 237, 159, 0.05));
    animation: pulseCircle 8s infinite ease-in-out;
  }

  @keyframes floatCircle {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(100px, 100px) rotate(180deg); }
  }

  @keyframes pulseCircle {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.6; }
  }

  /* Conteneur principal */
  .container-elegant {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 2rem;
    position: relative;
    z-index: 10;
    animation: fadeInScale 0.8s ease-out;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Header artistique */
  .header-art {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border-radius: 40px;
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }

  .logo-masterpiece {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .logo-framed {
    width: 90px;
    height: 90px;
    background: linear-gradient(145deg, #667eea, #764ba2);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      10px 10px 20px rgba(102, 126, 234, 0.3),
      -5px -5px 10px rgba(255, 255, 255, 0.5) inset;
    position: relative;
    overflow: hidden;
  }

  .logo-framed::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: rotate(45deg);
    animation: shine 4s infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }

  .logo-framed span {
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    z-index: 2;
  }

  .title-art h1 {
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(145deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.3rem;
  }

  .title-art p {
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .title-art i {
    color: #ff6b6b;
  }

  /* Horloge design */
  .horloge-design {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    border-radius: 60px;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }

  .horloge-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(145deg, #667eea, #764ba2);
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.3rem;
    animation: pulseIcon 2s infinite;
  }

  @keyframes pulseIcon {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .horloge-digital {
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(145deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Cartes statistiques élégantes */
  .stats-elegance {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .carte-stat {
    background: white;
    padding: 2rem;
    border-radius: 30px;
    box-shadow: 
      0 20px 40px -15px rgba(0,0,0,0.1),
      0 0 0 1px rgba(255,255,255,0.8) inset;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
  }

  .carte-stat::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea, #764ba2, #ff6b6b);
  }

  .carte-stat:hover {
    transform: translateY(-15px) rotate(2deg);
    box-shadow: 0 40px 60px -15px rgba(102, 126, 234, 0.3);
  }

  .stat-icon-art {
    width: 70px;
    height: 70px;
    background: linear-gradient(145deg, #667eea10, #764ba210);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    color: #667eea;
    transition: all 0.3s ease;
  }

  .carte-stat:hover .stat-icon-art {
    transform: scale(1.1) rotate(5deg);
    color: #764ba2;
  }

  .stat-chiffre {
    font-size: 2.8rem;
    font-weight: 900;
    background: linear-gradient(145deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label-art {
    color: #666;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.85rem;
  }

  /* Barre de recherche artistique */
  .recherche-art {
    margin-bottom: 2rem;
  }

  .wrapper-recherche {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .input-art {
    flex: 1;
    min-width: 300px;
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 60px;
    background: white;
    box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1);
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .input-art:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 20px 40px -15px rgba(102, 126, 234, 0.3);
    transform: scale(1.02);
  }

  .btn-art {
    padding: 1.5rem 3rem;
    border: none;
    border-radius: 60px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .btn-art::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn-art:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primaire {
    background: linear-gradient(145deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 15px 30px -10px #667eea;
  }

  .btn-primaire:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 40px -10px #667eea;
  }

  .btn-secondaire {
    background: white;
    color: #667eea;
    border: 2px solid #667eea20;
  }

  .btn-secondaire:hover {
    background: #f8faff;
    border-color: #667eea;
    transform: translateY(-5px);
  }

  /* Filtres élégants */
  .filtres-elegants {
    margin-top: 1rem;
    padding: 2rem;
    background: white;
    border-radius: 40px;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
    display: none;
    animation: slideDownFade 0.4s ease;
  }

  .filtres-elegants.active {
    display: block;
  }

  @keyframes slideDownFade {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .grille-filtres {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .item-filtre {
    position: relative;
  }

  .item-filtre label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .item-filtre input,
  .item-filtre select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #eef2f9;
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease;
  }

  .item-filtre input:focus,
  .item-filtre select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 5px #667eea20;
  }

  /* Tableau élégant */
  .tableau-container {
    overflow-x: auto;
    border-radius: 30px;
    background: white;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  .tableau-elegant {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
  }

  .tableau-elegant th {
    padding: 1.5rem 1rem;
    background: linear-gradient(145deg, #667eea, #764ba2);
    color: white;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }

  .tableau-elegant th:first-child {
    border-radius: 20px 0 0 20px;
  }

  .tableau-elegant th:last-child {
    border-radius: 0 20px 20px 0;
  }

  .tableau-elegant th:hover {
    background: linear-gradient(145deg, #764ba2, #667eea);
  }

  .tableau-elegant th i {
    margin-left: 0.5rem;
    opacity: 0.8;
  }

  .tableau-elegant td {
    padding: 1.2rem 1rem;
    background: #f8faff;
    transition: all 0.3s ease;
    position: relative;
  }

  .tableau-elegant tr {
    transition: all 0.3s ease;
  }

  .tableau-elegant tr:hover td {
    background: linear-gradient(145deg, #667eea10, #764ba210);
    transform: scale(1.01);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }

  /* Badges de statut */
  .badge {
    padding: 0.5rem 1rem;
    border-radius: 60px;
    font-weight: 500;
    font-size: 0.85rem;
    display: inline-block;
  }

  .badge-prorogation-oui {
    background: #fff3cd;
    color: #856404;
  }

  .badge-prorogation-non {
    background: #d4edda;
    color: #155724;
  }

  .badge-offres-positif {
    color: #2ecc71;
    font-weight: 700;
  }

  .badge-offres-negatif {
    color: #e74c3c;
    font-weight: 700;
  }

  /* Boutons d'action artistiques */
  .actions-art {
    display: flex;
    gap: 0.5rem;
  }

  .btn-action-art {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 14px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: relative;
    overflow: hidden;
  }

  .btn-action-art::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, rgba(255,255,255,0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .btn-action-art:hover::before {
    transform: translateX(0);
  }

  .btn-action-art:hover {
    transform: translateY(-5px) rotate(5deg);
  }

  .btn-voir { background: linear-gradient(145deg, #3498db, #2980b9); }
  .btn-modifier { background: linear-gradient(145deg, #2ecc71, #27ae60); }
  .btn-supprimer { background: linear-gradient(145deg, #e74c3c, #c0392b); }

  /* Modal artistique */
  .modal-art {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal-art.active {
    display: flex;
    animation: modalArtIn 0.4s ease;
  }

  @keyframes modalArtIn {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(30px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .contenu-modal-art {
    background: linear-gradient(145deg, #ffffff, #f8faff);
    padding: 3rem;
    border-radius: 60px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 
      0 40px 80px -20px rgba(0,0,0,0.3),
      0 0 0 2px rgba(255,255,255,0.8) inset;
    position: relative;
  }

  .entete-modal-art {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .entete-modal-art h2 {
    font-size: 2rem;
    background: linear-gradient(145deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .fermer-modal {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .fermer-modal:hover {
    transform: rotate(90deg);
    background: #e74c3c;
    color: white;
  }

  /* Formulaire élégant */
  .groupe-form {
    margin-bottom: 1.8rem;
  }

  .groupe-form label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 600;
    font-size: 1rem;
  }

  .controle-form {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #eef2f9;
    border-radius: 25px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
  }

  .controle-form:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 5px #667eea20;
    transform: translateY(-3px);
  }

  .radio-groupe {
    display: flex;
    gap: 2rem;
    background: #f8faff;
    padding: 1rem 1.5rem;
    border-radius: 25px;
  }

  .radio-groupe label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 500;
  }

  .radio-groupe input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #667eea;
  }

  /* Pagination élégante */
  .pagination-elegante {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .page-btn-art {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 16px;
    background: white;
    color: #2c3e50;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }

  .page-btn-art.active {
    background: linear-gradient(145deg, #667eea, #764ba2);
    color: white;
    transform: scale(1.1);
  }

  .page-btn-art:hover:not(.active) {
    background: #f0f3ff;
    transform: translateY(-5px);
  }

  /* Footer artistique */
  .footer-art {
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    color: #2c3e50;
    border: 1px solid rgba(255,255,255,0.8);
  }

  .social-art {
    display: flex;
    gap: 1rem;
  }

  .social-link-art {
    width: 45px;
    height: 45px;
    background: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    text-decoration: none;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }

  .social-link-art:hover {
    transform: translateY(-5px) rotate(360deg);
    background: linear-gradient(145deg, #667eea, #764ba2);
    color: white;
  }

  .designer-name {
    color: #764ba2;
    font-weight: 700;
    position: relative;
  }

  .designer-name::after {
    content: '✨';
    position: absolute;
    top: -10px;
    right: -20px;
    animation: sparkle 1s infinite;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  /* Page de connexion artistique */
  .login-art {
    max-width: 500px;
    margin: 3rem auto;
    position: relative;
  }

  .carte-login {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 3rem;
    border-radius: 70px;
    box-shadow: 
      0 40px 80px -20px rgba(0,0,0,0.3),
      0 0 0 2px rgba(255,255,255,0.8) inset;
  }

  .entete-login {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo-login-art {
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(145deg, #667eea, #764ba2);
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: floatLogo 4s infinite ease-in-out;
    box-shadow: 0 20px 40px -10px #667eea;
  }

  @keyframes floatLogo {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }

  .logo-login-art span {
    font-size: 3.5rem;
    color: white;
  }

  .tentatives-art {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
  }

  .bulle-tentative {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #eef2f9;
    transition: all 0.3s ease;
    position: relative;
  }

  .bulle-tentative.active {
    background: #2ecc71;
    box-shadow: 0 0 30px #2ecc71;
    animation: pulseBulle 1s infinite;
  }

  .bulle-tentative.used {
    background: #e74c3c;
    box-shadow: 0 0 30px #e74c3c;
  }

  @keyframes pulseBulle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  /* Toast notifications */
  .toast-art {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: white;
    padding: 1.2rem 2rem;
    border-radius: 60px;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    border-left: 5px solid #667eea;
    font-weight: 500;
  }

  .toast-art.success { border-left-color: #2ecc71; }
  .toast-art.error { border-left-color: #e74c3c; }
  .toast-art.info { border-left-color: #3498db; }

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

  /* Responsive design */
  @media (max-width: 1024px) {
    .container-elegant {
      padding: 1.5rem;
    }

    .title-art h1 {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 768px) {
    .header-art {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
    }

    .logo-masterpiece {
      flex-direction: column;
    }

    .stats-elegance {
      grid-template-columns: repeat(2, 1fr);
    }

    .wrapper-recherche {
      flex-direction: column;
    }

    .btn-art {
      width: 100%;
      justify-content: center;
    }

    .grille-filtres {
      grid-template-columns: 1fr;
    }

    .footer-art {
      flex-direction: column;
      text-align: center;
    }

    .contenu-modal-art {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .stats-elegance {
      grid-template-columns: 1fr;
    }

    .actions-art {
      flex-direction: column;
    }

    .btn-action-art {
      width: 100%;
    }

    .horloge-design {
      width: 100%;
      justify-content: center;
    }

    .radio-groupe {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  /* Animations supplémentaires */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .float-animation {
    animation: float 3s infinite ease-in-out;
  }

  /* Scrollbar personnalisée */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(145deg, #667eea, #764ba2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(145deg, #764ba2, #667eea);
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

// Page de connexion artistique
app.get("/", (req, res) => {
  const minutesRestants = getTempsRestantGele();
  
  if (estGele && minutesRestants > 0) {
    return res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>✨ SARPI - Système temporairement gelé</title>
      ${getStyles()}
    </head>
    <body>
      <div class="art-bg">
        <div class="art-circle art-circle-1"></div>
        <div class="art-circle art-circle-2"></div>
        <div class="art-circle art-circle-3"></div>
      </div>

      <div class="login-art">
        <div class="carte-login" style="text-align: center;">
          <div class="logo-login-art" style="background: linear-gradient(145deg, #e74c3c, #c0392b);">
            <span>❄️</span>
          </div>
          
          <h1 style="font-size: 2.5rem; margin: 1.5rem 0; color: #e74c3c;">Système gelé</h1>
          
          <p style="color: #666; margin-bottom: 2rem; font-size: 1.1rem;">
            Trop de tentatives de connexion échouées
          </p>
          
          <div style="font-size: 4rem; font-weight: 900; background: linear-gradient(145deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 2rem 0;">
            ${minutesRestants}:00
          </div>
          
          <p style="color: #666;">minutes restantes avant déblocage</p>
          
          <div class="tentatives-art" style="margin-top: 2rem;">
            <div class="bulle-tentative used"></div>
            <div class="bulle-tentative used"></div>
            <div class="bulle-tentative used"></div>
          </div>
        </div>
      </div>

      <script>
        let minutes = ${minutesRestants};
        let secondes = 0;
        
        setInterval(() => {
          if (secondes === 0) {
            if (minutes === 0) {
              location.reload();
            } else {
              minutes--;
              secondes = 59;
            }
          } else {
            secondes--;
          }
          
          document.querySelector('div[style*="font-size: 4rem"]').textContent = 
            \`\${minutes}:\${secondes.toString().padStart(2, '0')}\`;
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
  <title>✨ SARPI - Connexion artistique</title>
  ${getStyles()}
</head>
<body>
  <div class="art-bg">
    <div class="art-circle art-circle-1"></div>
    <div class="art-circle art-circle-2"></div>
    <div class="art-circle art-circle-3"></div>
  </div>

  <div class="login-art">
    <div class="carte-login animate__animated animate__fadeInUp">
      <div class="entete-login">
        <div class="logo-login-art">
          <span>⚡</span>
        </div>
        <h1 style="font-size: 2.8rem; background: linear-gradient(145deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0.5rem 0;">Bienvenue</h1>
        <p style="color: #764ba2; font-weight: 600; font-size: 1.1rem;">Direction Régionale Hassi R'mel</p>
      </div>

      <div class="tentatives-art">
        ${[1,2,3].map(i => `
          <div class="bulle-tentative ${i <= tentativesRestantes ? 'active' : i > tentativesRestantes ? 'used' : ''}"></div>
        `).join('')}
      </div>

      <p style="text-align: center; color: #666; margin-bottom: 2rem;">
        Tentatives restantes: <strong style="color: ${tentativesRestantes > 1 ? '#2ecc71' : '#e74c3c'};">${tentativesRestantes}</strong>
      </p>

      <form method="POST" action="/login">
        <div class="groupe-form">
          <label>👤 Nom d'utilisateur</label>
          <input type="text" name="username" class="controle-form" placeholder="admin" required>
        </div>
        
        <div class="groupe-form">
          <label>🔐 Mot de passe</label>
          <input type="password" name="password" class="controle-form" placeholder="0000" required>
        </div>

        <button type="submit" class="btn-art btn-primaire" style="width: 100%;">
          <i class="fas fa-sign-in-alt"></i>
          Se connecter
        </button>
      </form>

      <p style="text-align: center; margin-top: 2rem; color: #999; font-size: 0.9rem;">
        <i class="fas fa-info-circle"></i> admin / 0000
      </p>
    </div>
  </div>

  <script>
    document.addEventListener('contextmenu', e => e.preventDefault());
    console.log('%c✨ SARPI - Système Artistique v4.0 ✨', 'color: #667eea; font-size: 16px; font-weight: bold;');
  </script>
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>❌ Erreur de connexion</title>
    ${getStyles()}
  </head>
  <body>
    <div class="art-bg">
      <div class="art-circle art-circle-1"></div>
      <div class="art-circle art-circle-2"></div>
      <div class="art-circle art-circle-3"></div>
    </div>
    
    <div class="login-art">
      <div class="carte-login">
        <div class="logo-login-art" style="background: linear-gradient(145deg, #e74c3c, #c0392b);">
          <span>!</span>
        </div>
        
        <h2 style="color: #e74c3c; text-align: center; margin: 1.5rem 0;">Identifiants incorrects</h2>
        
        <p style="text-align: center; color: #666; margin: 1.5rem 0; font-size: 1.1rem;">
          Tentatives restantes: <strong style="color: #e74c3c;">${3 - tentativesConnexion}</strong>
        </p>
        
        <a href="/" class="btn-art btn-primaire" style="width: 100%; text-align: center; text-decoration: none;">
          <i class="fas fa-redo-alt"></i>
          Réessayer
        </a>
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
  const chargesUniques = new Set(consultations.map(c => c.charge)).size;
  
  let lignes = consultations.map((c, i) => `
<tr>
  <td>#${c.numero}</td>
  <td>${c.designation.length > 60 ? c.designation.substring(0,60) + '...' : c.designation}</td>
  <td>${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</td>
  <td>${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</td>
  <td>
    <span class="badge ${c.prorogation === 'OUI' ? 'badge-prorogation-oui' : 'badge-prorogation-non'}">
      ${c.prorogation || 'NON'}
    </span>
  </td>
  <td class="${c.nombreOffres > 0 ? 'badge-offres-positif' : 'badge-offres-negatif'}" style="font-weight: 700;">
    ${c.nombreOffres || 0}
  </td>
  <td>
    <i class="fas fa-user-circle" style="color: #667eea; margin-right: 5px;"></i>
    ${c.charge.split(' ').map(m => m[0]).join('')}
  </td>
  <td>
    <div class="actions-art">
      <button class="btn-action-art btn-voir" onclick="voirConsultation(${i})"><i class="fas fa-eye"></i></button>
      <button class="btn-action-art btn-modifier" onclick="modifierConsultation(${i})"><i class="fas fa-edit"></i></button>
      <button class="btn-action-art btn-supprimer" onclick="supprimerConsultation(${i})"><i class="fas fa-trash"></i></button>
    </div>
  </td>
</tr>
`).join("");

  if (!consultations.length) {
    lignes = `<tr><td colspan="8" style="text-align: center; padding: 4rem;">
      <i class="fas fa-folder-open" style="font-size: 4rem; color: #667eea; margin-bottom: 1rem; display: block;"></i>
      <p style="color: #666; font-size: 1.2rem;">Aucune consultation enregistrée</p>
    </td></tr>`;
  }

  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>✨ SARPI - Tableau de bord artistique</title>
  ${getStyles()}
</head>
<body>
  <div class="art-bg">
    <div class="art-circle art-circle-1"></div>
    <div class="art-circle art-circle-2"></div>
    <div class="art-circle art-circle-3"></div>
  </div>

  <!-- Modal ajout/modification -->
  <div class="modal-art" id="consultationModal">
    <div class="contenu-modal-art">
      <div class="entete-modal-art">
        <h2 id="modalTitre">➕ Nouvelle consultation</h2>
        <div class="fermer-modal" onclick="fermerModal()">&times;</div>
      </div>
      
      <form id="consultationForm" method="POST" action="/add" onsubmit="return handleSubmit(event)">
        <input type="hidden" name="id" id="consultationId">
        <input type="hidden" name="secretCode" id="secretCode">
        
        <div class="groupe-form">
          <label>📋 Numéro de consultation</label>
          <input type="number" name="numero" id="numero" class="controle-form" required>
        </div>
        
        <div class="groupe-form">
          <label>📝 Désignation de la prestation</label>
          <textarea name="designation" id="designation" class="controle-form" rows="3" required></textarea>
        </div>
        
        <div class="groupe-form">
          <label>📅 Date de lancement</label>
          <input type="date" name="dateLancement" id="dateLancement" class="controle-form" required>
        </div>
        
        <div class="groupe-form">
          <label>⏰ Date limite de remise</label>
          <input type="date" name="dateRemise" id="dateRemise" class="controle-form" required>
        </div>
        
        <div class="groupe-form">
          <label>🔄 Prorogation</label>
          <div class="radio-groupe">
            <label>
              <input type="radio" name="prorogation" value="NON" checked> Sans prorogation
            </label>
            <label>
              <input type="radio" name="prorogation" value="OUI"> Avec prorogation
            </label>
          </div>
        </div>
        
        <div class="groupe-form">
          <label>📊 Nombre d'offres</label>
          <input type="number" name="nombreOffres" id="nombreOffres" class="controle-form" min="0" value="0">
        </div>
        
        <div class="groupe-form">
          <label>👤 Chargé(e) du dossier</label>
          <select name="charge" id="charge" class="controle-form" required>
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
          <button type="submit" class="btn-art btn-primaire" style="flex: 1;">
            <i class="fas fa-save"></i> Enregistrer
          </button>
          <button type="button" class="btn-art btn-secondaire" style="flex: 1;" onclick="fermerModal()">
            <i class="fas fa-times"></i> Annuler
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal visualisation -->
  <div class="modal-art" id="viewModal">
    <div class="contenu-modal-art">
      <div class="entete-modal-art">
        <h2>🔍 Détails de la consultation</h2>
        <div class="fermer-modal" onclick="fermerViewModal()">&times;</div>
      </div>
      <div id="viewContenu" style="line-height: 2.5; font-size: 1.1rem;"></div>
      <button class="btn-art btn-secondaire" style="width: 100%; margin-top: 2rem;" onclick="fermerViewModal()">
        <i class="fas fa-check"></i> Fermer
      </button>
    </div>
  </div>

  <div class="container-elegant">
    <!-- Header artistique -->
    <div class="header-art">
      <div class="logo-masterpiece">
        <div class="logo-framed">
          <span>⚡</span>
        </div>
        <div class="title-art">
          <h1>SARPI Spa</h1>
          <p>
            <i class="fas fa-map-marker-alt"></i>
            Direction Régionale Hassi R'mel
          </p>
        </div>
      </div>
      
      <div class="horloge-design">
        <div class="horloge-icon">
          <i class="fas fa-clock"></i>
        </div>
        <span class="horloge-digital" id="horloge">${getDateHeureActuelle()}</span>
      </div>
    </div>

    <!-- Statistiques élégantes -->
    <div class="stats-elegance">
      <div class="carte-stat">
        <div class="stat-icon-art">
          <i class="fas fa-folder-open"></i>
        </div>
        <div class="stat-chiffre">${totalConsultations}</div>
        <div class="stat-label-art">Total consultations</div>
      </div>
      
      <div class="carte-stat">
        <div class="stat-icon-art">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-chiffre">${consultationsAvecOffres}</div>
        <div class="stat-label-art">Avec offres</div>
      </div>
      
      <div class="carte-stat">
        <div class="stat-icon-art">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="stat-chiffre">${consultationsSansOffres}</div>
        <div class="stat-label-art">Sans offres</div>
      </div>
      
      <div class="carte-stat">
        <div class="stat-icon-art">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-chiffre">${chargesUniques}</div>
        <div class="stat-label-art">Chargés actifs</div>
      </div>
    </div>

    <!-- Recherche et actions -->
    <div class="recherche-art">
      <div class="wrapper-recherche">
        <input type="text" class="input-art" id="rechercheInput" placeholder="🔍 Rechercher par numéro, désignation ou chargé...">
        <button class="btn-art btn-primaire" onclick="afficherAjoutModal()">
          <i class="fas fa-plus"></i> Ajouter
        </button>
        <button class="btn-art btn-secondaire" onclick="toggleFiltres()">
          <i class="fas fa-filter"></i> Filtres
        </button>
        <button class="btn-art btn-secondaire" onclick="exporterTableau()">
          <i class="fas fa-download"></i> Exporter
        </button>
      </div>

      <!-- Panneau de filtres -->
      <div class="filtres-elegants" id="filtresPanel">
        <div class="grille-filtres">
          <div class="item-filtre">
            <label>📅 Date lancement</label>
            <input type="date" id="filtreDateLancement">
          </div>
          <div class="item-filtre">
            <label>📅 Date remise</label>
            <input type="date" id="filtreDateRemise">
          </div>
          <div class="item-filtre">
            <label>👤 Chargé</label>
            <select id="filtreCharge">
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
          <div class="item-filtre">
            <label>🔄 Prorogation</label>
            <select id="filtreProrogation">
              <option value="">Tous</option>
              <option value="OUI">Avec prorogation</option>
              <option value="NON">Sans prorogation</option>
            </select>
          </div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="btn-art btn-primaire" onclick="appliquerFiltres()">
            <i class="fas fa-check"></i> Appliquer
          </button>
          <button class="btn-art btn-secondaire" onclick="reinitialiserFiltres()">
            <i class="fas fa-undo"></i> Réinitialiser
          </button>
        </div>
      </div>
    </div>

    <!-- Tableau élégant -->
    <div class="tableau-container">
      <table class="tableau-elegant" id="consultationsTable">
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

    <!-- Pagination -->
    <div class="pagination-elegante" id="pagination"></div>

    <!-- Footer artistique -->
    <footer class="footer-art">
      <div>
        <i class="far fa-copyright"></i>
        2025 SARPI Spa - Tous droits réservés
      </div>
      
      <div>
        <i class="fas fa-paint-brush" style="color: #764ba2;"></i>
        Design par <span class="designer-name">ABDELHAKEM LAMINE</span>
      </div>
      
      <div class="social-art">
        <a href="#" class="social-link-art"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-link-art"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" class="social-link-art"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link-art"><i class="fab fa-instagram"></i></a>
      </div>
    </footer>
  </div>

  <script>
    let editId = null;
    let pageCourante = 1;
    const itemsParPage = 10;
    const consultations = ${JSON.stringify(consultations)};

    // Mise à jour horloge
    function mettreJourHorloge() {
      const now = new Date();
      document.getElementById('horloge').textContent = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    setInterval(mettreJourHorloge, 1000);

    // Gestion modals
    function afficherAjoutModal() {
      document.getElementById('modalTitre').textContent = '➕ Nouvelle consultation';
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
        <p><i class="fas fa-hashtag" style="color: #667eea; width: 30px;"></i> <strong>Numéro:</strong> \${c.numero}</p>
        <p><i class="fas fa-align-left" style="color: #667eea; width: 30px;"></i> <strong>Désignation:</strong> \${c.designation}</p>
        <p><i class="fas fa-calendar-plus" style="color: #667eea; width: 30px;"></i> <strong>Date lancement:</strong> \${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</p>
        <p><i class="fas fa-calendar-check" style="color: #667eea; width: 30px;"></i> <strong>Date remise:</strong> \${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</p>
        <p><i class="fas fa-clock" style="color: #667eea; width: 30px;"></i> <strong>Prorogation:</strong> \${c.prorogation || 'NON'}</p>
        <p><i class="fas fa-chart-bar" style="color: #667eea; width: 30px;"></i> <strong>Nombre d'offres:</strong> \${c.nombreOffres || 0}</p>
        <p><i class="fas fa-user-tie" style="color: #667eea; width: 30px;"></i> <strong>Chargé(e):</strong> \${c.charge}</p>
      \`;
      document.getElementById('viewModal').classList.add('active');
    }

    function modifierConsultation(index) {
      const secret = prompt('🔐 Code secret (2026):');
      if (secret !== '2026') {
        afficherToast('Code secret incorrect!', 'error');
        return;
      }
      
      const c = consultations[index];
      document.getElementById('modalTitre').textContent = '✏️ Modifier la consultation';
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

    function supprimerConsultation(index) {
      const secret = prompt('🔐 Code secret (2026):');
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
      const secret = prompt('🔐 Code secret (2026):');
      
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

    // Filtres
    function toggleFiltres() {
      document.getElementById('filtresPanel').classList.toggle('active');
    }

    function appliquerFiltres() {
      const dateLancement = document.getElementById('filtreDateLancement').value;
      const dateRemise = document.getElementById('filtreDateRemise').value;
      const charge = document.getElementById('filtreCharge').value;
      const prorogation = document.getElementById('filtreProrogation').value;
      
      afficherToast('Filtres appliqués avec succès', 'success');
      document.getElementById('filtresPanel').classList.remove('active');
    }

    function reinitialiserFiltres() {
      document.getElementById('filtreDateLancement').value = '';
      document.getElementById('filtreDateRemise').value = '';
      document.getElementById('filtreCharge').value = '';
      document.getElementById('filtreProrogation').value = '';
      
      afficherToast('Filtres réinitialisés', 'info');
      document.getElementById('filtresPanel').classList.remove('active');
    }

    // Recherche en temps réel
    document.getElementById('rechercheInput').addEventListener('keyup', function() {
      const recherche = this.value.toLowerCase();
      const lignes = document.querySelectorAll('#tableBody tr');
      
      lignes.forEach(ligne => {
        const texte = ligne.textContent.toLowerCase();
        ligne.style.display = texte.includes(recherche) ? '' : 'none';
      });
    });

    // Tri du tableau
    function trierTableau(colonne) {
      const table = document.getElementById('consultationsTable');
      const tbody = table.tBodies[0];
      const lignes = Array.from(tbody.rows);
      
      const triees = lignes.sort((a, b) => {
        let aVal = a.cells[colonne].textContent;
        let bVal = b.cells[colonne].textContent;
        
        if (colonne === 2 || colonne === 3) { // Dates
          aVal = new Date(aVal.split('/').reverse().join('-'));
          bVal = new Date(bVal.split('/').reverse().join('-'));
        } else if (colonne === 0 || colonne === 5) { // Nombres
          aVal = parseInt(aVal.replace(/[^0-9]/g, '')) || 0;
          bVal = parseInt(bVal.replace(/[^0-9]/g, '')) || 0;
        }
        
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });
      
      tbody.append(...triees);
      afficherToast('Tableau trié', 'info');
    }

    // Export
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

    // Toast
    function afficherToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = 'toast-art ' + type;
      
      let icone = 'info-circle';
      if (type === 'success') icone = 'check-circle';
      if (type === 'error') icone = 'exclamation-circle';
      
      toast.innerHTML = \`<i class="fas fa-\${icone}"></i> \${message}\`;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }

    // Protection clic droit
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Message console
    console.log('%c✨✨✨ SARPI - Système Artistique v4.0 ✨✨✨', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c🎨 Design par ABDELHAKEM LAMINE', 'color: #764ba2; font-size: 16px;');
    console.log('%c📊 ' + consultations.length + ' consultations', 'color: #2ecc71; font-size: 14px;');
  </script>
</body>
</html>
  `);
});

// Routes API
app.post("/add", (req, res) => {
  const { numero, designation, dateLancement, dateRemise, prorogation, nombreOffres, charge, secretCode } = req.body;
  
  if (secretCode !== CODE_SECRET) {
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
  
  if (secretCode !== CODE_SECRET) {
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
  
  if (secretCode !== CODE_SECRET) {
    return res.redirect("/consultations?error=code_invalide");
  }
  
  consultations.splice(req.params.i, 1);
  res.redirect("/consultations");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `✨✨✨ SARPI - Système Artistique v4.0 ✨✨✨`);
  console.log(`\x1b[32m%s\x1b[0m`, `🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`\x1b[33m%s\x1b[0m`, `🔐 Code secret: ${CODE_SECRET}`);
  console.log(`\x1b[35m%s\x1b[0m`, `👤 Compte: admin / 0000`);
  console.log(`\x1b[36m%s\x1b[0m`, `🎨 Design par ABDELHAKEM LAMINE`);
});
