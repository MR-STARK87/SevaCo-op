/* Federation admin: KPIs, approvals, bookings + mock AI chart (canvas, no libs). */
(function () {
  var D = window.SEVA_DATA;
  function local(key) { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { return []; } }

  // ---- Dashboard ----
  var kpi = document.getElementById("kpi-row");
  if (kpi) {
    var regs = local("seva_registrations");
    var myB = local("seva_my_bookings");
    var allB = myB.concat(D.bookings);
    var revenue = allB.reduce(function (a, b) { return a + (+b.fee || 0); }, 0);
    var cards = [
      ["12,400+", "Member-workers (5 societies)"],
      [String(D.societies.length), "Registered societies"],
      [String(allB.length), "Bookings this week (demo)"],
      ["Rs. " + revenue.toLocaleString("en-IN"), "Settled via co-op ledger"],
      [String(D.pendingVerifications.length + regs.length), "Pending verifications"]
    ];
    // render 4 + pending = use 4-col grid, show first 4 then pending row note
    kpi.innerHTML = cards.slice(0, 4).map(function (c) {
      return "<div class='card'><p style='font-size:26px;margin:0'><b>" + c[0] + "</b></p><p class='small muted'>" + c[1] + "</p></div>";
    }).join("");
    document.getElementById("soc-body").innerHTML = D.societies.map(function (s) {
      return "<tr><td>" + s.name + "</td><td class='small'>" + s.reg + "</td><td>" + s.workers.toLocaleString("en-IN") + "</td><td>" + s.rating + " ★</td><td>" + s.status + "</td></tr>";
    }).join("");

    function pend() {
      var list = regs.map(function (r) { return { id: r.id, name: r.name, trade: r.trade, society: r.society, submitted: r.submitted, docs: r.docs, mine: true }; })
        .concat(D.pendingVerifications);
      document.getElementById("pend-count").textContent = list.length + " pending";
      document.getElementById("pend-list").innerHTML = list.map(function (p) {
        return "<div class='card' style='margin-bottom:8px'><b>" + p.name + "</b> <span class='muted small'>" + p.trade + " • " + p.society + "</span><br>" +
          "<span class='small muted'>" + p.id + " • " + p.submitted + " • " + p.docs + "</span><br>" +
          "<div style='margin-top:6px;display:flex;gap:8px'>" +
          "<button class='btn btn-green' data-approve='" + p.id + "'>Approve</button>" +
          "<button class='btn btn-outline' data-reject='" + p.id + "'>Reject</button></div></div>";
      }).join("");
    }
    pend();
    document.getElementById("pend-list").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-approve"), r = e.target.getAttribute("data-reject");
      if (a) {
        try { localStorage.setItem("seva_registrations", JSON.stringify(local("seva_registrations").filter(function (x) { return x.id !== a; }))); } catch (err) {}
        alert("Demo: " + a + " approved — member ID + insurance activated (mock SMS sent).");
        location.reload();
      }
      if (r) {
        try { localStorage.setItem("seva_registrations", JSON.stringify(local("seva_registrations").filter(function (x) { return x.id !== r; }))); } catch (err) {}
        alert("Demo: " + r + " sent back for missing documents.");
        location.reload();
      }
    });

    var all = local("seva_my_bookings").concat(D.bookings);
    document.getElementById("book-body").innerHTML = all.slice(0, 10).map(function (b) {
      return "<tr><td>" + b.id + "</td><td>" + b.date + "</td><td>" + b.customer + "</td><td>" + b.worker + "</td><td>" + b.service + "</td><td>Rs. " + b.fee + "</td><td>" + b.status + "</td></tr>";
    }).join("");
  }

  // ---- Forecast chart (mock) ----
  var cv = document.getElementById("fc-chart");
  if (cv) {
    var ctx = cv.getContext("2d");
    var F = D.forecast, W = cv.width, H = cv.height, pad = 44;
    var max = 100;
    function X(i) { return pad + i * ((W - pad - 16) / (F.days.length - 1)); }
    function Y(v) { return H - pad - (v / max) * (H - pad - 30); }
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#d9e2ec"; ctx.fillStyle = "#5d7186"; ctx.font = "12px system-ui";
    for (var g = 0; g <= 100; g += 20) {
      ctx.beginPath(); ctx.moveTo(pad, Y(g)); ctx.lineTo(W - 16, Y(g)); ctx.stroke();
      ctx.fillText(g, 12, Y(g) + 4);
    }
    F.days.forEach(function (d, i) { if (i % 2 === 0) ctx.fillText(d, X(i) - 18, H - 18); });
    function line(arr, color) {
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath();
      arr.forEach(function (v, i) { if (i === 0) ctx.moveTo(X(i), Y(v)); else ctx.lineTo(X(i), Y(v)); });
      ctx.stroke(); ctx.lineWidth = 1;
    }
    line(F.plumbing, "#176f45"); line(F.electrical, "#153e6e"); line(F.cleaning, "#c77414");
    document.getElementById("alloc-body").innerHTML = D.allocation.map(function (a) {
      return "<tr><td><b>" + a.zone + "</b></td><td>" + a.action + "</td><td class='small'>" + a.reason + "</td></tr>";
    }).join("");
  }
})();
