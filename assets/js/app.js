console.log("js loaded!");

const InventoryMenu = document.getElementById("InventoryMenu");


fetchInventoryData();

async function fetchInventoryData() {
  const response = await fetch("https://dummyjson.com/products?limit=10");
  const data = await response.json();
  console.log(data);

  InventoryMenu.innerHTML = "";

  data.products.forEach((product) => {
    let div = document.createElement("div");
    div.className =
      "bg-white rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl";

    div.innerHTML = `
        <div
              class="relative w-full h-48 md:h-56 lg:h-80 rounded-lg overflow-hidden"
            >
              <img
                src="${product.images[0]}"
                alt="${product.name}"
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

  });
}
