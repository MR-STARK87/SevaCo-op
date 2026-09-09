/* SevaCoop synthetic demo data (no backend).
   Covers all 10 PS trades + societies, bookings, invoices, reviews, AI forecast.
   Rates follow Karnataka Co-op Gazette Schedule IV. Payout split 85 / 10 / 5. */

window.SEVA_DATA = {
  helpline: "1800-419-0888",
  // lat/lng are mock Bengaluru points around Indiranagar (12.9784, 77.6408)
  workers: [
    { id: "ramesh", name: "Ramesh Kumar", trade: "Plumbing", level: "Senior Master Plumber", exp: 11, rating: 4.93, jobs: 1420, rate: 349, area: "Indiranagar", zone: "East", distKm: 1.2, lat: 12.978, lng: 77.641, coop: "KA Shramik Sahakari Sangha", reg: "KSL-4491", verified: true, available: true, phone: "98XXXX8894", since: 2018 },
    { id: "basavaraj", name: "Basavaraj K.", trade: "Plumbing", level: "Trustee Member", exp: 9, rating: 4.88, jobs: 980, rate: 329, area: "Domlur", zone: "East", distKm: 2.1, lat: 12.964, lng: 77.638, coop: "Bengaluru Central Zone #4", reg: "KA-BLR-5542", verified: true, available: true, phone: "97XXXX2210", since: 2019 },
    { id: "anita", name: "Anita Devi", trade: "Electrical", level: "Certified Electrician", exp: 7, rating: 4.91, jobs: 860, rate: 359, area: "Ulsoor", zone: "Central", distKm: 3.4, lat: 12.981, lng: 77.619, coop: "Ulsoor Sahakari Seva Samiti", reg: "FED-KA-801", verified: true, available: true, phone: "96XXXX7741", since: 2020 },
    { id: "suresh", name: "Suresh M.", trade: "Carpentry", level: "Master Carpenter", exp: 12, rating: 4.86, jobs: 1120, rate: 399, area: "Koramangala", zone: "South", distKm: 5.6, lat: 12.935, lng: 77.624, coop: "Karnataka Shramik Co-op", reg: "COOP-BLR-094", verified: true, available: false, phone: "99XXXX3320", since: 2017 },
    { id: "fatima", name: "Fatima S.", trade: "Caregiver", level: "Certified Caregiver", exp: 6, rating: 4.95, jobs: 640, rate: 299, area: "Indiranagar", zone: "East", distKm: 0.8, lat: 12.979, lng: 77.643, coop: "Bengaluru North Urban Union", reg: "COOP-BLR-142", verified: true, available: true, phone: "98XXXX5512", since: 2021 },
    { id: "ravi", name: "Ravi Teja", trade: "Technician", level: "HVAC Specialist", exp: 8, rating: 4.84, jobs: 790, rate: 379, area: "HAL 2nd Stage", zone: "East", distKm: 1.8, lat: 12.969, lng: 77.648, coop: "Domlur Job Collective", reg: "KA-PL-8831", verified: true, available: true, phone: "97XXXX9088", since: 2019 },
    { id: "prakash", name: "Prakash N.", trade: "Painter", level: "Guild Painter", exp: 10, rating: 4.82, jobs: 540, rate: 319, area: "Marathahalli", zone: "East", distKm: 4.2, lat: 12.959, lng: 77.697, coop: "KA Shramik Sahakari Sangha", reg: "KA-PT-2201", verified: true, available: true, phone: "96XXXX1188", since: 2018 },
    { id: "lakshmi", name: "Lakshmi V.", trade: "Domestic Help", level: "Verified Home Aide", exp: 5, rating: 4.9, jobs: 720, rate: 249, area: "Indiranagar", zone: "East", distKm: 1.0, lat: 12.976, lng: 77.639, coop: "Bengaluru North Urban Union", reg: "KA-DH-3310", verified: true, available: true, phone: "99XXXX6721", since: 2021 },
    { id: "imran", name: "Imran Khan", trade: "Driver", level: "Licensed Driver (LMV)", exp: 9, rating: 4.87, jobs: 890, rate: 349, area: "Shivajinagar", zone: "Central", distKm: 4.8, lat: 12.985, lng: 77.605, coop: "Ulsoor Sahakari Seva Samiti", reg: "KA-DR-4102", verified: true, available: true, phone: "98XXXX3490", since: 2019 },
    { id: "gopal", name: "Gopal R.", trade: "Gardener", level: "Community Gardener", exp: 13, rating: 4.85, jobs: 610, rate: 279, area: "HSR Layout", zone: "South", distKm: 6.9, lat: 12.911, lng: 77.647, coop: "Karnataka Shramik Co-op", reg: "KA-GD-5530", verified: true, available: true, phone: "97XXXX8823", since: 2016 },
    { id: "meena", name: "Meena S.", trade: "Cleaner", level: "Deep-clean Specialist", exp: 4, rating: 4.89, jobs: 930, rate: 269, area: "Domlur", zone: "East", distKm: 2.4, lat: 12.966, lng: 77.637, coop: "Domlur Job Collective", reg: "KA-CL-7812", verified: true, available: true, phone: "96XXXX2034", since: 2022 },
    { id: "arun", name: "Arun P.", trade: "Electrical", level: "Wireman Grade-2", exp: 6, rating: 4.78, jobs: 410, rate: 319, area: "Yelahanka", zone: "North", distKm: 11.5, lat: 13.101, lng: 77.596, coop: "Bengaluru North Urban Union", reg: "KA-EL-9024", verified: false, available: true, phone: "99XXXX5176", since: 2023 }
  ],
  trades: ["Plumbing", "Electrical", "Carpentry", "Painter", "Domestic Help", "Caregiver", "Driver", "Gardener", "Cleaner", "Technician"],
  services: [
    { name: "Water Pipe Leaking", est: "45-60 mins", fee: 349 },
    { name: "Tap / Mixer Repair", est: "30-45 mins", fee: 299 },
    { name: "Clogged Sink / Drain", est: "40-75 mins", fee: 349 },
    { name: "Toilet Flush / Cistern", est: "45 mins", fee: 329 },
    { name: "Full Home Inspection", est: "90 mins", fee: 499 },
    { name: "Emergency burst response (15-min)", est: "~15 min ETA", fee: 499 }
  ],
  societies: [
    { name: "KA Shramik Sahakari Sangha", reg: "COOP/BLR/4192/2018", zone: "East", workers: 3200, rating: 4.89, status: "Active" },
    { name: "Ulsoor Sahakari Seva Samiti", reg: "FED-KA-801/2020", zone: "Central", workers: 2100, rating: 4.87, status: "Active" },
    { name: "Bengaluru North Urban Union", reg: "COOP-BLR-142/2019", zone: "North", workers: 2800, rating: 4.88, status: "Active" },
    { name: "Domlur Job Collective", reg: "KA-PL-8831/2021", zone: "East", workers: 1400, rating: 4.86, status: "Active" },
    { name: "Karnataka Shramik Co-op", reg: "COOP-BLR-094/2017", zone: "South", workers: 2900, rating: 4.85, status: "Audit due" }
  ],
  bookings: [
    { id: "BK-10421", date: "08 Sep 2026", customer: "Priya Sharma", worker: "Ramesh Kumar", service: "Tap / Mixer Repair", fee: 299, status: "Completed", payMode: "UPI", rating: 5 },
    { id: "BK-10419", date: "07 Sep 2026", customer: "St. Johns School", worker: "Anita Devi", service: "Classroom fan repair x4", fee: 1299, status: "Completed", payMode: "NEFT (institution)", rating: 5 },
    { id: "BK-10417", date: "07 Sep 2026", customer: "Dr. Vikram Malhotra", worker: "Ravi Teja", service: "Geyser servicing", fee: 1099, status: "Completed", payMode: "Card", rating: 4 },
    { id: "BK-10415", date: "06 Sep 2026", customer: "Palm Meadows RWA", worker: "Gopal R.", service: "Park hedge trimming", fee: 1899, status: "Completed", payMode: "NEFT (institution)", rating: 5 },
    { id: "BK-10412", date: "06 Sep 2026", customer: "Kavya N.", worker: "Meena S.", service: "2BHK deep clean", fee: 1499, status: "Completed", payMode: "UPI", rating: 5 },
    { id: "BK-10409", date: "05 Sep 2026", customer: "Apartment 3B, HAL", worker: "Ramesh Kumar", service: "Pipe burst repair", fee: 1249, status: "Completed", payMode: "UPI", rating: 5 }
  ],
  invoices: [
    { id: "INV-2026-881", booking: "BK-10421", date: "08 Sep 2026", bill: 299, workerShare: 254, welfare: 30, platform: 15, mode: "UPI", status: "Paid" },
    { id: "INV-2026-879", booking: "BK-10419", date: "07 Sep 2026", bill: 1299, workerShare: 1104, welfare: 130, platform: 65, mode: "NEFT", status: "Paid" },
    { id: "INV-2026-877", booking: "BK-10417", date: "07 Sep 2026", bill: 1099, workerShare: 934, welfare: 110, platform: 55, mode: "Card", status: "Paid" },
    { id: "INV-2026-875", booking: "BK-10415", date: "06 Sep 2026", bill: 1899, workerShare: 1614, welfare: 190, platform: 95, mode: "NEFT", status: "Paid" },
    { id: "INV-2026-872", booking: "BK-10412", date: "06 Sep 2026", bill: 1499, workerShare: 1274, welfare: 150, platform: 75, mode: "UPI", status: "Paid" }
  ],
  reviews: {
    ramesh: [
      { name: "Priya S.", rating: 5, date: "Aug 2026", text: "Fixed concealed leak in one visit, showed rate card before starting. Very courteous." },
      { name: "Palm Meadows RWA", rating: 5, date: "Jul 2026", text: "Attended 3 flats in our block. Billing matched the estimate exactly." }
    ],
    anita: [{ name: "St. Johns School", rating: 5, date: "Sep 2026", text: "Repaired 4 classroom fans, safety-tested every board." }],
    fatima: [{ name: "Kavya N.", rating: 5, date: "Aug 2026", text: "Gentle and punctual with my elderly mother." }]
  },
  pendingVerifications: [
    { id: "APP-3011", name: "Arun P.", trade: "Electrical", society: "Bengaluru North Urban Union", submitted: "04 Sep 2026", docs: "Aadhaar ✓, Trade cert pending" },
    { id: "APP-3009", name: "Divya H.", trade: "Cleaner", society: "Domlur Job Collective", submitted: "03 Sep 2026", docs: "Aadhaar ✓, Police check pending" },
    { id: "APP-3007", name: "Manoj T.", trade: "Driver", society: "Ulsoor Sahakari Seva Samiti", submitted: "02 Sep 2026", docs: "Licence ✓, Medical pending" }
  ],
  // Mock 14-day demand forecast (jobs/day). Labeled as simulated model output.
  forecast: {
    days: ["09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep", "15 Sep", "16 Sep", "17 Sep", "18 Sep", "19 Sep", "20 Sep", "21 Sep", "22 Sep"],
    plumbing: [42, 45, 44, 51, 62, 68, 55, 43, 44, 46, 52, 64, 70, 57],
    electrical: [30, 31, 33, 36, 41, 44, 38, 31, 32, 33, 37, 42, 45, 39],
    cleaning: [55, 52, 50, 58, 74, 88, 70, 54, 53, 51, 60, 76, 90, 72]
  },
  allocation: [
    { zone: "East (Indiranagar/Domlur)", action: "Move 6 plumbers from Central on 13–14 Sep", reason: "Weekend + festival spike: plumbing 68 vs 44 capacity" },
    { zone: "South (HSR/Koramangala)", action: "Open 10 cleaner slots on 19–20 Sep", reason: "Cleaning forecast 90 vs 60 staffed" },
    { zone: "North (Yelahanka)", action: "Fast-track 4 pending verifications", reason: "Electrical demand +35% with 2 workers short" }
  ],
  dispatch: {
    id: "DIS-88392",
    title: "Concealed Pipeline Burst / Severe Inflow Leak",
    customer: "Dr. Vikram Malhotra",
    address: "Apartment 3B, Palm Meadows, 14th Cross, HAL 2nd Stage, Indiranagar",
    distance: "1.8 km (~12 mins via 100ft Road)",
    note: "Water leaking through kitchen floor joints. Buckets placed, needs experienced plumber right away."
  },
  earnings: {
    monthNet: 42650,
    available: 4280,
    welfarePool: 5540,
    dividend: 3120,
    rows: [
      { date: "06 Sep 2026", job: "Pipe burst repair - Indiranagar", bill: 1249, payout: 1061 },
      { date: "05 Sep 2026", job: "Tap replacement x2 - Domlur", bill: 898, payout: 763 },
      { date: "04 Sep 2026", job: "Drain unclogging - Ulsoor", bill: 749, payout: 636 },
      { date: "03 Sep 2026", job: "Geyser servicing - HAL", bill: 1099, payout: 934 },
      { date: "02 Sep 2026", job: "Cistern repair - Koramangala", bill: 829, payout: 704 }
    ]
  },
  schemes: [
    { name: "Family Health Cover (Ayushman Bharat + Co-op top-up)", cover: "Rs. 5,00,000 cashless / year", status: "Active - Policy AB-KSC-8812", desc: "Self + spouse + 2 children. Zero premium while in good standing." },
    { name: "Pension Corpus Pool", cover: "Rs. 1,84,350 accumulated", status: "100% matching active", desc: "10% of every bill flows here. 7.8% p.a. interest." },
    { name: "Education Stipend", cover: "Rs. 24,000 / year", status: "Next batch: 10 Nov", desc: "For member children in ITI / diploma courses." },
    { name: "Equipment Credit Line", cover: "Rs. 25,000 at 0% interest", status: "Approved", desc: "Tool kits, shears, pressure meters. Repay from payouts." }
  ]
};
