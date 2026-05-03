let balance = 107;
const cart = [];

const stats = {
  bought: 0,
  delivered: 0,
  spent: 0,
  earned: 0,
  promos: 0
};

let deliveryInterval = null;
let curseShownThisSession = false;
let currentSong = null;
let currentSongName = "";

let chaosActive = false;
let chaosAnimationId = null;
let chaosSong = null;

const $ = (id) => document.getElementById(id);

const balanceEl = $("balance");
const cartCountEl = $("cartCount");
const cartItemsEl = $("cartItems");
const cartTotalEl = $("cartTotal");
const messageEl = $("message");
const gameMessageEl = $("gameMessage");

const cartOverlay = $("cartOverlay");
const openCartBtn = $("openCartBtn");
const closeCartBtn = $("closeCartBtn");
const checkoutBtn = $("checkoutBtn");
const clearCartBtn = $("clearCartBtn");
const earnBtn = $("earnBtn");

const openRulesBtn = $("openRulesBtn");
const closeRulesBtn = $("closeRulesBtn");
const rulesOverlay = $("rulesOverlay");
const fireworksEl = $("fireworks");

const deliveryBox = $("deliveryBox");
const deliveryFill = $("deliveryFill");
const deliveryCat = $("deliveryCat");
const deliveryStatus = $("deliveryStatus");
const deliveryActions = $("deliveryActions");
const receivedBtn = $("receivedBtn");
const missingBtn = $("missingBtn");

const curseOverlay = $("curseOverlay");
const curseSpendBtn = $("curseSpendBtn");
const curseEarnBtn = $("curseEarnBtn");
const keep67Btn = $("keep67Btn");
const screamerOverlay = $("screamerOverlay");

const detailsOverlay = $("detailsOverlay");
const closeDetailsBtn = $("closeDetailsBtn");
const detailsTitle = $("detailsTitle");
const detailsVideo = $("detailsVideo");
const detailsText = $("detailsText");
const detailsStats = $("detailsStats");

const balanceMenuBtn = $("balanceMenuBtn");
const balanceOverlay = $("balanceOverlay");
const closeBalanceMenuBtn = $("closeBalanceMenuBtn");
const showPromoBtn = $("showPromoBtn");
const promoBox = $("promoBox");
const promoInput = $("promoInput");
const applyPromoBtn = $("applyPromoBtn");
const promoMessage = $("promoMessage");
const earnFromMenuBtn = $("earnFromMenuBtn");

const openStatsBtn = $("openStatsBtn");
const statsOverlay = $("statsOverlay");
const closeStatsBtn = $("closeStatsBtn");
const statBought = $("statBought");
const statDelivered = $("statDelivered");
const statSpent = $("statSpent");
const statEarned = $("statEarned");
const statPromos = $("statPromos");

const openSongsBtn = $("openSongsBtn");
const songsOverlay = $("songsOverlay");
const closeSongsBtn = $("closeSongsBtn");
const pauseSongBtn = $("pauseSongBtn");
const stopSongBtn = $("stopSongBtn");
const songMessage = $("songMessage");
const volumeSlider = $("volumeSlider");
const volumeValue = $("volumeValue");

const usedPromos = new Set();

const catDetails = {
  mini: {
    title: "МаМини",
    video: "images/mama_mini.MP4",
    text: "Маленький кот с огромным самомнением. Делает вид, что ничего не понимает, но уже посчитал твой баланс.",
    stats: ["Редкость: маленькая легенда", "Любимая еда: крошка рыбки", "Риск побега: 12%"]
  },

  pineapple: {
    title: "Ананасовый Ма",
    video: "images/mama_pineapple.mp4",
    text: "Кот в ананасовой броне. Выглядит как фрукт, но внутри бизнес-план и лёгкое осуждение.",
    stats: ["Редкость: тропический", "Любимая еда: лосось с зонтиком", "Риск побега: 34%"]
  },

  cute: {
    title: "МаМилашка",
    video: "images/mama_cute.mp4",
    text: "Слишком милый кот. Опасность в том, что после просмотра хочется отдать ему все КотоКоины.",
    stats: ["Редкость: милая угроза", "Любимая еда: комплименты", "Риск побега: 5%"]
  },

  hat2: {
    title: "МаШляпа 2",
    video: "images/mama_another_hat.mp4",
    text: "Кот, который знает про стиль больше, чем весь подъезд. Смотрит прямо в душу и требует уважения.",
    stats: ["Редкость: модный босс", "Любимая еда: внимание", "Риск побега: 67%"]
  },

  hat: {
    title: "МаШляпа",
    video: "images/mama_hat.mp4",
    text: "Главная модница МаМагазина. Может ничего не делать, но всё равно выглядит как владелец бренда.",
    stats: ["Редкость: легендарная", "Любимая еда: розовый корм", "Риск побега: 22%"]
  }
};

const deliveryPhrases = [
  "Выбежал из сайта 🐈",
  "Ищет подъезд по запаху котлет 🥩",
  "Пересекает дорогу и делает вид, что он главный 🚦",
  "Едет на поезде без билета 🚆",
  "Проверяет адрес лапкой 🐾",
  "Застрял в розовом пакете 🎀",
  "Спорит с курьером-кот 📦",
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

function updateStats() {
  statBought.textContent = stats.bought;
  statDelivered.textContent = stats.delivered;
  statSpent.textContent = stats.spent;
  statEarned.textContent = stats.earned;
  statPromos.textContent = stats.promos;
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
      removeFromCart(Number(button.dataset.index));
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
  stats.bought += 1;
  stats.spent += price;

  cart.push({
    name,
    price
  });

  updateBalance();
  updateStats();
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
  stats.bought = Math.max(0, stats.bought - 1);
  stats.spent = Math.max(0, stats.spent - item.price);

  cart.splice(index, 1);

  updateBalance();
  updateStats();
  renderCart();
  animateElement(document.querySelector(".balance"));

  messageEl.textContent = `${item.name} убран из корзины. Вернули ${item.price} КотоКоинов 😼`;
}

function clearCart() {
  const refund = getCartTotal();
  const removedCount = cart.length;

  if (cart.length === 0) {
    messageEl.textContent = "Корзина и так пустая, бро.";
    return;
  }

  balance += refund;
  stats.bought = Math.max(0, stats.bought - removedCount);
  stats.spent = Math.max(0, stats.spent - refund);

  cart.length = 0;

  updateBalance();
  updateStats();
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
  deliveryInterval = setInterval(moveDeliveryStep, 3000);
}

function checkout() {
  if (cart.length === 0) {
    messageEl.textContent = "Сначала выбери кота, бро 😭";
    return;
  }

  cart.length = 0;
  renderCart();

  messageEl.textContent = "Кото-заказ оформлен! Запускаем доставку кота 🐈";
  startDelivery();
}

function orderReceived() {
  stats.delivered += 1;
  updateStats();

  messageEl.textContent = "Спасибо за заказ! Кот официально принят в семью 😺";
  deliveryStatus.textContent = "Заказ получен. Кот доволен 🐾";
  deliveryActions.classList.remove("active");
  launchFireworks();
}

function orderMissing() {
  messageEl.textContent =
    "Кота нет, потому что это шуточная игра 😭 Настоящие коты через сайт не доставляются. Но МаМагазин всё равно ценит твоё терпение.";
  deliveryStatus.textContent = "Курьер-кот растворился в мемах 😿";
  deliveryActions.classList.remove("active");
}

function openRules() {
  rulesOverlay.classList.add("active");
}

function closeRules() {
  rulesOverlay.classList.remove("active");
}

function openDetails(key) {
  const cat = catDetails[key];

  if (!cat) return;

  detailsTitle.textContent = cat.title;
  detailsVideo.src = cat.video;
  detailsText.textContent = cat.text;
  detailsStats.innerHTML = cat.stats.map((stat) => `<div>${stat}</div>`).join("");

  detailsOverlay.classList.add("active");
}

function closeDetails() {
  detailsOverlay.classList.remove("active");
  detailsVideo.pause();
  detailsVideo.src = "";
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

function playFunnySound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audio = new AudioContext();

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(220, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, audio.currentTime + 0.18);
  oscillator.frequency.exponentialRampToValueAtTime(330, audio.currentTime + 0.35);

  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.25, audio.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.45);

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.5);
}

function megaSparkles() {
  for (let i = 0; i < 180; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "mega-sparkle";
    sparkle.textContent = ["✨", "💖", "🌈", "🐾", "💅", "⭐"][Math.floor(Math.random() * 6)];

    sparkle.style.left = `${Math.random() * window.innerWidth}px`;
    sparkle.style.top = `${Math.random() * window.innerHeight}px`;
    sparkle.style.setProperty("--sparkle-x", `${(Math.random() - 0.5) * 500}px`);
    sparkle.style.setProperty("--sparkle-y", `${(Math.random() - 0.5) * 500}px`);

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 3000);
  }
}

function megaMommyEffect() {
  document.body.classList.add("rainbow-party");

  playFunnySound();
  launchFireworks();
  megaSparkles();

  setTimeout(() => {
    document.body.classList.remove("rainbow-party");
  }, 3000);
}

function startChaosSong() {
  if (chaosSong) {
    chaosSong.pause();
    chaosSong.currentTime = 0;
  }

  chaosSong = new Audio("music/velyasik.mp3");
  chaosSong.volume = 100;
  chaosSong.loop = false;

  chaosSong.play().catch(() => {
    promoMessage.textContent = "Психоделика включилась, но браузер не дал запустить песню. Проверь имя файла в music.";
  });
}

function createChaosEmoji() {
  const emojis = ["🐈", "💥", "🌈", "💅", "🧠", "🍟", "😼", "✨", "🎀", "💀", "🌀", "🧃"];
  const emoji = document.createElement("div");

  emoji.className = "chaos-emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = `${Math.random() * window.innerWidth}px`;
  emoji.style.top = `${Math.random() * window.innerHeight}px`;
  emoji.style.setProperty("--chaos-x", `${(Math.random() - 0.5) * 900}px`);
  emoji.style.setProperty("--chaos-y", `${(Math.random() - 0.5) * 900}px`);

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 4000);
}

function startFlyingCards() {
  const cards = Array.from(document.querySelectorAll(".card"));

  const cardStates = cards.map((card) => {
    const rect = card.getBoundingClientRect();

    card.classList.add("chaos-card");

    card.style.left = `${rect.left}px`;
    card.style.top = `${rect.top}px`;

    return {
      element: card,
      x: rect.left,
      y: rect.top,
      vx: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 5),
      vy: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 5),
      angle: Math.random() * 360,
      spin: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 5)
    };
  });

  function animateCards() {
    cardStates.forEach((state) => {
      const card = state.element;
      const width = card.offsetWidth;
      const height = card.offsetHeight;

      state.x += state.vx;
      state.y += state.vy;
      state.angle += state.spin;

      if (state.x <= 0 || state.x + width >= window.innerWidth) {
        state.vx *= -1;
      }

      if (state.y <= 0 || state.y + height >= window.innerHeight) {
        state.vy *= -1;
      }

      state.x = Math.max(0, Math.min(window.innerWidth - width, state.x));
      state.y = Math.max(0, Math.min(window.innerHeight - height, state.y));

      card.style.left = `${state.x}px`;
      card.style.top = `${state.y}px`;
      card.style.transform = `rotate(${state.angle}deg)`;
    });

    chaosAnimationId = requestAnimationFrame(animateCards);
  }

  animateCards();
}

function stopChaosMode() {
  chaosActive = false;

  document.body.classList.remove("chaos-mode", "chaos-shake");

  if (chaosAnimationId) {
    cancelAnimationFrame(chaosAnimationId);
    chaosAnimationId = null;
  }

  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("chaos-card");
    card.style.left = "";
    card.style.top = "";
    card.style.transform = "";
  });

  if (chaosSong) {
    chaosSong.pause();
    chaosSong.currentTime = 0;
  }
}

function startChaosMode() {
  if (chaosActive) return;

  chaosActive = true;

  document.body.classList.add("chaos-mode", "chaos-shake");
  startChaosSong();
  startFlyingCards();

  const emojiTimer = setInterval(() => {
    if (!chaosActive) {
      clearInterval(emojiTimer);
      return;
    }

    for (let i = 0; i < 6; i++) {
      createChaosEmoji();
    }
  }, 180);

  setTimeout(() => {
    stopChaosMode();
  }, 12000);
}

function earnCoins() {
  const baseDrop = Math.floor(Math.random() * 5) + 1;

  let multiplier = 1;
  let bonusText = "Обычный тык 🐾";

  const chance = Math.random();

  if (chance < 0.05) {
    multiplier = 5;
    bonusText = "ДЖЕКПОТ-КОТ! x5 😼🔥";
    launchFireworks();
  } else if (chance < 0.25) {
    multiplier = 2;
    bonusText = "Крит-кот! x2 😺";
  }

  const reward = baseDrop * multiplier;

  balance += reward;
  stats.earned += reward;

  updateBalance();
  updateStats();

  $("lastDrop").textContent = reward;
  $("multiplier").textContent = `x${multiplier}`;

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

function openBalanceMenu() {
  balanceOverlay.classList.add("active");
}

function closeBalanceMenu() {
  balanceOverlay.classList.remove("active");
}

function openStats() {
  updateStats();
  statsOverlay.classList.add("active");
}

function closeStats() {
  statsOverlay.classList.remove("active");
}

function openSongs() {
  songsOverlay.classList.add("active");
}

function closeSongs() {
  songsOverlay.classList.remove("active");
}

function playSong(src, name) {
  if (currentSong) {
    currentSong.pause();
  }

  currentSong = new Audio(src);
  currentSong.loop = true;
  currentSong.volume = Number(volumeSlider.value) / 100;
  currentSongName = name;

  currentSong.play()
    .then(() => {
      songMessage.textContent = `Сейчас играет: ${name} 🎵`;
    })
    .catch(() => {
      songMessage.textContent = "Браузер не дал включить песню. Проверь путь к файлу или нажми ещё раз 😭";
    });
}

function pauseSong() {
  if (!currentSong) {
    songMessage.textContent = "Сначала выбери песню.";
    return;
  }

  if (currentSong.paused) {
    currentSong.play();
    songMessage.textContent = `Продолжаем: ${currentSongName} 🎵`;
  } else {
    currentSong.pause();
    songMessage.textContent = `Пауза: ${currentSongName}`;
  }
}

function stopSong() {
  if (!currentSong) {
    songMessage.textContent = "Музыка и так молчит.";
    return;
  }

  currentSong.pause();
  currentSong.currentTime = 0;
  songMessage.textContent = "Песня остановлена.";
}

function updateVolume() {
  const volume = Number(volumeSlider.value) / 100;
  volumeValue.textContent = volumeSlider.value;

  if (currentSong) {
    currentSong.volume = volume;
  }
}

function applyPromo() {
  const code = promoInput.value.trim().toLowerCase();

  const promos = {
    "сливончик": {
      type: "add",
      reward: 2500,
      text: "+2500 КотоКоинов и бесконечный респект :) трать на что хочешь. Разработчик этой игры, как он вообще до этого додумался... главный ненавистник числа 67 и подобных мемов."
    },

    "андре": {
      type: "subtract",
      reward: 500,
      text: "-500 КотоКоинов. АХАХАХАХ НЕТ ПОЖАЛУЙСТА"
    },

    "мамочка": {
      type: "infinite",
      reward: 999999,
      text: "БЕСКОНЕЧНО КОТОКОИНОВ. МАМОЧКА ПРОСТО ЛЕГЕНДА БЛИН"
    },

    "велясик жиробасик": {
      type: "chaos",
      reward: 67,
      text: "ВЕЛЯСИК ЖИРОБАСИК АКТИВИРОВАН. Сайт потерял контроль над реальностью."
    }
  };

  if (!code) {
    promoMessage.textContent = "Сначала введи промокод 😼";
    return;
  }

  if (!promos[code]) {
    promoMessage.textContent = "Такого промокода коты не знают 😿";
    return;
  }

  if (usedPromos.has(code)) {
    promoMessage.textContent = "Этот промокод уже использован 🐾";
    return;
  }

  const promo = promos[code];
  usedPromos.add(code);
  stats.promos += 1;

  if (promo.type === "add") {
    balance += promo.reward;
    stats.earned += promo.reward;
  }

  if (promo.type === "subtract") {
    balance -= promo.reward;

    if (balance < 0) {
      balance = 0;
    }
  }

  if (promo.type === "infinite") {
    balance = promo.reward;
    stats.earned += promo.reward;
    megaMommyEffect();
  }

  if (promo.type === "chaos") {
    balance += promo.reward;
    stats.earned += promo.reward;
    startChaosMode();
  }

  updateBalance();
  updateStats();
  animateElement(document.querySelector(".balance"));

  promoMessage.textContent = promo.text;
}

document.querySelectorAll(".buy-btn").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.name, Number(button.dataset.price), button);
  });
});

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    openDetails(button.dataset.cat);
  });
});

document.querySelectorAll(".song-btn").forEach((button) => {
  button.addEventListener("click", () => {
    playSong(button.dataset.src, button.textContent.replace("▶️", "").trim());
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

closeDetailsBtn.addEventListener("click", closeDetails);

balanceMenuBtn.addEventListener("click", openBalanceMenu);
closeBalanceMenuBtn.addEventListener("click", closeBalanceMenu);

showPromoBtn.addEventListener("click", () => {
  promoBox.classList.toggle("active");
});

applyPromoBtn.addEventListener("click", applyPromo);

earnFromMenuBtn.addEventListener("click", () => {
  closeBalanceMenu();

  document.querySelector(".game").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

openStatsBtn.addEventListener("click", openStats);
closeStatsBtn.addEventListener("click", closeStats);

openSongsBtn.addEventListener("click", openSongs);
closeSongsBtn.addEventListener("click", closeSongs);
pauseSongBtn.addEventListener("click", pauseSong);
stopSongBtn.addEventListener("click", stopSong);
volumeSlider.addEventListener("input", updateVolume);

cartOverlay.addEventListener("click", (event) => {
  if (event.target === cartOverlay) closeCart();
});

rulesOverlay.addEventListener("click", (event) => {
  if (event.target === rulesOverlay) closeRules();
});

detailsOverlay.addEventListener("click", (event) => {
  if (event.target === detailsOverlay) closeDetails();
});

balanceOverlay.addEventListener("click", (event) => {
  if (event.target === balanceOverlay) closeBalanceMenu();
});

statsOverlay.addEventListener("click", (event) => {
  if (event.target === statsOverlay) closeStats();
});

songsOverlay.addEventListener("click", (event) => {
  if (event.target === songsOverlay) closeSongs();
});

updateBalance();
updateStats();
renderCart();
resetDelivery();
updateVolume();
