/* =================== 2026 ===================*/

  const container = document.getElementById("btns");

  for (var i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    btn.textContent = "Button " + i;

    btn.onclick = function () {
      console.log(i);
    };

    container.appendChild(btn);
  }


/* =================== 2026 ===================*/