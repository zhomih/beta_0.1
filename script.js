let balance = 100;
const cart = [];

function updateBalance() {
  document.getElementById("balance").textContent = balance;
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();

  const message = document.getElementById("message");
  if (message) {
    message.textContent = `${name} добавлен в корзину 🐾`;
  }

  animateBalance();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;

  if (cart.length === 0) {
    cartItems.textContent = "Пока пусто. Коты обижены.";
    return;
  }

  cartItems.innerHTML = cart
    .map((item, index) => `${index + 1}. ${item.name} — ${item.price} КотоКоинов`)
    .join("<br>");
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("active");
  renderCart();
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("active");
}

function checkout() {
  const message = document.getElementById("message");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    message.textContent = "Сначала выбери кота, бро 😭";
    return;
  }

  if (balance < total) {
    message.textContent = `Не хватает ${total - balance} КотоКоинов. Иди тыкать лапу 🐾`;
    return;
  }

  balance = balance - total;
  cart.length = 0;

  updateBalance();
  renderCart();
  animateBalance();

  message.textContent = `Покупка успешна! Списано ${total} КотоКоинов 🐈`;
}

  balance -= total;
  cart.length = 0;

  updateBalance();
  renderCart();

  message.textContent = "Покупка успешна! Коты уже летят в Telegram 🐈";
  animateBalance();
}

function clearCart() {
  cart.length = 0;
  renderCart();

  const message = document.getElementById("message");
  message.textContent = "Корзина очищена. Коты ушли грустить.";
}

function earnCoins() {
  balance += 1;
  updateBalance();

  const gameMessage = document.getElementById("gameMessage");
  gameMessage.textContent = "+1 КотоКоин! Котолапа довольна 🐾";

  const paw = document.querySelector(".paw");
  paw.classList.remove("pop");
  void paw.offsetWidth;
  paw.classList.add("pop");

  animateBalance();
}

function animateBalance() {
  const balanceBox = document.querySelector(".balance");
  balanceBox.classList.remove("pop");
  void balanceBox.offsetWidth;
  balanceBox.classList.add("pop");
}

updateBalance();
renderCart();
