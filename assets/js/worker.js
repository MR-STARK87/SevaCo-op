/* Worker portal: dashboard toggle, jobs, earnings, upload preview. One file, page-guarded. */
(function () {
  var D = window.SEVA_DATA;

  // Dashboard duty toggle
  var dutyBtns = document.querySelectorAll("[data-duty]");
  if (dutyBtns.length) {
    dutyBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        dutyBtns.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        document.getElementById("duty-status").textContent = "Status: " + b.textContent.trim() + " (updated just now)";
      });
    });
  }

  // Jobs accept / decline
  var jobBox = document.getElementById("job-card");
  if (jobBox) {
    document.getElementById("accept-btn").addEventListener("click", function () {
      jobBox.innerHTML = "<div class='notice green'><b>Dispatch " + D.dispatch.id + " accepted.</b><br>Route to " + D.dispatch.address + ". Customer has been notified. Drive safe.</div>";
    });
    document.getElementById("decline-btn").addEventListener("click", function () {
      if (confirm("Decline and route to backup guild member?")) {
        jobBox.innerHTML = "<div class='notice'><b>Handed off to backup guild member.</b><br>No penalty — cooperative cover keeps your rating intact.</div>";
      }
    });
  }

  // Earnings filter + payout modal
  var tbody = document.getElementById("ledger-body");
  if (tbody) {
    function rows(filter) {
      return D.earnings.rows.filter(function (r) {
        return !filter || (r.job + r.date).toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });
    }
    function paint(filter) {
      tbody.innerHTML = rows(filter).map(function (r) {
        return "<tr><td>" + r.date + "</td><td>" + r.job + "</td><td>Rs. " + r.bill + "</td><td><b>Rs. " + r.payout + "</b></td></tr>";
      }).join("");
    }
    paint("");
    document.getElementById("ledger-q").addEventListener("input", function (e) { paint(e.target.value); });
    var modal = document.getElementById("payout-modal");
    document.getElementById("payout-open").addEventListener("click", function () { modal.hidden = false; });
    document.getElementById("payout-close").addEventListener("click", function () { modal.hidden = true; });
    document.getElementById("payout-confirm").addEventListener("click", function () {
      modal.hidden = true;
      alert("Demo: Rs. " + D.earnings.available + " payout initiated to your bank / UPI. Zero fee.");
    });
  }

  // Skill upload preview
  var file = document.getElementById("cert-file");
  if (file) {
    file.addEventListener("change", function () {
      var f = file.files[0];
      document.getElementById("file-name").textContent = f ? "Selected: " + f.name + " (" + Math.round(f.size / 1024) + " KB)" : "No file selected.";
    });
    document.getElementById("skill-form").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Demo: certificate submitted for guild verification. You will be notified by SMS.");
    });
  }
})();
