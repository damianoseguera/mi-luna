let layersClicked = {
    divertida: false,
    fuerte: false,
    misteriosa: false
  };
let heartRevealed = false;
let diracRevealed = false;

function nextScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showLayer(type, event) {
    const text = {
      divertida: "Tu risa ilumina más que cualquier luna llena.",
      fuerte: "Tienes una fuerza que admiro profundamente.",
      misteriosa: "Hay algo en ti que siempre quiero seguir descubriendo."
    };
  
    document.getElementById("layerText").innerText = text[type];
  
    // Marcamos esa capa como vista
    layersClicked[type] = true;
    event.target.style.background = "#f5c518";
    event.target.style.color = "#111";
  
    // Verificamos si ya dio clic en las 3
    if (layersClicked.divertida && layersClicked.fuerte && layersClicked.misteriosa) {
      document.getElementById("toScreen3").disabled = false;
    }
  }  

function revealHeart() {
  if (heartRevealed) return;

  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Ejes sutiles
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 0.8;

  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  // Generar puntos del corazón
  let points = [];
  for (let t = 0; t < Math.PI * 2; t += 0.1) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    points.push({
      x: width / 2 + x * 9,
      y: height / 2 - y * 9,
      baseBrightness: Math.random() * 0.4 + 0.5,  // brillo base distinto
      speed: Math.random() * 0.02 + 0.01,         // ritmo distinto
      offset: Math.random() * Math.PI * 2         // fase distinta
    });

  }

  // Elegimos una estrella especial (puede ser la del centro inferior)
  const specialIndex = Math.floor(points.length * 0.75);
  points[specialIndex].isSpecial = true;

  let index = 0;

  function animateStars() {
    if (index < points.length) {
      const p = points[index];

      // Guardamos brillo base para cada estrella
      p.brightness = Math.random() * 0.5 + 0.5;

      // Estrella pequeña
      ctx.fillStyle = "rgba(255,255,255," + p.brightness + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();


      // Línea constelación fina
      if (index > 0) {
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(points[index - 1].x, points[index - 1].y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      index++;

      // MÁS LENTO (aquí controlas la velocidad)
      setTimeout(() => {
        requestAnimationFrame(animateStars);
      }, 80); // antes era casi inmediato
    } else {

      document.getElementById("mathText").innerText =
        "Algunos dirían que es matemática… yo diría que es la constelación exacta de lo que siento por ti.";

      document.getElementById("toScreen4").style.display = "inline-block";

      startTwinkle(points);  // ✨ activamos parpadeo
      shootStar();           // 🌠 pasa la estrella fugaz
    }
  }

function startTwinkle(points) {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");

  let time = 0;

  function twinkle() {

    time += 0.02;

    points.forEach(p => {

      // Oscilación suave tipo seno
      let brightness =
        p.baseBrightness +
        Math.sin(time * (p.speed * 100) + p.offset) * 0.15;

      // Si es la estrella especial, apenas más brillante
      if (p.isSpecial) {
        brightness += 0.15;
      }

      brightness = Math.min(1, Math.max(0.3, brightness));

      ctx.fillStyle = "rgba(255,255,255," + brightness + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(twinkle);
  }

  twinkle();
}


  animateStars();
  heartRevealed = true;
}

function shootStar() {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");

  let x = -50;
  let y = 60;

  function animate() {

    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 15, y - 8);
    ctx.stroke();

    x += 6;
    y += 3;

    if (x < canvas.width + 50) {
      requestAnimationFrame(animate);
    }
  }

  setTimeout(animate, 600);
}

function showDiracExplanation() {
  if (!diracRevealed) {
    document.getElementById("diracText").classList.remove("hidden");
    document.getElementById("finalBtn").disabled = false;
    diracRevealed = true;
  }
}

function finalMessage() {
  document.getElementById("finalText").innerText =
    "Gracias por existir en mi universo 🌙";
}
