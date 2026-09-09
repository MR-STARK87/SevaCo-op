/* Worker registration wizard (mock). Saves to localStorage for admin demo. */
(function () {
  var form = document.getElementById("reg-form");
  if (!form) return;
  var step = 1;
  var tradeSel = document.getElementById("r-trade");
  tradeSel.innerHTML = window.SEVA_DATA.trades.map(function (t) { return "<option>" + t + "</option>"; }).join("");
  document.getElementById("r-soc").innerHTML = window.SEVA_DATA.societies.map(function (s) {
    return "<option>" + s.name + "</option>";
  }).join("");
  document.getElementById("r-file").addEventListener("change", function (e) {
    var f = e.target.files[0];
    document.getElementById("r-filename").textContent = f ? "Selected: " + f.name : "No file selected.";
  });
  function paint() {
    document.querySelectorAll(".reg-step").forEach(function (d) { d.hidden = +d.getAttribute("data-step") !== step; });
    for (var i = 1; i <= 4; i++) document.getElementById("st" + i).classList.toggle("active", i <= step);
    document.getElementById("reg-back").disabled = step === 1;
    document.getElementById("reg-next").hidden = step === 4;
    document.getElementById("reg-submit").hidden = step !== 4;
  }
  document.getElementById("reg-next").addEventListener("click", function () {
    if (step === 1 && (!document.getElementById("r-name").value.trim() || !document.getElementById("r-phone").value.trim())) {
      alert("Please enter name and mobile."); return;
    }
    if (step < 4) { step++; paint(); }
  });
  document.getElementById("reg-back").addEventListener("click", function () { if (step > 1) { step--; paint(); } });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!document.getElementById("r-decl").checked) { alert("Please accept the declaration."); return; }
    var app = {
      id: "APP-" + Date.now().toString().slice(-4),
      name: document.getElementById("r-name").value.trim(),
      trade: tradeSel.value,
      society: document.getElementById("r-soc").value,
      submitted: "09 Sep 2026",
      docs: "Aadhaar ✓, Trade cert uploaded (demo)"
    };
    try {
      var arr = JSON.parse(localStorage.getItem("seva_registrations") || "[]");
      arr.unshift(app); localStorage.setItem("seva_registrations", JSON.stringify(arr));
    } catch (err) {}
    var box = document.getElementById("reg-done");
    box.hidden = false;
    box.innerHTML = "<div class='notice green'><b>Application " + app.id + " submitted.</b><br>" +
      "Track it under Federation Admin → Dashboard. Mock verification completes in 3–5 days; you will get member ID + insurance on approval.</div>";
    form.querySelectorAll("input,select,button").forEach(function (el) { el.disabled = true; });
    window.scrollTo(0, box.offsetTop - 120);
  });
  paint();
})();
