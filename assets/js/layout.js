/* Shared header / nav / footer. Keeps every page identical without copy-paste. */
(function () {
  var portal = document.body.getAttribute("data-portal") || "customer";
  var root = document.body.getAttribute("data-root") || ".";
  var T = function (k) { return (window.SEVA_I18N ? window.SEVA_I18N.t(k) : k); };
  var cur = document.body.getAttribute("data-page");

  function link(href, label, key) {
    var active = cur === key ? ' aria-current="page"' : "";
    return '<a href="' + root + "/" + href + '"' + active + ">" + label + "</a>";
  }

  var nav;
  if (portal === "worker") {
    nav =
      '<a href="index.html"' + (cur === "worker-home" ? ' aria-current="page"' : "") + ">" + T("nav_dashboard") + "</a>" +
      '<a href="jobs.html"' + (cur === "worker-jobs" ? ' aria-current="page"' : "") + ">" + T("nav_jobs") + "</a>" +
      '<a href="earnings.html"' + (cur === "worker-earnings" ? ' aria-current="page"' : "") + ">" + T("nav_earnings") + "</a>" +
      '<a href="welfare.html"' + (cur === "worker-welfare" ? ' aria-current="page"' : "") + ">" + T("nav_welfare") + "</a>" +
      '<a href="credentials.html"' + (cur === "worker-credentials" ? ' aria-current="page"' : "") + ">" + T("nav_verify") + "</a>" +
      '<a href="../index.html">← ' + T("nav_back") + "</a>";
  } else if (portal === "admin") {
    nav =
      '<a href="index.html"' + (cur === "admin-home" ? ' aria-current="page"' : "") + ">Dashboard</a>" +
      '<a href="forecast.html"' + (cur === "admin-forecast" ? ' aria-current="page"' : "") + ">AI Demand Forecast</a>" +
      '<a href="../index.html">← ' + T("nav_back") + "</a>";
  } else {
    nav =
      link("index.html", T("nav_home"), "home") +
      link("search.html", T("nav_search"), "search") +
      link("emergency.html", T("nav_emergency"), "emergency") +
      link("payments.html", T("nav_payments"), "payments") +
      link("register.html", T("nav_register"), "register") +
      link("admin/index.html", T("nav_admin"), "admin-home") +
      link("worker/index.html", T("nav_worker"), "worker-home");
  }

  var lang = (window.SEVA_I18N ? window.SEVA_I18N.lang() : "en");
  var headerHtml =
    '<div class="tricolour"></div>' +
    '<div class="utility"><div class="wrap">' +
    "<span>" + T("gov_line") + "</span>" +
    '<span>Helpline: <a href="tel:18004190888">1800-419-0888</a> &nbsp;|&nbsp; ' +
    '<a href="#" id="lang-en"' + (lang === "en" ? ' style="font-weight:800;color:#fff"' : "") + '>English</a> / ' +
    '<a href="#" id="lang-kn"' + (lang === "kn" ? ' style="font-weight:800;color:#fff"' : "") + '>ಕನ್ನಡ</a></span>' +
    "</div></div>" +
    '<header class="site-header"><div class="wrap">' +
    '<div class="emblem" aria-hidden="true">SC</div>' +
    "<div><h1 class='site-title'>SevaCoop</h1>" +
    "<p class='site-subtitle'>Labour Cooperative Federation • Regd. under Karnataka Co-operative Societies Act, 1959</p></div>" +
    '<div class="header-actions">' +
    (portal === "worker"
      ? '<span class="badge green">Worker Portal • Ramesh Kumar</span>'
      : portal === "admin"
      ? '<span class="badge green">Federation Admin (demo)</span>'
      : '<a class="btn btn-outline" href="' + root + '/worker/index.html">' + T("worker_login") + '</a> <a class="btn btn-primary" href="' + root + '/booking.html">' + T("book_btn") + "</a>") +
    "</div></div></header>" +
    '<nav class="site-nav" aria-label="Main"><div class="wrap">' + nav + "</div></nav>";

  var footerHtml =
    '<footer class="site-footer"><div class="wrap">' +
    "<div><h4>SevaCoop</h4><p class='small'>Official portal of Karnataka State Registered Domestic and Trades Labour Cooperative Societies. Owned and governed by workers.</p><p class='small'>Reg. No. COOP/BLR/4192/2018 • PS ID 26089 (SIH demo)</p></div>" +
    "<div><h4>Citizens</h4><ul><li><a href='" + root + "/search.html'>Find verified workers</a></li><li><a href='" + root + "/emergency.html'>Emergency 15-min</a></li><li><a href='" + root + "/payments.html'>Payments &amp; invoices</a></li><li><a href='" + root + "/profile.html'>Verify a worker ID</a></li></ul></div>" +
    "<div><h4>Workers &amp; Federation</h4><ul><li><a href='" + root + "/register.html'>Join as worker</a></li><li><a href='" + root + "/worker/index.html'>Worker portal</a></li><li><a href='" + root + "/admin/index.html'>Federation admin</a></li><li><a href='" + root + "/admin/forecast.html'>AI demand forecast</a></li></ul></div>" +
    "<div><h4>Help</h4><ul><li>Helpline: 1800-419-0888</li><li>8 AM - 8 PM, all days</li><li><a href='#'>Grievance cell</a></li></ul></div>" +
    '</div><div class="copyright"><div class="wrap"><span>© 2026 SevaCoop Federation. SIH mockup — synthetic data, no real payments.</span><span>85% of every bill goes directly to the worker.</span></div></div></footer>';

  document.getElementById("site-chrome-header").innerHTML = headerHtml;
  document.getElementById("site-chrome-footer").innerHTML = footerHtml;

  function bindLang(id, l) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("click", function (e) { e.preventDefault(); window.SEVA_I18N.set(l); });
  }
  bindLang("lang-en", "en");
  bindLang("lang-kn", "kn");
  if (window.SEVA_I18N) window.SEVA_I18N.apply();
})();
