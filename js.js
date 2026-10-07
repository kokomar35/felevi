const attractionsJSON = [
    {
        "title": "Mennydörgés Hullámvasút",
        "category": "Extrém",
        "desc": "A park legvadabb élménye tűz- és fényeffektekkel kísérve.",
        "icon": "bi-lightning-charge",
        "badgeColor": "bg-danger"
    },
    {
        "title": "Csillagfényes Óriáskerék",
        "category": "Családi",
        "desc": "50 méter magasból lenyűgöző panoráma nyílik az egész vidámparkra.",
        "icon": "bi-circle-half",
        "badgeColor": "bg-primary"
    },
    {
        "title": "Kísértetkastély",
        "category": "Interaktív",
        "desc": "Borzongás és rejtélyes kalandok a sötétben, ahol minden sarkon meglepetés vár.",
        "icon": "bi-moon-stars",
        "badgeColor": "bg-warning text-dark"
    },
    {
        "title": "Vad Vízi Kaland",
        "category": "Vizes",
        "desc": "Hűsítő zuhanások és sodró folyók a forró nyári napokra.",
        "icon": "bi-water",
        "badgeColor": "bg-info text-dark"
    },
    {
        "title": "Körhuta & Gyerekvilág",
        "category": "Legkisebbeknek",
        "desc": "Vidám mesefigurák és biztonságos hinták a legkisebb látogatóinknak.",
        "icon": "bi-emoji-smile",
        "badgeColor": "bg-success"
    },
    {
        "title": "Szabadtéri Színpad & Show",
        "category": "Program",
        "desc": "Egész napos bűvészműsorok, akrobaták és élő koncertek.",
        "icon": "bi-music-note-beamed",
        "badgeColor": "bg-purple text-white"
    }
];

function loadAttractionsData() {
    const container = document.getElementById('attractionsContainer');
    container.innerHTML = `
        <div class="text-center py-5 col-12 text-secondary">
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Frissítés...</span>
            </div>
            <p class="mt-2">JSON adatok lekérése...</p>
        </div>
    `;

    setTimeout(() => {
        let htmlContent = '';
        attractionsJSON.forEach(item => {
            htmlContent += `
                <div class="col-md-4">
                    <div class="card attraction-card h-100 p-4 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div class="bg-danger bg-opacity-25 text-danger rounded-3 p-3 d-inline-block">
                                    <i class="bi ${item.icon} fs-3"></i>
                                </div>
                                <span class="badge ${item.badgeColor} px-3 py-1 rounded-pill">${item.category}</span>
                            </div>
                            <h4 class="card-title fw-bold mb-3 text-white">${item.title}</h4>
                            <p class="card-text text-secondary">${item.desc}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
    }, 600);
}

document.addEventListener('DOMContentLoaded', function () {
    loadAttractionsData();

    document.getElementById('loadAttractionsBtn').addEventListener('click', loadAttractionsData);

    const ticketTypeSelect = document.getElementById('ticketType');
    const ticketCountInput = document.getElementById('ticketCount');
    const totalPriceSpan = document.getElementById('totalPrice');

    function updatePrice() {
        const pricePerItem = parseInt(ticketTypeSelect.value) || 0;
        const count = parseInt(ticketCountInput.value) || 1;
        const total = pricePerItem * count;
        totalPriceSpan.textContent = total.toLocaleString('hu-HU') + ' Ft';
    }

    ticketTypeSelect.addEventListener('change', updatePrice);
    ticketCountInput.addEventListener('input', updatePrice);

    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    const ticketForm = document.getElementById('ticketForm');
    ticketForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!ticketTypeSelect.value) {
            alert('Kérlek válassz egy jegytípust!');
            return;
        }

        document.getElementById('paymentModalPrice').textContent = totalPriceSpan.textContent;
        paymentModal.show();
    });

    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedOptionText = ticketTypeSelect.options[ticketTypeSelect.selectedIndex].text;
        const count = ticketCountInput.value;
        const totalPriceText = totalPriceSpan.textContent;

        paymentModal.hide();

        document.getElementById('modalTicketName').textContent = selectedOptionText;
        document.getElementById('modalTicketQty').textContent = count;
        document.getElementById('modalTicketPrice').textContent = totalPriceText;

        successModal.show();
        paymentForm.reset();
    });
});
