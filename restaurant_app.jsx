// ============================================================
// 🍽️ FeastFlow - Full Restaurant Ordering App
// Tech: React + Tailwind (CDN) + localStorage
// Features: Auth, Menu, Cart, Orders, Multi-lang, Dark Mode
// ============================================================

import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────
const T = {
  en: {
    appName: "FeastFlow",
    tagline: "Delicious food, delivered fast",
    home: "Home", menu: "Menu", cart: "Cart", orders: "Orders", profile: "Profile",
    login: "Login", signup: "Sign Up", logout: "Logout",
    addToCart: "Add to Cart", added: "Added!", removeItem: "Remove",
    qty: "Qty", total: "Total", subtotal: "Subtotal", tax: "Tax (5%)", grandTotal: "Grand Total",
    placeOrder: "Place Order", orderPlaced: "Order Placed!", continueShopping: "Continue Shopping",
    emptyCart: "Your cart is empty", browseMenu: "Browse Menu",
    search: "Search dishes...", filter: "Filter",
    all: "All", veg: "Veg", nonveg: "Non-Veg", desserts: "Desserts", drinks: "Drinks",
    featuredDishes: "Featured Dishes", specialOffers: "Special Offers",
    orderHistory: "Order History", noOrders: "No orders yet",
    email: "Email", password: "Password", name: "Full Name",
    haveAccount: "Already have an account?", noAccount: "Don't have an account?",
    darkMode: "Dark Mode", language: "Language",
    orderConfirmed: "Order Confirmed!", estimatedTime: "Estimated Delivery: 30-45 mins",
    rating: "Rating", reviews: "Reviews", writeReview: "Write a Review",
    submit: "Submit", cancel: "Cancel",
    pay: "Pay Now", payDummy: "Demo Payment", processing: "Processing...",
    heroTitle: "Taste the\nDifference", heroSub: "Fresh ingredients, bold flavors, delivered to your door",
    orderNow: "Order Now", viewMenu: "View Menu",
    welcome: "Welcome back,", newUser: "New here? Join us!",
    invalidEmail: "Invalid email address", passwordShort: "Password must be at least 6 characters",
    nameRequired: "Name is required",
    itemAdded: "Added to cart!", itemRemoved: "Removed from cart",
    orderSuccess: "Order placed successfully!",
    thankYou: "Thank you for your order",
    spicy: "Spicy", popular: "Popular", new: "New",
    off: "OFF",
    ratings: "ratings",
    yourReview: "Share your experience...",
  },
  ta: {
    appName: "ஃபீஸ்ட்ஃப்ளோ",
    tagline: "சுவையான உணவு, வேகமாக டெலிவரி",
    home: "முகப்பு", menu: "மெனு", cart: "கார்ட்", orders: "ஆர்டர்கள்", profile: "சுயவிவரம்",
    login: "உள்நுழை", signup: "பதிவு செய்", logout: "வெளியேறு",
    addToCart: "கார்ட்டில் சேர்", added: "சேர்க்கப்பட்டது!", removeItem: "நீக்கு",
    qty: "அளவு", total: "மொத்தம்", subtotal: "துணை மொத்தம்", tax: "வரி (5%)", grandTotal: "மொத்த தொகை",
    placeOrder: "ஆர்டர் செய்", orderPlaced: "ஆர்டர் செய்யப்பட்டது!", continueShopping: "தொடர்ந்து கடை",
    emptyCart: "உங்கள் கார்ட் காலியாக உள்ளது", browseMenu: "மெனு பார்க்க",
    search: "உணவு தேடு...", filter: "வடிகட்டி",
    all: "அனைத்தும்", veg: "சைவம்", nonveg: "அசைவம்", desserts: "இனிப்புகள்", drinks: "பானங்கள்",
    featuredDishes: "சிறப்பு உணவுகள்", specialOffers: "சிறப்பு சலுகைகள்",
    orderHistory: "ஆர்டர் வரலாறு", noOrders: "இன்னும் ஆர்டர் இல்லை",
    email: "மின்னஞ்சல்", password: "கடவுச்சொல்", name: "பூரண பெயர்",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?", noAccount: "கணக்கு இல்லையா?",
    darkMode: "இருண்ட பயன்முறை", language: "மொழி",
    orderConfirmed: "ஆர்டர் உறுதிப்படுத்தப்பட்டது!", estimatedTime: "வருகை நேரம்: 30-45 நிமிடம்",
    rating: "மதிப்பீடு", reviews: "மதிப்புரைகள்", writeReview: "மதிப்புரை எழுது",
    submit: "சமர்ப்பி", cancel: "ரத்து",
    pay: "இப்போது செலுத்து", payDummy: "டெமோ பேமெண்ட்", processing: "செயல்படுகிறது...",
    heroTitle: "சுவையை\nஉணரு", heroSub: "புதிய பொருட்கள், தைரியமான சுவைகள், உங்கள் வீட்டிற்கு",
    orderNow: "இப்போது ஆர்டர் செய்", viewMenu: "மெனு பார்க்க",
    welcome: "மீண்டும் வரவேற்கிறோம்,", newUser: "புதியவரா? இணையுங்கள்!",
    invalidEmail: "தவறான மின்னஞ்சல்", passwordShort: "கடவுச்சொல் 6 எழுத்துக்களாவது வேண்டும்",
    nameRequired: "பெயர் தேவை",
    itemAdded: "கார்ட்டில் சேர்க்கப்பட்டது!", itemRemoved: "நீக்கப்பட்டது",
    orderSuccess: "ஆர்டர் வெற்றிகரமாக செய்யப்பட்டது!",
    thankYou: "உங்கள் ஆர்டருக்கு நன்றி",
    spicy: "காரமான", popular: "பிரபலமான", new: "புதியது",
    off: "தள்ளுபடி",
    ratings: "மதிப்பீடுகள்",
    yourReview: "உங்கள் அனுபவம் பகிரவும்...",
  },
  hi: {
    appName: "फीस्टफ्लो",
    tagline: "स्वादिष्ट खाना, तेज़ डिलीवरी",
    home: "होम", menu: "मेनू", cart: "कार्ट", orders: "ऑर्डर", profile: "प्रोफाइल",
    login: "लॉगिन", signup: "साइन अप", logout: "लॉगआउट",
    addToCart: "कार्ट में डालें", added: "जोड़ा!", removeItem: "हटाएं",
    qty: "मात्रा", total: "कुल", subtotal: "उप-कुल", tax: "टैक्स (5%)", grandTotal: "कुल राशि",
    placeOrder: "ऑर्डर करें", orderPlaced: "ऑर्डर हो गया!", continueShopping: "खरीदारी जारी रखें",
    emptyCart: "आपका कार्ट खाली है", browseMenu: "मेनू देखें",
    search: "खाना खोजें...", filter: "फ़िल्टर",
    all: "सभी", veg: "शाकाहारी", nonveg: "मांसाहारी", desserts: "मिठाई", drinks: "पेय",
    featuredDishes: "खास व्यंजन", specialOffers: "खास ऑफर",
    orderHistory: "ऑर्डर इतिहास", noOrders: "अभी कोई ऑर्डर नहीं",
    email: "ईमेल", password: "पासवर्ड", name: "पूरा नाम",
    haveAccount: "पहले से अकाउंट है?", noAccount: "अकाउंट नहीं है?",
    darkMode: "डार्क मोड", language: "भाषा",
    orderConfirmed: "ऑर्डर कन्फर्म!", estimatedTime: "डिलीवरी समय: 30-45 मिनट",
    rating: "रेटिंग", reviews: "समीक्षाएं", writeReview: "समीक्षा लिखें",
    submit: "जमा करें", cancel: "रद्द करें",
    pay: "अभी भुगतान करें", payDummy: "डेमो पेमेंट", processing: "प्रोसेस हो रहा है...",
    heroTitle: "स्वाद का\nअनुभव करें", heroSub: "ताज़ी सामग्री, बेहतरीन स्वाद, आपके दरवाज़े तक",
    orderNow: "अभी ऑर्डर करें", viewMenu: "मेनू देखें",
    welcome: "वापस स्वागत है,", newUser: "नए हैं? जुड़ें!",
    invalidEmail: "गलत ईमेल", passwordShort: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
    nameRequired: "नाम आवश्यक है",
    itemAdded: "कार्ट में जोड़ा!", itemRemoved: "हटाया गया",
    orderSuccess: "ऑर्डर सफलतापूर्वक हो गया!",
    thankYou: "आपके ऑर्डर के लिए धन्यवाद",
    spicy: "तीखा", popular: "लोकप्रिय", new: "नया",
    off: "छूट",
    ratings: "रेटिंग",
    yourReview: "अपना अनुभव साझा करें...",
  }
};

// ─── MENU DATA ────────────────────────────────────────────────
const MENU_ITEMS = [
  // Veg
  { id: 1, name: "Paneer Butter Masala", category: "veg", price: 280, rating: 4.5, reviews: 234, spicy: true, popular: true, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop", desc: "Rich creamy tomato gravy with soft paneer cubes" },
  { id: 2, name: "Dal Makhani", category: "veg", price: 220, rating: 4.3, reviews: 189, spicy: false, popular: true, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", desc: "Slow-cooked black lentils in a buttery tomato base" },
  { id: 3, name: "Veg Biryani", category: "veg", price: 260, rating: 4.4, reviews: 312, spicy: true, popular: false, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop", desc: "Aromatic basmati rice with seasonal vegetables" },
  { id: 4, name: "Palak Paneer", category: "veg", price: 260, rating: 4.2, reviews: 156, spicy: false, popular: false, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", desc: "Fresh spinach curry with cottage cheese" },
  { id: 5, name: "Masala Dosa", category: "veg", price: 160, rating: 4.6, reviews: 445, spicy: true, popular: true, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop", desc: "Crispy rice crepe filled with spiced potatoes" },
  { id: 6, name: "Chole Bhature", category: "veg", price: 180, rating: 4.4, reviews: 278, spicy: true, popular: true, img: "https://images.unsplash.com/photo-1626132647523-66c8ede96dc0?w=400&h=300&fit=crop", desc: "Spiced chickpea curry with fluffy fried bread" },
  // Non-Veg
  { id: 7, name: "Chicken Tikka Masala", category: "nonveg", price: 360, rating: 4.7, reviews: 523, spicy: true, popular: true, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", desc: "Tender chicken in a spiced tomato cream sauce" },
  { id: 8, name: "Mutton Biryani", category: "nonveg", price: 420, rating: 4.8, reviews: 612, spicy: true, popular: true, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop", desc: "Slow-cooked mutton layered with fragrant rice" },
  { id: 9, name: "Butter Chicken", category: "nonveg", price: 340, rating: 4.6, reviews: 489, spicy: false, popular: true, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop", desc: "Juicy chicken in a velvety butter sauce" },
  { id: 10, name: "Fish Curry", category: "nonveg", price: 380, rating: 4.3, reviews: 201, spicy: true, popular: false, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", desc: "Coastal-style fish in tangy coconut gravy" },
  { id: 11, name: "Chicken 65", category: "nonveg", price: 280, rating: 4.5, reviews: 334, spicy: true, popular: true, img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop", desc: "Crispy fried chicken with South Indian spices" },
  { id: 12, name: "Prawn Masala", category: "nonveg", price: 440, rating: 4.4, reviews: 167, spicy: true, popular: false, img: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&h=300&fit=crop", desc: "Juicy prawns in a bold spiced masala" },
  // Desserts
  { id: 13, name: "Gulab Jamun", category: "desserts", price: 120, rating: 4.7, reviews: 389, spicy: false, popular: true, img: "https://images.unsplash.com/photo-1666451573057-3e2e8ca45268?w=400&h=300&fit=crop", desc: "Soft milk dumplings soaked in rose syrup" },
  { id: 14, name: "Rasmalai", category: "desserts", price: 140, rating: 4.6, reviews: 256, spicy: false, popular: true, img: "https://images.unsplash.com/photo-1632503977163-2e46b01c80d3?w=400&h=300&fit=crop", desc: "Soft cottage cheese dumplings in saffron milk" },
  { id: 15, name: "Chocolate Brownie", category: "desserts", price: 160, rating: 4.5, reviews: 198, spicy: false, popular: false, img: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop", desc: "Warm fudgy brownie with vanilla ice cream" },
  { id: 16, name: "Mango Kulfi", category: "desserts", price: 100, rating: 4.4, reviews: 211, spicy: false, popular: false, img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", desc: "Traditional Indian ice cream with mango flavor" },
  // Drinks
  { id: 17, name: "Mango Lassi", category: "drinks", price: 100, rating: 4.6, reviews: 334, spicy: false, popular: true, img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop", desc: "Chilled yogurt drink with fresh mango pulp" },
  { id: 18, name: "Masala Chai", category: "drinks", price: 60, rating: 4.7, reviews: 512, spicy: false, popular: true, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop", desc: "Spiced Indian tea with milk" },
  { id: 19, name: "Fresh Lime Soda", category: "drinks", price: 80, rating: 4.3, reviews: 178, spicy: false, popular: false, img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop", desc: "Chilled soda with fresh lime and mint" },
  { id: 20, name: "Cold Coffee", category: "drinks", price: 120, rating: 4.4, reviews: 223, spicy: false, popular: false, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop", desc: "Creamy blended coffee with ice cream" },
];

const OFFERS = [
  { id: 1, title: "50% OFF", subtitle: "On first order", code: "FIRST50", color: "#FF6B35", bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop" },
  { id: 2, title: "Free Delivery", subtitle: "Orders above ₹500", code: "FREEDEL", color: "#F7931E", bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=300&fit=crop" },
  { id: 3, title: "20% OFF", subtitle: "Weekend special", code: "WEEKEND20", color: "#E63946", bg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=300&fit=crop" },
];

// ─── CONTEXT ─────────────────────────────────────────────────
const AppContext = createContext();

function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("ff_lang") || "en");
  const [dark, setDark] = useState(() => localStorage.getItem("ff_dark") === "true");
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("ff_user")); } catch { return null; } });
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem("ff_cart")) || []; } catch { return []; } });
  const [orders, setOrders] = useState(() => { try { return JSON.parse(localStorage.getItem("ff_orders")) || []; } catch { return []; } });
  const [toasts, setToasts] = useState([]);
  const [page, setPage] = useState("home");
  const [reviews, setReviews] = useState(() => { try { return JSON.parse(localStorage.getItem("ff_reviews")) || {}; } catch { return {}; } });

  const t = T[lang];

  useEffect(() => { localStorage.setItem("ff_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("ff_dark", dark); }, [dark]);
  useEffect(() => { if (user) localStorage.setItem("ff_user", JSON.stringify(user)); else localStorage.removeItem("ff_user"); }, [user]);
  useEffect(() => { localStorage.setItem("ff_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("ff_orders", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem("ff_reviews", JSON.stringify(reviews)); }, [reviews]);

  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === item.id);
      if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    toast(t.itemAdded);
  }, [t, toast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    toast(t.itemRemoved, "info");
  }, [t, toast]);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const placeOrder = useCallback((paymentMethod) => {
    const order = {
      id: `FF${Date.now()}`,
      items: [...cart],
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      date: new Date().toISOString(),
      status: "Delivered",
      payment: paymentMethod,
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    toast(t.orderSuccess);
    return order;
  }, [cart, t, toast]);

  const addReview = useCallback((itemId, review) => {
    setReviews(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), { ...review, user: user?.name, date: new Date().toLocaleDateString() }]
    }));
  }, [user]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{ lang, setLang, dark, setDark, user, setUser, cart, orders, toasts, page, setPage, t, addToCart, removeFromCart, updateQty, placeOrder, cartCount, cartTotal, reviews, addReview }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// ─── TOAST SYSTEM ────────────────────────────────────────────
function Toasts() {
  const { toasts } = useApp();
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "info" ? "#374151" : "linear-gradient(135deg,#FF6B35,#F7931E)",
          color: "#fff", padding: "12px 20px", borderRadius: 12, fontWeight: 600,
          fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          animation: "slideIn 0.3s ease",
          display: "flex", alignItems: "center", gap: 8
        }}>
          {t.type === "info" ? "🗑️" : "✅"} {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── STAR RATING ─────────────────────────────────────────────
function Stars({ rating, size = 14, interactive = false, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s}
          onClick={() => interactive && onChange && onChange(s)}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          style={{ fontSize: size, cursor: interactive ? "pointer" : "default", color: s <= (hover || rating) ? "#F7931E" : "#D1D5DB" }}>★</span>
      ))}
    </span>
  );
}

// ─── NAV ─────────────────────────────────────────────────────
function Nav() {
  const { t, lang, setLang, dark, setDark, user, setUser, setPage, page, cartCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { key: "home", icon: "🏠" }, { key: "menu", icon: "🍽️" },
    { key: "cart", icon: "🛒" }, { key: "orders", icon: "📦" }, { key: "profile", icon: "👤" }
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: dark ? "rgba(17,24,39,0.97)" : "rgba(255,255,255,0.97)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${dark ? "#1F2937" : "#F3F4F6"}`,
      boxShadow: "0 2px 20px rgba(0,0,0,0.08)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>🍜</span>
          <span style={{ fontSize: 22, fontWeight: 800, background: "linear-gradient(135deg,#FF6B35,#E63946)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t.appName}
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navLinks.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)} style={{
              background: page === l.key ? "linear-gradient(135deg,#FF6B35,#F7931E)" : "transparent",
              color: page === l.key ? "#fff" : dark ? "#D1D5DB" : "#374151",
              border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer",
              fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6, position: "relative",
              transition: "all 0.2s"
            }}>
              {l.icon} {t[l.key]}
              {l.key === "cart" && cartCount > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, background: "#E63946", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select value={lang} onChange={e => setLang(e.target.value)} style={{
            background: dark ? "#1F2937" : "#F9FAFB", color: dark ? "#F9FAFB" : "#111827",
            border: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, borderRadius: 8, padding: "6px 10px", fontSize: 12, cursor: "pointer"
          }}>
            <option value="en">🇬🇧 EN</option>
            <option value="ta">🇮🇳 தமிழ்</option>
            <option value="hi">🇮🇳 हिंदी</option>
          </select>

          <button onClick={() => setDark(!dark)} style={{ background: dark ? "#1F2937" : "#F3F4F6", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>
            {dark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <button onClick={() => { setUser(null); setPage("home"); }} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
              {t.logout}
            </button>
          ) : (
            <button onClick={() => setPage("auth")} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
              {t.login}
            </button>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer", color: dark ? "#F9FAFB" : "#111827" }}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: dark ? "#111827" : "#fff", padding: "12px 20px 16px", borderTop: `1px solid ${dark ? "#1F2937" : "#F3F4F6"}` }}>
          {navLinks.map(l => (
            <button key={l.key} onClick={() => { setPage(l.key); setMenuOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              background: page === l.key ? "linear-gradient(135deg,#FF6B35,#F7931E)" : "transparent",
              color: page === l.key ? "#fff" : dark ? "#D1D5DB" : "#374151",
              border: "none", borderRadius: 10, padding: "10px 14px", cursor: "pointer",
              fontWeight: 600, fontSize: 15, marginBottom: 4
            }}>
              {l.icon} {t[l.key]}
              {l.key === "cart" && cartCount > 0 && <span style={{ background: "#E63946", color: "#fff", borderRadius: "50%", padding: "1px 6px", fontSize: 11 }}>{cartCount}</span>}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────
function HomePage() {
  const { t, dark, setPage, addToCart } = useApp();
  const featured = MENU_ITEMS.filter(i => i.popular).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: "90vh", minHeight: 500, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=900&fit=crop" alt="hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,0,0,0.75) 40%,rgba(231,57,70,0.3))" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.25)", border: "1px solid rgba(255,107,53,0.5)", borderRadius: 50, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ color: "#F7931E", fontSize: 13, fontWeight: 700 }}>🔥 Now delivering in 30 mins</span>
            </div>
            <h1 style={{ fontSize: "clamp(42px,7vw,84px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 16, fontFamily: "Georgia, serif", whiteSpace: "pre-line" }}>
              {t.heroTitle}
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 32, lineHeight: 1.6 }}>{t.heroSub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => setPage("menu")} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,107,53,0.4)" }}>
                {t.orderNow} →
              </button>
              <button onClick={() => setPage("menu")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 14, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
                {t.viewMenu}
              </button>
            </div>
          </div>
        </div>
        {/* Floating stats */}
        <div style={{ position: "absolute", bottom: 32, right: "5%", display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[{ v: "500+", l: "Dishes" }, { v: "4.8★", l: "Rating" }, { v: "30min", l: "Delivery" }].map(s => (
            <div key={s.l} style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 14, padding: "14px 20px", textAlign: "center", minWidth: 80 }}>
              <div style={{ color: "#F7931E", fontWeight: 800, fontSize: 22 }}>{s.v}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", marginBottom: 20, fontFamily: "Georgia, serif" }}>{t.specialOffers}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {OFFERS.map(o => (
            <div key={o.id} style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 160, cursor: "pointer" }}>
              <img src={o.bg} alt={o.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${o.color}dd,rgba(0,0,0,0.4))` }} />
              <div style={{ position: "relative", padding: 20 }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 32 }}>{o.title}</div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginTop: 4 }}>{o.subtitle}</div>
                <div style={{ marginTop: 8, display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 12px", color: "#fff", fontWeight: 700, fontSize: 13, border: "1px dashed rgba(255,255,255,0.6)" }}>
                  Code: {o.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", fontFamily: "Georgia, serif" }}>{t.featuredDishes}</h2>
          <button onClick={() => setPage("menu")} style={{ background: "transparent", color: "#FF6B35", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>View All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {featured.map(item => <FoodCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

// ─── FOOD CARD ────────────────────────────────────────────────
function FoodCard({ item }) {
  const { t, dark, addToCart, cart, reviews, setPage, user } = useApp();
  const [showReviews, setShowReviews] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { addReview } = useApp();
  const inCart = cart.find(i => i.id === item.id);
  const itemReviews = reviews[item.id] || [];
  const avgRating = itemReviews.length ? (itemReviews.reduce((s, r) => s + r.rating, 0) / itemReviews.length).toFixed(1) : item.rating;

  const handleReview = () => {
    if (!reviewText.trim()) return;
    addReview(item.id, { rating: newRating, text: reviewText });
    setReviewText("");
    setNewRating(5);
  };

  return (
    <div style={{
      background: dark ? "#1F2937" : "#fff", borderRadius: 20, overflow: "hidden",
      boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
      border: `1px solid ${dark ? "#374151" : "#F3F4F6"}`
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ position: "relative" }}>
        <img src={item.img} alt={item.name} style={{ width: "100%", height: 180, objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {item.popular && <span style={{ background: "#FF6B35", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>🔥 {t.popular}</span>}
          {item.spicy && <span style={{ background: "#E63946", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>🌶️ {t.spicy}</span>}
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: item.category === "veg" ? "#16A34A" : "#DC2626", width: 20, height: 20, borderRadius: 4, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: dark ? "#F9FAFB" : "#111827", marginBottom: 4 }}>{item.name}</div>
        <div style={{ fontSize: 13, color: dark ? "#9CA3AF" : "#6B7280", marginBottom: 10, lineHeight: 1.5 }}>{item.desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Stars rating={parseFloat(avgRating)} />
          <span style={{ fontSize: 13, fontWeight: 600, color: dark ? "#D1D5DB" : "#374151" }}>{avgRating}</span>
          <span style={{ fontSize: 12, color: dark ? "#6B7280" : "#9CA3AF" }}>({item.reviews + itemReviews.length} {t.ratings})</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#FF6B35" }}>₹{item.price}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowReviews(!showReviews)} style={{ background: dark ? "#374151" : "#F3F4F6", border: "none", borderRadius: 8, padding: "7px 10px", fontSize: 12, cursor: "pointer", color: dark ? "#D1D5DB" : "#374151" }}>
              ⭐ {t.reviews}
            </button>
            <button onClick={() => addToCart(item)} style={{
              background: inCart ? "linear-gradient(135deg,#16A34A,#15803D)" : "linear-gradient(135deg,#FF6B35,#E63946)",
              color: "#fff", border: "none", borderRadius: 10, padding: "7px 14px",
              fontWeight: 700, fontSize: 13, cursor: "pointer"
            }}>
              {inCart ? `✓ ${t.added}` : `+ ${t.addToCart}`}
            </button>
          </div>
        </div>

        {/* Reviews Dropdown */}
        {showReviews && (
          <div style={{ marginTop: 14, borderTop: `1px solid ${dark ? "#374151" : "#F3F4F6"}`, paddingTop: 14 }}>
            {itemReviews.length > 0 ? (
              <div style={{ marginBottom: 12 }}>
                {itemReviews.slice(0, 3).map((r, i) => (
                  <div key={i} style={{ marginBottom: 8, padding: 10, background: dark ? "#111827" : "#F9FAFB", borderRadius: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: dark ? "#F9FAFB" : "#111827" }}>{r.user}</span>
                      <Stars rating={r.rating} size={12} />
                    </div>
                    <p style={{ fontSize: 12, color: dark ? "#9CA3AF" : "#6B7280", marginTop: 4 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {user && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#D1D5DB" : "#374151", marginBottom: 6 }}>{t.writeReview}</div>
                <Stars rating={newRating} size={20} interactive onChange={setNewRating} />
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)}
                  placeholder={t.yourReview} rows={2}
                  style={{ width: "100%", marginTop: 8, padding: "8px 10px", borderRadius: 8, border: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, background: dark ? "#111827" : "#F9FAFB", color: dark ? "#F9FAFB" : "#111827", fontSize: 12, resize: "none", boxSizing: "border-box" }} />
                <button onClick={handleReview} style={{ marginTop: 6, background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{t.submit}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MENU PAGE ────────────────────────────────────────────────
function MenuPage() {
  const { t, dark } = useApp();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = ["all", "veg", "nonveg", "desserts", "drinks"];
  const filtered = MENU_ITEMS.filter(i =>
    (activeFilter === "all" || i.category === activeFilter) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", marginBottom: 6, fontFamily: "Georgia, serif" }}>{t.menu}</h1>
      <p style={{ color: dark ? "#9CA3AF" : "#6B7280", marginBottom: 24 }}>{filtered.length} items available</p>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
            style={{ width: "100%", padding: "10px 14px 10px 38px", borderRadius: 12, border: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, background: dark ? "#1F2937" : "#F9FAFB", color: dark ? "#F9FAFB" : "#111827", fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveFilter(c)} style={{
              padding: "8px 18px", borderRadius: 50, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
              background: activeFilter === c ? "linear-gradient(135deg,#FF6B35,#E63946)" : dark ? "#1F2937" : "#F3F4F6",
              color: activeFilter === c ? "#fff" : dark ? "#D1D5DB" : "#374151",
              transition: "all 0.2s"
            }}>
              {c === "veg" ? "🥦" : c === "nonveg" ? "🍗" : c === "desserts" ? "🍮" : c === "drinks" ? "🥤" : "🍽️"} {t[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {filtered.map(item => <FoodCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px", color: dark ? "#9CA3AF" : "#6B7280" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p>No items found for "{search}"</p>
        </div>
      )}
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────
function CartPage() {
  const { t, dark, cart, removeFromCart, updateQty, cartTotal, placeOrder, setPage, user } = useApp();
  const [paying, setPaying] = useState(false);
  const tax = Math.round(cartTotal * 0.05);
  const grand = cartTotal + tax;

  const handlePay = async () => {
    if (!user) { setPage("auth"); return; }
    setPaying(true);
    await new Promise(r => setTimeout(r, 2000));
    const order = placeOrder("UPI/Card");
    setPaying(false);
    setPage("confirm");
  };

  if (!cart.length) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🛒</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: dark ? "#F9FAFB" : "#111827", marginBottom: 8 }}>{t.emptyCart}</h2>
      <button onClick={() => setPage("menu")} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{t.browseMenu}</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", marginBottom: 24, fontFamily: "Georgia, serif" }}>🛒 {t.cart}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24 }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map(item => (
            <div key={item.id} style={{ background: dark ? "#1F2937" : "#fff", borderRadius: 16, padding: 16, display: "flex", gap: 14, alignItems: "center", border: `1px solid ${dark ? "#374151" : "#F3F4F6"}`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <img src={item.img} alt={item.name} style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: dark ? "#F9FAFB" : "#111827" }}>{item.name}</div>
                <div style={{ color: "#FF6B35", fontWeight: 700, marginTop: 4 }}>₹{item.price}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, background: dark ? "#374151" : "#F3F4F6", color: dark ? "#F9FAFB" : "#111827", cursor: "pointer", fontWeight: 700, fontSize: 16 }}>−</button>
                <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center", color: dark ? "#F9FAFB" : "#111827" }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#FF6B35,#E63946)", border: "none", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16 }}>+</button>
              </div>
              <div style={{ fontWeight: 700, minWidth: 60, textAlign: "right", color: dark ? "#F9FAFB" : "#111827" }}>₹{item.price * item.qty}</div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: "transparent", border: "none", color: "#E63946", cursor: "pointer", fontSize: 18, padding: 4 }}>🗑️</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: dark ? "#1F2937" : "#fff", borderRadius: 16, padding: 24, border: `1px solid ${dark ? "#374151" : "#F3F4F6"}`, minWidth: 240, height: "fit-content", position: "sticky", top: 80 }}>
          <h3 style={{ fontWeight: 800, fontSize: 18, color: dark ? "#F9FAFB" : "#111827", marginBottom: 20 }}>Order Summary</h3>
          {[{ l: t.subtotal, v: `₹${cartTotal}` }, { l: t.tax, v: `₹${tax}` }].map(r => (
            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: dark ? "#9CA3AF" : "#6B7280", fontSize: 14 }}>
              <span>{r.l}</span><span>{r.v}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, color: dark ? "#F9FAFB" : "#111827", marginBottom: 20 }}>
            <span>{t.grandTotal}</span><span style={{ color: "#FF6B35" }}>₹{grand}</span>
          </div>
          <button onClick={handlePay} disabled={paying} style={{
            width: "100%", background: paying ? "#9CA3AF" : "linear-gradient(135deg,#FF6B35,#E63946)",
            color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontWeight: 700, fontSize: 16, cursor: paying ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            {paying ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> {t.processing}</> : `💳 ${t.pay} ₹${grand}`}
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: dark ? "#6B7280" : "#9CA3AF", marginTop: 10 }}>🔒 Secure demo payment</p>
        </div>
      </div>
    </div>
  );
}

// ─── ORDER CONFIRM ────────────────────────────────────────────
function ConfirmPage() {
  const { t, dark, setPage, orders } = useApp();
  const latest = orders[0];
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 80, marginBottom: 16, animation: "bounce 0.6s ease" }}>🎉</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", marginBottom: 8, fontFamily: "Georgia, serif" }}>{t.orderConfirmed}</h1>
      <p style={{ color: dark ? "#9CA3AF" : "#6B7280", marginBottom: 24 }}>{t.estimatedTime}</p>
      {latest && (
        <div style={{ background: dark ? "#1F2937" : "#F9FAFB", borderRadius: 16, padding: 20, textAlign: "left", marginBottom: 24, border: `1px solid ${dark ? "#374151" : "#E5E7EB"}` }}>
          <div style={{ fontWeight: 700, color: dark ? "#F9FAFB" : "#111827", marginBottom: 12 }}>Order #{latest.id}</div>
          {latest.items.map(i => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6, color: dark ? "#D1D5DB" : "#374151" }}>
              <span>{i.name} × {i.qty}</span><span>₹{i.price * i.qty}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, paddingTop: 10, marginTop: 10, fontWeight: 700, display: "flex", justifyContent: "space-between", color: "#FF6B35", fontSize: 16 }}>
            <span>{t.grandTotal}</span><span>₹{Math.round(latest.total * 1.05)}</span>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => setPage("menu")} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{t.continueShopping}</button>
        <button onClick={() => setPage("orders")} style={{ background: dark ? "#1F2937" : "#F3F4F6", color: dark ? "#F9FAFB" : "#111827", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>{t.orderHistory}</button>
      </div>
    </div>
  );
}

// ─── ORDERS PAGE ──────────────────────────────────────────────
function OrdersPage() {
  const { t, dark, orders, setPage } = useApp();
  if (!orders.length) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>📦</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: dark ? "#F9FAFB" : "#111827", marginBottom: 8 }}>{t.noOrders}</h2>
      <button onClick={() => setPage("menu")} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>{t.browseMenu}</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", marginBottom: 24, fontFamily: "Georgia, serif" }}>📦 {t.orderHistory}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {orders.map(order => (
          <div key={order.id} style={{ background: dark ? "#1F2937" : "#fff", borderRadius: 16, padding: 20, border: `1px solid ${dark ? "#374151" : "#F3F4F6"}`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: dark ? "#F9FAFB" : "#111827" }}>Order #{order.id}</div>
                <div style={{ fontSize: 13, color: dark ? "#9CA3AF" : "#6B7280", marginTop: 2 }}>{new Date(order.date).toLocaleString()}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ background: "#DCFCE7", color: "#16A34A", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>✓ {order.status}</span>
                <span style={{ color: "#FF6B35", fontWeight: 800, fontSize: 16 }}>₹{Math.round(order.total * 1.05)}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {order.items.map(i => (
                <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, background: dark ? "#111827" : "#F9FAFB", borderRadius: 10, padding: "6px 10px" }}>
                  <img src={i.img} alt={i.name} style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover" }} />
                  <span style={{ fontSize: 13, color: dark ? "#D1D5DB" : "#374151" }}>{i.name} ×{i.qty}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────
function AuthPage() {
  const { t, dark, setUser, setPage } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = t.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.invalidEmail;
    if (form.password.length < 6) e.password = t.passwordShort;
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const users = JSON.parse(localStorage.getItem("ff_users") || "[]");
    if (isLogin) {
      const found = users.find(u => u.email === form.email && u.password === form.password);
      if (!found) { setErrors({ email: "Invalid credentials" }); setLoading(false); return; }
      setUser(found); setPage("home");
    } else {
      const exists = users.find(u => u.email === form.email);
      if (exists) { setErrors({ email: "Email already registered" }); setLoading(false); return; }
      const newUser = { id: Date.now(), name: form.name, email: form.email, password: form.password };
      localStorage.setItem("ff_users", JSON.stringify([...users, newUser]));
      setUser(newUser); setPage("home");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: dark ? "#111827" : `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&h=900&fit=crop') center/cover` }}>
      {!dark && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)" }} />}
      <div style={{ position: "relative", background: dark ? "#1F2937" : "#fff", borderRadius: 24, padding: 36, width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 40 }}>🍜</span>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827", marginTop: 8, fontFamily: "Georgia, serif" }}>
            {isLogin ? t.login : t.signup}
          </h2>
          <p style={{ color: dark ? "#9CA3AF" : "#6B7280", fontSize: 14, marginTop: 4 }}>
            {isLogin ? t.newUser : t.haveAccount}
            <button onClick={() => { setIsLogin(!isLogin); setErrors({}); }} style={{ background: "transparent", border: "none", color: "#FF6B35", fontWeight: 700, cursor: "pointer", fontSize: 14, marginLeft: 4 }}>
              {isLogin ? t.signup : t.login}
            </button>
          </p>
        </div>

        {[...(!isLogin ? [{ key: "name", label: t.name, type: "text", icon: "👤" }] : []), { key: "email", label: t.email, type: "email", icon: "📧" }, { key: "password", label: t.password, type: "password", icon: "🔒" }].map(f => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: dark ? "#D1D5DB" : "#374151", marginBottom: 6 }}>{f.label}</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>{f.icon}</span>
              <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 12, border: `1.5px solid ${errors[f.key] ? "#E63946" : dark ? "#374151" : "#E5E7EB"}`, background: dark ? "#111827" : "#F9FAFB", color: dark ? "#F9FAFB" : "#111827", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            {errors[f.key] && <p style={{ color: "#E63946", fontSize: 12, marginTop: 4 }}>{errors[f.key]}</p>}
          </div>
        ))}

        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: loading ? "#9CA3AF" : "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> {t.processing}</> : (isLogin ? t.login : t.signup)}
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ────────────────────────────────────────────
function ProfilePage() {
  const { t, dark, user, setPage, orders } = useApp();
  if (!user) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>👤</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: dark ? "#F9FAFB" : "#111827", marginBottom: 16 }}>Please log in to view your profile</h2>
      <button onClick={() => setPage("auth")} style={{ background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>{t.login}</button>
    </div>
  );

  const totalSpent = orders.reduce((s, o) => s + Math.round(o.total * 1.05), 0);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 24px" }}>
      <div style={{ background: dark ? "#1F2937" : "#fff", borderRadius: 24, padding: 28, marginBottom: 20, border: `1px solid ${dark ? "#374151" : "#F3F4F6"}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#FF6B35,#E63946)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff" }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: dark ? "#F9FAFB" : "#111827" }}>{t.welcome} {user.name}!</h2>
            <p style={{ color: dark ? "#9CA3AF" : "#6B7280", fontSize: 14 }}>{user.email}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[{ label: "Total Orders", value: orders.length, icon: "📦" }, { label: "Total Spent", value: `₹${totalSpent}`, icon: "💰" }, { label: "Saved", value: "₹350", icon: "🎁" }].map(s => (
            <div key={s.label} style={{ background: dark ? "#111827" : "#F9FAFB", borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#FF6B35" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: dark ? "#6B7280" : "#9CA3AF", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setPage("orders")} style={{ width: "100%", background: dark ? "#1F2937" : "#fff", color: dark ? "#F9FAFB" : "#111827", border: `1px solid ${dark ? "#374151" : "#E5E7EB"}`, borderRadius: 14, padding: "14px", fontWeight: 600, fontSize: 15, cursor: "pointer", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>📦 {t.orderHistory}</span><span>→</span>
      </button>
      <button onClick={() => setPage("menu")} style={{ width: "100%", background: "linear-gradient(135deg,#FF6B35,#E63946)", color: "#fff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
        🍽️ {t.viewMenu}
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
function App() {
  const { page, dark } = useApp();

  const pages = { home: HomePage, menu: MenuPage, cart: CartPage, confirm: ConfirmPage, orders: OrdersPage, auth: AuthPage, profile: ProfilePage };
  const PageComponent = pages[page] || HomePage;

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#111827" : "#F8F7F5", transition: "background 0.3s", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        input:focus, textarea:focus, select:focus { outline: 2px solid #FF6B35; outline-offset: 0; }
        button:active { transform: scale(0.97); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; border-radius: 3px; }
      `}</style>
      <Nav />
      <div style={{ paddingTop: 64, minHeight: "100vh", animation: "fadeIn 0.35s ease" }}>
        <PageComponent />
      </div>
      <Toasts />
      {/* Footer */}
      <footer style={{ background: dark ? "#0F172A" : "#1F2937", color: "#9CA3AF", textAlign: "center", padding: "28px 20px", marginTop: 40 }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🍜</div>
        <div style={{ fontWeight: 700, color: "#F9FAFB", fontSize: 18, marginBottom: 4 }}>FeastFlow</div>
        <p style={{ fontSize: 13 }}>Delicious food, delivered with love ❤️</p>
        <p style={{ fontSize: 12, marginTop: 8, color: "#6B7280" }}>© 2024 FeastFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function Root() {
  return <AppProvider><App /></AppProvider>;
}
