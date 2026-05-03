const cart = [];

function addToCart(name) {
  cart.push(name);
  renderCart();

  const message = document.getElementById("message");
  if (message) {
    message.textContent = `${name} добавлен в корзину 🐾`;
  }
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.textContent = "Пока пусто. Коты обижены.";
    return;
  }

  cartItems.innerHTML = cart
    .map((item, index) => `${index + 1}. ${item}`)
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

  if (cart.length === 0) {
    message.textContent = "Сначала выбери кота, бро 😭";
    return;
  }

  message.textContent = `Заказ оформлен! ${cart.length} кот(а) уже летят в Telegram 🐈`;
}

function clearCart() {
  cart.length = 0;
  renderCart();

  const message = document.getElementById("message");
  message.textContent = "Корзина очищена. Коты ушли грустить.";
}

renderCart();
