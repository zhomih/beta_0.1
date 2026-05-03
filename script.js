const cart = [];

function addToCart(name) {
  cart.push(name);
  renderCart();
}

function renderCart() {
  const el = document.getElementById("cartItems");

  if (cart.length === 0) {
    el.textContent = "Пока пусто. Коты обижены.";
    return;
  }

  el.innerHTML = cart.map((item, i) => `${i + 1}. ${item}`).join("<br>");
}

function checkout() {
  const message = document.getElementById("message");

  if (cart.length === 0) {
    message.textContent = "Сначала выбери кота 😭";
    return;
  }

  message.textContent = "Коты уже выехали в Telegram 🚀";
}
