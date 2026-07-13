  const TICKSOL_WA   = '923001234567'; // WhatsApp number with country code, no +
  const TICKSOL_EMAIL = 'info@ticksol.com';
  const TICKSOL_NAME  = 'Ticksol Travels';

// ── CORE BOOKING FUNCTIONS ──────────────────────────────
let _currentPkg = '', _currentPrice = '';

// Which form fields are relevant for each "What We Offer" service.
// Keyed by the exact enquiry name passed into openBookingModal(). Anything
// not listed here falls back to _DEFAULT_FIELD_CONFIG (airline shown,
// generic labels) so nothing breaks if a new call site is added later.
const _SERVICE_FIELD_CONFIG = {
  'Flight Booking Enquiry': {
    paxPlaceholder: 'Number of Travelers (e.g. 2 Adults, 1 Child)',
    datePlaceholder: 'Preferred Travel Date (e.g. July 2026)',
    showAirline: true,
    showVisaType: false,
    showDate: false,
    showCheckout: false,
    showFromTo: false,
    showHotelCity: false,
    showCorporateName: false,
    showVisaCountry: false,
    showTripDetails: true,
    showAirportTransfer: false
  },
  'Hotel Booking Enquiry': {
    paxPlaceholder: 'Number of Guests (e.g. 2 Adults)',
    datePlaceholder: 'Check-in Date (e.g. July 2026)',
    showAirline: false,
    showVisaType: false,
    showDate: true,
    showCheckout: true,
    showFromTo: false,
    showHotelCity: true,
    showCorporateName: false,
    showVisaCountry: false,
    showTripDetails: false,
    showAirportTransfer: false
  },
  'Visa Consultancy Enquiry': {
    paxPlaceholder: 'Number of Applicants',
    datePlaceholder: 'Planned Travel Date (e.g. July 2026)',
    showAirline: false,
    showVisaType: true,
    showDate: false,
    showCheckout: false,
    showFromTo: false,
    showHotelCity: false,
    showCorporateName: false,
    showVisaCountry: true,
    showTripDetails: false,
    showAirportTransfer: false
  },
  'Airport Transfer Booking': {
    paxPlaceholder: 'Number of Passengers',
    datePlaceholder: 'Pickup Date & Time',
    showAirline: false,
    showVisaType: false,
    showDate: false,
    showCheckout: false,
    showFromTo: false,
    showHotelCity: false,
    showCorporateName: false,
    showVisaCountry: false,
    showTripDetails: false,
    showAirportTransfer: true
  },
  'Corporate Travel Enquiry': {
    paxPlaceholder: 'Number of Travelers / Employees',
    datePlaceholder: 'Preferred Travel Date (e.g. July 2026)',
    showAirline: false,
    showVisaType: false,
    showDate: true,
    showCheckout: false,
    showFromTo: true,
    showHotelCity: false,
    showCorporateName: true,
    showVisaCountry: false,
    showTripDetails: false,
    showAirportTransfer: false
  }
};
const _DEFAULT_FIELD_CONFIG = {
  paxPlaceholder: 'Number of Travelers (e.g. 2 Adults, 1 Child)',
  datePlaceholder: 'Preferred Travel Date (e.g. July 2026)',
  showAirline: true,
  showVisaType: false,
  showDate: true,
  showCheckout: false,
  showFromTo: false,
  showHotelCity: false,
  showCorporateName: false,
  showVisaCountry: false,
  showTripDetails: false,
  showAirportTransfer: false
};

// ── CUSTOM DROPDOWN ENGINE ──────────────────────────────
// Native <select> popup lists can't be styled with gradients or text-shadow
// in any browser — that's a platform limitation, not a CSS gap. This
// progressively enhances every targeted <select> with a fully custom,
// themeable dropdown, while keeping the original <select> in the DOM
// (visually hidden) as the single source of truth. All existing code that
// reads/sets .value or listens for 'change' on these selects keeps working
// unmodified, because the custom UI just drives the real <select> and fires
// a real 'change' event when an option is picked.
const _csWraps = [];

function _csBuildOption(select, optNode, panel) {
  const row = document.createElement('div');
  row.className = 'cs-option';
  row.textContent = optNode.textContent;
  row.setAttribute('role', 'option');
  row.dataset.value = optNode.value;
  if (optNode.disabled) row.classList.add('cs-option-disabled');
  row.addEventListener('click', function () {
    if (optNode.disabled) return;
    select.value = optNode.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    _csSyncWrap(select);
    _csCloseAll();
  });
  return row;
}

function _csBuildPanel(select, panel) {
  panel.innerHTML = '';
  Array.from(select.children).forEach(function (node) {
    if (node.tagName === 'OPTGROUP') {
      const label = document.createElement('div');
      label.className = 'cs-optgroup-label';
      label.textContent = node.label;
      panel.appendChild(label);
      Array.from(node.children).forEach(function (opt) {
        panel.appendChild(_csBuildOption(select, opt, panel));
      });
    } else if (node.tagName === 'OPTION') {
      panel.appendChild(_csBuildOption(select, node, panel));
    }
  });
}

function _csSyncWrap(select) {
  const entry = _csWraps.find(function (w) { return w.select === select; });
  if (!entry) return;
  const opt = select.options[select.selectedIndex];
  const text = opt ? opt.textContent : '';
  entry.trigger.textContent = text;
  entry.trigger.classList.toggle('cs-placeholder', !select.value);
  Array.from(entry.panel.querySelectorAll('.cs-option')).forEach(function (row) {
    row.classList.toggle('cs-option-selected', row.dataset.value === select.value);
  });
}

// Call this after any code programmatically changes a select's value
// (e.g. resetting a form on close) so the custom trigger text stays in sync.
function _csRefreshAll() {
  _csWraps.forEach(function (w) { _csSyncWrap(w.select); });
}

function _csCloseAll() {
  _csWraps.forEach(function (w) {
    w.panel.classList.remove('open');
    w.wrap.classList.remove('cs-open');
  });
}

function _csEnhanceSelect(select) {
  if (select.dataset.csEnhanced) return;
  select.dataset.csEnhanced = '1';

  const wrap = document.createElement('div');
  wrap.className = 'cs-wrap';
  select.parentNode.insertBefore(wrap, select);
  wrap.appendChild(select);
  select.classList.add('cs-native-hidden');
  select.setAttribute('tabindex', '-1');
  select.setAttribute('aria-hidden', 'true');

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'cs-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  wrap.appendChild(trigger);

  const panel = document.createElement('div');
  panel.className = 'cs-panel';
  panel.setAttribute('role', 'listbox');
  wrap.appendChild(panel);

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = panel.classList.contains('open');
    _csCloseAll();
    if (!isOpen) {
      panel.classList.add('open');
      wrap.classList.add('cs-open');
    }
  });

  _csBuildPanel(select, panel);
  _csWraps.push({ select: select, wrap: wrap, trigger: trigger, panel: panel });
  _csSyncWrap(select);
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.cs-wrap')) _csCloseAll();
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll(
    '#cf-service, #modal-visa-type, #modal-airline, #tp-airline, #visa-type, #tp-trip-type, #modal-trip-type, #modal-airport-direction'
  ).forEach(_csEnhanceSelect);
});

function openBookingModal(pkgName, price) {
  _currentPkg = pkgName;
  _currentPrice = price;
  const modal = document.getElementById('booking-modal');
  const summary = document.getElementById('modal-pkg-summary');
  document.getElementById('modal-title').textContent = pkgName || 'Booking Enquiry';
  if (pkgName) {
    summary.style.display = 'flex';
    document.getElementById('modal-pkg-name').textContent = pkgName;
    document.getElementById('modal-pkg-price').textContent = price || '';
  } else {
    summary.style.display = 'none';
  }

  // Show only the fields relevant to this specific enquiry type.
  const cfg = _SERVICE_FIELD_CONFIG[pkgName] || _DEFAULT_FIELD_CONFIG;
  document.getElementById('modal-pax').placeholder = cfg.paxPlaceholder;
  document.getElementById('modal-date').placeholder = cfg.datePlaceholder;

  const dateField = document.getElementById('modal-date-field');
  if (dateField) {
    dateField.style.display = cfg.showDate ? '' : 'none';
    if (!cfg.showDate) document.getElementById('modal-date').value = '';
  }

  const checkoutField = document.getElementById('modal-checkout-field');
  if (checkoutField) {
    checkoutField.style.display = cfg.showCheckout ? '' : 'none';
    if (!cfg.showCheckout) document.getElementById('modal-checkout').value = '';
  }

  const airlineField = document.getElementById('modal-airline-field');
  if (airlineField) {
    airlineField.style.display = cfg.showAirline ? '' : 'none';
    if (!cfg.showAirline) {
      // Reset so a leftover selection never sneaks into a message where it's irrelevant
      const sel = document.getElementById('modal-airline');
      const other = document.getElementById('modal-airline-other');
      if (sel) sel.value = '';
      if (other) { other.value = ''; other.style.display = 'none'; }
    }
  }

  const visaTypeField = document.getElementById('modal-visatype-field');
  if (visaTypeField) {
    visaTypeField.style.display = cfg.showVisaType ? '' : 'none';
    if (!cfg.showVisaType) {
      const visaSel = document.getElementById('modal-visa-type');
      if (visaSel) visaSel.value = '';
    }
  }

  const fromToField = document.getElementById('modal-fromto-field');
  if (fromToField) {
    fromToField.style.display = cfg.showFromTo ? '' : 'none';
    if (!cfg.showFromTo) {
      document.getElementById('modal-from').value = '';
      document.getElementById('modal-to').value = '';
    }
  }

  const hotelCityField = document.getElementById('modal-hotelcity-field');
  if (hotelCityField) {
    hotelCityField.style.display = cfg.showHotelCity ? '' : 'none';
    if (!cfg.showHotelCity) document.getElementById('modal-hotel-city').value = '';
  }

  const corpNameField = document.getElementById('modal-corpname-field');
  if (corpNameField) {
    corpNameField.style.display = cfg.showCorporateName ? '' : 'none';
    if (!cfg.showCorporateName) document.getElementById('modal-corp-name').value = '';
  }

  const visaCountryField = document.getElementById('modal-visacountry-field');
  if (visaCountryField) {
    visaCountryField.style.display = cfg.showVisaCountry ? '' : 'none';
    if (!cfg.showVisaCountry) {
      document.getElementById('modal-nationality').value = '';
      document.getElementById('modal-visa-country').value = '';
    }
  }
  const visaCountryError = document.getElementById('modal-visa-country-error');
  if (visaCountryError) visaCountryError.style.display = 'none';

  const tripDetailsField = document.getElementById('modal-tripdetails-field');
  if (tripDetailsField) {
    tripDetailsField.style.display = cfg.showTripDetails ? '' : 'none';
    if (!cfg.showTripDetails) {
      document.getElementById('modal-trip-nationality').value = '';
      document.getElementById('modal-trip-type').value = '';
      document.getElementById('modal-dep-city').value = '';
      document.getElementById('modal-dest-city').value = '';
      document.getElementById('modal-dep-date').value = '';
      document.getElementById('modal-return-date').value = '';
    }
    _toggleModalReturnDate();
  }

  const airportTransferField = document.getElementById('modal-airporttransfer-field');
  if (airportTransferField) {
    airportTransferField.style.display = cfg.showAirportTransfer ? '' : 'none';
    if (!cfg.showAirportTransfer) {
      document.getElementById('modal-airport-city').value = '';
      document.getElementById('modal-airport-direction').value = '';
    }
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  _csRefreshAll();
}

// Shows the Return Date field in the booking modal only when "Round Trip"
// is selected, clearing it otherwise so a stale date never gets sent.
function _toggleModalReturnDate() {
  const tripTypeSel = document.getElementById('modal-trip-type');
  const returnInput = document.getElementById('modal-return-date');
  if (!tripTypeSel || !returnInput) return;
  const isRoundTrip = tripTypeSel.value === 'Round Trip';
  returnInput.style.display = isRoundTrip ? '' : 'none';
  if (!isRoundTrip) returnInput.value = '';
}

function closeModal() {
  document.getElementById('booking-modal').classList.remove('open');
  document.body.style.overflow = '';
  const airlineSel = document.getElementById('modal-airline');
  const airlineOther = document.getElementById('modal-airline-other');
  if (airlineSel) airlineSel.value = '';
  if (airlineOther) { airlineOther.value = ''; airlineOther.style.display = 'none'; }
  const visaSel = document.getElementById('modal-visa-type');
  if (visaSel) visaSel.value = '';
  const checkoutInput = document.getElementById('modal-checkout');
  if (checkoutInput) checkoutInput.value = '';
  const fromInput = document.getElementById('modal-from');
  if (fromInput) fromInput.value = '';
  const toInput = document.getElementById('modal-to');
  if (toInput) toInput.value = '';
  const hotelCityInput = document.getElementById('modal-hotel-city');
  if (hotelCityInput) hotelCityInput.value = '';
  const corpNameInput = document.getElementById('modal-corp-name');
  if (corpNameInput) corpNameInput.value = '';
  const nationalityInput = document.getElementById('modal-nationality');
  if (nationalityInput) nationalityInput.value = '';
  const visaCountryInput = document.getElementById('modal-visa-country');
  if (visaCountryInput) visaCountryInput.value = '';
  const visaCountryError = document.getElementById('modal-visa-country-error');
  if (visaCountryError) visaCountryError.style.display = 'none';
  const tripNationalityInput = document.getElementById('modal-trip-nationality');
  if (tripNationalityInput) tripNationalityInput.value = '';
  const tripTypeSel = document.getElementById('modal-trip-type');
  if (tripTypeSel) tripTypeSel.value = '';
  const depCityInput = document.getElementById('modal-dep-city');
  if (depCityInput) depCityInput.value = '';
  const destCityInput = document.getElementById('modal-dest-city');
  if (destCityInput) destCityInput.value = '';
  const depDateInput = document.getElementById('modal-dep-date');
  if (depDateInput) depDateInput.value = '';
  const returnDateInput = document.getElementById('modal-return-date');
  if (returnDateInput) { returnDateInput.value = ''; returnDateInput.style.display = 'none'; }
  const airportCityInput = document.getElementById('modal-airport-city');
  if (airportCityInput) airportCityInput.value = '';
  const airportDirectionSel = document.getElementById('modal-airport-direction');
  if (airportDirectionSel) airportDirectionSel.value = '';
  _csRefreshAll();
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('booking-modal')) closeModal();
}

// ── CARD DETAIL MODAL ───────────────────────────────────
// Opens a larger preview (image, description, reviews placeholder, Book Now)
// when a destination / package / spiritual-tour card is clicked.
// Reads its content straight from the card's own DOM (image, heading,
// description, tag) so it can never drift out of sync with the card —
// and delegates "Book Now" to that same card's real button, so booking
// behavior always stays identical to clicking the button directly.
let _cdOriginalBtn = null;

function _cdFindDescription(article, imgEl) {
  var p = article.querySelector('.pkg-body p, .spirit-body p, .dest-body p, p');
  if (p && p.textContent.trim()) return p.textContent.trim();
  // dest-cards have no <p> description — fall back to the image's alt text,
  // which already carries a human-written description of the place.
  return imgEl && imgEl.alt ? imgEl.alt : '';
}

// Traveler reviews shown in the card-detail modal, one distinct set per
// destination/package/spiritual card. Cards not explicitly listed fall
// back to _CD_FALLBACK_REVIEWS so nothing breaks if a new card is ever
// added without matching review data.
var _CD_REVIEWS_BY_CARD = {
  "Islamabad": [
    { name: "Ahmed Raza", stars: 5, text: "The city felt calm and green, and Ticksol planned our Margalla Hills evening perfectly." },
    { name: "Sana Malik", stars: 5, text: "Loved how organized the whole trip was \u2014 hotel, transport, everything sorted in advance." },
    { name: "Bilal Hussain", stars: 4, text: "A relaxing short break. Would have liked a bit more time at Faisal Mosque." },
  ],
  "Karachi": [
    { name: "Ayesha Siddiqui", stars: 5, text: "Great food tour and a beautiful evening by the sea \u2014 well organized from start to finish." },
    { name: "Usman Tariq", stars: 5, text: "Our guide knew all the best local spots. Made the city so much easier to enjoy." },
    { name: "Fatima Noor", stars: 4, text: "Good trip overall, traffic made a couple of stops rushed but the team handled it well." },
  ],
  "Gilgit": [
    { name: "Zainab Khan", stars: 5, text: "Waking up to those mountain views every morning was unforgettable. Superbly arranged." },
    { name: "Hamza Sheikh", stars: 5, text: "One of the most scenic trips we've taken. Ticksol handled every detail smoothly." },
    { name: "Mariam Iqbal", stars: 5, text: "Stunning scenery and a very comfortable stay. Highly recommend this route." },
  ],
  "Skardu": [
    { name: "Talha Farooq", stars: 5, text: "The valley views were breathtaking. Transport and stays were exactly as promised." },
    { name: "Noor ul Ain", stars: 5, text: "Perfectly planned mountain trip \u2014 even the long drives were made comfortable." },
    { name: "Danish Aslam", stars: 4, text: "Beautiful destination, just wish we'd booked an extra day to explore more." },
  ],
  "Multan": [
    { name: "Iqra Baig", stars: 5, text: "Loved the historic shrines and old city walks. Well-paced itinerary throughout." },
    { name: "Faisal Chaudhry", stars: 5, text: "A cultural trip done right \u2014 knowledgeable guide and smooth logistics." },
    { name: "Hina Yousaf", stars: 4, text: "Enjoyable heritage tour, though the summer heat made midday stops a bit tiring." },
  ],
  "Peshawar": [
    { name: "Kamran Afridi", stars: 5, text: "The old city and the food were incredible. Trip was arranged without a hitch." },
    { name: "Sadia Gul", stars: 5, text: "Rich history everywhere we went, and a very attentive local guide." },
    { name: "Omar Shinwari", stars: 4, text: "Great cultural experience, communication about the schedule could've been a touch clearer." },
  ],
  "Lahore": [
    { name: "Adeel Nasir", stars: 5, text: "Food Street at night was the highlight. Everything else ran on time too." },
    { name: "Rabia Ahmed", stars: 5, text: "Beautifully planned trip through the old city and gardens. Would book again." },
    { name: "Waqas Rana", stars: 5, text: "Great mix of history, food, and comfort. Smooth booking process." },
  ],
  "Dubai, UAE": [
    { name: "Aisha Al Mansoori", stars: 5, text: "Desert safari and the city tour were both fantastic \u2014 very well coordinated." },
    { name: "James Whitfield", stars: 5, text: "Everything from the hotel to the transfers was handled professionally." },
    { name: "Priya Nair", stars: 4, text: "Great trip overall, would've liked a little more free time for shopping." },
  ],
  "Turkey": [
    { name: "Elif Yildiz", stars: 5, text: "Istanbul's old town and the Bosphorus cruise were unforgettable. Superb planning." },
    { name: "Robert Klein", stars: 5, text: "Loved every stop \u2014 history, food, and hospitality all exceeded expectations." },
    { name: "Amna Sheikh", stars: 5, text: "One of our best trips yet, smooth from booking to landing back home." },
  ],
  "Malaysia": [
    { name: "Wei Ling Tan", stars: 5, text: "Kuala Lumpur's skyline at night was magical, and the trip ran seamlessly." },
    { name: "Farhan Idris", stars: 4, text: "Good balance of city and nature stops, minor delay on one transfer." },
    { name: "Chloe Bennett", stars: 5, text: "Loved the rainforest day trip \u2014 well organized and great value." },
  ],
  "Thailand": [
    { name: "Somsak Prasert", stars: 5, text: "Beaches, temples, and street food \u2014 the whole trip felt effortless to enjoy." },
    { name: "Laura Simmons", stars: 5, text: "Everything was arranged smoothly, from the airport pickup to the island tour." },
    { name: "Bilqees Anwar", stars: 4, text: "Wonderful trip, just wish the beach day had a little more time built in." },
  ],
  "Azerbaijan": [
    { name: "Nigar Aliyeva", stars: 5, text: "Baku's old city and the modern skyline made for such a unique trip." },
    { name: "Tom Reynolds", stars: 5, text: "A hidden gem of a destination \u2014 planning and guidance were excellent." },
    { name: "Sarah Iqbal", stars: 4, text: "Loved the mix of architecture and culture, one hotel transfer ran a bit late." },
  ],
  "Saudi Arabia": [
    { name: "Abdullah Al Qahtani", stars: 5, text: "Very well organized trip with respectful, knowledgeable guidance throughout." },
    { name: "Yusuf Karim", stars: 5, text: "Everything was handled smoothly, from documentation to daily logistics." },
    { name: "Maryam Siddiqui", stars: 5, text: "A meaningful trip made easy thanks to careful, thoughtful planning." },
  ],
  "United Kingdom": [
    { name: "Emily Hartley", stars: 5, text: "London's landmarks and a countryside day trip \u2014 both beautifully arranged." },
    { name: "Daniyal Chaudhry", stars: 4, text: "Great itinerary overall, one museum visit felt a little rushed." },
    { name: "Grace Whitmore", stars: 5, text: "Smooth trip from start to finish, would happily book again." },
  ],
  "\ud83c\uddf2\ud83c\uddfb Maldives Paradise": [
    { name: "Sara Ahmed", stars: 5, text: "The overwater bungalow was straight out of a dream \u2014 flawless arrangements." },
    { name: "Michael Turner", stars: 5, text: "Best honeymoon trip we could've asked for, every detail taken care of." },
    { name: "Nida Farooq", stars: 5, text: "Crystal clear water, great resort, zero stress booking through Ticksol." },
  ],
  "\ud83c\uddf9\ud83c\udded Thailand Adventure": [
    { name: "Alex Chan", stars: 5, text: "Bangkok, Chiang Mai, and Phuket all in one smooth trip \u2014 loved it." },
    { name: "Hira Naveed", stars: 4, text: "Great adventure package, one internal flight connection was a little tight." },
    { name: "Ryan Cooper", stars: 5, text: "Perfect balance of culture and beach time, superbly planned." },
  ],
  "\ud83c\uddf2\ud83c\uddfe Malaysia Explorer": [
    { name: "Zunaira Malik", stars: 5, text: "Loved exploring KL and the islands \u2014 well-paced and stress-free." },
    { name: "David Osei", stars: 5, text: "Excellent value package, hotels and tours were exactly as described." },
    { name: "Aiman Raza", stars: 4, text: "Solid trip overall, would've liked one more day in Langkawi." },
  ],
  "\ud83c\uddf8\ud83c\uddec Singapore Discovery": [
    { name: "Wei Chen", stars: 5, text: "Gardens by the Bay at night was magical \u2014 trip ran like clockwork." },
    { name: "Anum Shahid", stars: 5, text: "Everything from arrival to departure was seamless and well planned." },
    { name: "Marcus Lee", stars: 4, text: "Great short city break, just wished for a bit more free time." },
  ],
  "\ud83c\uddea\ud83c\uddec Egypt Heritage Tour": [
    { name: "Mona El-Sayed", stars: 5, text: "Standing before the pyramids was surreal \u2014 flawlessly organized tour." },
    { name: "Jonathan Reed", stars: 5, text: "History came alive with our guide. Every stop was well timed." },
    { name: "Sundas Iqbal", stars: 5, text: "Incredible heritage trip, comfortable throughout despite the packed schedule." },
  ],
  "\ud83c\udde6\ud83c\uddff Azerbaijan Escape": [
    { name: "Kamran Huseynov", stars: 5, text: "Such an underrated destination \u2014 the trip exceeded our expectations completely." },
    { name: "Emma Wallace", stars: 4, text: "Loved the mix of old and new Baku, one hotel check-in was delayed." },
    { name: "Salman Yousuf", stars: 5, text: "Well-organized escape with great local insight throughout." },
  ],
  "Dubai Dream Holiday": [
    { name: "Farah Siddiqui", stars: 5, text: "The kids loved every bit of this trip \u2014 very family-friendly planning." },
    { name: "Andrew Collins", stars: 5, text: "Luxury done right, transfers and hotel were exactly as promised." },
    { name: "Rida Aslam", stars: 4, text: "Great holiday overall, desert safari pickup ran about 20 minutes late." },
  ],
  "Turkey Discovery Tour": [
    { name: "Mustafa Demir", stars: 5, text: "Cappadocia's balloon ride was the highlight of an already excellent trip." },
    { name: "Claire Douglas", stars: 5, text: "Loved the pace of the itinerary \u2014 historic, scenic, and smooth." },
    { name: "Hassan Baig", stars: 5, text: "Wonderful discovery tour, every logistic detail was handled professionally." },
  ],
  "Hajj": [
    { name: "Abdul Rehman", stars: 5, text: "A deeply meaningful journey, guided with care and great attention to detail." },
    { name: "Khadija Aslam", stars: 5, text: "Every arrangement, from Ihram to Mina, was handled with genuine support." },
    { name: "Imran Sheikh", stars: 5, text: "Grateful for how smoothly and respectfully this journey was organized." },
  ],
  "Umrah": [
    { name: "Zubair Ahmed", stars: 5, text: "A truly peaceful and well-guided journey to Makkah and Madinah." },
    { name: "Amina Yousaf", stars: 5, text: "Every step of the journey was handled with patience and care." },
    { name: "Tariq Mehmood", stars: 4, text: "Spiritually fulfilling trip overall, one transfer between cities ran a bit late." },
  ],
  "Iraq Ziyarat Tour": [
    { name: "Hussain Abbas", stars: 5, text: "A moving journey to Najaf and Karbala, arranged with real thoughtfulness." },
    { name: "Zainab Rizvi", stars: 5, text: "Every detail of this Ziyarat was handled respectfully and smoothly." },
    { name: "Ali Raza", stars: 5, text: "A profoundly meaningful trip, guided with genuine care throughout." },
  ],
  "Iran Ziyarat Tour": [
    { name: "Sakina Jafri", stars: 5, text: "Mashhad and Qom were beautifully arranged, a truly memorable journey." },
    { name: "Mehdi Kazmi", stars: 5, text: "Grateful for the smooth, respectful planning of this pilgrimage." },
    { name: "Fatima Zahra", stars: 4, text: "A meaningful trip overall, would've liked a little more time in Qom." },
  ],
  "Turkey Islamic Heritage & Spiritual Tour": [
    { name: "Yasir Qadri", stars: 5, text: "A wonderful blend of history and spirituality, guided with real knowledge." },
    { name: "Sumaira Naeem", stars: 5, text: "Every heritage site felt meaningful thanks to thoughtful, unhurried planning." },
    { name: "Bilal Chishti", stars: 5, text: "A memorable spiritual journey, smoothly arranged from start to finish." },
  ],
  "Visit Visa": [
    { name: "Hassan Iqbal", stars: 5, text: "Ticksol guided us through the whole visit visa process — every document explained clearly before we submitted anything." },
    { name: "Mehwish Anwar", stars: 5, text: "Hey, guide us and help us — that's exactly what they did. Our family visit visa was approved without a single hiccup." },
    { name: "Kashif Nadeem", stars: 4, text: "Consulted us properly on paperwork and timelines. One follow-up call was needed but they were responsive throughout." },
  ],
  "Business Visa": [
    { name: "Adnan Sheikh", stars: 5, text: "Ticksol consulted us in the visa process from day one — fast, professional, and exactly what a business trip needs." },
    { name: "Rimsha Javed", stars: 5, text: "They guided us through every requirement for the business visa, and it was approved well ahead of our travel date." },
    { name: "Fahad Mirza", stars: 5, text: "Excellent consultancy — they knew exactly which documents the embassy needed and prepped everything for us." },
  ],
  "Student Visa": [
    { name: "Areeba Tahir", stars: 5, text: "Ticksol's guidance made my student visa application so much less stressful — they explained every step in detail." },
    { name: "Owais Farooqi", stars: 5, text: "Hey, guide us and help us, I asked — and their team walked me through the entire embassy process patiently." },
    { name: "Laiba Rasheed", stars: 5, text: "Consulted us thoroughly on document requirements. My student visa came through smoothly thanks to their support." },
  ],
  "Tourist Visa": [
    { name: "Waleed Anjum", stars: 5, text: "Ticksol consulted us in the visa process for our Europe trip and made it completely hassle-free." },
    { name: "Sidra Khalid", stars: 5, text: "Great guidance from start to finish — they helped us pick the right tourist visa category and got it approved fast." },
    { name: "Ali Junaid", stars: 4, text: "Helpful consultancy overall, just wish the initial document checklist had been shared a bit earlier." },
  ],
  "Umrah / Religious Visa": [
    { name: "Muhammad Idrees", stars: 5, text: "Ticksol guided us through the Umrah visa process with real care — every requirement was handled respectfully." },
    { name: "Sobia Rafiq", stars: 5, text: "We asked them to guide us and help us with our religious visa, and they made the entire journey stress-free." },
    { name: "Naveed Aslam", stars: 5, text: "Consulted us on every step of the Umrah visa application. Smooth, respectful, and reliable service." },
  ],
  "Corporate Visa": [
    { name: "Salman Aziz", stars: 5, text: "Ticksol consulted us in the visa process for our whole team — bulk corporate visas processed efficiently and on time." },
    { name: "Nadia Farrukh", stars: 5, text: "Their guidance on corporate visa documentation saved us so much back-and-forth with the embassy." },
    { name: "Hamid Baig", stars: 4, text: "Solid consultancy for our company's travel needs, communication could be a touch faster during peak season." },
  ],
};

var _CD_FALLBACK_REVIEWS = [
  { name: 'Verified Traveler', stars: 5, text: 'Everything was planned and organized perfectly from start to finish — a genuinely great trip.' },
  { name: 'Verified Traveler', stars: 5, text: 'Smooth booking, attentive support, and the itinerary was exactly as promised.' },
  { name: 'Verified Traveler', stars: 4, text: 'A really enjoyable trip overall, with thoughtful details throughout the journey.' }
];

function _cdRenderReviews(cardTitle) {
  var list = document.getElementById('cd-review-list');
  if (!list) return;
  var reviews = _CD_REVIEWS_BY_CARD[cardTitle] || _CD_FALLBACK_REVIEWS;

  var avg = reviews.reduce(function (sum, r) { return sum + r.stars; }, 0) / reviews.length;
  var avgRounded = Math.round(avg); // for the rounded full-star icon row
  var starsIconsEl = document.getElementById('cd-stars-icons');
  var starsNumEl = document.getElementById('cd-stars-num');
  if (starsIconsEl) starsIconsEl.textContent = '★'.repeat(avgRounded) + '☆'.repeat(5 - avgRounded);
  if (starsNumEl) starsNumEl.textContent = avg.toFixed(1);

  list.innerHTML = reviews.map(function (r) {
    var stars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
    return '<div class="cd-review-card">' +
      '<div class="cd-review-card-head">' +
        '<span class="cd-review-name">' + r.name + '</span>' +
        '<span class="cd-review-stars">' + stars + '</span>' +
      '</div>' +
      '<p class="cd-review-text">' + r.text + '</p>' +
    '</div>';
  }).join('');
}

function openCardDetail(article) {
  if (!article) return;
  var img = article.querySelector('img');
  var titleEl = article.querySelector('h3, .dest-name');
  var tagEl = article.querySelector('.tag');
  var bookBtn = article.querySelector('.btn-book-now, button[onclick]');

  if (!img || !titleEl || !bookBtn) return; // required parts missing — do nothing rather than show a broken modal

  document.getElementById('cd-modal-img').src = img.src;
  document.getElementById('cd-modal-img').alt = img.alt || titleEl.textContent.trim();
  document.getElementById('cd-modal-title').textContent = titleEl.textContent.trim();
  document.getElementById('cd-modal-desc').textContent = _cdFindDescription(article, img);
  _cdRenderReviews(titleEl.textContent.trim());

  var tagBadge = document.getElementById('cd-modal-tag');
  if (tagEl && tagEl.textContent.trim()) {
    tagBadge.textContent = tagEl.textContent.trim();
    tagBadge.style.display = 'inline-block';
  } else {
    tagBadge.style.display = 'none';
  }

  _cdOriginalBtn = bookBtn;

  var modalBookBtn = document.getElementById('cd-modal-book');
  var btnLabel = bookBtn.textContent.trim() || 'Book Now';
  modalBookBtn.innerHTML = '<i class="fa fa-paper-plane"></i> ' + btnLabel;

  var modal = document.getElementById('card-detail-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCardDetail() {
  document.getElementById('card-detail-modal').classList.remove('open');
  document.body.style.overflow = '';
  _cdOriginalBtn = null;
}

function closeCardDetailOutside(e) {
  if (e.target === document.getElementById('card-detail-modal')) closeCardDetail();
}

function _cdModalBookNow() {
  var btn = _cdOriginalBtn;
  closeCardDetail();
  // Delegate to the card's own Book Now button so behavior (trip planner,
  // spiritual booking modal, etc.) always matches clicking it directly —
  // this never needs updating even if booking logic changes later.
  if (btn) btn.click();
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    // Ignore clicks on/inside a button or link — let their own handlers run
    // (Book Now, Consult Now, etc.) instead of also opening the detail modal.
    if (e.target.closest('button, a')) return;

    var card = e.target.closest('.dest-card, .pkg-card, .spirit-card, .visa-card');
    if (!card) return;

    // "Explore more" / custom-tour cards aren't a single specific place —
    // leave their existing click behavior untouched.
    if (card.classList.contains('any-dest-card') ||
        card.classList.contains('pkg-any-card') ||
        card.classList.contains('spirit-any-card')) return;

    openCardDetail(card);
  });
});

function _getAirline(selectId, otherId) {
  const sel = document.getElementById(selectId);
  const val = sel ? sel.value : '';
  if (val === 'other') {
    const other = document.getElementById(otherId);
    return (other && other.value.trim()) ? other.value.trim() : 'Other (not specified)';
  }
  return val || 'No preference';
}

// Toggle "other airline" text input visibility
document.addEventListener('change', function(e) {
  if (e.target.id === 'modal-airline') {
    document.getElementById('modal-airline-other').style.display =
      e.target.value === 'other' ? 'block' : 'none';
  }
  if (e.target.id === 'tp-airline') {
    document.getElementById('tp-airline-other').style.display =
      e.target.value === 'other' ? 'block' : 'none';
  }
});

// Guards against a nationality and destination country being the same value
// (case/whitespace-insensitive) for the Visa Consultancy form. Shows the
// inline error message and returns false when invalid so callers can abort.
function _validateVisaCountry() {
  const cfg = _SERVICE_FIELD_CONFIG[_currentPkg] || _DEFAULT_FIELD_CONFIG;
  const errorEl = document.getElementById('modal-visa-country-error');
  if (!cfg.showVisaCountry) {
    if (errorEl) errorEl.style.display = 'none';
    return true;
  }
  const nationality = (document.getElementById('modal-nationality').value || '').trim().toLowerCase();
  const country = (document.getElementById('modal-visa-country').value || '').trim().toLowerCase();
  const isSame = nationality && country && nationality === country;
  if (errorEl) errorEl.style.display = isSame ? 'block' : 'none';
  return !isSame;
}

function buildMessage() {
  const name    = document.getElementById('modal-name').value.trim() || 'Not provided';
  const phone   = document.getElementById('modal-phone').value.trim() || 'Not provided';
  const pax     = document.getElementById('modal-pax').value.trim() || 'Not specified';
  const cfg = _SERVICE_FIELD_CONFIG[_currentPkg] || _DEFAULT_FIELD_CONFIG;
  const date = cfg.showDate ? (document.getElementById('modal-date').value.trim() || 'Not specified') : null;
  const checkout = cfg.showCheckout ? (document.getElementById('modal-checkout').value.trim() || 'Not specified') : null;
  const airline = cfg.showAirline ? _getAirline('modal-airline', 'modal-airline-other') : null;
  const visaType = cfg.showVisaType ? (document.getElementById('modal-visa-type').value.trim() || 'Not specified') : null;
  const fromCity = cfg.showFromTo ? (document.getElementById('modal-from').value.trim() || 'Not specified') : null;
  const toCity = cfg.showFromTo ? (document.getElementById('modal-to').value.trim() || 'Not specified') : null;
  const hotelCity = cfg.showHotelCity ? (document.getElementById('modal-hotel-city').value.trim() || 'Not specified') : null;
  const corpName = cfg.showCorporateName ? (document.getElementById('modal-corp-name').value.trim() || 'Not specified') : null;
  const nationality = cfg.showVisaCountry ? (document.getElementById('modal-nationality').value.trim() || 'Not specified') : null;
  const visaCountry = cfg.showVisaCountry ? (document.getElementById('modal-visa-country').value.trim() || 'Not specified') : null;
  const tripNationality = cfg.showTripDetails ? (document.getElementById('modal-trip-nationality').value.trim() || 'Not specified') : null;
  const tripType = cfg.showTripDetails ? (document.getElementById('modal-trip-type').value.trim() || 'Not specified') : null;
  const depCity = cfg.showTripDetails ? (document.getElementById('modal-dep-city').value.trim() || 'Not specified') : null;
  const destCity = cfg.showTripDetails ? (document.getElementById('modal-dest-city').value.trim() || 'Not specified') : null;
  const depDate = cfg.showTripDetails ? (document.getElementById('modal-dep-date').value.trim() || 'Not specified') : null;
  const returnDate = (cfg.showTripDetails && tripType === 'Round Trip') ? (document.getElementById('modal-return-date').value.trim() || 'Not specified') : null;
  const airportCity = cfg.showAirportTransfer ? (document.getElementById('modal-airport-city').value.trim() || 'Not specified') : null;
  const airportDirection = cfg.showAirportTransfer ? (document.getElementById('modal-airport-direction').value.trim() || 'Not specified') : null;
  return `*New Booking Enquiry – Ticksol Travels*\n\n` +
    `📦 *Package:* ${_currentPkg || 'General Enquiry'}\n` +
    (_currentPrice ? `💰 *Price:* ${_currentPrice}\n` : '') +
    `👤 *Name:* ${name}\n📱 *WhatsApp:* ${phone}\n` +
    (corpName ? `🏢 *Company:* ${corpName}\n` : '') +
    `👥 *Travelers:* ${pax}\n` +
    (fromCity ? `🛫 *From:* ${fromCity}\n` : '') +
    (toCity ? `🛬 *To:* ${toCity}\n` : '') +
    (hotelCity ? `🏨 *Hotel City:* ${hotelCity}\n` : '') +
    (airportCity ? `🏙️ *City Name:* ${airportCity}\n` : '') +
    (airportDirection ? `🛬 *Pickup / Drop:* ${airportDirection}\n` : '') +
    (tripNationality ? `🌐 *Nationality:* ${tripNationality}\n` : '') +
    (tripType ? `🔁 *Trip Type:* ${tripType}\n` : '') +
    (depCity ? `🛫 *Departure City:* ${depCity}\n` : '') +
    (destCity ? `🛬 *Destination City:* ${destCity}\n` : '') +
    (depDate ? `📅 *Departure Date:* ${depDate}\n` : '') +
    (returnDate ? `📅 *Return Date:* ${returnDate}\n` : '') +
    (date ? `📅 *${cfg.datePlaceholder.split(' (')[0]}:* ${date}\n` : '') +
    (checkout ? `📅 *Check-out Date:* ${checkout}\n` : '') +
    (visaType ? `🛂 *Visa Type:* ${visaType}\n` : '') +
    (nationality ? `🌐 *Nationality:* ${nationality}\n` : '') +
    (visaCountry ? `🌍 *Visa Country:* ${visaCountry}\n` : '') +
    (airline ? `✈️ *Preferred Airline:* ${airline}\n` : '') +
    `\n_Sent from ticksol.com_`;
}

function sendBookingWa() {
  if (!_validateVisaCountry()) return;
  const msg = buildMessage();
  window.open(`https://wa.me/${TICKSOL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  closeModal();
}

function sendBookingEmail() {
  if (!_validateVisaCountry()) return;
  const name    = document.getElementById('modal-name').value.trim() || 'Customer';
  const phone   = document.getElementById('modal-phone').value.trim();
  const pax     = document.getElementById('modal-pax').value.trim() || 'Not specified';
  const cfg = _SERVICE_FIELD_CONFIG[_currentPkg] || _DEFAULT_FIELD_CONFIG;
  const date = cfg.showDate ? (document.getElementById('modal-date').value.trim() || 'Not specified') : null;
  const checkout = cfg.showCheckout ? (document.getElementById('modal-checkout').value.trim() || 'Not specified') : null;
  const airline = cfg.showAirline ? _getAirline('modal-airline', 'modal-airline-other') : null;
  const visaType = cfg.showVisaType ? (document.getElementById('modal-visa-type').value.trim() || 'Not specified') : null;
  const fromCity = cfg.showFromTo ? (document.getElementById('modal-from').value.trim() || 'Not specified') : null;
  const toCity = cfg.showFromTo ? (document.getElementById('modal-to').value.trim() || 'Not specified') : null;
  const hotelCity = cfg.showHotelCity ? (document.getElementById('modal-hotel-city').value.trim() || 'Not specified') : null;
  const corpName = cfg.showCorporateName ? (document.getElementById('modal-corp-name').value.trim() || 'Not specified') : null;
  const nationality = cfg.showVisaCountry ? (document.getElementById('modal-nationality').value.trim() || 'Not specified') : null;
  const visaCountry = cfg.showVisaCountry ? (document.getElementById('modal-visa-country').value.trim() || 'Not specified') : null;
  const tripNationality = cfg.showTripDetails ? (document.getElementById('modal-trip-nationality').value.trim() || 'Not specified') : null;
  const tripType = cfg.showTripDetails ? (document.getElementById('modal-trip-type').value.trim() || 'Not specified') : null;
  const depCity = cfg.showTripDetails ? (document.getElementById('modal-dep-city').value.trim() || 'Not specified') : null;
  const destCity = cfg.showTripDetails ? (document.getElementById('modal-dest-city').value.trim() || 'Not specified') : null;
  const depDate = cfg.showTripDetails ? (document.getElementById('modal-dep-date').value.trim() || 'Not specified') : null;
  const returnDate = (cfg.showTripDetails && tripType === 'Round Trip') ? (document.getElementById('modal-return-date').value.trim() || 'Not specified') : null;
  const airportCity = cfg.showAirportTransfer ? (document.getElementById('modal-airport-city').value.trim() || 'Not specified') : null;
  const airportDirection = cfg.showAirportTransfer ? (document.getElementById('modal-airport-direction').value.trim() || 'Not specified') : null;
  const dateLabel = cfg.datePlaceholder.split(' (')[0];
  const subject = encodeURIComponent(`Booking Enquiry: ${_currentPkg || 'General'} – ${name}`);
  const body = encodeURIComponent(
    `New Booking Enquiry – Ticksol Travels\n\nPackage: ${_currentPkg || 'General Enquiry'}\n` +
    (_currentPrice ? `Price: ${_currentPrice}\n` : '') +
    `Name: ${name}\nPhone/WhatsApp: ${phone}\n` +
    (corpName ? `Company: ${corpName}\n` : '') +
    `Travelers: ${pax}\n` +
    (fromCity ? `From: ${fromCity}\n` : '') +
    (toCity ? `To: ${toCity}\n` : '') +
    (hotelCity ? `Hotel City: ${hotelCity}\n` : '') +
    (airportCity ? `City Name: ${airportCity}\n` : '') +
    (airportDirection ? `Pickup / Drop: ${airportDirection}\n` : '') +
    (tripNationality ? `Nationality: ${tripNationality}\n` : '') +
    (tripType ? `Trip Type: ${tripType}\n` : '') +
    (depCity ? `Departure City: ${depCity}\n` : '') +
    (destCity ? `Destination City: ${destCity}\n` : '') +
    (depDate ? `Departure Date: ${depDate}\n` : '') +
    (returnDate ? `Return Date: ${returnDate}\n` : '') +
    (date ? `${dateLabel}: ${date}\n` : '') +
    (checkout ? `Check-out Date: ${checkout}\n` : '') +
    (visaType ? `Visa Type: ${visaType}\n` : '') +
    (nationality ? `Nationality: ${nationality}\n` : '') +
    (visaCountry ? `Visa Country: ${visaCountry}\n` : '') +
    (airline ? `Preferred Airline: ${airline}\n` : '') +
    `\nSent from ticksol.com`
  );
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${TICKSOL_EMAIL}&su=${subject}&body=${body}`, '_blank');
  closeModal();
}

function emailPackage(pkgName, price) {
  const subject = encodeURIComponent(`Package Enquiry: ${pkgName}`);
  const body = encodeURIComponent(
    `Hello Ticksol Team,\n\nI'm interested in the following package:\n\nPackage: ${pkgName}\nPrice: ${price}\n\nPlease send me more details and availability.\n\nThank you.`
  );
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${TICKSOL_EMAIL}&su=${subject}&body=${body}`, '_blank');
}

function sendPackageEnquiry(pkgText) {
  const msg = `Hi Ticksol! I'm interested in:\n\n📦 *${pkgText}*\n\nPlease send me more details and availability.`;
  window.open(`https://wa.me/${TICKSOL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
}



// ── WHATSAPP WIDGET ──────────────────────────────────────
function toggleWaPanel(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('wa-panel');
  panel.classList.toggle('open');
  document.querySelector('.wa-pulse').style.display = 'none';
}

function openWaWidget(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  document.getElementById('wa-panel').classList.add('open');
  document.querySelector('.wa-pulse').style.display = 'none';
}

function waQuick(msg) {
  window.open(`https://wa.me/${TICKSOL_WA}?text=${encodeURIComponent(msg + ' – (from ticksol.com)')}`, '_blank');
}

// ── NAVBAR "CONSULT TO EXPERT" DROPDOWN ─────────────────
// Lets the user pick WhatsApp, Email, or Phone to reach the company.
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');
  item.parentElement.querySelectorAll('.faq-item.open').forEach(function (el) {
    if (el !== item) el.classList.remove('open');
  });
  item.classList.toggle('open', !isOpen);
}

function toggleConsultMenu(e, ddId) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const target = document.getElementById(ddId);
  const isOpen = target.classList.contains('open');
  // Close any other open consult dropdowns first
  document.querySelectorAll('.consult-dropdown.open').forEach(dd => dd.classList.remove('open'));
  if (!isOpen) {
    target.classList.add('open');
    // Hide the "scroll down" popup while the dropdown is open so the two never overlap
    if (typeof hideScrollHint === 'function') hideScrollHint();
  } else if (typeof showScrollHint === 'function') {
    showScrollHint();
  }
}

function consultWhatsApp(e) {
  if (e) e.preventDefault();
  if (e) e.stopPropagation();
  const msg = "Hi Ticksol! I'd like to consult with a travel expert.";
  window.open(`https://wa.me/${TICKSOL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  closeConsultMenus();
}

function consultEmail(e) {
  if (e) e.preventDefault();
  if (e) e.stopPropagation();
  const subject = encodeURIComponent('Consultation Request – Ticksol Travels');
  const body = encodeURIComponent("Hello Ticksol Team,\n\nI'd like to consult with a travel expert about my upcoming trip.\n\nPlease get in touch with me.\n\nThank you.");
  // Opens Gmail's web compose window directly with the recipient, subject and body pre-filled.
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${TICKSOL_EMAIL}&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank');
  closeConsultMenus();
}

function consultPhone(e) {
  if (e) e.preventDefault();
  if (e) e.stopPropagation();
  // Use a temporary, real <a href="tel:..."> click instead of mutating window.location.href directly —
  // this is handed off to the OS dialer / calling app far more reliably across browsers and devices.
  const link = document.createElement('a');
  link.href = `tel:+${TICKSOL_WA}`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  closeConsultMenus();
}

// Closes any open consult dropdown and restores the scroll-hint popup
// (if it's allowed to be visible) so the two never sit on screen together.
function closeConsultMenus() {
  document.querySelectorAll('.consult-dropdown.open').forEach(dd => dd.classList.remove('open'));
  if (typeof showScrollHint === 'function') showScrollHint();
}

// Close consult dropdown when clicking outside of it
document.addEventListener('click', function(e) {
  if (!e.target.closest('.consult-wrap')) {
    closeConsultMenus();
  }
});

// Close widget when clicking outside
document.addEventListener('click', function(e) {
  const widget = document.getElementById('wa-widget');
  const panel = document.getElementById('wa-panel');
  if (panel.classList.contains('open') && !widget.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// ── CONTACT FORM ─────────────────────────────────────────
function submitContactWa() {
  const name    = document.getElementById('cf-name').value.trim() || 'Not provided';
  const phone   = document.getElementById('cf-phone').value.trim() || 'Not provided';
  const email   = document.getElementById('cf-email').value.trim() || 'Not provided';
  const service = document.getElementById('cf-service').value || 'General Enquiry';
  const msg     = document.getElementById('cf-msg').value.trim() || 'No message';
  const text = `*Contact Form – Ticksol Travels*\n\n👤 *Name:* ${name}\n📱 *Phone:* ${phone}\n📧 *Email:* ${email}\n🛎 *Service:* ${service}\n💬 *Message:* ${msg}\n\n_Sent from ticksol.com_`;
  window.open(`https://wa.me/${TICKSOL_WA}?text=${encodeURIComponent(text)}`, '_blank');
}

function submitContactEmail() {
  const name    = document.getElementById('cf-name').value.trim() || 'Customer';
  const service = document.getElementById('cf-service').value || 'General Enquiry';
  const msg     = document.getElementById('cf-msg').value.trim() || 'No message';
  const subject = encodeURIComponent(`Contact Form: ${service} – ${name}`);
  const body = encodeURIComponent(
    `Name: ${document.getElementById('cf-name').value}\nPhone: ${document.getElementById('cf-phone').value}\nEmail: ${document.getElementById('cf-email').value}\nService: ${service}\n\nMessage:\n${msg}\n\nSent from ticksol.com`
  );
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${TICKSOL_EMAIL}&su=${subject}&body=${body}`, '_blank');
}

// ── NAVBAR + SCROLL ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);
}, { passive: true });

// Toggle black-gold navbar when user is on the hero section
const heroSection = document.getElementById('hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      navbar.classList.toggle('on-hero', entry.isIntersecting);
    });
  }, { threshold: 0.15 });
  heroObserver.observe(heroSection);
}

// Premium glassmorphism hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });
  // Close drawer when a link is tapped
  mobileMenu.querySelectorAll('.gn-mobile-link').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
  }));
  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    }
  });
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.gn-link');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + entry.target.id ||
           (entry.target.id === 'hero' && l.getAttribute('href') === '#')) {
          l.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => io.observe(s));

// Escape key closes all modals — handled by the unified listener below

// ── HERO PARTICLE CONSTELLATION ──────────────────────────
(function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
    const count = window.innerWidth < 768 ? 35 : 70;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });
    // connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(245,197,24,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,197,24,0.55)';
      ctx.fill();
    });
    requestAnimationFrame(step);
  }

  resize();
  step();
  window.addEventListener('resize', resize);
})();

// ── HERO MOUSE SPOTLIGHT ─────────────────────────────────
(function initHeroSpotlight() {
  const hero = document.getElementById('hero');
  const spotlight = document.getElementById('hero-spotlight');
  if (!hero || !spotlight) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--mx', x + '%');
    spotlight.style.setProperty('--my', y + '%');
  });
})();

// ── HERO ROTATING WORD ───────────────────────────────────
(function initHeroRotateWord() {
  const el = document.getElementById('hero-rotate-word');
  if (!el) return;
  const words = ['Flights', 'Hotels', 'Visas', 'Tour Packages', 'Corporate Travel'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.classList.remove('swap');
    requestAnimationFrame(() => {
      el.textContent = words[i];
      el.classList.add('swap');
    });
  }, 2200);
})();

// ── SITEWIDE SCROLL PROGRESS BAR ─────────────────────────
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// ── SCROLL-HINT POPUP ────────────────────────────────────
// Visible while browsing the page. Hides once the user reaches the
// "Get in Touch" (contact) section (and stays hidden through the
// footer below it), and reappears if they scroll back up above it.
const scrollHint = document.getElementById('scroll-hint');
let scrollHintClosedByUser = false; // true only if user clicks the × — stays gone for good

function dismissScrollHint() {
  scrollHintClosedByUser = true;
  if (scrollHint) scrollHint.classList.add('hide');
}
function showScrollHint() {
  if (scrollHintClosedByUser) return;
  if (typeof isPastContact === 'function' && isPastContact()) return;
  if (scrollHint) scrollHint.classList.remove('hide');
}
function hideScrollHint() {
  if (scrollHint) scrollHint.classList.add('hide');
}

const contactSection = document.getElementById('contact');

// Once the viewport reaches the contact section, it stays "past contact"
// for the rest of the page below it (including the footer) — not just
// while the contact section itself happens to intersect the viewport.
function isPastContact() {
  if (!contactSection) return false;
  const contactTop = contactSection.getBoundingClientRect().top + window.scrollY;
  return window.scrollY + window.innerHeight * 0.5 >= contactTop;
}

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  const scrollingUp = currentY < lastScrollY;
  lastScrollY = currentY;

  if (isPastContact()) {
    hideScrollHint();
  } else if (scrollingUp) {
    showScrollHint();
  }
}, { passive: true });

function dismissOfferBadge() {
  const badge = document.getElementById('offer-badge');
  if (badge) badge.classList.add('hide');
}

// ── ANIMATED STAT COUNTERS ────────────────────────────────
// Animates any <strong> inside .hero-stat / .why-stat / .corp-stat
// from 0 up to its target value once it scrolls into view.
function animateStat(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return;
  const target = parseFloat(match[1]);
  const suffix = match[2] || '';
  if (raw.includes('/')) return; // skip things like "24/7"
  let current = 0;
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    current = target * progress;
    el.textContent = (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = raw;
  }
  requestAnimationFrame(tick);
}
const statEls = document.querySelectorAll('.hero-stat strong, .why-stat strong, .corp-stat strong');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStat(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statEls.forEach(el => statObserver.observe(el));

// ── SCROLL-REVEAL (snap-in card animations) ──────────────────────────────────
// Watches all .reveal-card, .reveal-left, .reveal-right, .reveal-up elements.
// Once they cross into the viewport, .revealed is added → CSS animation fires.
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-card, .reveal-left, .reveal-right, .reveal-up');
  if (!revealEls.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
        entry.target.classList.add('revealed');
        // Unobserve so the animation doesn't re-trigger on scroll back
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,      // trigger once even a little bit is visible
    rootMargin: '0px 0px -40px 0px'  // trigger slightly before entering viewport
  });

  revealEls.forEach(el => io.observe(el));
})();

// ── SECTION EDGE FOG INJECTION ────────────────────────────────────────────────
// Injects .edge-fog-top and .edge-fog-bottom divs into every major section
// so the pinkish-golden-white glow appears exactly at section boundaries.
// Using JS injection avoids any conflict with existing ::before / ::after CSS.
(function injectEdgeFog() {
  const targets = [
    '#hero',
    '#how-to-book',
    '#destinations',
    '#packages',
    '#spiritual',
    '#services',
    '#corporate',
    '#blog',
    '#why',
    '#flights',
    '#reviews',
    '#contact',
    '#cta',
  ];

  targets.forEach(selector => {
    const el = document.querySelector(selector);
    if (!el) return;

    // Ensure the section is position:relative so absolute children work
    const pos = getComputedStyle(el).position;
    if (pos === 'static') el.style.position = 'relative';

    const top = document.createElement('div');
    top.className = 'edge-fog-top';
    top.setAttribute('aria-hidden', 'true');

    const bot = document.createElement('div');
    bot.className = 'edge-fog-bottom';
    bot.setAttribute('aria-hidden', 'true');

    el.appendChild(top);
    el.appendChild(bot);
  });
})();

// ── TRIP PLANNER MODAL ───────────────────────────────────────
const _tpCounts = { adults: 1, children: 0, infants: 0 };

const _DOMESTIC_DESTINATIONS = [
  'Islamabad Tour',
  'Karachi Tour',
  'Gilgit Tour',
  'Skardu Tour',
  'Multan Tour',
  'Peshawar Tour',
  'Lahore Tour',
  'Custom Pakistan Tour',
];

// Domestic (Pakistan) flights only run on local carriers — show a focused list
const _DOMESTIC_AIRLINE_OPTIONS =
  '<option value="">Select Preferred Airline</option>' +
  '<option>Pakistan International Airlines (PIA)</option>' +
  '<option>Airblue</option>' +
  '<option>AirSial</option>' +
  '<option>Fly Jinnah</option>' +
  '<option>Air Karachi</option>' +
  '<option>No Preference</option>';

const _INTERNATIONAL_AIRLINE_OPTIONS =
  '<option value="">No preference / Best available</option>' +
  '<optgroup label="Middle East">' +
    '<option>Emirates (UAE)</option>' +
    '<option>Qatar Airways (Qatar)</option>' +
    '<option>Etihad Airways (UAE)</option>' +
    '<option>Saudia (Saudi Arabia)</option>' +
    '<option>flydubai (UAE)</option>' +
    '<option>Air Arabia (UAE)</option>' +
  '</optgroup>' +
  '<optgroup label="Asia Pacific">' +
    '<option>Singapore Airlines (Singapore)</option>' +
    '<option>ANA – All Nippon Airways (Japan)</option>' +
    '<option>Japan Airlines (Japan)</option>' +
    '<option>Cathay Pacific (Hong Kong)</option>' +
    '<option>Malaysia Airlines (Malaysia)</option>' +
    '<option>Thai Airways (Thailand)</option>' +
    '<option>Korean Air (South Korea)</option>' +
  '</optgroup>' +
  '<optgroup label="Pakistan">' +
    '<option>PIA – Pakistan International Airlines</option>' +
    '<option>Airblue</option>' +
    '<option>Fly Jinnah</option>' +
  '</optgroup>' +
  '<optgroup label="Turkish">' +
    '<option>Turkish Airlines (Turkey)</option>' +
  '</optgroup>' +
  '<option value="other">Other (specify below)</option>';

function openTripPlanner(e, destination) {
  if (e) e.preventDefault();
  document.getElementById('trip-planner-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  const toField = document.getElementById('tp-to');
  if (toField) toField.value = destination ? destination : '';
  const nationalityField = document.getElementById('tp-nationality');
  if (nationalityField) nationalityField.value = '';
  const tripTypeSel = document.getElementById('tp-trip-type');
  if (tripTypeSel) tripTypeSel.value = '';
  _tpToggleReturnDate();
  _tpClearAllErrors();

  // Swap the airline list: Pakistan-only carriers for domestic trips,
  // full international list otherwise.
  const airlineField = document.getElementById('tp-airline-field');
  const sel = document.getElementById('tp-airline');
  const other = document.getElementById('tp-airline-other');
  const label = document.getElementById('tp-airline-label');
  if (airlineField && sel) {
    const isDomestic = destination && _DOMESTIC_DESTINATIONS.includes(destination);
    sel.innerHTML = isDomestic ? _DOMESTIC_AIRLINE_OPTIONS : _INTERNATIONAL_AIRLINE_OPTIONS;
    sel.value = '';
    if (label) label.innerHTML = isDomestic ? '✈️ Preferred Airline(s)' : '✈️ Preferred Airline';
    if (other) { other.value = ''; other.style.display = 'none'; }
    // Rebuild the custom dropdown panel to reflect the new option list
    const wrapEntry = _csWraps.find(function (w) { return w.select === sel; });
    if (wrapEntry) {
      _csBuildPanel(sel, wrapEntry.panel);
      _csSyncWrap(sel);
    }
  }
  _csRefreshAll();
}

// Shows the Return Date field only when "Round Trip" is selected, and
// clears/resets it otherwise so a stale date never gets sent for a
// One Way or Multi-City enquiry.
function _tpToggleReturnDate() {
  const tripTypeSel = document.getElementById('tp-trip-type');
  const returnField = document.getElementById('tp-return-date-field');
  if (!tripTypeSel || !returnField) return;
  const isRoundTrip = tripTypeSel.value === 'Round Trip';
  returnField.style.display = isRoundTrip ? '' : 'none';
  if (!isRoundTrip) {
    const returnInput = document.getElementById('tp-return-date');
    if (returnInput) returnInput.value = '';
    _tpSetFieldError('tp-return-date', false);
  }
}
document.addEventListener('change', function (e) {
  if (e.target && e.target.id === 'tp-trip-type') _tpToggleReturnDate();
  if (e.target && e.target.id === 'modal-trip-type') _toggleModalReturnDate();
});

function closeTripPlanner() {
  document.getElementById('trip-planner-modal').classList.remove('open');
  document.body.style.overflow = '';
  const airlineSel = document.getElementById('tp-airline');
  const airlineOther = document.getElementById('tp-airline-other');
  if (airlineSel) airlineSel.value = '';
  if (airlineOther) { airlineOther.value = ''; airlineOther.style.display = 'none'; }
  const nationalityField = document.getElementById('tp-nationality');
  if (nationalityField) nationalityField.value = '';
  const tripTypeSel = document.getElementById('tp-trip-type');
  if (tripTypeSel) tripTypeSel.value = '';
  _tpToggleReturnDate();
  _tpClearAllErrors();
  _csRefreshAll();
}

function closeTripPlannerOutside(e) {
  if (e.target === document.getElementById('trip-planner-modal')) closeTripPlanner();
}

function tpCounter(type, delta) {
  const min = type === 'adults' ? 1 : 0;
  _tpCounts[type] = Math.max(min, _tpCounts[type] + delta);
  document.getElementById('tp-' + type).textContent = _tpCounts[type];
}

// ── TRIP PLANNER VALIDATION ──────────────────────────────
// Required: From, To, Travel Date, WhatsApp Number (>= 10 digits).
// Keeps casual/empty submissions from going through, so only serious
// enquiries reach WhatsApp / Email.
const _TP_REQUIRED_FIELDS = ['tp-from', 'tp-to', 'tp-nationality', 'tp-trip-type', 'tp-date', 'tp-phone'];

function _tpSetFieldError(fieldId, hasError) {
  const input = document.getElementById(fieldId);
  const wrap  = document.getElementById(fieldId + '-field');
  if (input) input.classList.toggle('tp-input-error', hasError);
  if (wrap)  wrap.classList.toggle('tp-has-error', hasError);
}

function _tpClearAllErrors() {
  _TP_REQUIRED_FIELDS.forEach(id => _tpSetFieldError(id, false));
}

function _tpDigitsOnly(str) {
  return (str || '').replace(/\D/g, '');
}

// Returns { valid: boolean, missing: string[] } and applies/clears the
// red-border + inline-error UI as a side effect.
function _validateTripForm() {
  const missing = [];

  const from  = document.getElementById('tp-from').value.trim();
  const to    = document.getElementById('tp-to').value.trim();
  const nationality = document.getElementById('tp-nationality').value.trim();
  const tripType = document.getElementById('tp-trip-type').value.trim();
  const date  = document.getElementById('tp-date').value.trim();
  const returnDate = document.getElementById('tp-return-date').value.trim();
  const phone = document.getElementById('tp-phone').value.trim();
  const phoneDigits = _tpDigitsOnly(phone);

  const fromInvalid  = !from;
  const toInvalid    = !to;
  const nationalityInvalid = !nationality;
  const tripTypeInvalid = !tripType;
  const dateInvalid  = !date;
  const isRoundTrip = tripType === 'Round Trip';
  const returnDateInvalid = isRoundTrip && !returnDate;
  const phoneInvalid = !phone || phoneDigits.length < 10;

  _tpSetFieldError('tp-from', fromInvalid);
  _tpSetFieldError('tp-to', toInvalid);
  _tpSetFieldError('tp-nationality', nationalityInvalid);
  _tpSetFieldError('tp-trip-type', tripTypeInvalid);
  _tpSetFieldError('tp-date', dateInvalid);
  _tpSetFieldError('tp-return-date', returnDateInvalid);
  _tpSetFieldError('tp-phone', phoneInvalid);

  if (fromInvalid) missing.push('From (City / Country)');
  if (toInvalid) missing.push('To (Destination)');
  if (nationalityInvalid) missing.push('Nationality');
  if (tripTypeInvalid) missing.push('Trip Type');
  if (dateInvalid) missing.push('Departure Date');
  if (returnDateInvalid) missing.push('Return Date');
  if (phoneInvalid) missing.push(!phone ? 'WhatsApp Number' : 'WhatsApp Number (needs at least 10 digits)');

  if (missing.length) {
    const box = document.querySelector('.tp-modal-box');
    if (box) {
      box.classList.remove('tp-shake');
      // restart animation even if clicked repeatedly
      void box.offsetWidth;
      box.classList.add('tp-shake');
    }
    const firstBadId = fromInvalid ? 'tp-from' : toInvalid ? 'tp-to' : nationalityInvalid ? 'tp-nationality' :
      tripTypeInvalid ? 'tp-trip-type' : dateInvalid ? 'tp-date' : returnDateInvalid ? 'tp-return-date' : 'tp-phone';
    const firstBadEl = document.getElementById(firstBadId);
    if (firstBadEl) firstBadEl.focus();
  }

  return { valid: missing.length === 0, missing };
}

// Clear a field's red-error state as soon as the visitor starts fixing it
document.addEventListener('DOMContentLoaded', function() {
  _TP_REQUIRED_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const clearIfValid = () => {
      if (id === 'tp-phone') {
        if (_tpDigitsOnly(el.value).length >= 10) _tpSetFieldError(id, false);
      } else if (el.value.trim()) {
        _tpSetFieldError(id, false);
      }
    };
    el.addEventListener('input', clearIfValid);
    el.addEventListener('change', clearIfValid);
  });
});

function _getTripData() {
  const from     = document.getElementById('tp-from').value.trim() || 'Not specified';
  const to       = document.getElementById('tp-to').value.trim() || 'Not specified';
  const nationality = document.getElementById('tp-nationality').value.trim() || 'Not specified';
  const tripType = document.getElementById('tp-trip-type').value.trim() || 'Not specified';
  const date     = document.getElementById('tp-date').value || 'Not specified';
  const returnDate = tripType === 'Round Trip' ? (document.getElementById('tp-return-date').value || 'Not specified') : null;
  const adults   = _tpCounts.adults;
  const children = _tpCounts.children;
  const infants  = _tpCounts.infants;
  const phone    = document.getElementById('tp-phone').value.trim() || 'Not provided';
  const airline  = _getAirline('tp-airline', 'tp-airline-other');
  return { from, to, nationality, tripType, date, returnDate, adults, children, infants, phone, airline };
}

function submitTripWa() {
  if (!_validateTripForm().valid) return;
  const d = _getTripData();
  const travelers = `${d.adults} Adult(s)${d.children ? ', ' + d.children + ' Child(ren)' : ''}${d.infants ? ', ' + d.infants + ' Infant(s)' : ''}`;
  const msg = encodeURIComponent(
    `✈️ *Trip Planning Request – Ticksol Travels*\n\n` +
    `🛫 *From:* ${d.from}\n` +
    `🛬 *To:* ${d.to}\n` +
    `🌐 *Nationality:* ${d.nationality}\n` +
    `🔁 *Trip Type:* ${d.tripType}\n` +
    `📅 *Departure Date:* ${d.date}\n` +
    (d.returnDate ? `📅 *Return Date:* ${d.returnDate}\n` : '') +
    `👨‍👩‍👧‍👦 *Travelers:* ${travelers}\n` +
    `✈️ *Preferred Airline:* ${d.airline}\n` +
    `📱 *Phone/WhatsApp:* ${d.phone}\n\n` +
    `_Sent from ticksol.com_`
  );
  window.open(`https://wa.me/${TICKSOL_WA}?text=${msg}`, '_blank');
}

function submitTripEmail() {
  if (!_validateTripForm().valid) return;
  const d = _getTripData();
  const travelers = `${d.adults} Adult(s)${d.children ? ', ' + d.children + ' Child(ren)' : ''}${d.infants ? ', ' + d.infants + ' Infant(s)' : ''}`;
  const subject = encodeURIComponent(`Trip Planning Request: ${d.from} to ${d.to}`);
  const body = encodeURIComponent(
    `Trip Planning Request – Ticksol Travels\n\n` +
    `From: ${d.from}\nTo: ${d.to}\nNationality: ${d.nationality}\nTrip Type: ${d.tripType}\n` +
    `Departure Date: ${d.date}\n` +
    (d.returnDate ? `Return Date: ${d.returnDate}\n` : '') +
    `Travelers: ${travelers}\n` +
    `Preferred Airline: ${d.airline}\n` +
    `Phone/WhatsApp: ${d.phone}\n\nSent from ticksol.com`
  );
  window.location.href = `mailto:${TICKSOL_EMAIL}?subject=${subject}&body=${body}`;
}

// Close trip planner on Escape key — handled by the unified listener below


// ── VISA CONSULT MODAL (lightweight — visa-specific fields only) ──────────
let _currentVisaType = '';

function openVisaConsult(e, visaType) {
  if (e) e.preventDefault();
  _currentVisaType = visaType || '';
  const modal = document.getElementById('visa-modal');
  const summary = document.getElementById('visa-summary');
  if (visaType) {
    summary.style.display = 'flex';
    document.getElementById('visa-summary-type').textContent = visaType;
    const typeSelect = document.getElementById('visa-type');
    // Pre-select matching option if it exists, otherwise leave on placeholder
    let matched = false;
    for (const opt of typeSelect.options) {
      if (opt.value === visaType) { opt.selected = true; matched = true; break; }
    }
    if (!matched) typeSelect.value = '';
  } else {
    summary.style.display = 'none';
  }
  const errorEl = document.getElementById('visa-country-error');
  if (errorEl) errorEl.style.display = 'none';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVisaModal() {
  document.getElementById('visa-modal').classList.remove('open');
  document.body.style.overflow = '';
  const errorEl = document.getElementById('visa-country-error');
  if (errorEl) errorEl.style.display = 'none';
}

function closeVisaModalOutside(e) {
  if (e.target === document.getElementById('visa-modal')) closeVisaModal();
}

function getVisaFormData() {
  return {
    name:        document.getElementById('visa-name').value.trim() || 'Not provided',
    phone:       document.getElementById('visa-phone').value.trim() || 'Not provided',
    type:        document.getElementById('visa-type').value || _currentVisaType || 'Not specified',
    nationality: document.getElementById('visa-nationality').value.trim() || 'Not specified',
    country:     document.getElementById('visa-country').value.trim() || 'Not specified',
    date:        document.getElementById('visa-date').value || 'Flexible'
  };
}

// Guards against a nationality and destination country being the same value
// (case/whitespace-insensitive). Shows the inline error and returns false
// when invalid so the send functions can abort.
function _validateVisaModalCountry() {
  const errorEl = document.getElementById('visa-country-error');
  const nationality = (document.getElementById('visa-nationality').value || '').trim().toLowerCase();
  const country = (document.getElementById('visa-country').value || '').trim().toLowerCase();
  const isSame = nationality && country && nationality === country;
  if (errorEl) errorEl.style.display = isSame ? 'block' : 'none';
  return !isSame;
}

function sendVisaWa() {
  if (!_validateVisaModalCountry()) return;
  const d = getVisaFormData();
  const msg = `*Visa Consultation Request – Ticksol Travels*\n\n` +
    `🛂 *Visa Type:* ${d.type}\n🌐 *Nationality:* ${d.nationality}\n🌍 *Destination Country:* ${d.country}\n` +
    `👤 *Name:* ${d.name}\n📱 *WhatsApp:* ${d.phone}\n📅 *Preferred Travel Date:* ${d.date}\n\n` +
    `_Sent from ticksol.com_`;
  window.open(`https://wa.me/${TICKSOL_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  closeVisaModal();
}

function sendVisaEmail() {
  if (!_validateVisaModalCountry()) return;
  const d = getVisaFormData();
  const subject = encodeURIComponent(`Visa Consultation: ${d.type} – ${d.name}`);
  const body = encodeURIComponent(
    `Visa Consultation Request – Ticksol Travels\n\n` +
    `Visa Type: ${d.type}\nNationality: ${d.nationality}\nDestination Country: ${d.country}\n` +
    `Name: ${d.name}\nWhatsApp: ${d.phone}\nPreferred Travel Date: ${d.date}\n\nSent from ticksol.com`
  );
  window.location.href = `mailto:${TICKSOL_EMAIL}?subject=${subject}&body=${body}`;
  closeVisaModal();
}

// ── UNIFIED ESCAPE KEY HANDLER ───────────────────────────
// Closes any open modal or panel when Escape is pressed.
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  closeModal();
  closeTripPlanner();
  closeVisaModal();
  const waPanel = document.getElementById('wa-panel');
  if (waPanel) waPanel.classList.remove('open');
});
