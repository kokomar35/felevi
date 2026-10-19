const attractionsJSON = [
    {
        "title": "Családi Hullámvasút",
        "category": "Kaland",
        "desc": "Vidám és biztonságos kanyarok egész családnak.",
        "icon": "bi-emoji-smile"
    },
    {
        "title": "Mese Óriáskerék",
        "category": "Nyugodt",
        "desc": "Csodás kilátás a parkra magasból.",
        "icon": "bi-circle"
    },
    {
        "title": "Vizi Csúszda",
        "category": "Vizes",
        "desc": "Hűsítő élmény a meleg napokon.",
        "icon": "bi-water"
    }
];

function loadAttractions() {
    const container = document.getElementById('attractionsContainer');
    let html = '';

    attractionsJSON.forEach(item => {
        html += `
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-3">
                    <div class="card-body text-center">
                        <div class="text-success mb-3">
                            <i class="bi ${item.icon} fs-1"></i>
                        </div>
                        <span class="badge bg-success bg-opacity-10 text-success mb-2 px-3 py-1 rounded-pill">${item.category}</span>
                        <h4 class="card-title h5 fw-bold">${item.title}</h4>
                        <p class="card-text text-muted small">${item.desc}</p>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadAttractions();

    const ticketTypeSelect = document.getElementById('ticketType');
    const ticketCountInput = document.getElementById('ticketCount');
    const totalPriceSpan = document.getElementById('totalPrice');
    const ticketForm = document.getElementById('ticketForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    function calculateTotal() {
        const price = parseInt(ticketTypeSelect.value) || 0;
        const count = parseInt(ticketCountInput.value) || 1;
        const total = price * count;
        totalPriceSpan.textContent = total.toLocaleString('hu-HU') + ' Ft';
    }

    ticketTypeSelect.addEventListener('change', calculateTotal);
    ticketCountInput.addEventListener('input', calculateTotal);

    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!ticketTypeSelect.value) {
            alert('Kérlek válassz jegytípust!');
            return;
        }

        document.getElementById('modalTicketPrice').textContent = totalPriceSpan.textContent;
        successModal.show();
        ticketForm.reset();
        calculateTotal();
    });
});
