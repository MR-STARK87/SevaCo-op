/* Emergency 15-min mock dispatch with live status steps. */
(function () {
  var near = document.getElementById("emg-near");
  if (!near) return;
  var avail = window.SEVA_DATA.workers.filter(function (w) { return w.available && w.verified; })
    .sort(function (a, b) { return a.distKm - b.distKm; }).slice(0, 3);
  near.innerHTML = avail.map(function (w, i) {
    return "<p class='small'><b>" + (i + 1) + ". " + w.name + "</b> (" + w.trade + ") — " + w.distKm.toFixed(1) + " km • ~" + Math.round(8 + w.distKm * 4) + " min ETA • " + w.rating + " ★</p>";
  }).join("");
  document.getElementById("emg-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var issue = document.getElementById("e-issue").value;
    var w = avail[0];
    var box = document.getElementById("emg-status");
    box.hidden = false;
    var id = "EMG-" + Date.now().toString().slice(-5);
    box.innerHTML = "<div class='card'><h3>" + id + " — " + w.name + " dispatched</h3><p class='small' id='emg-step'>Step 1/4: Contacting worker…</p><div class='splitbar'><span id='emg-bar' style='width:10%'></span><span></span><span></span></div><p class='small muted'>" + issue + " • Flat Rs. 499 (worker gets Rs. 424).</p></div>";
    var steps = ["Step 1/4: Contacting worker…", "Step 2/4: Worker accepted — starting route…", "Step 3/4: Worker nearby — keep phone reachable…", "Step 4/4: Arrived. Pay Rs. 499 after the fix (UPI/cash)."];
    var i = 0, bar = document.getElementById("emg-bar"), label = document.getElementById("emg-step");
    var timer = setInterval(function () {
      i++;
      if (i >= steps.length) { clearInterval(timer); return; }
      label.textContent = steps[i];
      bar.style.width = (10 + i * 28) + "%";
    }, 1600);
    try {
      var bs = JSON.parse(localStorage.getItem("seva_my_bookings") || "[]");
      bs.unshift({ id: id, date: "09 Sep 2026", customer: "Demo Customer", worker: w.name, workerId: w.id, service: issue, fee: 499, slot: "ASAP (~15 min)", address: document.getElementById("e-addr").value, status: "Emergency dispatched", payMode: "Pay after visit", rating: "-" });
      localStorage.setItem("seva_my_bookings", JSON.stringify(bs));
    } catch (err) {}
  });
})();
