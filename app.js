const DEFAULT_PRODUCTS = [
  { id: 1, name: "Top Rosé", price: 18500, stock: 8, category: "tops", style: "coquette", image: "" },
  { id: 2, name: "Mini Falda Bloom", price: 24000, stock: 5, category: "faldas", style: "coquette", image: "" },
  { id: 3, name: "Jean Angel", price: 32500, stock: 6, category: "pantalones", style: "y2k", image: "" },
  { id: 4, name: "Baby Tee Cupid", price: 16500, stock: 10, category: "tops", style: "y2k", image: "" },
  { id: 5, name: "Vestido Satin Heart", price: 42500, stock: 3, category: "vestidos", style: "elegante", image: "" },
  { id: 6, name: "Ballerinas Pearl", price: 28000, stock: 4, category: "calzado", style: "coquette", image: "" },
  { id: 7, name: "Cartera Mini Love", price: 19500, stock: 9, category: "accesorios", style: "elegante", image: "" },
  { id: 8, name: "Cardigan Soft", price: 29000, stock: 7, category: "abrigos", style: "casual", image: "" }
];

function getProducts() {
  const saved = localStorage.getItem("cc_products");
  if (!saved) {
    localStorage.setItem("cc_products", JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  return JSON.parse(saved);
}

function saveProducts(products) {
  localStorage.setItem("cc_products", JSON.stringify(products));
}

function getDesign() {
  return JSON.parse(localStorage.getItem("cc_design") || JSON.stringify({
    name: "Mi Tienda",
    tagline: "Tu estilo, a tu manera.",
    primary: "#e8a7bd",
    background: "#fff8fb",
    font: "delicada"
  }));
}

function saveDesign(design) {
  localStorage.setItem("cc_design", JSON.stringify(design));
}

function money(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}

function styleLabel(style) {
  const labels = {
    coquette: "Coquette",
    y2k: "Y2K",
    casual: "Casual",
    elegante: "Elegante"
  };
  return labels[style] || style;
}
