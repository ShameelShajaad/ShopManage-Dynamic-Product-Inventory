# 🛒 ShopManage – Inventory Management System

A modern **Inventory Management System** built using **HTML, Tailwind CSS, and Vanilla JavaScript**.  
This project demonstrates client-side CRUD operations with **API integration**, **LocalStorage persistence**, and a clean responsive UI.

---

## 🚀 Project Overview

**ShopManage** allows users to manage product inventory efficiently.  
On first load, products are fetched from the **DummyJSON API**, stored locally, and then fully managed using **LocalStorage** — ensuring data persists even after page refresh.

---

## ✨ Features

- 📥 Fetch products from **DummyJSON API**
- 💾 Store inventory in **LocalStorage**
- ➕ Add new products (with image upload)
- ✏️ Edit existing products
- 🗑️ Delete products
- 👁️ View product details in a modal
- 🌀 Full-screen loading spinner during API fetch
- 📱 Fully responsive UI (Tailwind CSS)
- ⚡ No frameworks – Pure JavaScript

---

## 🛠️ Technologies Used

- **HTML5**
- **Tailwind CSS (CDN)**
- **JavaScript (ES6+)**
- **DummyJSON API**
- **LocalStorage API**

---

## 📂 Project Structure

```bash
inventory-management/
│
├── assets/
│   ├── css/
│   ├── images/
│   ├── js/
│   │   └── app.js
│   └── svg/
│
├── index.html
├── README.md

```


---

## 🔄 How Data Persistence Works

1. **First Load**
   - Fetches products from DummyJSON API
   - Normalizes product data
   - Saves it to LocalStorage

2. **Subsequent Loads**
   - Loads data directly from LocalStorage
   - No API call required

3. **CRUD Operations**
   - Add / Edit / Delete update LocalStorage instantly
   - UI re-renders dynamically

---

## 🌀 Loading Screen

- A full-screen circular spinner appears while fetching API data
- Automatically hides once data is loaded
- Improves user experience and prevents blank screens

---

## 🖼️ Image Handling

- Images uploaded by the user are converted to **Base64**
- Stored inside LocalStorage
- Ensures images persist after refresh (client-side only)

---

## 🧪 How to Run the Project

1. Clone the repository:
```bash
git clone https://github.com/ShameelShajaad/ShopManage-Dynamic-Product-Inventory.git
```
2. Open the project folder
3. Run using Live Server (recommended)

## ⚠️ Important Notes

- This project uses LocalStorage, not a backend database
- DummyJSON API is used only for initial data
- Image storage is client-side (Base64)
- Best suited for learning and demonstration purposes

## 👨‍💻 Author

- Shameel Shajaad
- Diploma in Software Engineering – ICET Institute

- GitHub: [ShameelShajaad](https://github.com/ShameelShajaad)
- LinkedIn: [Shameel Shajaad](https://www.linkedin.com/in/shameel-shajaad)
