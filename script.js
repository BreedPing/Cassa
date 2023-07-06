let order = {};
let total = 0;
let sum = localStorage.getItem('totalSum') || 0; // Recupera il totale incassato dal localStorage

function addProduct(productName, price) {
    if (order[productName]) {
        order[productName]++;
    } else {
        order[productName] = 1;
    }
    total += price;

    updateOrderList();
    updateTotalLabel();
}

function removeProduct(productName, price) {
    if (order[productName]) {
        order[productName]--;
        if (order[productName] === 0) {
            delete order[productName];
        }
        total -= price;

        updateOrderList();
        updateTotalLabel();
    }
}

function updateOrderList() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    for (const [productName, quantity] of Object.entries(order)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${productName} ${quantity}`;
        listItem.addEventListener('mouseover', () => {
            listItem.style.color = 'red';
        });
        listItem.addEventListener('mouseout', () => {
            listItem.style.color = '';
        });
        listItem.addEventListener('click', () => {
            removeProduct(productName, getPrice(productName));
        });
        orderList.appendChild(listItem);
    }
}

function getPrice(productName) {
    // Aggiungi qui la logica per ottenere il prezzo in base al nome del prodotto
    // Ad esempio, puoi usare un oggetto o una mappa che associ i prezzi ai nomi dei prodotti
    // Esempio:
    const prices = {
        'Patatine': 4,
        'Risotto': 6,
        'Birra': 4,
        'Acqua': 1
    };
    return prices[productName];
}

function updateTotalLabel() {
    const totalLabel = document.getElementById('total-label');
    totalLabel.textContent = `Totale: ${total}€`;
}

function confirmOrder() {
    sum = Number(sum) + total; // Aggiorna il totale incassato
    localStorage.setItem('totalSum', sum); // Salva il totale incassato nel localStorage

    order = {};
    total = 0;
    updateOrderList();
    updateTotalLabel();
    updateSumLabel();
}

function updateSumLabel() {
    const sumLabel = document.getElementById('sum-label');
    sumLabel.textContent = `Totale Incassato: ${sum}€`;
}

function adminLogin() {
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value;

    if (password === 'Lorileo3') {
        passwordInput.value = '';
        toggleAdminMode(true);
    }
}

function toggleAdminMode(loggedIn) {
    const adminPanel = document.getElementById('admin-panel');
    const loginContainer = document.getElementById('login-container');
    const adminCommands = document.getElementById('admin-commands');
    const logoutButton = document.getElementById('logout-button');

    if (loggedIn) {
        adminPanel.classList.add('admin-mode');
        loginContainer.style.display = 'none';
        adminCommands.style.display = 'block';
        logoutButton.style.display = 'block';
    } else {
        adminPanel.classList.remove('admin-mode');
        loginContainer.style.display = 'block';
        adminCommands.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}

function resetOrder() {
    order = {};
    total = 0;
    updateOrderList();
    updateTotalLabel();
}

function clearTotal() {
    sum = 0;
    localStorage.removeItem('totalSum');
    updateSumLabel();
}

function logout() {
    toggleAdminMode(false);
}

updateTotalLabel();
updateSumLabel();
