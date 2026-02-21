// Données des consultations
const consultationsData = [
   
       



{
        id: 1,
        numero: "135",
        designation: "MISE A DISPOSITION DE DEUX (02) GRUES ROUTIERES DE 50 T A 60 T, NEUVE OU TRES BON ETAT AVEC CONDUCTEURS QUALIFIES ",
        dateLancement: "2025-05-26",
        dateRemise: "2025-06-15",
        prorogation: "2025-06-19",
        nombreOffres: "05",
        charge: "FAID KAMEL"
    },

 
 {
        id: 2,
        numero: "141",
        designation: "FOURNITURE, TRANSPORT, INSTALLATION & LA MISE EN SERVICE DES : OUTILS P/ ATELIER DE VULCANISATION",
        dateLancement: "2025-06-02",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "////////////",
        charge: "FAID KAMEL"
    },

{
        id: 3,
        numero: "143",
        designation: " FOURNITURE & TRANSPORT DE SIX (06) FOURS ISOLEES A CHALEUR VENTILEES, EN DEUX (02) LOTS",
        dateLancement: "2025-06-03",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "01",
           charge: "FAID KAMEL"
    },
{
        id: 4,
        numero: "144",
        designation: " FOURNITURE, TRANSPORT & LA MISE EN SERVICE AVEC L’ASSITANCE TECHNIQUE DE : MACHINE DE DECOUPE AU JET D’EAU (CNC)",
        dateLancement: "2025-06-05",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "01",
           charge: "FAID KAMEL"
    },
{
        id: 5,
        numero: "145",
        designation: " MISE A DISPOSITION D’UN (01) CAMION GRUE 7T – MOINS DE DIX (10) ANS, AVEC OPERATEUR QUALIFIE",
        dateLancement: "2025-06-04",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "04",
           charge: "FAID KAMEL"
    },
{
        id: 6,
        numero: "146",
        designation: " MISE A DISPOSITION D’UN (01) CAMION RAVITAILLEUR GASOIL DE 10 M³, AVEC ACCESSOIRES, ET CHAUFFEUR QUALIFIE, & AUTORISATION DE TRANSPORT PRODUITS DANGEREUX ",
        dateLancement: "2025-06-10",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "02",
        charge: "OULD HAMOUDA DHEHBIYA"
    },
{
        id: 7,
        numero: "147",
        designation: " FOURNITURE ET TRANSPORT DE PRODUITS SIDERURGIQUES AVEC CERTIFICATS DE CONFORMITE ET FICHES TECHNIQUES EN TROIS LOTS",
        dateLancement: "2025-06-10",
        dateRemise: "2025-06-19",
        prorogation: "2025-06-24",
        nombreOffres: "////////////",
          charge: "CHELGHOUM HAMZA"
    },
{
        id: 8,
        numero: "148",
        designation: " MISE A DISPOSITION D’UN (01) GROUPE ELECTROGENE 55 KVA DIESEL NEUF OU EN TRES BON ETAT AVEC CERTIFICAT DE CONFORMITE",
        dateLancement: "2025-06-10",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "03",
           charge: "CHELGHOUM HAMZA"
    },
{
        id: 9,
        numero: "149",
        designation: " MISE A DISPOSITION DE TROIS (03) AMBULANCES 4X4 MEDICALISEES DIESEL CLIMATISEES AVEC AMBULANCIERS QUALIFIES ",
        dateLancement: "2025-06-11",
        dateRemise: "2025-06-22",
        prorogation: "NON",
        nombreOffres: "////////////",
        charge: "OULD HAMOUDA DHEHBIYA"
    },
{
        id: 10,
        numero: "150",
        designation: " MISE A DISPOSITION D’UN (01) VEHICULE TOURISTIQUES CLIMATISE SANS CHAUFFEURS MOINS DE TROIS 3 ANS ",
        dateLancement: "2025-06-11",
        dateRemise: "2025-06-23",
        prorogation: "NON",
        nombreOffres: "////////////",
        charge: "OULD HAMOUDA DHEHBIYA"
    },
{
        id: 11,
        numero: "151",
        designation: " MISE A DISPOSITION D’UN TRACTEUR ROUTIER 4X2 AVEC REMORQUE 20T NEUF OU EN TRES BON ETAT MOINS DE 10 ANS DE MISE EN CIRCULATION AVEC CHAUFFEURS QUALIFIES ",
        dateLancement: "2025-06-15",
        dateRemise: "2025-06-24",
        prorogation: "NON",
        nombreOffres: "03",
         charge: "CHELGHOUM HAMZA"
    },
{
        id: 12,
        numero: "152",
        designation: " FOURNITURE & TRANSPORT DE : DALLE DE SOL & ARTICLES QUINCAILLERIE ",
        dateLancement: "2025-06-16",
        dateRemise: "2025-06-25",
        prorogation: "NON",
     nombreOffres: "////////////",
         charge: "CHELGHOUM HAMZA"
    },
{
        id: 13,
        numero: "153",
        designation: " FOURNITURE & TRANSPORT CONSOMMABLE ELECTRIQUE ",
        dateLancement: "2025-06-16",
        dateRemise: "2025-06-25",
        prorogation: "NON",
       nombreOffres: "////////////",
         charge: "CHELGHOUM HAMZA"
    },


{
        id: 14,
        numero: "MEC N° 015 ",
        designation: "MISE A DISPOSITION D’UN (01) CHARIOT ELEVATEUR TELESCOPIQUE 4X4 DE 7T HAUTEUR DE LEVAGE ≥ 6 M AVEC CABINE NEUVE OU EN TRES BON ETAT MOINS DE 5 ANS DE MISE EN CIRCULATION AVEC OPERATEUR QUALIFIE",
        dateLancement: "2025-06-12",
        dateRemise: "2025-06-19",
        prorogation: "NON",
        nombreOffres: "01",
        charge: "MESSAHEL ABDELDJALIL "
    },
{
        id: 15,
        numero: "MEC N° 016 ",
        designation: "///////////////////////////////////////////////////////////////////",
        dateLancement: "/////////////",
        dateRemise: "/////////////",
        prorogation: "NON",
        nombreOffres: "02",
        charge: "/////////////",
    },
];

// Configuration des particules
const particlesConfig = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#6c5ce7"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#6c5ce7",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

// Variables globales
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [...consultationsData];
let sortColumn = null;
let sortDirection = 'asc';
const ADMIN_PASSWORD = "S1234";
let currentAction = null;
let selectedConsultationId = null;
const backgrounds = [
    "https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg",
    "https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg",
    "https://images.pexels.com/photos/1473673/pexels-photo-1473673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2921137/pexels-photo-2921137.jpeg",
    "https://images.pexels.com/photos/248867/pexels-photo-248867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1463840/pexels-photo-1463840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2921139/pexels-photo-2921139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];
let currentBackgroundIndex = 0;

// Initialisation du document
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les particules
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }

    // Masquer le préchargeur après le chargement
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialiser l'horloge
    updateClock();
    setInterval(updateClock, 1000);

    // Initialiser le changement de fond
    setInterval(changeBackground, 25000);
    changeBackground();

    // Initialiser le tableau
    renderTable();
    updatePagination();
    updateTableStats();

    // Initialiser les écouteurs d'événements
    initEventListeners();

    // Protéger le contenu
    protectContent();
});

// Fonction pour mettre à jour l'horloge
function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('fr-FR', options);
    const timeStr = now.toLocaleTimeString('fr-FR');
    document.getElementById('clock').textContent = `${dateStr} ${timeStr}`;

    // Mettre à jour l'horloge analogique
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    const secondsDegrees = ((seconds / 60) * 360) + 180;
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 180;
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 180;

    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
}

// Fonction pour changer l'arrière-plan
function changeBackground() {
    document.body.style.backgroundImage = `url('${backgrounds[currentBackgroundIndex]}')`;
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
}

// Fonction pour basculer le thème
function toggleTheme() {
    const body = document.body;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
        showToast('Thème clair activé', 'info');
    } else {
        body.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
        showToast('Thème sombre activé', 'info');
    }
}

// Fonction pour formater une date
function formatDate(dateString) {
    if (!dateString) return '';
    
    if (dateString === 'NON') return 'NON';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // Si la date n'est pas valide, essayer de parser le format DD/MM/YYYY
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }
        return dateString;
    }
    
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Fonction pour rendre le tableau
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Calculer les indices de début et de fin pour la pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    
    // Trier les données si nécessaire
    if (sortColumn) {
        filteredData.sort((a, b) => {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];
            
            if (sortColumn === 'numero') {
                valueA = parseInt(valueA) || 0;
                valueB = parseInt(valueB) || 0;
            } else if (sortColumn === 'dateLancement' || sortColumn === 'dateRemise') {
                valueA = new Date(valueA).getTime() || 0;
                valueB = new Date(valueB).getTime() || 0;
            }
            
            if (valueA < valueB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    // Rendre les lignes du tableau
    for (let i = startIndex; i < endIndex; i++) {
        const consultation = filteredData[i];
        const row = document.createElement('tr');
        
        // Ajouter une classe pour l'animation
        row.classList.add('animate__animated', 'animate__fadeIn');
        row.style.animationDelay = `${(i - startIndex) * 0.1}s`;
        
        // Créer les cellules
        row.innerHTML = `
            <td>${consultation.numero}</td>
            <td>${consultation.designation}</td>
            <td>${formatDate(consultation.dateLancement)}</td>
            <td>${formatDate(consultation.dateRemise)}</td>
            <td class="${consultation.prorogation !== 'NON' ? 'blinking-text' : ''}">${consultation.prorogation !== 'NON' ? formatDate(consultation.prorogation) : '<span style="color: #00b894;">NON</span>'}</td>
            <td>${consultation.nombreOffres}</td>
            <td>${consultation.charge}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" data-id="${consultation.id}" title="Voir les détails">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action btn-edit" data-id="${consultation.id}" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" data-id="${consultation.id}" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    }

    // Ajouter les écouteurs d'événements pour les boutons d'action
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            viewConsultation(id);
        });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            editConsultation(id);
        });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            deleteConsultation(id);
        });
    });
}

// Fonction pour mettre à jour la pagination
function updatePagination() {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    // Bouton précédent
    const prevButton = document.createElement('button');
    prevButton.classList.add('pagination-button');
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            updatePagination();
            updateTableStats();
        }
    });
    paginationElement.appendChild(prevButton);
    
    // Numéros de page
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderTable();
            updatePagination();
            updateTableStats();
        });
        paginationElement.appendChild(pageButton);
    }
    
    // Bouton suivant
    const nextButton = document.createElement('button');
    nextButton.classList.add('pagination-button');
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            updatePagination();
            updateTableStats();
        }
    });
    paginationElement.appendChild(nextButton);
}

// Fonction pour mettre à jour les statistiques du tableau
function updateTableStats() {
    const statsElement = document.getElementById('tableStats');
    const totalItems = filteredData.length;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);
    
    statsElement.textContent = `Affichage de ${startItem} à ${endItem} sur ${totalItems} consultations`;
}

// Fonction pour initialiser les écouteurs d'événements
function initEventListeners() {
    // Écouteur pour le basculement de thème
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Écouteur pour le bouton de recherche
    document.getElementById('searchButton').addEventListener('click', searchConsultations);
    
    // Écouteur pour la recherche par touche Entrée
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchConsultations();
        }
    });
    
    // Écouteur pour le basculement des filtres avancés
    document.getElementById('toggleFilters').addEventListener('click', function() {
        const filtersPanel = document.getElementById('filtersPanel');
        filtersPanel.classList.toggle('active');
    });
    
    // Écouteurs pour les boutons de filtres
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    
    // Écouteurs pour les en-têtes de colonne (tri)
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            
            // Déterminer la direction du tri
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            
            // Mettre à jour les classes des en-têtes
            document.querySelectorAll('th').forEach(header => {
                header.classList.remove('sorted-asc', 'sorted-desc');
            });
            
            this.classList.add(`sorted-${sortDirection}`);
            
            // Mettre à jour le tableau
            renderTable();
        });
    });
    
    // Écouteur pour le bouton d'ajout
    document.getElementById('addConsultation').addEventListener('click', function() {
        openAddModal();
    });
    
    // Écouteurs pour les boutons d'exportation
    document.getElementById('exportExcel').addEventListener('click', exportToExcel);
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
    document.getElementById('printTable').addEventListener('click', printTable);
    
    // Écouteurs pour les boutons de fermeture des modals
    document.querySelectorAll('.close-modal, .btn-cancel').forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Écouteur pour le formulaire de consultation
    document.getElementById('consultationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveConsultation();
    });
    
    // Écouteur pour le changement de type de prorogation
    document.querySelectorAll('input[name="prorogation"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const dateProrogation = document.getElementById('dateProrogation');
            if (this.value === 'date') {
                dateProrogation.classList.remove('hidden');
            } else {
                dateProrogation.classList.add('hidden');
            }
        });
    });
    
    // Écouteurs pour les boutons de confirmation
    document.getElementById('confirmYes').addEventListener('click', confirmAction);
    document.getElementById('confirmNo').addEventListener('click', closeAllModals);
}

// Fonction pour rechercher des consultations
function searchConsultations() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        filteredData = [...consultationsData];
    } else {
        filteredData = consultationsData.filter(consultation => {
            return consultation.numero.toLowerCase().includes(searchTerm) ||
                   consultation.designation.toLowerCase().includes(searchTerm) ||
                   consultation.charge.toLowerCase().includes(searchTerm);
        });
    }
    
    currentPage = 1;
    renderTable();
    updatePagination();
    updateTableStats();
    
    showToast(`${filteredData.length} consultation(s) trouvée(s)`, 'info');
}

// Fonction pour appliquer les filtres avancés
function applyFilters() {
    const dateFilter = document.getElementById('dateFilter').value;
    const chargeFilter = document.getElementById('chargeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    filteredData = consultationsData.filter(consultation => {
        let matchDate = true;
        let matchCharge = true;
        let matchStatus = true;
        
        if (dateFilter) {
            matchDate = consultation.dateLancement === dateFilter;
        }
        
        if (chargeFilter) {
            matchCharge = consultation.charge === chargeFilter;
        }
        
        if (statusFilter) {
            if (statusFilter === 'prorogation') {
                matchStatus = consultation.prorogation !== 'NON';
            } else if (statusFilter === 'sans-prorogation') {
                matchStatus = consultation.prorogation === 'NON';
            }
        }
        
        return matchDate && matchCharge && matchStatus;
    });
    
    currentPage = 1;
    renderTable();
    updatePagination();
    updateTableStats();
    
    // Fermer le panneau de filtres
    document.getElementById('filtersPanel').classList.remove('active');
    
    showToast(`${filteredData.length} consultation(s) trouvée(s)`, 'info');
}

// Fonction pour réinitialiser les filtres
function resetFilters() {
    document.getElementById('dateFilter').value = '';
    document.getElementById('chargeFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('searchInput').value = '';
    
    filteredData = [...consultationsData];
    currentPage = 1;
    renderTable();
    updatePagination();
    updateTableStats();
    
    // Fermer le panneau de filtres
    document.getElementById('filtersPanel').classList.remove('active');
    
    showToast('Filtres réinitialisés', 'info');
}

// Fonction pour ouvrir le modal d'ajout
function openAddModal() {
    // Réinitialiser le formulaire
    document.getElementById('consultationForm').reset();
    document.getElementById('consultationId').value = '';
    document.getElementById('dateProrogation').classList.add('hidden');
    
    // Mettre à jour le titre du modal
    document.getElementById('modalTitle').textContent = 'Ajouter une consultation';
    
    // Ouvrir le modal
    document.getElementById('consultationModal').classList.add('active');
}

// Fonction pour voir les détails d'une consultation
function viewConsultation(id) {
    const consultation = consultationsData.find(c => c.id === id);
    if (!consultation) return;
    
    const detailsContainer = document.getElementById('consultationDetails');
    detailsContainer.innerHTML = `
        <div class="consultation-detail">
            <h4>N° de consultation:</h4>
            <p>${consultation.numero}</p>
        </div>
        <div class="consultation-detail">
            <h4>Désignation de prestation:</h4>
            <p>${consultation.designation}</p>
        </div>
        <div class="consultation-detail">
            <h4>Date de lancement:</h4>
            <p>${formatDate(consultation.dateLancement)}</p>
        </div>
        <div class="consultation-detail">
            <h4>Date limite de remise des offres:</h4>
            <p>${formatDate(consultation.dateRemise)}</p>
        </div>
        <div class="consultation-detail">
            <h4>Prorogation:</h4>
            <p>${consultation.prorogation !== 'NON' ? formatDate(consultation.prorogation) : '<span style="color: #00b894;">NON</span>'}</p>
        </div>
        <div class="consultation-detail">
            <h4>Nombre des offres:</h4>
            <p>${consultation.nombreOffres}</p>
        </div>
        <div class="consultation-detail">
            <h4>Chargé(e) du dossier:</h4>
            <p>${consultation.charge}</p>
        </div>
    `;
    
    // Ouvrir le modal
    document.getElementById('viewModal').classList.add('active');
}

// Fonction pour éditer une consultation
function editConsultation(id) {
    const consultation = consultationsData.find(c => c.id === id);
    if (!consultation) return;
    
    // Remplir le formulaire
    document.getElementById('consultationId').value = consultation.id;
    document.getElementById('numero').value = consultation.numero;
    document.getElementById('designation').value = consultation.designation;
    document.getElementById('dateLancement').value = consultation.dateLancement;
    document.getElementById('dateRemise').value = consultation.dateRemise;
    
    if (consultation.prorogation === 'NON') {
        document.querySelector('input[name="prorogation"][value="NON"]').checked = true;
        document.getElementById('dateProrogation').classList.add('hidden');
    } else {
        document.querySelector('input[name="prorogation"][value="date"]').checked = true;
        document.getElementById('dateProrogation').classList.remove('hidden');
        document.getElementById('dateProrogation').value = consultation.prorogation;
    }
    
    document.getElementById('nombreOffres').value = consultation.nombreOffres;
    document.getElementById('charge').value = consultation.charge;
    
    // Mettre à jour le titre du modal
    document.getElementById('modalTitle').textContent = 'Modifier la consultation';
    
    // Ouvrir le modal
    document.getElementById('consultationModal').classList.add('active');
}

// Fonction pour supprimer une consultation
function deleteConsultation(id) {
    selectedConsultationId = id;
    currentAction = 'delete';
    
    // Afficher le modal de confirmation
    document.getElementById('confirmMessage').textContent = 'Êtes-vous sûr de vouloir supprimer cette consultation?';
    document.getElementById('passwordGroup').style.display = 'block';
    document.getElementById('confirmModal').classList.add('active');
}

// Fonction pour sauvegarder une consultation
function saveConsultation() {
    // Vérifier si c'est un ajout ou une modification
    const id = document.getElementById('consultationId').value;
    
    // Demander le mot de passe
    currentAction = id ? 'edit' : 'add';
    selectedConsultationId = id ? parseInt(id) : null;
    
    // Afficher le modal de confirmation
    document.getElementById('confirmMessage').textContent = `Êtes-vous sûr de vouloir ${id ? 'modifier' : 'ajouter'} cette consultation?`;
    document.getElementById('passwordGroup').style.display = 'block';
    document.getElementById('confirmModal').classList.add('active');
}

// Fonction pour confirmer une action
function confirmAction() {
    const password = document.getElementById('password').value;
    
    if (password !== ADMIN_PASSWORD) {
        showToast('Mot de passe incorrect', 'error');
        return;
    }
    
    switch (currentAction) {
        case 'add':
            addConsultation();
            break;
        case 'edit':
            updateConsultation();
            break;
        case 'delete':
            removeConsultation();
            break;
    }
    
    closeAllModals();
}

// Fonction pour ajouter une consultation
function addConsultation() {
    // Récupérer les valeurs du formulaire
    const numero = document.getElementById('numero').value;
    const designation = document.getElementById('designation').value;
    const dateLancement = document.getElementById('dateLancement').value;
    const dateRemise = document.getElementById('dateRemise').value;
    const prorogationType = document.querySelector('input[name="prorogation"]:checked').value;
    const prorogation = prorogationType === 'NON' ? 'NON' : document.getElementById('dateProrogation').value;
    const nombreOffres = document.getElementById('nombreOffres').value || '////////////';
    const charge = document.getElementById('charge').value;
    
    // Créer un nouvel ID
    const newId = consultationsData.length > 0 ? Math.max(...consultationsData.map(c => c.id)) + 1 : 1;
    
    // Créer la nouvelle consultation
    const newConsultation = {
        id: newId,
        numero,
        designation,
        dateLancement,
        dateRemise,
        prorogation,
        nombreOffres,
        charge
    };
    
    // Ajouter à la liste
    consultationsData.push(newConsultation);
    filteredData = [...consultationsData];
    
    // Mettre à jour le tableau
    renderTable();
    updatePagination();
    updateTableStats();
    
    showToast('Consultation ajoutée avec succès', 'success');
}

// Fonction pour mettre à jour une consultation
function updateConsultation() {
    const id = parseInt(document.getElementById('consultationId').value);
    const consultation = consultationsData.find(c => c.id === id);
    
    if (!consultation) return;
    
    // Mettre à jour les valeurs
    consultation.numero = document.getElementById('numero').value;
    consultation.designation = document.getElementById('designation').value;
    consultation.dateLancement = document.getElementById('dateLancement').value;
    consultation.dateRemise = document.getElementById('dateRemise').value;
    
    const prorogationType = document.querySelector('input[name="prorogation"]:checked').value;
    consultation.prorogation = prorogationType === 'NON' ? 'NON' : document.getElementById('dateProrogation').value;
    
    consultation.nombreOffres = document.getElementById('nombreOffres').value || '////////////';
    consultation.charge = document.getElementById('charge').value;
    
    // Mettre à jour le tableau
    renderTable();
    
    showToast('Consultation modifiée avec succès', 'success');
}

// Fonction pour supprimer une consultation
function removeConsultation() {
    const index = consultationsData.findIndex(c => c.id === selectedConsultationId);
    
    if (index !== -1) {
        consultationsData.splice(index, 1);
        filteredData = [...consultationsData];
        
        // Mettre à jour le tableau
        renderTable();
        updatePagination();
        updateTableStats();
        
        showToast('Consultation supprimée avec succès', 'success');
    }
}

// Fonction pour fermer tous les modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Réinitialiser les variables
    currentAction = null;
    selectedConsultationId = null;
    document.getElementById('password').value = '';
}

// Fonction pour exporter vers Excel
function exportToExcel() {
    if (typeof XLSX === 'undefined') {
        showToast('Bibliothèque Excel non chargée', 'error');
        return;
    }
    
    // Préparer les données
    const data = filteredData.map(consultation => ({
        'N° DE CONSULTATION': consultation.numero,
        'DESIGNATION DE PRESTATION': consultation.designation,
        'DATE DE LANCEMENT': formatDate(consultation.dateLancement),
        'DATE LIMITE DE REMISE DES OFFRES': formatDate(consultation.dateRemise),
        'PROROGATION': consultation.prorogation === 'NON' ? 'NON' : formatDate(consultation.prorogation),
        'NOMBRE DES OFFRES': consultation.nombreOffres,
        'CHARGE(E) DU DOSSIER': consultation.charge
    }));
    
    // Créer un classeur
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Consultations');
    
    // Générer le fichier
    XLSX.writeFile(wb, 'Consultations_SARPI.xlsx');
    
    showToast('Exportation Excel réussie', 'success');
}

// Fonction pour exporter vers PDF
function exportToPDF() {
    if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
        showToast('Bibliothèque PDF non chargée', 'error');
        return;
    }
    
    // Créer un nouveau document PDF
    const { jsPDF } = jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Ajouter un titre
    doc.setFontSize(18);
    doc.text('TABLEAU DE SUIVI DES CONSULTATIONS SARPI 2025', 150, 20, { align: 'center' });
    
    // Ajouter la date d'exportation
    doc.setFontSize(10);
    const today = new Date().toLocaleDateString('fr-FR');
    doc.text(`Exporté le: ${today}`, 20, 30);
    
    // Préparer les données pour le tableau
    const tableColumn = ['N°', 'DESIGNATION', 'DATE LANCEMENT', 'DATE REMISE', 'PROROGATION', 'OFFRES', 'CHARGE'];
    const tableRows = filteredData.map(consultation => [
        consultation.numero,
        consultation.designation.length > 40 ? consultation.designation.substring(0, 40) + '...' : consultation.designation,
        formatDate(consultation.dateLancement),
        formatDate(consultation.dateRemise),
        consultation.prorogation === 'NON' ? 'NON' : formatDate(consultation.prorogation),
        consultation.nombreOffres,
        consultation.charge
    ]);
    
    // Générer le tableau
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: {
            fontSize: 8,
            cellPadding: 2,
            overflow: 'linebreak'
        },
        columnStyles: {
            0: { cellWidth: 15 },
            1: { cellWidth: 80 },
            2: { cellWidth: 25 },
            3: { cellWidth: 25 },
            4: { cellWidth: 25 },
            5: { cellWidth: 15 },
            6: { cellWidth: 30 }
        },
        headStyles: {
            fillColor: [108, 92, 231],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240]
        }
    });
    
    // Ajouter un pied de page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} sur ${pageCount}`, 290, 200, { align: 'right' });
        doc.text('© SARPI Spa - Direction Régionale Hassi R\'mel', 150, 200, { align: 'center' });
    }
    
    // Enregistrer le PDF
    doc.save('Consultations_SARPI.pdf');
    
    showToast('Exportation PDF réussie', 'success');
}

// Fonction pour imprimer le tableau
function printTable() {
    // Créer une fenêtre d'impression
    const printWindow = window.open('', '_blank');
    
    // Préparer le contenu HTML
    let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Tableau des Consultations SARPI</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1 {
                    text-align: center;
                    color: #6c5ce7;
                }
                .info {
                    text-align: center;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #6c5ce7;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                }
                @media print {
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <h1>TABLEAU DE SUIVI DES CONSULTATIONS SARPI 2025</h1>
            <div class="info">
                <p>Direction Régionale Hassi R'mel</p>
                <p>Date d'impression: ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>N° DE CONSULTATION</th>
                        <th>DESIGNATION DE PRESTATION</th>
                        <th>DATE DE LANCEMENT</th>
                        <th>DATE LIMITE DE REMISE DES OFFRES</th>
                        <th>PROROGATION</th>
                        <th>NOMBRE DES OFFRES</th>
                        <th>CHARGE(E) DU DOSSIER</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Ajouter les lignes du tableau
    filteredData.forEach(consultation => {
        printContent += `
            <tr>
                <td>${consultation.numero}</td>
                <td>${consultation.designation}</td>
                <td>${formatDate(consultation.dateLancement)}</td>
                <td>${formatDate(consultation.dateRemise)}</td>
                <td>${consultation.prorogation === 'NON' ? 'NON' : formatDate(consultation.prorogation)}</td>
                <td>${consultation.nombreOffres}</td>
                <td>${consultation.charge}</td>
            </tr>
        `;
    });
    
    // Fermer le tableau et ajouter le pied de page
    printContent += `
                </tbody>
            </table>
            <div class="footer">
                © SARPI Spa - Direction Régionale Hassi R'mel
            </div>
            <div class="no-print">
                <button onclick="window.print()">Imprimer</button>
                <button onclick="window.close()">Fermer</button>
            </div>
        </body>
        </html>
    `;
    
    // Écrire le contenu dans la fenêtre d'impression
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    showToast('Préparation de l\'impression...', 'info');
}

// Fonction pour afficher un toast
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    
    // Créer le toast
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    
    // Ajouter l'icône
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `${icon} ${message}`;
    
    // Ajouter le toast au conteneur
    toastContainer.appendChild(toast);
    
    // Supprimer le toast après 5 secondes
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Fonction pour protéger le contenu
function protectContent() {
    // Désactiver le clic droit
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showToast('Clic droit désactivé pour protéger le contenu', 'warning');
    });
    
    // Désactiver la sélection de texte
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
    
    // Désactiver les raccourcis clavier de copie
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 's' || e.key === 'u' || e.key === 'p')) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                showToast('Raccourci clavier désactivé pour protéger le contenu', 'warning');
            }
        }
    });
}

// Animation du titre de la page
function animateTitle() {
    const titles = [
        "SARPI Spa - Suivi des Consultations",
        "Tableau de Suivi - SARPI Spa",
        "SARPI - Direction Régionale Hassi R'mel",
        "Consultations SARPI 2025"
    ];
    
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let titleElement = document.title;
    
    function updateTitle() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            titleElement = currentTitle.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            }
        } else {
            titleElement = currentTitle.substring(0, currentCharIndex);
            currentCharIndex++;
            
            if (currentCharIndex > currentTitle.length) {
                isDeleting = true;
                setTimeout(updateTitle, 2000); // Pause avant de commencer à supprimer
                return;
            }
        }
        
        document.title = titleElement || " ";
        
        const speed = isDeleting ? 50 : 150; // Vitesse de frappe/suppression
        setTimeout(updateTitle, speed);
    }
    
    updateTitle();
}

// Démarrer l'animation du titre
animateTitle();
