let balance = 107;
const cart = [];

let deliveryInterval = null;
let curseShownThisSession = false;

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

const deliveryBox = document.getElementById("deliveryBox");
const deliveryFill = document.getElementById("deliveryFill");
const deliveryCat = document.getElementById("deliveryCat");
const deliveryStatus = document.getElementById("deliveryStatus");
const deliveryActions = document.getElementById("deliveryActions");
const receivedBtn = document.getElementById("receivedBtn");
const missingBtn = document.getElementById("missingBtn");

const curseOverlay = document.getElementById("curseOverlay");
const curseSpendBtn = document.getElementById("curseSpendBtn");
const curseEarnBtn = document.getElementById("curseEarnBtn");
const keep67Btn = document.getElementById("keep67Btn");
const screamerOverlay = document.getElementById("screamerOverlay");

const deliveryPhrases = [
  "Выбежал из сайта 🐈",
  "Ищет подъезд по запаху котлет 🥩",
  "Пересекает дорогу и делает вид, что он главный 🚦",
  "Едет на поезде без билета 🚆",
  "Проверяет адрес лапкой 🐾",
  "Застрял в розовом пакете 🎀",
  "Спорит с курьером-мяу 📦",
  "Покупает себе рыбку по дороге 🐟",
  "Пытается открыть домофон носом 👃",
  "Сел на лавочку подумать о жизни 🪑",
  "Убеждает голубя уступить дорогу 🕊️",
  "Проверяет, точно ли ты оплатил КотоКоинами 💰",
  "Переходит через лужу как аристократ 💅",
  "Случайно зашёл не в тот подъезд 🏢",
  "Пишет маме, что почти приехал 📱",
  "Остановился погладить самого себя 😼",
  "Идёт по карте, но карта нарисована лапой 🗺️",
  "Слишком красиво идёт, прохожие снимают сторис 📸",
  "Пытается ехать на самокате 🛴",
  "Упал, встал, сделал вид, что так и надо 😾",
  "Спросил дорогу у другого кота 🐈‍⬛",
  "Несёт заказ, но подозрительно мурчит 📦",
  "Забыл зачем шёл, но продолжил движение 🧠",
  "Обходит собаку по дипломатическим причинам 🐕",
  "Почти у дома, но решил пройтись красиво ✨",
  "Зашёл в магазин за влажным кормом 🛒",
  "Ускорился: почувствовал запах квартиры 🏠",
  "Видит дверь и делает важное лицо 🚪",
  "Стоит у коврика и ждёт оваций 🐾",
  "У двери 🚪"
];

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

function maybeShowCurseAfterPurchase() {
  if (curseShownThisSession) return;

  if (balance === 67) {
    curseShownThisSession = true;
    curseOverlay.classList.add("active");
  }
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

  maybeShowCurseAfterPurchase();
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
  resetDelivery();
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

function resetDelivery() {
  if (deliveryInterval) {
    clearInterval(deliveryInterval);
    deliveryInterval = null;
  }

  deliveryBox.classList.remove("active");
  deliveryActions.classList.remove("active");
  deliveryFill.style.width = "0%";
  deliveryCat.style.left = "0%";
  deliveryStatus.textContent = "Кот пока сидит в корзине.";
}

function getRandomDeliveryRoute() {
  const finalPhrase = "У двери 🚪";
  const phrasesWithoutFinal = deliveryPhrases.filter((phrase) => phrase !== finalPhrase);
  const shuffled = [...phrasesWithoutFinal].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 6);

  return [...selected, finalPhrase];
}

function startDelivery() {
  const route = getRandomDeliveryRoute();
  let step = 0;

  deliveryBox.classList.add("active");
  deliveryActions.classList.remove("active");

  deliveryFill.style.width = "0%";
  deliveryCat.style.left = "0%";
  deliveryStatus.textContent = "Кот готовится к доставке 🐾";

  if (deliveryInterval) {
    clearInterval(deliveryInterval);
  }

  function moveDeliveryStep() {
    const progress = Math.round((step / (route.length - 1)) * 100);
    const phrase = route[step];

    deliveryFill.style.width = `${progress}%`;
    deliveryCat.style.left = `${progress}%`;
    deliveryStatus.textContent = phrase;

    if (step >= route.length - 1) {
      clearInterval(deliveryInterval);
      deliveryInterval = null;

      deliveryFill.style.width = "100%";
      deliveryCat.style.left = "100%";
      deliveryStatus.textContent = "У двери 🚪";

      setTimeout(() => {
        deliveryActions.classList.add("active");
      }, 800);

      return;
    }

    step++;
  }

  moveDeliveryStep();

  deliveryInterval = setInterval(() => {
    moveDeliveryStep();
  }, 3000);
}

function checkout() {
  if (cart.length === 0) {
    messageEl.textContent = "Сначала выбери кота, бро 😭";
    return;
  }

  cart.length = 0;
  renderCart();

  messageEl.textContent = "Мяу-заказ оформлен! Запускаем доставку кота 🐈";
  startDelivery();
}

function orderReceived() {
  messageEl.textContent = "Спасибо за заказ! Кот официально принят в семью 😺";
  deliveryStatus.textContent = "Заказ получен. Кот доволен 🐾";
  deliveryActions.classList.remove("active");
  launchFireworks();
}

function orderMissing() {
  messageEl.textContent = "Кота нет, потому что это шуточная игра 😭 Настоящие коты через сайт не доставляются. Но МаМагазин всё равно ценит твоё терпение.";
  deliveryStatus.textContent = "Курьер-мяу растворился в мемах 😿";
  deliveryActions.classList.remove("active");
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

function curseSpend() {
  curseOverlay.classList.remove("active");
  openCart();
  messageEl.textContent = "Потрать хотя бы один КотоКоин, пока сайт не передумал 😰";
}

function curseEarn() {
  curseOverlay.classList.remove("active");
  document.querySelector(".game").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function keep67() {
  curseOverlay.classList.remove("active");
  screamerOverlay.classList.add("active");

  setTimeout(() => {
    screamerOverlay.classList.remove("active");
  }, 1800);
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

receivedBtn.addEventListener("click", orderReceived);
missingBtn.addEventListener("click", orderMissing);

curseSpendBtn.addEventListener("click", curseSpend);
curseEarnBtn.addEventListener("click", curseEarn);
keep67Btn.addEventListener("click", keep67);

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
resetDelivery();
