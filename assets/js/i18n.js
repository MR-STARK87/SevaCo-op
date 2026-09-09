/* Mock multilingual layer (EN / KN). No backend — dictionary + localStorage.
   To add Hindi: extend SEVA_I18N.hi. Pages opt in via data-i18n="key". */
window.SEVA_I18N = {
  lang: function () { try { return localStorage.getItem("seva_lang") || "en"; } catch (e) { return "en"; } },
  set: function (l) { try { localStorage.setItem("seva_lang", l); } catch (e) {} location.reload(); },
  dict: {
    en: {
      gov_line: "Government of Karnataka | Labour Cooperative Federation",
      nav_home: "Home", nav_search: "Find Services", nav_emergency: "Emergency 15-min",
      nav_payments: "Payments", nav_register: "Join as Worker", nav_admin: "Federation Admin",
      nav_worker: "Worker Portal", nav_dashboard: "Dashboard", nav_jobs: "Job Requests",
      nav_earnings: "Earnings", nav_welfare: "Welfare", nav_verify: "Verification",
      nav_back: "Customer Site", book_btn: "Book a Service", worker_login: "Worker Login",
      hero_eye: "Karnataka Co-operative Societies Act, 1959",
      hero_h: "Verified home services. Owned by the workers who serve you.",
      hero_p: "SevaCoop is the official portal of registered labour cooperatives in Bengaluru. No hidden commissions, no surge pricing — every booking is receipted and audited.",
      find_btn: "Find a verified worker", verify_btn: "Verify a worker ID"
    },
    kn: {
      gov_line: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ | ಕಾರ್ಮಿಕ ಸಹಕಾರಿ ಮಹಾಮಂಡಳ",
      nav_home: "ಮುಖಪುಟ", nav_search: "ಸೇವೆ ಹುಡುಕಿ", nav_emergency: "ತುರ್ತು 15-ನಿಮಿಷ",
      nav_payments: "ಪಾವತಿಗಳು", nav_register: "ಕಾರ್ಮಿಕರಾಗಿ ಸೇರಿ", nav_admin: "ಮಹಾಮಂಡಳ ನಿರ್ವಹಣೆ",
      nav_worker: "ಕಾರ್ಮಿಕ ಪೋರ್ಟಲ್", nav_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", nav_jobs: "ಕೆಲಸ ವಿನಂತಿಗಳು",
      nav_earnings: "ಆದಾಯ", nav_welfare: "ಕಲ್ಯಾಣ", nav_verify: "ಪರಿಶೀಲನೆ",
      nav_back: "ಗ್ರಾಹಕ ತಾಣ", book_btn: "ಸೇವೆ ಬುಕ್ ಮಾಡಿ", worker_login: "ಕಾರ್ಮಿಕ ಲಾಗಿನ್",
      hero_eye: "ಕರ್ನಾಟಕ ಸಹಕಾರ ಸಂಘಗಳ ಕಾಯ್ದೆ, 1959",
      hero_h: "ಪರಿಶೀಲಿತ ಮನೆ ಸೇವೆಗಳು. ನಿಮಗೆ ಸೇವೆ ನೀಡುವ ಕಾರ್ಮಿಕರ ಒಡೆತನದಲ್ಲಿ.",
      hero_p: "ಸೇವಾಕೂಪ್ ಬೆಂಗಳೂರಿನ ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕ ಸಹಕಾರ ಸಂಘಗಳ ಅಧಿಕೃತ ಪೋರ್ಟಲ್. ಗುಪ್ತ ಕಮಿಷನ್ ಇಲ್ಲ, ಸರ್ಜ್ ಬೆಲೆ ಇಲ್ಲ — ಪ್ರತಿ ಬುಕಿಂಗ್‌ಗೆ ರಸೀದಿ ಮತ್ತು ಲೆಕ್ಕಪರಿಶೋಧನೆ.",
      find_btn: "ಪರಿಶೀಲಿತ ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಿ", verify_btn: "ಕಾರ್ಮಿಕ ID ಪರಿಶೀಲಿಸಿ"
    }
  },
  t: function (key) {
    var l = this.lang();
    return (this.dict[l] && this.dict[l][key]) || this.dict.en[key] || key;
  },
  apply: function () {
    var self = this;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = self.t(el.getAttribute("data-i18n"));
    });
  }
};
