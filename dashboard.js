document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".panel-section");

  function openSection(id) {
    navItems.forEach(btn => btn.classList.toggle("active", btn.dataset.target === id));
    sections.forEach(section => section.classList.toggle("active", section.id === id));
  }

  navItems.forEach(btn => btn.addEventListener("click", () => openSection(btn.dataset.target)));
  document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => openSection(btn.dataset.go)));

  const form = document.getElementById("productForm");
  const openBtn = document.getElementById("openProductForm");
  const cancelBtn = document.getElementById("cancelProduct");

  openBtn.addEventListener("click", () => form.classList.remove("hidden"));
  cancelBtn.addEventListener("click", () => form.classList.add("hidden"));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const products = getProducts();
    products.unshift({
      id: Date.now(),
      name: document.getElementById("nameInput").value.trim(),
      price: Number(document.getElementById("priceInput").value),
      stock: Number(document.getElementById("stockInput").value),
      category: document.getElementById("categoryInput").value,
      style: document.getElementById("styleInput").value,
      image: document.getElementById("imageInput").value.trim()
    });
    saveProducts(products);
    form.reset();
    form.classList.add("hidden");
    renderProducts();
  });

  const design = getDesign();
  document.getElementById("shopNameInput").value = design.name;
  document.getElementById("taglineInput").value = design.tagline;
  document.getElementById("primaryColorInput").value = design.primary;
  document.getElementById("backgroundColorInput").value = design.background;
  document.getElementById("fontInput").value = design.font;

  function updatePreview() {
    const primary = document.getElementById("primaryColorInput").value;
    const bg = document.getElementById("backgroundColorInput").value;
    document.getElementById("previewName").textContent = document.getElementById("shopNameInput").value || "Mi Tienda";
    document.getElementById("previewTagline").textContent = document.getElementById("taglineInput").value || "Tu estilo, a tu manera.";
    const preview = document.getElementById("storePreview");
    preview.style.setProperty("--preview-primary", primary);
    preview.style.background = bg;
  }

  ["shopNameInput", "taglineInput", "primaryColorInput", "backgroundColorInput"].forEach(id => {
    document.getElementById(id).addEventListener("input", updatePreview);
  });
  updatePreview();

  document.getElementById("designForm").addEventListener("submit", e => {
    e.preventDefault();
    saveDesign({
      name: document.getElementById("shopNameInput").value.trim() || "Mi Tienda",
      tagline: document.getElementById("taglineInput").value.trim() || "Tu estilo, a tu manera.",
      primary: document.getElementById("primaryColorInput").value,
      background: document.getElementById("backgroundColorInput").value,
      font: document.getElementById("fontInput").value
    });
    alert("Diseño guardado ♡");
  });

  renderProducts();
});

function renderProducts() {
  const products = getProducts();
  const table = document.getElementById("productTable");
  document.getElementById("productCount").textContent = products.length;

  table.innerHTML = products.map(product => `
    <div class="product-row">
      <div class="product-name-cell">
        <div class="thumb">${product.image ? `<img src="${product.image}" alt="${product.name}">` : "♡"}</div>
        <div><strong>${product.name}</strong><small>${styleLabel(product.style)}</small></div>
      </div>
      <span>${product.category}</span>
      <span>${product.stock}</span>
      <span>${money(product.price)}</span>
      <button class="delete-btn" onclick="deleteProduct(${product.id})">Eliminar</button>
    </div>
  `).join("");
}

function deleteProduct(id) {
  saveProducts(getProducts().filter(product => product.id !== id));
  renderProducts();
}
