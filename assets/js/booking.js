/* Customer: profile (with ratings) + booking (generates mock invoice). */
(function () {
  var params = new URLSearchParams(location.search);
  var id = params.get("id") || params.get("worker") || "ramesh";
  var workers = window.SEVA_DATA.workers;
  var w = workers.find(function (x) { return x.id === id; }) || workers[0];

  function storedReviews(wid) {
    try { return JSON.parse(localStorage.getItem("seva_reviews_" + wid) || "[]"); }
    catch (e) { return []; }
  }
  function allReviews(wid) {
    return (window.SEVA_DATA.reviews[wid] || []).concat(storedReviews(wid));
  }

  // ---- Profile page + rating & feedback ----
  var prof = document.getElementById("profile-box");
  if (prof) {
    var payout = Math.round(w.rate * 0.85);
    prof.innerHTML =
      "<div class='worker-card'><div class='avatar' style='width:72px;height:72px;font-size:26px'>" +
      w.name.split(" ").map(function (s) { return s[0]; }).slice(0, 2).join("") + "</div>" +
      "<div><h2 style='margin:0'>" + w.name + "</h2>" +
      "<p class='muted' style='margin:4px 0'>" + w.trade + " • " + w.level + " • " + w.coop + "</p>" +
      "<span class='badge green'>Govt. ID Verified</span> <span class='badge'>Police clearance valid</span> <span class='badge'>ESIC insured</span>" +
      "<p class='muted small'>Member since " + w.since + " • Co-op ID " + w.reg + " • " + w.jobs + " jobs • " + w.distKm.toFixed(1) + " km away</p>" +
      "</div></div>" +
      "<hr style='border:none;border-top:1px solid var(--line);margin:16px 0'>" +
      "<div class='row'><div><b>Base fee</b><br><span style='font-size:24px'>Rs. " + w.rate + "</span> <span class='muted small'>first hour</span></div>" +
      "<div><b>Worker receives</b><br><span style='font-size:24px;color:var(--green)'>Rs. " + payout + "</span> <span class='muted small'>(85% direct)</span></div></div>" +
      "<div class='splitbar'><span style='width:85%'></span><span style='width:10%'></span><span style='width:5%'></span></div>" +
      "<div class='legend'><span><i class='dot' style='background:var(--green)'></i>Worker 85%</span><span><i class='dot' style='background:var(--navy)'></i>Welfare 10%</span><span><i class='dot' style='background:#9aa9bd'></i>Platform 5%</span></div>" +
      "<div style='margin-top:16px;display:flex;gap:10px;flex-wrap:wrap'><a class='btn btn-primary' href='booking.html?worker=" + w.id + "'>Book " + w.name.split(" ")[0] + "</a>" +
      "<a class='btn btn-outline' href='search.html'>Back to directory</a></div>";

    var revBox = document.getElementById("reviews-box");
    function paintReviews() {
      var revs = allReviews(w.id);
      var avg = revs.length ? (revs.reduce(function (a, r) { return a + r.rating; }, 0) / revs.length) : w.rating;
      document.getElementById("reviews-avg").textContent =
        avg.toFixed(1) + " ★ from " + (w.jobs + revs.length) + " verified jobs (" + revs.length + " written reviews shown)";
      revBox.innerHTML = revs.map(function (r) {
        return "<div class='card' style='margin-bottom:10px'><b>" + r.name + "</b> <span class='badge'>" + r.rating + " ★</span> <span class='muted small'>" + r.date + "</span><p class='small' style='margin:6px 0 0'>" + r.text + "</p></div>";
      }).join("") || "<div class='card'>No written reviews yet — be the first.</div>";
    }
    paintReviews();
    document.getElementById("review-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var r = {
        name: document.getElementById("rv-name").value.trim() || "Anonymous",
        rating: +document.getElementById("rv-rating").value,
        text: document.getElementById("rv-text").value.trim(),
        date: "Sep 2026"
      };
      if (!r.text) { alert("Please write a few words."); return; }
      var arr = storedReviews(w.id); arr.unshift(r);
      try { localStorage.setItem("seva_reviews_" + w.id, JSON.stringify(arr)); } catch (err) {}
      e.target.reset();
      paintReviews();
    });
  }

  // ---- Booking page (creates invoice mock) ----
  var form = document.getElementById("booking-form");
  if (form) {
    var svcSel = document.getElementById("b-service");
    var slotWrap = document.getElementById("b-slots");
    var summary = document.getElementById("b-summary");
    window.SEVA_DATA.services.forEach(function (s, i) {
      var o = document.createElement("option");
      o.value = i; o.textContent = s.name + " — Rs. " + s.fee + " (" + s.est + ")";
      svcSel.appendChild(o);
    });
    var slots = ["Today 2:30 PM", "Today 5:00 PM", "Tomorrow 9:30 AM", "Tomorrow 12:00 PM"];
    var chosen = slots[0];
    slotWrap.innerHTML = slots.map(function (s, i) {
      return "<button type='button' class='chip' data-slot='" + s + "' aria-pressed='" + (i === 0) + "'>" + s + "</button>";
    }).join("");
    slotWrap.addEventListener("click", function (e) {
      var b = e.target.closest("[data-slot]");
      if (!b) return;
      chosen = b.getAttribute("data-slot");
      slotWrap.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      update();
    });
    function update() {
      var s = window.SEVA_DATA.services[+svcSel.value];
      var workerFee = Math.round(s.fee * 0.85);
      summary.innerHTML = "<b>" + w.name + "</b> <span class='muted small'>(" + w.reg + ")</span><br>" +
        "Service: " + s.name + "<br>Slot: " + chosen + "<br>" +
        "Total Rs. " + s.fee + " — worker receives Rs. " + workerFee + " (85%).";
    }
    svcSel.addEventListener("change", update);
    update();
    document.getElementById("worker-name").textContent = w.name;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = window.SEVA_DATA.services[+svcSel.value];
      var addr = document.getElementById("b-address").value.trim();
      if (!addr) { alert("Please enter your service address."); return; }
      var booking = { id: "BK-" + Date.now().toString().slice(-6), date: "09 Sep 2026", customer: "Demo Customer", worker: w.name, workerId: w.id, service: s.name, fee: s.fee, slot: chosen, address: addr, status: "Confirmed", payMode: "Pay after visit", rating: "-" };
      var inv = { id: "INV-2026-" + Date.now().toString().slice(-4), booking: booking.id, date: booking.date, bill: s.fee, workerShare: Math.round(s.fee * 0.85), welfare: Math.round(s.fee * 0.10), platform: s.fee - Math.round(s.fee * 0.85) - Math.round(s.fee * 0.10), mode: "Pending", status: "Unpaid" };
      try {
        var bs = JSON.parse(localStorage.getItem("seva_my_bookings") || "[]"); bs.unshift(booking);
        localStorage.setItem("seva_my_bookings", JSON.stringify(bs));
        var iv = JSON.parse(localStorage.getItem("seva_my_invoices") || "[]"); iv.unshift(inv);
        localStorage.setItem("seva_my_invoices", JSON.stringify(iv));
        localStorage.setItem("seva_last_booking", JSON.stringify(booking));
      } catch (err) {}
      document.getElementById("booking-done").hidden = false;
      document.getElementById("booking-done").innerHTML =
        "<div class='notice green'><b>Booking confirmed — " + booking.id + "</b><br>" +
        w.name + " will arrive " + chosen + " for " + s.name + ".<br>" +
        "<span class='small'>Invoice " + inv.id + " created (Rs. " + s.fee + ", worker gets Rs. " + inv.workerShare + "). </span><br>" +
        "<a class='btn btn-primary' style='margin-top:8px' href='payments.html'>Pay now / view invoice</a></div>";
      form.querySelector("button[type=submit]").disabled = true;
      window.scrollTo(0, document.getElementById("booking-done").offsetTop - 120);
    });
  }
})();
