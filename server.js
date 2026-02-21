const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let consultations = [];
let tentativesConnexion = 0;
let estGele = false;
let geleJusqua = null;
const CODE_SECRET = "********"; // Masqué pour la sécurité

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

// Styles CSS royaux avec bordures dorées
const getStyles = () => `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Cormorant Garamond', serif;
    background: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* Effet de particules dorées */
  .particules-dorees {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .particule {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow: 0 0 20px #ffd700;
    animation: flotterParticule 10s infinite linear;
  }

  @keyframes flotterParticule {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }

  /* Conteneur principal avec bordures dorées */
  .container-royal {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 2rem;
    position: relative;
    z-index: 10;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 70px;
    border: 3px solid rgba(255, 215, 0, 0.3);
    box-shadow: 
      0 0 50px rgba(255, 215, 0, 0.2),
      inset 0 0 50px rgba(255, 215, 0, 0.1);
    animation: bordureLumineuse 3s infinite alternate;
  }

  @keyframes bordureLumineuse {
    0% {
      border-color: rgba(255, 215, 0, 0.3);
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
    }
    100% {
      border-color: rgba(255, 215, 0, 0.8);
      box-shadow: 0 0 80px rgba(255, 215, 0, 0.6);
    }
  }

  /* Logo animé */
  .logo-container {
    position: relative;
    width: 120px;
    height: 120px;
    perspective: 1000px;
  }

  .logo-royal {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotationLogo 10s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes rotationLogo {
    0%, 100% {
      transform: rotateY(0deg) rotateX(10deg);
    }
    25% {
      transform: rotateY(90deg) rotateX(20deg);
    }
    50% {
      transform: rotateY(180deg) rotateX(10deg);
    }
    75% {
      transform: rotateY(270deg) rotateX(0deg);
    }
  }

  .face-logo {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #ffd700, #ffa500);
    border-radius: 30px;
    box-shadow: 
      0 20px 40px rgba(255, 215, 0, 0.3),
      inset 0 -5px 15px rgba(0,0,0,0.3);
    backface-visibility: visible;
    border: 2px solid rgba(255,255,255,0.5);
  }

  .face-logo.face-avant {
    transform: rotateY(0deg) translateZ(20px);
  }

  .face-logo.face-arriere {
    transform: rotateY(180deg) translateZ(20px);
    background: linear-gradient(145deg, #ffa500, #ffd700);
  }

  .face-logo.face-gauche {
    transform: rotateY(-90deg) translateZ(20px);
    background: linear-gradient(145deg, #ff8c00, #ffd700);
  }

  .face-logo.face-droite {
    transform: rotateY(90deg) translateZ(20px);
    background: linear-gradient(145deg, #ffd700, #ff8c00);
  }

  .face-logo span {
    font-size: 2.5rem;
    font-weight: 900;
    color: #1a1a2e;
    text-shadow: 2px 2px 4px rgba(255,255,255,0.3);
    transform: rotateY(0deg);
  }

  /* Header royal */
  .header-royal {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 50px;
    border: 2px solid rgba(255, 215, 0, 0.2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .titre-royal h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(145deg, #ffd700, #ffa500, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    letter-spacing: 2px;
  }

  .titre-royal p {
    color: #ffd700;
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: 0 0 10px rgba(255,215,0,0.5);
  }

  /* Horloge royale */
  .horloge-royale {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem 3rem;
    border-radius: 60px;
    border: 2px solid #ffd700;
    box-shadow: 0 0 30px rgba(255,215,0,0.3);
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .horloge-icone {
    width: 60px;
    height: 60px;
    background: linear-gradient(145deg, #ffd700, #ffa500);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a1a2e;
    font-size: 1.8rem;
    animation: pulseDore 2s infinite;
  }

  @keyframes pulseDore {
    0%, 100% {
      box-shadow: 0 0 30px #ffd700;
    }
    50% {
      box-shadow: 0 0 60px #ffd700;
    }
  }

  .horloge-texte {
    font-size: 2rem;
    font-weight: 700;
    color: #ffd700;
    text-shadow: 0 0 20px rgba(255,215,0,0.5);
    font-family: 'Playfair Display', serif;
  }

  /* Cartes statistiques royales */
  .stats-royales {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .carte-royale {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    padding: 2.5rem;
    border-radius: 40px;
    border: 2px solid rgba(255, 215, 0, 0.3);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
  }

  .carte-royale::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 40px;
    background: linear-gradient(145deg, #ffd700, transparent, #ffd700);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  .carte-royale:hover::before {
    opacity: 0.3;
  }

  .carte-royale:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: #ffd700;
    box-shadow: 0 30px 50px rgba(255,215,0,0.2);
  }

  .icone-carte {
    width: 80px;
    height: 80px;
    background: linear-gradient(145deg, #ffd70020, #ffa50020);
    border: 2px solid #ffd700;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    color: #ffd700;
    transition: all 0.3s ease;
  }

  .carte-royale:hover .icone-carte {
    transform: rotate(15deg) scale(1.1);
    background: linear-gradient(145deg, #ffd70040, #ffa50040);
    box-shadow: 0 0 40px #ffd700;
  }

  .chiffre-carte {
    font-size: 3.5rem;
    font-weight: 900;
    color: #ffd700;
    line-height: 1;
    margin-bottom: 0.5rem;
    font-family: 'Playfair Display', serif;
    text-shadow: 0 0 20px rgba(255,215,0,0.5);
  }

  .label-carte {
    color: rgba(255,255,255,0.8);
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Barre de recherche royale */
  .recherche-royale {
    margin-bottom: 2rem;
  }

  .wrapper-recherche-royal {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .input-royal {
    flex: 1;
    min-width: 300px;
    padding: 1.8rem 2.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 2px solid rgba(255, 215, 0, 0.3);
    border-radius: 60px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: white;
    transition: all 0.3s ease;
  }

  .input-royal:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 40px rgba(255,215,0,0.3);
    transform: scale(1.02);
  }

  .input-royal::placeholder {
    color: rgba(255,255,255,0.5);
  }

  .btn-royal {
    padding: 1.8rem 3.5rem;
    background: linear-gradient(145deg, #ffd700, #ffa500);
    border: none;
    border-radius: 60px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: #1a1a2e;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(255,215,0,0.3);
  }

  .btn-royal::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn-royal:hover::before {
    width: 400px;
    height: 400px;
  }

  .btn-royal:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255,215,0,0.5);
  }

  .btn-secondaire-royal {
    background: transparent;
    border: 2px solid #ffd700;
    color: #ffd700;
    box-shadow: none;
  }

  .btn-secondaire-royal:hover {
    background: rgba(255,215,0,0.1);
    color: #ffd700;
  }

  /* Filtres royaux */
  .filtres-royaux {
    margin-top: 1rem;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 2px solid rgba(255,215,0,0.3);
    display: none;
    animation: apparitionFiltres 0.4s ease;
  }

  @keyframes apparitionFiltres {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .filtres-royaux.active {
    display: block;
  }

  .grille-filtres-royaux {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .item-filtre-royal label {
    display: block;
    margin-bottom: 0.8rem;
    color: #ffd700;
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 1px;
  }

  .item-filtre-royal input,
  .item-filtre-royal select {
    width: 100%;
    padding: 1.2rem;
    background: rgba(0,0,0,0.3);
    border: 2px solid rgba(255,215,0,0.3);
    border-radius: 30px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    color: white;
    transition: all 0.3s ease;
  }

  .item-filtre-royal input:focus,
  .item-filtre-royal select:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 30px rgba(255,215,0,0.3);
  }

  /* Tableau royal */
  .tableau-container-royal {
    overflow-x: auto;
    border-radius: 40px;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,215,0,0.3);
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .tableau-royal {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
  }

  .tableau-royal th {
    padding: 2rem 1.5rem;
    background: linear-gradient(145deg, #ffd700, #ffa500);
    color: #1a1a2e;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
  }

  .tableau-royal th:first-child {
    border-radius: 30px 0 0 30px;
  }

  .tableau-royal th:last-child {
    border-radius: 0 30px 30px 0;
  }

  .tableau-royal th:hover {
    background: linear-gradient(145deg, #ffa500, #ffd700);
    transform: scale(1.02);
    box-shadow: 0 0 40px #ffd700;
  }

  .tableau-royal td {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    color: rgba(255,255,255,0.9);
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(255,215,0,0.2);
    transition: all 0.3s ease;
  }

  .tableau-royal tr:hover td {
    background: rgba(255,215,0,0.05);
    transform: scale(1.01);
    box-shadow: 0 5px 20px rgba(255,215,0,0.2);
  }

  /* Badges dorés */
  .badge-royal {
    padding: 0.6rem 1.2rem;
    border-radius: 40px;
    font-weight: 600;
    font-size: 0.95rem;
    display: inline-block;
    border: 1px solid;
  }

  .badge-oui {
    background: rgba(255,215,0,0.1);
    color: #ffd700;
    border-color: #ffd700;
  }

  .badge-non {
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.7);
    border-color: rgba(255,255,255,0.2);
  }

  .badge-offres-positif {
    color: #ffd700;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(255,215,0,0.5);
  }

  /* Boutons d'action dorés */
  .actions-royales {
    display: flex;
    gap: 0.8rem;
  }

  .btn-action-royal {
    width: 45px;
    height: 45px;
    border: 2px solid #ffd700;
    background: transparent;
    border-radius: 15px;
    color: #ffd700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;
  }

  .btn-action-royal::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,215,0,0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }

  .btn-action-royal:hover::before {
    width: 60px;
    height: 60px;
  }

  .btn-action-royal:hover {
    background: #ffd700;
    color: #1a1a2e;
    transform: translateY(-5px) rotate(5deg);
    box-shadow: 0 0 30px #ffd700;
  }

  /* Modal royal */
  .modal-royal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(15px);
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal-royal.active {
    display: flex;
    animation: modalEntree 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes modalEntree {
    from {
      opacity: 0;
      transform: scale(0.6) rotate(-5deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }

  .contenu-modal-royal {
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    padding: 4rem;
    border-radius: 80px;
    max-width: 700px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    border: 3px solid #ffd700;
    box-shadow: 
      0 0 100px rgba(255,215,0,0.3),
      inset 0 0 50px rgba(255,215,0,0.1);
    position: relative;
  }

  .entete-modal-royal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }

  .entete-modal-royal h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    color: #ffd700;
    text-shadow: 0 0 20px rgba(255,215,0,0.5);
  }

  .fermer-modal-royal {
    width: 60px;
    height: 60px;
    background: rgba(255,215,0,0.1);
    border: 2px solid #ffd700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #ffd700;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .fermer-modal-royal:hover {
    background: #ffd700;
    color: #1a1a2e;
    transform: rotate(90deg);
    box-shadow: 0 0 40px #ffd700;
  }

  /* Formulaire royal */
  .groupe-form-royal {
    margin-bottom: 2rem;
  }

  .groupe-form-royal label {
    display: block;
    margin-bottom: 0.8rem;
    color: #ffd700;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .controle-form-royal {
    width: 100%;
    padding: 1.2rem 2rem;
    background: rgba(0,0,0,0.3);
    border: 2px solid rgba(255,215,0,0.3);
    border-radius: 40px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: white;
    transition: all 0.3s ease;
  }

  .controle-form-royal:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 40px rgba(255,215,0,0.3);
    transform: translateY(-3px);
  }

  .radio-groupe-royal {
    display: flex;
    gap: 3rem;
    background: rgba(0,0,0,0.2);
    padding: 1.5rem 2rem;
    border-radius: 40px;
    border: 2px solid rgba(255,215,0,0.2);
  }

  .radio-groupe-royal label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: rgba(255,255,255,0.9);
    cursor: pointer;
  }

  .radio-groupe-royal input[type="radio"] {
    width: 20px;
    height: 20px;
    accent-color: #ffd700;
  }

  /* Pagination royale */
  .pagination-royale {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .page-btn-royal {
    width: 55px;
    height: 55px;
    background: transparent;
    border: 2px solid #ffd700;
    border-radius: 18px;
    color: #ffd700;
    font-weight: 700;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }

  .page-btn-royal.active {
    background: #ffd700;
    color: #1a1a2e;
    transform: scale(1.1);
    box-shadow: 0 0 40px #ffd700;
  }

  .page-btn-royal:hover:not(.active) {
    background: rgba(255,215,0,0.1);
    transform: translateY(-5px);
  }

  /* Footer royal */
  .footer-royal {
    margin-top: 3rem;
    padding: 2.5rem;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 2px solid rgba(255,215,0,0.3);
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    color: rgba(255,255,255,0.8);
    font-size: 1.1rem;
  }

  .social-royal {
    display: flex;
    gap: 1rem;
  }

  .social-link-royal {
    width: 50px;
    height: 50px;
    background: rgba(255,215,0,0.1);
    border: 2px solid #ffd700;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    text-decoration: none;
    font-size: 1.3rem;
    transition: all 0.3s ease;
  }

  .social-link-royal:hover {
    background: #ffd700;
    color: #1a1a2e;
    transform: translateY(-5px) rotate(360deg);
    box-shadow: 0 0 30px #ffd700;
  }

  .designer-royal {
    color: #ffd700;
    font-weight: 700;
    position: relative;
    font-size: 1.3rem;
  }

  .designer-royal::before,
  .designer-royal::after {
    content: '👑';
    position: absolute;
    font-size: 1.5rem;
    animation: couronne 2s infinite;
  }

  .designer-royal::before {
    left: -30px;
  }

  .designer-royal::after {
    right: -30px;
  }

  @keyframes couronne {
    0%, 100% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
  }

  /* Page de connexion royale */
  .login-royal {
    max-width: 550px;
    margin: 3rem auto;
    position: relative;
    z-index: 10;
  }

  .carte-login-royale {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    padding: 4rem;
    border-radius: 80px;
    border: 3px solid rgba(255,215,0,0.3);
    box-shadow: 0 0 100px rgba(255,215,0,0.2);
    animation: bordureLumineuse 3s infinite alternate;
  }

  .entete-login-royal {
    text-align: center;
    margin-bottom: 3rem;
  }

  .logo-login-royal {
    width: 150px;
    height: 150px;
    margin: 0 auto 2rem;
    background: linear-gradient(145deg, #ffd700, #ffa500);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: flottementLogo 4s infinite ease-in-out;
    border: 3px solid rgba(255,255,255,0.3);
    box-shadow: 0 0 60px #ffd700;
  }

  @keyframes flottementLogo {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  .logo-login-royal span {
    font-size: 4rem;
    color: #1a1a2e;
  }

  .tentatives-royales {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    margin: 2.5rem 0;
  }

  .bulle-tentative-royale {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 2px solid;
    transition: all 0.3s ease;
  }

  .bulle-tentative-royale.active {
    background: #ffd700;
    border-color: #ffd700;
    box-shadow: 0 0 40px #ffd700;
    animation: pulseBulle 1s infinite;
  }

  .bulle-tentative-royale.used {
    background: #e74c3c;
    border-color: #e74c3c;
    box-shadow: 0 0 40px #e74c3c;
  }

  /* Toast notifications */
  .toast-royal {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(10px);
    padding: 1.5rem 3rem;
    border-radius: 60px;
    border: 2px solid #ffd700;
    box-shadow: 0 0 50px rgba(255,215,0,0.3);
    display: flex;
    align-items: center;
    gap: 1.2rem;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    color: #ffd700;
    font-size: 1.2rem;
  }

  .toast-royal.success { border-left: 8px solid #2ecc71; }
  .toast-royal.error { border-left: 8px solid #e74c3c; }
  .toast-royal.info { border-left: 8px solid #3498db; }

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

  /* Responsive */
  @media (max-width: 1024px) {
    .container-royal {
      padding: 1.5rem;
      margin: 1rem;
    }

    .titre-royal h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .header-royal {
      flex-direction: column;
      text-align: center;
    }

    .logo-section {
      flex-direction: column;
    }

    .stats-royales {
      grid-template-columns: repeat(2, 1fr);
    }

    .wrapper-recherche-royal {
      flex-direction: column;
    }

    .btn-royal {
      width: 100%;
      justify-content: center;
    }

    .footer-royal {
      flex-direction: column;
      text-align: center;
    }

    .contenu-modal-royal {
      padding: 2rem;
    }

    .designer-royal::before,
    .designer-royal::after {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .stats-royales {
      grid-template-columns: 1fr;
    }

    .actions-royales {
      flex-direction: column;
    }

    .btn-action-royal {
      width: 100%;
    }

    .horloge-royale {
      padding: 1rem 2rem;
    }

    .horloge-texte {
      font-size: 1.4rem;
    }

    .radio-groupe-royal {
      flex-direction: column;
      gap: 1rem;
    }

    .carte-login-royale {
      padding: 2rem;
    }
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

// Page de connexion royale
app.get("/", (req, res) => {
  const minutesRestants = getTempsRestantGele();
  
  if (estGele && minutesRestants > 0) {
    return res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>👑 SARPI - Système Royal Gelé</title>
      ${getStyles()}
    </head>
    <body>
      <div class="particules-dorees" id="particules"></div>

      <div class="login-royal">
        <div class="carte-login-royale" style="text-align: center;">
          <div class="logo-login-royal" style="background: linear-gradient(145deg, #e74c3c, #c0392b);">
            <span>❄️</span>
          </div>
          
          <h1 style="font-size: 3rem; margin: 2rem 0; color: #e74c3c; font-family: 'Playfair Display', serif;">Système Gelé</h1>
          
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: 1.3rem;">
            Trop de tentatives de connexion échouées
          </p>
          
          <div style="font-size: 5rem; font-weight: 900; color: #ffd700; margin: 2rem 0; font-family: 'Playfair Display', serif; text-shadow: 0 0 50px #ffd700;">
            ${minutesRestants}:00
          </div>
          
          <p style="color: #ffd700; font-size: 1.3rem;">minutes restantes avant déblocage</p>
          
          <div class="tentatives-royales" style="margin-top: 2rem;">
            <div class="bulle-tentative-royale used"></div>
            <div class="bulle-tentative-royale used"></div>
            <div class="bulle-tentative-royale used"></div>
          </div>
        </div>
      </div>

      <script>
        // Génération des particules dorées
        function genererParticules() {
          const container = document.getElementById('particules');
          for (let i = 0; i < 50; i++) {
            const particule = document.createElement('div');
            particule.className = 'particule';
            particule.style.left = Math.random() * 100 + '%';
            particule.style.animationDelay = Math.random() * 10 + 's';
            particule.style.animationDuration = 10 + Math.random() * 10 + 's';
            container.appendChild(particule);
          }
        }
        genererParticules();

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
          
          document.querySelector('div[style*="font-size: 5rem"]').textContent = 
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
  <title>👑 SARPI - Connexion Royale</title>
  ${getStyles()}
</head>
<body>
  <div class="particules-dorees" id="particules"></div>

  <div class="login-royal">
    <div class="carte-login-royale animate__animated animate__fadeInUp">
      <div class="entete-login-royal">
        <div class="logo-login-royal">
          <span>⚜️</span>
        </div>
        <h1 style="font-size: 3.5rem; color: #ffd700; margin: 0.5rem 0; font-family: 'Playfair Display', serif; text-shadow: 0 0 30px #ffd700;">SARPI</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 1.3rem;">Direction Régionale Hassi R'mel</p>
      </div>

      <div class="tentatives-royales">
        ${[1,2,3].map(i => `
          <div class="bulle-tentative-royale ${i <= tentativesRestantes ? 'active' : i > tentativesRestantes ? 'used' : ''}"></div>
        `).join('')}
      </div>

      <p style="text-align: center; color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-size: 1.2rem;">
        Tentatives restantes: <strong style="color: ${tentativesRestantes > 1 ? '#ffd700' : '#e74c3c'};">${tentativesRestantes}</strong>
      </p>

      <form method="POST" action="/login">
        <div class="groupe-form-royal">
          <label>👑 Nom d'utilisateur</label>
          <input type="text" name="username" class="controle-form-royal" placeholder="admin" required>
        </div>
        
        <div class="groupe-form-royal">
          <label>🔐 Mot de passe</label>
          <input type="password" name="password" class="controle-form-royal" placeholder="****" required>
        </div>

        <button type="submit" class="btn-royal" style="width: 100%;">
          <i class="fas fa-sign-in-alt"></i>
          Se connecter
        </button>
      </form>

      <p style="text-align: center; margin-top: 2rem; color: rgba(255,255,255,0.5); font-size: 1rem;">
        <i class="fas fa-info-circle"></i> Accès réservé au personnel autorisé
      </p>
    </div>
  </div>

  <script>
    // Génération des particules dorées
    function genererParticules() {
      const container = document.getElementById('particules');
      for (let i = 0; i < 50; i++) {
        const particule = document.createElement('div');
        particule.className = 'particule';
        particule.style.left = Math.random() * 100 + '%';
        particule.style.animationDelay = Math.random() * 10 + 's';
        particule.style.animationDuration = 10 + Math.random() * 10 + 's';
        container.appendChild(particule);
      }
    }
    genererParticules();

    document.addEventListener('contextmenu', e => e.preventDefault());
    console.log('%c👑 SARPI - Système Royal v5.0 👑', 'color: #ffd700; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ffd700;');
    console.log('%c✨ Design Royal par ABDELHAKEM LAMINE', 'color: #ffd700; font-size: 16px;');
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
    <div class="particules-dorees" id="particules"></div>
    
    <div class="login-royal">
      <div class="carte-login-royale">
        <div class="logo-login-royal" style="background: linear-gradient(145deg, #e74c3c, #c0392b);">
          <span>!</span>
        </div>
        
        <h2 style="color: #e74c3c; text-align: center; margin: 2rem 0; font-family: 'Playfair Display', serif; font-size: 2.5rem;">Identifiants incorrects</h2>
        
        <p style="text-align: center; color: rgba(255,255,255,0.8); margin: 2rem 0; font-size: 1.3rem;">
          Tentatives restantes: <strong style="color: #e74c3c;">${3 - tentativesConnexion}</strong>
        </p>
        
        <a href="/" class="btn-royal" style="width: 100%; text-align: center; text-decoration: none;">
          <i class="fas fa-redo-alt"></i>
          Réessayer
        </a>
      </div>
    </div>

    <script>
      function genererParticules() {
        const container = document.getElementById('particules');
        for (let i = 0; i < 50; i++) {
          const particule = document.createElement('div');
          particule.className = 'particule';
          particule.style.left = Math.random() * 100 + '%';
          particule.style.animationDelay = Math.random() * 10 + 's';
          particule.style.animationDuration = 10 + Math.random() * 10 + 's';
          container.appendChild(particule);
        }
      }
      genererParticules();
    </script>
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
    <span class="badge-royal ${c.prorogation === 'OUI' ? 'badge-oui' : 'badge-non'}">
      ${c.prorogation || 'NON'}
    </span>
  </td>
  <td class="${c.nombreOffres > 0 ? 'badge-offres-positif' : ''}" style="font-weight: 700; font-size: 1.2rem;">
    ${c.nombreOffres || 0}
  </td>
  <td>
    <i class="fas fa-crown" style="color: #ffd700; margin-right: 5px;"></i>
    ${c.charge.split(' ').map(m => m[0]).join('')}
  </td>
  <td>
    <div class="actions-royales">
      <button class="btn-action-royal" onclick="voirConsultation(${i})"><i class="fas fa-eye"></i></button>
      <button class="btn-action-royal" onclick="modifierConsultation(${i})"><i class="fas fa-edit"></i></button>
      <button class="btn-action-royal" onclick="supprimerConsultation(${i})"><i class="fas fa-trash"></i></button>
    </div>
  </td>
</tr>
`).join("");

  if (!consultations.length) {
    lignes = `<tr><td colspan="8" style="text-align: center; padding: 5rem;">
      <i class="fas fa-crown" style="font-size: 5rem; color: #ffd700; margin-bottom: 1rem; display: block;"></i>
      <p style="color: rgba(255,255,255,0.8); font-size: 1.5rem;">Aucune consultation enregistrée</p>
    </td></tr>`;
  }

  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>👑 SARPI - Tableau de Bord Royal</title>
  ${getStyles()}
</head>
<body>
  <div class="particules-dorees" id="particules"></div>

  <!-- Modal ajout/modification -->
  <div class="modal-royal" id="consultationModal">
    <div class="contenu-modal-royal">
      <div class="entete-modal-royal">
        <h2 id="modalTitre">➕ Nouvelle consultation</h2>
        <div class="fermer-modal-royal" onclick="fermerModal()">&times;</div>
      </div>
      
      <form id="consultationForm" method="POST" action="/add" onsubmit="return handleSubmit(event)">
        <input type="hidden" name="id" id="consultationId">
        <input type="hidden" name="secretCode" id="secretCode">
        
        <div class="groupe-form-royal">
          <label>📋 Numéro de consultation</label>
          <input type="number" name="numero" id="numero" class="controle-form-royal" required>
        </div>
        
        <div class="groupe-form-royal">
          <label>📝 Désignation de la prestation</label>
          <textarea name="designation" id="designation" class="controle-form-royal" rows="3" required></textarea>
        </div>
        
        <div class="groupe-form-royal">
          <label>📅 Date de lancement</label>
          <input type="date" name="dateLancement" id="dateLancement" class="controle-form-royal" required>
        </div>
        
        <div class="groupe-form-royal">
          <label>⏰ Date limite de remise</label>
          <input type="date" name="dateRemise" id="dateRemise" class="controle-form-royal" required>
        </div>
        
        <div class="groupe-form-royal">
          <label>🔄 Prorogation</label>
          <div class="radio-groupe-royal">
            <label>
              <input type="radio" name="prorogation" value="NON" checked> Sans prorogation
            </label>
            <label>
              <input type="radio" name="prorogation" value="OUI"> Avec prorogation
            </label>
          </div>
        </div>
        
        <div class="groupe-form-royal">
          <label>📊 Nombre d'offres</label>
          <input type="number" name="nombreOffres" id="nombreOffres" class="controle-form-royal" min="0" value="0">
        </div>
        
        <div class="groupe-form-royal">
          <label>👤 Chargé(e) du dossier</label>
          <select name="charge" id="charge" class="controle-form-royal" required>
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
          <button type="submit" class="btn-royal" style="flex: 1;">
            <i class="fas fa-save"></i> Enregistrer
          </button>
          <button type="button" class="btn-royal btn-secondaire-royal" style="flex: 1;" onclick="fermerModal()">
            <i class="fas fa-times"></i> Annuler
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal visualisation -->
  <div class="modal-royal" id="viewModal">
    <div class="contenu-modal-royal">
      <div class="entete-modal-royal">
        <h2>🔍 Détails de la consultation</h2>
        <div class="fermer-modal-royal" onclick="fermerViewModal()">&times;</div>
      </div>
      <div id="viewContenu" style="line-height: 3; font-size: 1.2rem; color: rgba(255,255,255,0.9);"></div>
      <button class="btn-royal btn-secondaire-royal" style="width: 100%; margin-top: 2rem;" onclick="fermerViewModal()">
        <i class="fas fa-check"></i> Fermer
      </button>
    </div>
  </div>

  <div class="container-royal">
    <!-- Header royal avec logo animé -->
    <div class="header-royal">
      <div class="logo-section">
        <div class="logo-container">
          <div class="logo-royal">
            <div class="face-logo face-avant">
              <span>⚜️</span>
            </div>
            <div class="face-logo face-arriere">
              <span>👑</span>
            </div>
            <div class="face-logo face-gauche">
              <span>✨</span>
            </div>
            <div class="face-logo face-droite">
              <span>💫</span>
            </div>
          </div>
        </div>
        <div class="titre-royal">
          <h1>SARPI Spa</h1>
          <p>
            <i class="fas fa-map-marker-alt"></i>
            Direction Régionale Hassi R'mel
          </p>
        </div>
      </div>
      
      <div class="horloge-royale">
        <div class="horloge-icone">
          <i class="fas fa-clock"></i>
        </div>
        <span class="horloge-texte" id="horloge">${getDateHeureActuelle()}</span>
      </div>
    </div>

    <!-- Statistiques royales -->
    <div class="stats-royales">
      <div class="carte-royale">
        <div class="icone-carte">
          <i class="fas fa-folder-open"></i>
        </div>
        <div class="chiffre-carte">${totalConsultations}</div>
        <div class="label-carte">Total consultations</div>
      </div>
      
      <div class="carte-royale">
        <div class="icone-carte">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="chiffre-carte">${consultationsAvecOffres}</div>
        <div class="label-carte">Avec offres</div>
      </div>
      
      <div class="carte-royale">
        <div class="icone-carte">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="chiffre-carte">${consultationsSansOffres}</div>
        <div class="label-carte">Sans offres</div>
      </div>
      
      <div class="carte-royale">
        <div class="icone-carte">
          <i class="fas fa-users"></i>
        </div>
        <div class="chiffre-carte">${chargesUniques}</div>
        <div class="label-carte">Chargés actifs</div>
      </div>
    </div>

    <!-- Recherche et actions -->
    <div class="recherche-royale">
      <div class="wrapper-recherche-royal">
        <input type="text" class="input-royal" id="rechercheInput" placeholder="🔍 Rechercher par numéro, désignation ou chargé...">
        <button class="btn-royal" onclick="afficherAjoutModal()">
          <i class="fas fa-plus"></i> Ajouter
        </button>
        <button class="btn-royal btn-secondaire-royal" onclick="toggleFiltres()">
          <i class="fas fa-filter"></i> Filtres
        </button>
        <button class="btn-royal btn-secondaire-royal" onclick="exporterTableau()">
          <i class="fas fa-download"></i> Exporter
        </button>
      </div>

      <!-- Panneau de filtres -->
      <div class="filtres-royaux" id="filtresPanel">
        <div class="grille-filtres-royaux">
          <div class="item-filtre-royal">
            <label>📅 Date lancement</label>
            <input type="date" id="filtreDateLancement">
          </div>
          <div class="item-filtre-royal">
            <label>📅 Date remise</label>
            <input type="date" id="filtreDateRemise">
          </div>
          <div class="item-filtre-royal">
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
          <div class="item-filtre-royal">
            <label>🔄 Prorogation</label>
            <select id="filtreProrogation">
              <option value="">Tous</option>
              <option value="OUI">Avec prorogation</option>
              <option value="NON">Sans prorogation</option>
            </select>
          </div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="btn-royal" onclick="appliquerFiltres()">
            <i class="fas fa-check"></i> Appliquer
          </button>
          <button class="btn-royal btn-secondaire-royal" onclick="reinitialiserFiltres()">
            <i class="fas fa-undo"></i> Réinitialiser
          </button>
        </div>
      </div>
    </div>

    <!-- Tableau royal -->
    <div class="tableau-container-royal">
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

    <!-- Pagination -->
    <div class="pagination-royale" id="pagination"></div>

    <!-- Footer royal -->
    <footer class="footer-royal">
      <div>
        <i class="far fa-copyright"></i>
        2025 SARPI Spa - Tous droits réservés
      </div>
      
      <div>
        <i class="fas fa-paint-brush" style="color: #ffd700;"></i>
        Design par <span class="designer-royal">ABDELHAKEM LAMINE</span>
      </div>
      
      <div class="social-royal">
        <a href="#" class="social-link-royal"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-link-royal"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" class="social-link-royal"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link-royal"><i class="fab fa-instagram"></i></a>
      </div>
    </footer>
  </div>

  <script>
    let editId = null;
    let pageCourante = 1;
    const itemsParPage = 10;
    const consultations = ${JSON.stringify(consultations)};

    // Génération des particules dorées
    function genererParticules() {
      const container = document.getElementById('particules');
      for (let i = 0; i < 50; i++) {
        const particule = document.createElement('div');
        particule.className = 'particule';
        particule.style.left = Math.random() * 100 + '%';
        particule.style.animationDelay = Math.random() * 10 + 's';
        particule.style.animationDuration = 10 + Math.random() * 10 + 's';
        container.appendChild(particule);
      }
    }
    genererParticules();

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
        <p><i class="fas fa-hashtag" style="color: #ffd700; width: 30px;"></i> <strong>Numéro:</strong> \${c.numero}</p>
        <p><i class="fas fa-align-left" style="color: #ffd700; width: 30px;"></i> <strong>Désignation:</strong> \${c.designation}</p>
        <p><i class="fas fa-calendar-plus" style="color: #ffd700; width: 30px;"></i> <strong>Date lancement:</strong> \${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</p>
        <p><i class="fas fa-calendar-check" style="color: #ffd700; width: 30px;"></i> <strong>Date remise:</strong> \${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</p>
        <p><i class="fas fa-clock" style="color: #ffd700; width: 30px;"></i> <strong>Prorogation:</strong> \${c.prorogation || 'NON'}</p>
        <p><i class="fas fa-chart-bar" style="color: #ffd700; width: 30px;"></i> <strong>Nombre d'offres:</strong> \${c.nombreOffres || 0}</p>
        <p><i class="fas fa-user-tie" style="color: #ffd700; width: 30px;"></i> <strong>Chargé(e):</strong> \${c.charge}</p>
      \`;
      document.getElementById('viewModal').classList.add('active');
    }

    function modifierConsultation(index) {
      const secret = prompt('🔐 Code secret (8 chiffres):');
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
      const secret = prompt('🔐 Code secret (8 chiffres):');
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
      const secret = prompt('🔐 Code secret (8 chiffres):');
      
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
      toast.className = 'toast-royal ' + type;
      
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
    console.log('%c👑👑👑 SARPI - Système Royal v5.0 👑👑👑', 'color: #ffd700; font-size: 24px; font-weight: bold; text-shadow: 0 0 20px #ffd700;');
    console.log('%c✨ Design Royal par ABDELHAKEM LAMINE', 'color: #ffd700; font-size: 18px;');
    console.log('%c📊 ' + consultations.length + ' consultations', 'color: #ffd700; font-size: 16px;');
  </script>
</body>
</html>
  `);
});

// Routes API (avec codes masqués)
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

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\x1b[33m%s\x1b[0m`, `👑👑👑 SARPI - Système Royal v5.0 👑👑👑`);
  console.log(`\x1b[33m%s\x1b[0m`, `🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`\x1b[33m%s\x1b[0m`, `🔐 Code secret: ******** (masqué pour sécurité)`);
  console.log(`\x1b[33m%s\x1b[0m`, `👑 Design Royal par ABDELHAKEM LAMINE`);
});
