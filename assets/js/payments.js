/* Digital payments + invoicing mock. Merges synthetic + localStorage bookings. */
(function () {
  var tbody = document.getElementById("inv-body");
  if (!tbody) return;
  function mine() {
    try {
      var b = JSON.parse(localStorage.getItem("seva_my_bookings") || "[]");
      var iv = JSON.parse(localStorage.getItem("seva_my_invoices") || "[]");
      return { bookings: b, invoices: iv };
    } catch (e) { return { bookings: [], invoices: [] }; }
  }
  function allInvoices() { return mine().invoices.concat(window.SEVA_DATA.invoices); }
  function paint() {
    var rows = allInvoices();
    tbody.innerHTML = rows.map(function (r) {
      return "<tr><td>" + r.id + "</td><td>" + r.booking + "</td><td>" + r.date + "</td>" +
        "<td>Rs. " + r.bill + "</td><td><b>Rs. " + r.workerShare + "</b></td><td>" + r.mode + "</td>" +
        "<td><span class='badge " + (r.status === "Paid" ? "green" : "") + "'>" + r.status + "</span></td></tr>";
    }).join("");
    var sel = document.getElementById("p-inv");
    var unpaid = rows.filter(function (r) { return r.status !== "Paid"; });
    sel.innerHTML = unpaid.map(function (r) {
      return "<option value='" + r.id + "'>" + r.id + " — Rs. " + r.bill + " (" + r.booking + ")</option>";
    }).join("") || "<option value=''>No unpaid invoices (demo)</option>";
  }
  paint();
  document.getElementById("pay-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("p-inv").value;
    if (!id) { alert("Nothing to pay — create a booking first."); return; }
    var mode = document.getElementById("p-mode").value;
    try {
      var iv = JSON.parse(localStorage.getItem("seva_my_invoices") || "[]");
      iv = iv.map(function (r) { return r.id === id ? { id: r.id, booking: r.booking, date: r.date, bill: r.bill, workerShare: r.workerShare, welfare: r.welfare, platform: r.platform, mode: mode, status: "Paid" } : r; });
      localStorage.setItem("seva_my_invoices", JSON.stringify(iv));
    } catch (err) {}
    // Synthetic rows are static; only local ones flip. Re-paint + confirm.
    paint();
    var box = document.getElementById("pay-done");
    box.hidden = false;
    box.innerHTML = "<div class='notice green'><b>Payment successful (demo) — " + id + " via " + mode + ".</b><br><span class='small'>Receipt emailed + SMS. Worker payout queued (85% in ~30 min).</span></div>";
  });
})();
