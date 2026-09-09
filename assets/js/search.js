/* Customer: geo-aware worker directory (mock geo-spatial matching). */
(function () {
  var list = document.getElementById("worker-list");
  if (!list) return;
  var tradeSel = document.getElementById("f-trade");
  var availBox = document.getElementById("f-avail");
  var q = document.getElementById("f-q");
  var distSel = document.getElementById("f-dist");
  var locBtn = document.getElementById("f-locate");
  var locNote = document.getElementById("f-locnote");
  var located = false;

  // Build trade options from synthetic data (covers all 10 PS trades)
  var cur = tradeSel.value;
  tradeSel.innerHTML = "<option>All</option>" + window.SEVA_DATA.trades.map(function (t) {
    return "<option" + (t === cur ? " selected" : "") + ">" + t + "</option>";
  }).join("");

  function initials(name) {
    return name.split(" ").map(function (w) { return w[0]; }).slice(0, 2).join("");
  }
  function eta(dist) { return Math.round(8 + dist * 4) + " min ETA"; }

  function render() {
    var t = tradeSel.value, onlyAvail = availBox.checked;
    var query = (q.value || "").toLowerCase();
    var maxD = parseFloat(distSel.value) || 99;
    var workers = window.SEVA_DATA.workers.filter(function (w) {
      if (t !== "All" && w.trade !== t) return false;
      if (onlyAvail && !w.available) return false;
      if (w.distKm > maxD) return false;
      if (query && (w.name + " " + w.area + " " + w.trade + " " + w.zone).toLowerCase().indexOf(query) === -1) return false;
      return true;
    }).sort(function (a, b) { return a.distKm - b.distKm; });

    document.getElementById("result-count").textContent =
      workers.length + " verified workers" + (located ? ", nearest first from Indiranagar 100ft Rd (mock GPS 12.9784, 77.6408)" : ", sorted by distance (mock geo-match)");

    // Mock zone map counts
    var zones = {};
    window.SEVA_DATA.workers.forEach(function (w) { zones[w.zone] = (zones[w.zone] || 0) + 1; });
    document.getElementById("zone-map").innerHTML = Object.keys(zones).sort().map(function (z) {
      return "<span class='badge'>" + z + " zone: " + zones[z] + " workers</span>";
    }).join(" ");

    list.innerHTML = workers.map(function (w) {
      return "<article class='card worker-card'>" +
        "<div class='avatar' aria-hidden='true'>" + initials(w.name) + "</div>" +
        "<div style='flex:1'><h3>" + w.name + "</h3>" +
        "<div class='meta'>" + w.trade + " • " + w.level + " • " + w.exp + " yrs • " + w.area + " (" + w.zone + ")</div>" +
        "<div style='margin:8px 0'><span class='badge green'>Verified • " + w.reg + "</span> " +
        "<span class='badge'>" + w.rating + " ★ (" + w.jobs + " jobs)</span> " +
        "<span class='badge'>" + w.distKm.toFixed(1) + " km • " + eta(w.distKm) + "</span> " +
        (w.available ? "<span class='badge green'>Available today</span>" : "<span class='badge amber'>On leave</span>") + "</div>" +
        "<div><b>Rs. " + w.rate + "</b> <span class='muted small'>first hour • 85% goes to worker</span></div>" +
        "<div style='margin-top:10px;display:flex;gap:8px;flex-wrap:wrap'>" +
        "<a class='btn btn-outline' href='profile.html?id=" + w.id + "'>View profile &amp; reviews</a>" +
        "<a class='btn btn-primary' href='booking.html?worker=" + w.id + "'>Book</a>" +
        "</div></div></article>";
    }).join("") || "<div class='card'>No workers match these filters. Try increasing distance.</div>";
  }

  [tradeSel, availBox, distSel].forEach(function (el) { el.addEventListener("change", render); });
  q.addEventListener("input", render);
  locBtn.addEventListener("click", function () {
    located = true;
    locNote.textContent = "Mock location locked: Indiranagar 100ft Rd (12.9784, 77.6408). Distances are synthetic demo data.";
    render();
  });
  render();
})();
