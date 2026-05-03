let balance = 100;
const cart = [];

const balanceEl = document.getElementById("balance");
const cartCountEl = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const messageEl = document.getElementById("message");
const gameMessageEl = document.getElementById("gameMessage");

const cartOverlay = document.getElementById("cartOverlay");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const earnBtn = document.getElementById("earnBtn");

const openRulesBtn = document.getElementById("openRulesBtn");
const closeRulesBtn = document.getElementById("closeRulesBtn");
const rulesOverlay = document.getElementById("rulesOverlay");
const fireworksEl = document.getElementById("fireworks");

function updateBalance() {
  balanceEl.textContent = balance;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function animateElement(element) {
  if (!element) return;

  element.classList.remove("pop");
  void element.offsetWidth;
  element.classList.add("pop");
}

function animateButton(button) {
  if (!button) return;

  button.classList.remove("button-pop");
  void button.offsetWidth;
  button.classList.add("button-pop");
}

function renderCart() {
  cartCountEl.textContent = cart.length;
  cartTotalEl.textContent = getCartTotal();

  if (cart.length === 0) {
    cartItemsEl.textContent = "Пока пусто. Коты обижены.";
    return;
  }

  cartItemsEl.innerHTML = cart
    .map((item, index) => {
      return `
        <div class="cart-row">
          <div class="cart-row-info">
            <div>${item.name}</div>
            <div class="cart-row-price">${item.price} КотоКоинов</div>
          </div>
          <button class="remove-item" data-index="${index}">×</button>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      removeFromCart(index);
    });
  });
}

function addToCart(name, price, button) {
  if (balance < price) {
    messageEl.textContent = `Не хватает ${price - balance} КотоКоинов. Иди тыкать лапу 🐾`;
    openCart();
    animateElement(document.querySelector(".balance"));
    return;
  }

  balance -= price;

  cart.push({
    name,
    price
  });

  updateBalance();
  renderCart();
  animateElement(document.querySelector(".balance"));
  animateButton(button);

  messageEl.textContent = `${name} добавлен в корзину. Списано ${price} КотоКоинов 🐾`;
}

function removeFromCart(index) {
  const item = cart[index];

  if (!item) return;

  balance += item.price;
  cart.splice(index, 1);

  updateBalance();
  renderCart();
  animateElement(document.querySelector(".balance"));

  messageEl.textContent = `${item.name} убран из корзины. Вернули ${item.price} КотоКоинов 😼`;
}

function clearCart() {
  const refund = getCartTotal();

  if (cart.length === 0) {
    messageEl.textContent = "Корзина и так пустая, бро.";
    return;
  }

  balance += refund;
  cart.length = 0;

  updateBalance();
  renderCart();
  animateElement(document.querySelector(".balance"));

  messageEl.textContent = `Корзина очищена. Вернули ${refund} КотоКоинов.`;
}

function openCart() {
  cartOverlay.classList.add("active");
  renderCart();
}

function closeCart() {
  cartOverlay.classList.remove("active");
}

function checkout() {
  if (cart.length === 0) {
    messageEl.textContent = "Сначала выбери кота, бро 😭";
    return;
  }

  cart.length = 0;
  renderCart();

  messageEl.textContent = "Мяу-заказ оформлен! Коты уже летят в Telegram 🐈";
}

function openRules() {
  rulesOverlay.classList.add("active");
}

function closeRules() {
  rulesOverlay.classList.remove("active");
}

function launchFireworks() {
  fireworksEl.innerHTML = "";
  fireworksEl.classList.add("active");

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.className = "firework";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.6;

    const moveX = (Math.random() - 0.5) * 260;
    const moveY = (Math.random() - 0.5) * 260;

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty("--x", `${moveX}px`);
    particle.style.setProperty("--y", `${moveY}px`);

    fireworksEl.appendChild(particle);
  }

  setTimeout(() => {
    fireworksEl.classList.remove("active");
    fireworksEl.innerHTML = "";
  }, 1000);
}

function earnCoins() {
  const baseDrop = Math.floor(Math.random() * 5) + 1;

  let multiplier = 1;
  let bonusText = "Обычный тык 🐾";

  const chance = Math.random();

  if (chance < 0.05) {
    multiplier = 5;
    bonusText = "ДЖЕКПОТ-МЯУ! x5 😼🔥";
    launchFireworks();
  } else if (chance < 0.25) {
    multiplier = 2;
    bonusText = "Крит-мяу! x2 😺";
  }

  const reward = baseDrop * multiplier;

  balance += reward;
  updateBalance();

  document.getElementById("lastDrop").textContent = reward;
  document.getElementById("multiplier").textContent = `x${multiplier}`;

  gameMessageEl.textContent = `+${reward} КотоКоинов. ${bonusText}`;

  animateElement(document.querySelector(".balance"));
  animateElement(earnBtn);
}

document.querySelectorAll(".buy-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    addToCart(name, price, button);
  });
});

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", checkout);
clearCartBtn.addEventListener("click", clearCart);
earnBtn.addEventListener("click", earnCoins);

openRulesBtn.addEventListener("click", openRules);
closeRulesBtn.addEventListener("click", closeRules);

cartOverlay.addEventListener("click", (event) => {
  if (event.target === cartOverlay) {
    closeCart();
  }
});

rulesOverlay.addEventListener("click", (event) => {
  if (event.target === rulesOverlay) {
    closeRules();
  }
});

updateBalance();
renderCart();
