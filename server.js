const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let consultations = [];
let loginAttempts = 0;
let isFrozen = false;
let freezeUntil = null;
const SECRET_CODE = "2026";

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

function getRemainingFreezeTime() {
  if (!isFrozen || !freezeUntil) return 0;
  return Math.max(0, Math.ceil((freezeUntil - Date.now()) / 1000 / 60));
}

// تصميم CSS إبداعي ومتطور
const getStyles = () => `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Cairo:wght@300;400;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Tajawal', 'Cairo', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* خلفية متحركة ثلاثية الأبعاد */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
      repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 10px);
    pointer-events: none;
    z-index: 0;
  }

  /* جزيئات متحركة */
  .particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    animation: floatParticle 15s infinite linear;
  }

  @keyframes floatParticle {
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

  /* الحاوية الرئيسية */
  .glass-container {
    position: relative;
    max-width: 1400px;
    margin: 2rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 50px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    z-index: 1;
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* الهيدر المتميز */
  .premium-header {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea10, #764ba210);
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.3);
  }

  .logo-3d {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-cube {
    width: 70px;
    height: 70px;
    background: linear-gradient(145deg, #667eea, #764ba2);
    border-radius: 20px;
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      10px 10px 20px rgba(102, 126, 234, 0.3),
      -5px -5px 10px rgba(255, 255, 255, 0.5) inset;
    animation: cubeRotate 10s infinite linear;
  }

  @keyframes cubeRotate {
    0% { transform: rotate(45deg) scale(1); }
    50% { transform: rotate(405deg) scale(1.1); }
    100% { transform: rotate(765deg) scale(1); }
  }

  .logo-cube span {
    transform: rotate(-45deg);
    font-size: 2rem;
    font-weight: 900;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  }

  .company-name-premium {
    font-size: 2.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.1);
    position: relative;
  }

  .company-name-premium::after {
    content: '⚡';
    position: absolute;
    top: -20px;
    right: -30px;
    font-size: 2rem;
    animation: spark 2s infinite;
  }

  @keyframes spark {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  /* الساعة الفاخرة */
  .luxury-clock {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    border-radius: 60px;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(255,255,255,0.5);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  }

  .clock-icon {
    font-size: 2rem;
    color: #ffd700;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .clock-digital {
    font-size: 1.8rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* بطاقات الإحصائيات ثلاثية الأبعاد */
  .stats-grid-premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .stat-card-3d {
    background: white;
    padding: 2rem;
    border-radius: 30px;
    box-shadow: 
      0 20px 40px -15px rgba(0,0,0,0.2),
      0 0 0 1px rgba(255,255,255,0.5) inset,
      0 0 20px rgba(102, 126, 234, 0.2);
    transform-style: preserve-3d;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .stat-card-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea, #764ba2, #ff6b6b);
  }

  .stat-card-3d:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3);
  }

  .stat-icon {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #667eea20, #764ba220);
    width: 70px;
    height: 70px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: #667eea;
  }

  .stat-number-3d {
    font-size: 2.8rem;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label-3d {
    color: #666;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* شريط البحث الإبداعي */
  .search-creative {
    margin-bottom: 2rem;
    position: relative;
  }

  .search-wrapper-premium {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .input-premium {
    flex: 1;
    min-width: 300px;
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 60px;
    background: white;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
    font-size: 1.1rem;
    font-family: 'Tajawal', sans-serif;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .input-premium:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 20px 40px -15px rgba(102, 126, 234, 0.3);
    transform: scale(1.02);
  }

  .btn-premium {
    padding: 1.5rem 3rem;
    border: none;
    border-radius: 60px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    font-family: 'Tajawal', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .btn-premium::before {
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

  .btn-premium:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary-premium {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 15px 30px -10px #667eea;
  }

  .btn-primary-premium:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px -10px #667eea;
  }

  .btn-secondary-premium {
    background: white;
    color: #667eea;
    border: 2px solid #667eea20;
  }

  .btn-secondary-premium:hover {
    background: #f8f9ff;
    border-color: #667eea;
  }

  /* الفلاتر المتقدمة */
  .filters-advanced {
    margin-top: 1rem;
    padding: 2rem;
    background: white;
    border-radius: 30px;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
    display: none;
    animation: slideDown 0.3s ease;
  }

  .filters-advanced.active {
    display: block;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .filter-item {
    position: relative;
  }

  .filter-item label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  .filter-item input,
  .filter-item select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #eee;
    border-radius: 20px;
    font-family: 'Tajawal', sans-serif;
    transition: all 0.3s ease;
  }

  .filter-item input:focus,
  .filter-item select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px #667eea20;
  }

  /* الجدول المتحرك */
  .table-premium-container {
    overflow-x: auto;
    border-radius: 30px;
    background: white;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  .table-premium {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
  }

  .table-premium th {
    padding: 1.5rem 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .table-premium th:first-child {
    border-radius: 20px 0 0 20px;
  }

  .table-premium th:last-child {
    border-radius: 0 20px 20px 0;
  }

  .table-premium th:hover {
    background: linear-gradient(135deg, #764ba2, #667eea);
  }

  .table-premium td {
    padding: 1.2rem 1rem;
    background: #f8f9ff;
    transition: all 0.3s ease;
  }

  .table-premium tr:hover td {
    background: linear-gradient(135deg, #667eea10, #764ba210);
    transform: scale(1.01);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }

  /* أزرار الإجراءات المتطورة */
  .action-buttons-premium {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn-3d {
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

  .action-btn-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .action-btn-3d:hover::before {
    transform: translateX(0);
  }

  .action-btn-3d:hover {
    transform: translateY(-3px) rotate(5deg);
  }

  .btn-view-3d { background: linear-gradient(135deg, #3498db, #2980b9); }
  .btn-edit-3d { background: linear-gradient(135deg, #2ecc71, #27ae60); }
  .btn-delete-3d { background: linear-gradient(135deg, #e74c3c, #c0392b); }

  /* نافذة منبثقة متطورة */
  .modal-premium {
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

  .modal-premium.active {
    display: flex;
    animation: modalFadeIn 0.3s ease;
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .modal-content-premium {
    background: linear-gradient(145deg, #ffffff, #f8f9ff);
    padding: 3rem;
    border-radius: 50px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 
      0 30px 60px -20px rgba(0,0,0,0.3),
      0 0 0 2px rgba(255,255,255,0.5) inset;
    position: relative;
  }

  .modal-header-premium {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .modal-header-premium h2 {
    font-size: 2rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .close-modal-premium {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .close-modal-premium:hover {
    transform: rotate(90deg);
    background: #e74c3c;
    color: white;
  }

  /* حقول النموذج المتطورة */
  .form-group-premium {
    margin-bottom: 1.8rem;
  }

  .form-group-premium label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 600;
    font-size: 1rem;
  }

  .form-control-premium {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #e0e7ff;
    border-radius: 20px;
    font-family: 'Tajawal', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
  }

  .form-control-premium:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 5px #667eea20;
    transform: translateY(-2px);
  }

  .radio-group-premium {
    display: flex;
    gap: 2rem;
    background: #f8f9ff;
    padding: 1rem;
    border-radius: 20px;
  }

  .radio-group-premium label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .radio-group-premium input[type="radio"] {
    width: 20px;
    height: 20px;
    accent-color: #667eea;
  }

  /* الترقيم المتقدم */
  .pagination-premium {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .page-btn-3d {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 16px;
    background: white;
    color: #333;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }

  .page-btn-3d.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    transform: scale(1.1);
  }

  .page-btn-3d:hover:not(.active) {
    background: #f0f3ff;
    transform: translateY(-3px);
  }

  /* التذييل الإبداعي */
  .footer-premium {
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    color: white;
  }

  .social-links-3d {
    display: flex;
    gap: 1rem;
  }

  .social-link-3d {
    width: 45px;
    height: 45px;
    background: rgba(255,255,255,0.2);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.3);
  }

  .social-link-3d:hover {
    transform: translateY(-5px) rotate(360deg);
    background: #ffd700;
    color: #333;
  }

  /* تصميم صفحة تسجيل الدخول */
  .login-premium {
    max-width: 450px;
    margin: 3rem auto;
    position: relative;
  }

  .login-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 3rem;
    border-radius: 60px;
    box-shadow: 
      0 30px 60px -20px rgba(0,0,0,0.3),
      0 0 0 2px rgba(255,255,255,0.5) inset;
  }

  .login-header-premium {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-logo-3d {
    width: 100px;
    height: 100px;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 30px;
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float 3s infinite ease-in-out;
  }

  @keyframes float {
    0%, 100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(-10px); }
  }

  .login-logo-3d span {
    transform: rotate(-45deg);
    font-size: 3rem;
    color: white;
  }

  .attempts-premium {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    margin: 2rem 0;
  }

  .attempt-bubble {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e0e7ff;
    transition: all 0.3s ease;
    position: relative;
  }

  .attempt-bubble.active {
    background: #2ecc71;
    box-shadow: 0 0 20px #2ecc71;
    animation: pulseBubble 1s infinite;
  }

  .attempt-bubble.used {
    background: #e74c3c;
    box-shadow: 0 0 20px #e74c3c;
  }

  @keyframes pulseBubble {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  /* إشعارات توست متطورة */
  .toast-premium {
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
  }

  .toast-premium.success { border-left-color: #2ecc71; }
  .toast-premium.error { border-left-color: #e74c3c; }
  .toast-premium.info { border-left-color: #3498db; }

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

  /* تحسينات للشاشات الصغيرة */
  @media (max-width: 768px) {
    .glass-container {
      padding: 1rem;
      margin: 1rem;
    }

    .premium-header {
      flex-direction: column;
      text-align: center;
    }

    .company-name-premium {
      font-size: 1.5rem;
    }

    .stats-grid-premium {
      grid-template-columns: 1fr 1fr;
    }

    .search-wrapper-premium {
      flex-direction: column;
    }

    .btn-premium {
      width: 100%;
      justify-content: center;
    }

    .modal-content-premium {
      padding: 1.5rem;
    }

    .footer-premium {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .stats-grid-premium {
      grid-template-columns: 1fr;
    }

    .action-buttons-premium {
      flex-direction: column;
    }

    .action-btn-3d {
      width: 100%;
    }
  }
</style>
`;

// إنشاء جزيئات عشوائية
function generateParticles() {
  let particles = '';
  for (let i = 0; i < 50; i++) {
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 10 + Math.random() * 10;
    particles += `<div class="particle" style="left: ${left}%; animation-delay: -${delay}s; animation-duration: ${duration}s;"></div>`;
  }
  return particles;
}

// Middleware
app.use((req, res, next) => {
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

// صفحة تسجيل الدخول المتطورة
app.get("/", (req, res) => {
  const remainingMinutes = getRemainingFreezeTime();
  
  if (isFrozen && remainingMinutes > 0) {
    return res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>✨ SARPI - نظام متجمد مؤقتاً</title>
      ${getStyles()}
    </head>
    <body>
      <div class="particles">${generateParticles()}</div>
      <div class="login-premium">
        <div class="login-card" style="text-align: center;">
          <div class="login-logo-3d" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
            <span>❄️</span>
          </div>
          <h1 style="font-size: 2rem; margin: 1.5rem 0; color: #e74c3c;">النظام متجمد مؤقتاً</h1>
          <p style="color: #666; margin-bottom: 2rem;">تم تجميد النظام بسبب محاولات تسجيل دخول فاشلة متعددة</p>
          
          <div style="font-size: 4rem; font-weight: 900; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 2rem 0;">
            ${remainingMinutes}:00
          </div>
          
          <p style="color: #666;">دقيقة متبقية حتى إعادة التشغيل التلقائي</p>
          
          <div style="margin-top: 2rem; display: flex; gap: 0.5rem; justify-content: center;">
            <div class="attempt-bubble used"></div>
            <div class="attempt-bubble used"></div>
            <div class="attempt-bubble used"></div>
          </div>
        </div>
      </div>

      <script>
        let minutes = ${remainingMinutes};
        let seconds = 0;
        
        setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              location.reload();
            } else {
              minutes--;
              seconds = 59;
            }
          } else {
            seconds--;
          }
          
          document.querySelector('div[style*="font-size: 4rem"]').textContent = 
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
  <title>✨ SARPI - بوابة الدخول المتطورة</title>
  ${getStyles()}
</head>
<body>
  <div class="particles">${generateParticles()}</div>

  <div class="login-premium">
    <div class="login-card animate__animated animate__fadeInDown">
      <div class="login-header-premium">
        <div class="login-logo-3d">
          <span>⚡</span>
        </div>
        <h1 style="font-size: 2.5rem; margin: 1rem 0; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">مرحباً بك</h1>
        <p style="color: #666;">منصة إدارة consultations المتطورة</p>
        <p style="color: #764ba2; font-weight: 600;">المديرية الجهوية حاسي الرمل</p>
      </div>

      <div class="attempts-premium">
        ${[1,2,3].map(i => `
          <div class="attempt-bubble ${i <= attemptsLeft ? 'active' : i > attemptsLeft ? 'used' : ''}"></div>
        `).join('')}
      </div>

      <p style="text-align: center; color: #666; margin-bottom: 1rem;">
        المحاولات المتبقية: <strong style="color: ${attemptsLeft > 1 ? '#2ecc71' : '#e74c3c'};">${attemptsLeft}</strong>
      </p>

      <form method="POST" action="/login">
        <div class="form-group-premium">
          <label>👤 اسم المستخدم</label>
          <input type="text" name="username" class="form-control-premium" placeholder="admin" required>
        </div>
        
        <div class="form-group-premium">
          <label>🔐 كلمة المرور</label>
          <input type="password" name="password" class="form-control-premium" placeholder="0000" required>
        </div>

        <button type="submit" class="btn-premium btn-primary-premium" style="width: 100%;">
          <i class="fas fa-sign-in-alt"></i>
          تسجيل الدخول
        </button>
      </form>

      <div style="text-align: center; margin-top: 2rem;">
        <p style="color: #999; font-size: 0.9rem;">
          <i class="fas fa-info-circle"></i>
          للمسؤولين فقط | admin / 0000
        </p>
      </div>
    </div>
  </div>

  <script>
    // منع النقر بالزر الأيمن
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // رسالة ترحيبية في الكونسول
    console.log('%c✨ SARPI Premium System v3.0 ✨', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cتم التطوير بواسطة: ABDELHAKEM LAMINE', 'color: #764ba2; font-size: 14px;');
  </script>
</body>
</html>
  `);
});

// معالجة تسجيل الدخول
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
    <title>❌ خطأ في تسجيل الدخول</title>
    ${getStyles()}
  </head>
  <body>
    <div class="particles">${generateParticles()}</div>
    
    <div class="login-premium">
      <div class="login-card">
        <div class="login-logo-3d" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
          <span>!</span>
        </div>
        
        <h2 style="color: #e74c3c; text-align: center; margin: 1rem 0;">بيانات الدخول غير صحيحة</h2>
        
        <p style="text-align: center; color: #666; margin: 1.5rem 0;">
          المحاولات المتبقية: <strong style="color: #e74c3c;">${3 - loginAttempts}</strong>
        </p>
        
        <a href="/" class="btn-premium btn-primary-premium" style="width: 100%; text-align: center; text-decoration: none;">
          <i class="fas fa-redo-alt"></i>
          إعادة المحاولة
        </a>
      </div>
    </div>
  </body>
  </html>
  `);
});

// الصفحة الرئيسية للconsultations
app.get("/consultations", (req, res) => {
  const totalConsultations = consultations.length;
  const consultationsAvecOffres = consultations.filter(c => c.nombreOffres > 0).length;
  const consultationsSansOffres = totalConsultations - consultationsAvecOffres;
  const chargesUniques = new Set(consultations.map(c => c.charge)).size;
  
  let rows = consultations.map((c, i) => `
<tr>
  <td>#${c.numero}</td>
  <td>${c.designation.length > 50 ? c.designation.substring(0,50) + '...' : c.designation}</td>
  <td>${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</td>
  <td>${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</td>
  <td>
    <span style="padding: 0.5rem 1rem; border-radius: 60px; background: ${c.prorogation === 'OUI' ? '#fff3cd' : '#d4edda'}; color: ${c.prorogation === 'OUI' ? '#856404' : '#155724'}; font-weight: 500;">
      ${c.prorogation || 'NON'}
    </span>
  </td>
  <td style="font-weight: 700; color: ${c.nombreOffres > 0 ? '#2ecc71' : '#e74c3c'};">${c.nombreOffres || 0}</td>
  <td><i class="fas fa-user-circle" style="color: #667eea; margin-right: 5px;"></i>${c.charge.split(' ').map(m => m[0]).join('')}</td>
  <td>
    <div class="action-buttons-premium">
      <button class="action-btn-3d btn-view-3d" onclick="showConsultation(${i})"><i class="fas fa-eye"></i></button>
      <button class="action-btn-3d btn-edit-3d" onclick="editConsultation(${i})"><i class="fas fa-edit"></i></button>
      <button class="action-btn-3d btn-delete-3d" onclick="deleteConsultation(${i})"><i class="fas fa-trash"></i></button>
    </div>
  </td>
</tr>
`).join("");

  if (!consultations.length) {
    rows = `<tr><td colspan="8" style="text-align: center; padding: 3rem;">
      <i class="fas fa-folder-open" style="font-size: 3rem; color: #667eea; margin-bottom: 1rem; display: block;"></i>
      لا توجد استشارات مسجلة
    </td></tr>`;
  }

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>✨ SARPI - منصة متابعة الاستشارات المتطورة</title>
  ${getStyles()}
</head>
<body>
  <div class="particles">${generateParticles()}</div>

  <!-- نافذة الإضافة/التعديل -->
  <div class="modal-premium" id="consultationModal">
    <div class="modal-content-premium">
      <div class="modal-header-premium">
        <h2 id="modalTitle">➕ إضافة استشارة جديدة</h2>
        <div class="close-modal-premium" onclick="closeModal()">&times;</div>
      </div>
      
      <form id="consultationForm" method="POST" action="/add" onsubmit="return handleSubmit(event)">
        <input type="hidden" name="id" id="consultationId">
        <input type="hidden" name="secretCode" id="secretCode">
        
        <div class="form-group-premium">
          <label>📋 رقم الاستشارة</label>
          <input type="number" name="numero" id="numero" class="form-control-premium" required>
        </div>
        
        <div class="form-group-premium">
          <label>📝 وصف الخدمة</label>
          <textarea name="designation" id="designation" class="form-control-premium" rows="3" required></textarea>
        </div>
        
        <div class="form-group-premium">
          <label>📅 تاريخ الإطلاق</label>
          <input type="date" name="dateLancement" id="dateLancement" class="form-control-premium" required>
        </div>
        
        <div class="form-group-premium">
          <label>⏰ تاريخ التسليم النهائي</label>
          <input type="date" name="dateRemise" id="dateRemise" class="form-control-premium" required>
        </div>
        
        <div class="form-group-premium">
          <label>🔄 التمديد</label>
          <div class="radio-group-premium">
            <label>
              <input type="radio" name="prorogation" value="NON" checked> بدون تمديد
            </label>
            <label>
              <input type="radio" name="prorogation" value="OUI"> مع التمديد
            </label>
          </div>
        </div>
        
        <div class="form-group-premium">
          <label>📊 عدد العروض</label>
          <input type="number" name="nombreOffres" id="nombreOffres" class="form-control-premium" min="0" value="0">
        </div>
        
        <div class="form-group-premium">
          <label>👤 المسؤول عن الملف</label>
          <select name="charge" id="charge" class="form-control-premium" required>
            <option value="">اختر المسؤول</option>
            <option value="OULD HAMOUDA DHEHBIYA">ولد حمودة ذهبية</option>
            <option value="FAID KAMEL">فايد كمال</option>
            <option value="MESSAHEL ABDELDJALIL">مساهل عبد الجليل</option>
            <option value="MEGAMEZ ABDALLAH">مقامز عبد الله</option>
            <option value="CHELGHOUM HAMZA">شلغوم حمزة</option>
            <option value="DAOUADI BELKACEM">دواودي بلقاسم</option>
            <option value="KEDAID AHMED">كديد أحمد</option>
          </select>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button type="submit" class="btn-premium btn-primary-premium" style="flex: 1;">
            <i class="fas fa-save"></i> حفظ
          </button>
          <button type="button" class="btn-premium btn-secondary-premium" style="flex: 1;" onclick="closeModal()">
            <i class="fas fa-times"></i> إلغاء
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- نافذة عرض التفاصيل -->
  <div class="modal-premium" id="viewModal">
    <div class="modal-content-premium">
      <div class="modal-header-premium">
        <h2>🔍 تفاصيل الاستشارة</h2>
        <div class="close-modal-premium" onclick="closeViewModal()">&times;</div>
      </div>
      <div id="viewContent" style="line-height: 2.5; font-size: 1.1rem;"></div>
      <button class="btn-premium btn-secondary-premium" style="width: 100%; margin-top: 2rem;" onclick="closeViewModal()">
        <i class="fas fa-check"></i> إغلاق
      </button>
    </div>
  </div>

  <!-- الحاوية الرئيسية -->
  <div class="glass-container">
    <!-- الهيدر المتطور -->
    <div class="premium-header">
      <div class="logo-3d">
        <div class="logo-cube">
          <span>⚡</span>
        </div>
        <div>
          <div class="company-name-premium">SARPI Spa</div>
          <p style="color: #666; margin-top: 0.5rem;">
            <i class="fas fa-map-marker-alt" style="color: #667eea;"></i>
            المديرية الجهوية - حاسي الرمل
          </p>
        </div>
      </div>
      
      <div class="luxury-clock">
        <i class="fas fa-clock clock-icon"></i>
        <span class="clock-digital" id="currentDateTime">${getCurrentDateTime()}</span>
      </div>
    </div>

    <!-- بطاقات الإحصائيات ثلاثية الأبعاد -->
    <div class="stats-grid-premium">
      <div class="stat-card-3d">
        <div class="stat-icon">
          <i class="fas fa-folder-open"></i>
        </div>
        <div class="stat-number-3d">${totalConsultations}</div>
        <div class="stat-label-3d">إجمالي الاستشارات</div>
      </div>
      
      <div class="stat-card-3d">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-number-3d">${consultationsAvecOffres}</div>
        <div class="stat-label-3d">بعروض مقدمة</div>
      </div>
      
      <div class="stat-card-3d">
        <div class="stat-icon">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="stat-number-3d">${consultationsSansOffres}</div>
        <div class="stat-label-3d">بدون عروض</div>
      </div>
      
      <div class="stat-card-3d">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-number-3d">${chargesUniques}</div>
        <div class="stat-label-3d">المسؤولين النشطين</div>
      </div>
    </div>

    <!-- شريط البحث الإبداعي -->
    <div class="search-creative">
      <div class="search-wrapper-premium">
        <input type="text" class="input-premium" id="searchInput" placeholder="🔍 ابحث برقم الاستشارة، الوصف، أو المسؤول...">
        <button class="btn-premium btn-primary-premium" onclick="showAddModal()">
          <i class="fas fa-plus"></i> إضافة استشارة
        </button>
        <button class="btn-premium btn-secondary-premium" onclick="toggleFilters()">
          <i class="fas fa-filter"></i> فلترة متقدمة
        </button>
        <button class="btn-premium btn-secondary-premium" onclick="exportTable()">
          <i class="fas fa-download"></i> تصدير
        </button>
      </div>

      <!-- لوحة الفلاتر المتقدمة -->
      <div class="filters-advanced" id="filtersPanel">
        <div class="filters-grid">
          <div class="filter-item">
            <label>📅 تاريخ الإطلاق</label>
            <input type="date" id="dateLancementFilter">
          </div>
          <div class="filter-item">
            <label>📅 تاريخ التسليم</label>
            <input type="date" id="dateRemiseFilter">
          </div>
          <div class="filter-item">
            <label>👤 المسؤول</label>
            <select id="chargeFilter">
              <option value="">الكل</option>
              <option value="OULD HAMOUDA DHEHBIYA">ولد حمودة ذهبية</option>
              <option value="FAID KAMEL">فايد كمال</option>
              <option value="MESSAHEL ABDELDJALIL">مساهل عبد الجليل</option>
              <option value="MEGAMEZ ABDALLAH">مقامز عبد الله</option>
              <option value="CHELGHOUM HAMZA">شلغوم حمزة</option>
              <option value="DAOUADI BELKACEM">دواودي بلقاسم</option>
              <option value="KEDAID AHMED">كديد أحمد</option>
            </select>
          </div>
          <div class="filter-item">
            <label>🔄 التمديد</label>
            <select id="prorogationFilter">
              <option value="">الكل</option>
              <option value="OUI">مع التمديد</option>
              <option value="NON">بدون تمديد</option>
            </select>
          </div>
          <div class="filter-item">
            <label>📊 العروض</label>
            <select id="offresFilter">
              <option value="">الكل</option>
              <option value="avec">مع عروض</option>
              <option value="sans">بدون عروض</option>
            </select>
          </div>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <button class="btn-premium btn-primary-premium" onclick="applyFilters()">
            <i class="fas fa-check"></i> تطبيق
          </button>
          <button class="btn-premium btn-secondary-premium" onclick="resetFilters()">
            <i class="fas fa-undo"></i> إعادة تعيين
          </button>
        </div>
      </div>
    </div>

    <!-- الجدول المتطور -->
    <div class="table-premium-container">
      <table class="table-premium" id="consultationsTable">
        <thead>
          <tr>
            <th onclick="sortTable(0)">📋 الرقم <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(1)">📝 الوصف <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(2)">📅 تاريخ الإطلاق <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(3)">⏰ تاريخ التسليم <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(4)">🔄 التمديد <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(5)">📊 العروض <i class="fas fa-sort"></i></th>
            <th onclick="sortTable(6)">👤 المسؤول <i class="fas fa-sort"></i></th>
            <th>⚙️ الإجراءات</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          ${rows}
        </tbody>
      </table>
    </div>

    <!-- الترقيم المتقدم -->
    <div class="pagination-premium" id="pagination"></div>

    <!-- التذييل الإبداعي -->
    <footer class="footer-premium">
      <div>
        <i class="far fa-copyright"></i>
        2025 SARPI Spa - جميع الحقوق محفوظة
      </div>
      
      <div>
        <i class="fas fa-paint-brush" style="color: #ffd700;"></i>
        تصميم: <span style="color: #ffd700; font-weight: 700;">ABDELHAKEM LAMINE</span>
      </div>
      
      <div class="social-links-3d">
        <a href="#" class="social-link-3d"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-link-3d"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" class="social-link-3d"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link-3d"><i class="fab fa-github"></i></a>
      </div>
    </footer>
  </div>

  <script>
    let currentEditId = null;
    let currentPage = 1;
    const itemsPerPage = 10;
    const consultations = ${JSON.stringify(consultations)};

    // تحديث الوقت
    function updateDateTime() {
      const now = new Date();
      document.getElementById('currentDateTime').textContent = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    setInterval(updateDateTime, 1000);

    // إظهار نافذة الإضافة
    function showAddModal() {
      document.getElementById('modalTitle').textContent = '➕ إضافة استشارة جديدة';
      document.getElementById('consultationForm').reset();
      document.getElementById('consultationId').value = '';
      currentEditId = null;
      document.getElementById('consultationModal').classList.add('active');
    }

    // إغلاق النوافذ
    function closeModal() {
      document.getElementById('consultationModal').classList.remove('active');
    }

    function closeViewModal() {
      document.getElementById('viewModal').classList.remove('active');
    }

    // عرض التفاصيل
    function showConsultation(index) {
      const c = consultations[index];
      const content = document.getElementById('viewContent');
      content.innerHTML = \`
        <p><i class="fas fa-hashtag" style="color: #667eea; width: 25px;"></i> <strong>رقم الاستشارة:</strong> \${c.numero}</p>
        <p><i class="fas fa-align-left" style="color: #667eea; width: 25px;"></i> <strong>الوصف:</strong> \${c.designation}</p>
        <p><i class="fas fa-calendar-plus" style="color: #667eea; width: 25px;"></i> <strong>تاريخ الإطلاق:</strong> \${new Date(c.dateLancement).toLocaleDateString('fr-FR')}</p>
        <p><i class="fas fa-calendar-check" style="color: #667eea; width: 25px;"></i> <strong>تاريخ التسليم:</strong> \${new Date(c.dateRemise).toLocaleDateString('fr-FR')}</p>
        <p><i class="fas fa-clock" style="color: #667eea; width: 25px;"></i> <strong>التمديد:</strong> \${c.prorogation || 'NON'}</p>
        <p><i class="fas fa-chart-bar" style="color: #667eea; width: 25px;"></i> <strong>عدد العروض:</strong> \${c.nombreOffres || 0}</p>
        <p><i class="fas fa-user-tie" style="color: #667eea; width: 25px;"></i> <strong>المسؤول:</strong> \${c.charge}</p>
      \`;
      document.getElementById('viewModal').classList.add('active');
    }

    // تعديل استشارة
    function editConsultation(index) {
      const secret = prompt('🔐 الرقم السري (2026):');
      if (secret !== '2026') {
        showToast('الرقم السري غير صحيح!', 'error');
        return;
      }
      
      const c = consultations[index];
      document.getElementById('modalTitle').textContent = '✏️ تعديل الاستشارة';
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

    // حذف استشارة
    function deleteConsultation(index) {
      const secret = prompt('🔐 الرقم السري (2026):');
      if (secret !== '2026') {
        showToast('الرقم السري غير صحيح!', 'error');
        return;
      }
      
      if (confirm('هل أنت متأكد من حذف هذه الاستشارة؟')) {
        window.location.href = '/delete/' + index + '?secretCode=' + secret;
      }
    }

    // معالجة تقديم النموذج
    function handleSubmit(event) {
      event.preventDefault();
      const secret = prompt('🔐 الرقم السري (2026):');
      
      if (secret !== '2026') {
        showToast('الرقم السري غير صحيح!', 'error');
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

    // تبديل لوحة الفلاتر
    function toggleFilters() {
      document.getElementById('filtersPanel').classList.toggle('active');
    }

    // تطبيق الفلاتر
    function applyFilters() {
      const dateLancement = document.getElementById('dateLancementFilter').value;
      const dateRemise = document.getElementById('dateRemiseFilter').value;
      const charge = document.getElementById('chargeFilter').value;
      const prorogation = document.getElementById('prorogationFilter').value;
      const offres = document.getElementById('offresFilter').value;
      
      showToast('تم تطبيق الفلاتر بنجاح', 'success');
      document.getElementById('filtersPanel').classList.remove('active');
    }

    // إعادة تعيين الفلاتر
    function resetFilters() {
      document.getElementById('dateLancementFilter').value = '';
      document.getElementById('dateRemiseFilter').value = '';
      document.getElementById('chargeFilter').value = '';
      document.getElementById('prorogationFilter').value = '';
      document.getElementById('offresFilter').value = '';
      
      showToast('تم إعادة تعيين الفلاتر', 'info');
      document.getElementById('filtersPanel').classList.remove('active');
    }

    // البحث في الجدول
    document.getElementById('searchInput').addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('#tableBody tr');
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    });

    // ترتيب الجدول
    function sortTable(column) {
      const table = document.getElementById('consultationsTable');
      const tbody = table.tBodies[0];
      const rows = Array.from(tbody.rows);
      
      const sorted = rows.sort((a, b) => {
        let aVal = a.cells[column].textContent;
        let bVal = b.cells[column].textContent;
        
        if (column === 2 || column === 3) { // Dates
          aVal = new Date(aVal.split('/').reverse().join('-'));
          bVal = new Date(bVal.split('/').reverse().join('-'));
        } else if (column === 0 || column === 5) { // Numbers
          aVal = parseInt(aVal.replace(/[^0-9]/g, '')) || 0;
          bVal = parseInt(bVal.replace(/[^0-9]/g, '')) || 0;
        }
        
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });
      
      tbody.append(...sorted);
      showToast('تم ترتيب الجدول', 'info');
    }

    // تصدير الجدول
    function exportTable() {
      let csv = "رقم الاستشارة,الوصف,تاريخ الإطلاق,تاريخ التسليم,التمديد,عدد العروض,المسؤول\\n";
      
      consultations.forEach(c => {
        csv += \`\${c.numero},"\${c.designation.replace(/"/g, '""')}",\${c.dateLancement},\${c.dateRemise},\${c.prorogation || 'NON'},\${c.nombreOffres || 0},\${c.charge}\\n\`;
      });
      
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'consultations.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      
      showToast('تم تصدير البيانات بنجاح', 'success');
    }

    // إظهار الإشعارات
    function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = 'toast-premium ' + type;
      
      let icon = 'info-circle';
      if (type === 'success') icon = 'check-circle';
      if (type === 'error') icon = 'exclamation-circle';
      
      toast.innerHTML = \`<i class="fas fa-\${icon}"></i> \${message}\`;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }

    // منع النقر بالزر الأيمن
    document.addEventListener('contextmenu', e => e.preventDefault());

    // رسالة ترحيبية
    console.log('%c✨✨✨ SARPI Premium System v3.0 ✨✨✨', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 تم التطوير بواسطة: ABDELHAKEM LAMINE', 'color: #764ba2; font-size: 16px;');
    console.log('%c📊 إجمالي الاستشارات: ' + consultations.length, 'color: #2ecc71; font-size: 14px;');
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

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `✨✨✨ SARPI Premium System v3.0 ✨✨✨`);
  console.log(`\x1b[32m%s\x1b[0m`, `🚀 الخادم يعمل على: http://localhost:${PORT}`);
  console.log(`\x1b[33m%s\x1b[0m`, `🔐 الرقم السري: ${SECRET_CODE}`);
  console.log(`\x1b[35m%s\x1b[0m`, `👤 حساب المسؤول: admin / 0000`);
});
