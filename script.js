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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  let t = 0;

  function animate() {
    if (t < Math.PI * 2) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      ctx.lineTo(canvas.width / 2 + x * 10,
                 canvas.height / 2 - y * 10);

      ctx.strokeStyle = "#ff4d6d";
      ctx.lineWidth = 2;
      ctx.stroke();

      t += 0.02;
      requestAnimationFrame(animate);
    } else {
      document.getElementById("mathText").innerText =
        "Algunos dirían que es matemática… yo diría que es lo más cercano a explicar lo que siento.";
      
      document.getElementById("toScreen4").style.display = "inline-block";
    }
  }

  animate();
  heartRevealed = true;
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
