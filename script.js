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

  // Dibujar ejes
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;

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
  for (let t = 0; t < Math.PI * 2; t += 0.08) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    points.push({
      x: width / 2 + x * 10,
      y: height / 2 - y * 10
    });
  }

  let index = 0;

  function animateStars() {
    if (index < points.length) {

      const p = points[index];

      // Glow estrella
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8);
      glow.addColorStop(0, "rgba(255,255,255,0.9)");
      glow.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Punto central
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();

      // Conectar constelación
      if (index > 0) {
        ctx.strokeStyle = "rgba(255, 77, 109, 0.5)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(points[index - 1].x, points[index - 1].y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      index++;
      requestAnimationFrame(animateStars);

    } else {

      document.getElementById("mathText").innerText =
        "Algunos dirían que es matemática… yo diría que es la constelación exacta de lo que siento por ti.";

      document.getElementById("toScreen4").style.display = "inline-block";

      shootStar(); // ⭐ estrella fugaz al final
    }
  }

  animateStars();
  heartRevealed = true;
}

function shootStar() {
  const canvas = document.getElementById("heartCanvas");
  const ctx = canvas.getContext("2d");

  let x = -50;
  let y = 50;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x += 8;
    y += 4;

    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 20, y - 10);
    ctx.stroke();

    if (x < canvas.width + 50) {
      requestAnimationFrame(animate);
    }
  }

  setTimeout(animate, 500);
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
