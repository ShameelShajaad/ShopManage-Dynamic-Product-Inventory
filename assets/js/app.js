console.log("js loaded!");

const InventoryMenu = document.getElementById("InventoryMenu");
const viewDetails = document.getElementById("viewDetails");
const detailsContent = document.getElementById("detailsContent");
const closeDetailsBtn = document.getElementById("closeDetailsBtn");
const addNewItemBtn = document.getElementById("addNewItem");
const addItemPopup = document.getElementById("addItemPopup");
const editItemPopup = document.getElementById("editItemPopup");
const loadingScreen = document.getElementById("loadingScreen");

function showLoader() {
  loadingScreen.classList.remove("hidden");
}

function hideLoader() {
  loadingScreen.classList.add("hidden");
}


let products=[];

async function loadProducts() {

  showLoader();

    const localData = localStorage.getItem('inventory');
    if(localData) {
        products=JSON.parse(localData);
    }else{
      let response

      try {
        response = await fetch("https://dummyjson.com/products?limit=100");
      } catch (error) {
        alert("Failed to load products. Please try again later...");
        console.error("Error fetching products:", error);
        return;
      }
      const data = await response.json();
      products = data.products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        brand: p.brand || "",
        stock: p.stock || 0,
        description: p.description || "",
        images: p.images || ["assets/images/logo.png"]
      })); 
        localStorage.setItem('inventory', JSON.stringify(products));
    }
    renderInventory();
    hideLoader();
}

loadProducts();

async function renderInventory() {
  InventoryMenu.innerHTML = "";

  products.forEach((product) => {
    let div = document.createElement("div");
    div.className =
      "bg-white rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl";

    div.innerHTML = `
        <div
              class="relative w-full h-48 md:h-56 lg:h-80 rounded-lg overflow-hidden"
            >
              <img
                src="${product.images[0]}"
                alt="${product.title}"
                class="w-full h-full object-cover"
              />
            </div>

            <p class="text-gray font-semibold text-lg text-center">${product.title}</p>
            <p class="text-gray-600 text-sm text-center">$${product.price}</p>
            <button
              class="view_details_btn border bg-gray-400 hover:bg-gray-500 transition-all rounded-full border-none px-10 md:px-18 py-2 flex gap-2"
            >
              <p class="text-lg text-white">View Details</p>
            </button>
            <div class="flex gap-3">
              <button
                class="edit_btn flex items-center border bg-[#137fec] hover:bg-blue-600 transition-all rounded-full border-none px-6 md:px-12 py-2 flex gap-2"
                onclick="editItem(${product.id})"
                >
                <img
                  src="assets/svg/pencil-fill.svg"
                  alt="pencil_icon"
                  class="invert brightness-0 filter w-6 h-6"
                />
                <p class="text-lg text-white">Edit</p>
              </button>
              <button
                class="delete_btn border bg-red-500 hover:bg-red-600 transition-all rounded-full py-2 px-4 border-none"
                onclick="deleteItem(${product.id})"
                >
                <img
                  src="assets/svg/trash.svg"
                  alt="trash_icon"
                  class="w-6 h-6"
                />
              </button>
            </div>
          </div>
        `;

    InventoryMenu.appendChild(div);

    const viewBtn = div.querySelector(".view_details_btn");

    viewBtn.addEventListener("click", () => {
      detailsContent.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}"
            class="w-half h-62 sm:h-70 object-cover" />
        <h2 class="text-xl text-white font-bold mb-1">${product.title}</h2>
        <p class="text-sm text-gray-300 mb-2 py-2">${product.description}</p>
        <p class="text-sm text-gray-400 mb-1">
            <strong>Price:</strong> $${product.price}
        </p>
        <p class="text-sm text-gray-400 mb-1">
            <strong>Category:</strong> ${product.category}
        </p>
        <p class="text-sm text-gray-400 mb-1">
            <strong>Brand:</strong> ${product.brand}
        </p>
        <p class="text-sm text-gray-400 mb-1">
            <strong>Stock Quantity:</strong> ${product.stock}
        </p>
        `;
      viewDetails.classList.remove("hidden");
    });
  });
}

closeDetailsBtn.addEventListener("click", () => {
  viewDetails.classList.add("hidden");
});

viewDetails.addEventListener("click", (e) => {
  if (e.target === viewDetails) {
    viewDetails.classList.add("hidden");
  }
});

function addNewItem() {
  addItemPopup.innerHTML = "";

  let div = document.createElement("div");
  div.className =
    "bg-white border border-white/10 rounded-xl w-[90%] max-w-md p-6";

  div.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-black">Add a New Item</h2>
      <button class="cursor-pointer" onclick="closeAddNewItem()">
        <img
          src="assets/svg/x.svg"
          alt="x_icon"
          class="w-6 h-6"
        />
      </button>
      </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-black/70 mb-1">Item Name</label>
            <input
              id="itemName"
              type="text"
              placeholder="e.g. Powder Canister"
              class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
            />
          </div>
          <div>
            <label class="block text-sm text-black/70 mb-1">Price (LKR)</label>
            <input
              id="itemPrice"
              type="number"
              placeholder="e.g. 25.99"
              class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
            />
          </div>

          <div>
            <label class="block text-sm text-black/70 mb-1">Category</label>
            <input
              id="itemCategory"
              type="text"
              placeholder="e.g. beauty"
              class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
            />
          </div>
          <div>
            <label class="block text-sm text-black/70 mb-1">Upload Image</label>
            <input
              id="itemImage"
              type="file"
              accept="image/*"
              class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
            />
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            onclick="closeAddNewItem()"
            class="flex-1 border border-black/20 text-black rounded-lg py-2 hover:bg-black/10 transition"
          > 
            Cancel
          </button>
          <button
            onclick="addItemBtn()"
            class="flex-1 bg-[#36E27B] text-black font-bold rounded-lg py-2 hover:bg-black hover:text-white transition"
          >
            Add Item
          </button>
        </div>
        `;

  addItemPopup.appendChild(div);
  addItemPopup.style.display = "flex";
}

function closeAddNewItem() {
  addItemPopup.style.display = "none";
}

async function addItemBtn() {
  const itemName = document.getElementById("itemName").value;
  const itemPrice = document.getElementById("itemPrice").value;
  const itemCategory = document.getElementById("itemCategory").value;
  const itemImage = document.getElementById("itemImage").files[0];



  if (!itemName || !itemPrice || !itemCategory || !itemImage) {
    alert("Please fill in all fields and select an image.");
    return;
  } else {

    
  let imageBase64 = await fileToBase64(itemImage);

    let newProduct = {
      title: itemName,
      price: itemPrice,
      category: itemCategory,
      images: [imageBase64],
    };

    add(newProduct);
    closeAddNewItem();
  }
}

async function editItem(productId) {
  const data = products.find((p) => p.id === productId);

  editItemPopup.innerHTML = "";

  let div = document.createElement("div");
  div.className =
    "bg-white border border-white/10 rounded-xl w-[90%] max-w-md p-6";

  div.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-black">Edit Item</h2>
      <button class="cursor-pointer" onclick="closeEditItem()">
        <img
          src="assets/svg/x.svg"
          alt="x_icon"
          class="w-6 h-6"
        />
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm text-black/70 mb-1">Item Name</label>
        <input
          id="itemName"
          type="text"
          placeholder="e.g. Powder Canister"
          class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
        />
      </div>
      <div>
        <label class="block text-sm text-black/70 mb-1">Price (LKR)</label>
        <input
          id="itemPrice"
          type="number"
          placeholder="e.g. 20.99"
          class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
        />
      </div>
      <div>
        <label class="block text-sm text-black/70 mb-1">Category</label>
        <input
          id="itemCategory"
          type="text"
          placeholder="e.g. Cleaning Supplies"
          class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
        />
      </div>
      <div>
        <label class="block text-sm text-black/70 mb-1">Brand</label>
        <input
          id="itemBrand"
          type="text"
          placeholder="e.g. CleanWash"
          class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
        />
      </div>
      <div>
        <label class="block text-sm text-black/70 mb-1">Stock</label>
        <input
          id="itemStock"
          type="number"
          placeholder="e.g. 15"
          class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
        />
      </div>
      <div>
        <label class="block text-sm text-black/70 mb-1">Description</label>
        <input
          id="itemDescription"
          type="text"
          placeholder="e.g. A powerful cleaning powder"
          class="w-full bg-transparent border border-black/20 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-[#36E27B]"
        />
      </div>
    </div>
    <div class="flex mt-6">
      <button
        onclick="editItemBtn(${data.id})"
        class="flex-1 bg-[#36E27B] text-black font-bold rounded-lg py-2 hover:bg-black hover:text-white transition"
      >
        Edit Item
      </button>
    </div>
  </div>
    `;
  editItemPopup.appendChild(div);
  editItemPopup.style.display = "flex";

  const itemName = document.getElementById("itemName").value= data.title;
  const itemPrice = document.getElementById("itemPrice").value=data.price;
  const itemCategory = document.getElementById("itemCategory").value=data.category;
  const itemBrand = document.getElementById("itemBrand").value=data.brand;
  const itemStock = document.getElementById("itemStock").value=data.stock;
  const itemDescription = document.getElementById("itemDescription").value=data.description;
}

function closeEditItem() {
  editItemPopup.style.display = "none";
}

function editItemBtn(productId) {
  const itemName = document.getElementById("itemName");
  const itemPrice = document.getElementById("itemPrice");

  if (!itemName || !itemPrice) {
    alert("Please fill in all fields.");
    return;
  } else {
    let editedProduct = {
      title: itemName.value,
      price: itemPrice.value,
    };

    edit(productId, editedProduct);
    closeEditItem();
  }
}


function add(product){
  product.id=products.length ?  products[products.length -1].id +1 : 1;
  products.push(product);
  localStorage.setItem('inventory', JSON.stringify(products));
  alert("Item added successfully!");
  renderInventory();
}

function edit(productId, updatedProduct){
  const index = products.findIndex(p => p.id === productId);
  if(index>-1){
    products[index]={...products[index],...updatedProduct}
    localStorage.setItem('inventory', JSON.stringify(products));
    alert("Item updated successfully!");
    renderInventory();
  }
}

function deleteItem(productId){
  products=products.filter(p => p.id !== productId);
  localStorage.setItem('inventory', JSON.stringify(products));
  alert("Item deleted successfully!");
  renderInventory();
}


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
