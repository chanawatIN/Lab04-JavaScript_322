document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.querySelector(".nav-profile-cart");
    const cartCount = document.querySelector(".cartcon");
    const productItems = document.querySelectorAll(".product-items");
    const modalBg = document.querySelector(".modal-bg");
    const closeModalButtons = document.querySelectorAll(".btn-control .btn");
    const addToCartButtons = document.querySelectorAll(".btn-buy");
  
    let cart = [];
  
    cartButton.addEventListener("click", () => {
      modalBg.classList.add("active");
    });
  
    closeModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modalBg.classList.remove("active");
      });
    });
  
    addToCartButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const product = productItems[index];
        const productName = product.querySelector("p:first-child").textContent;
        const productPrice = parseInt(
          product.querySelector("p:last-child").textContent
        );
  
        const existingItem = cart.find((item) => item.name === productName);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
  
        updateCartUI();
      });
    });
  
    function updateCartUI() {
      let total = 0;
      cartCount.textContent = cart.length;
  
      const cartlist = document.querySelector(".cartlist");
      cartlist.innerHTML = "";
  
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("classlist-items");
        cartItem.innerHTML = `
          <div class="cartlist-left">
            <img src="${productImages[item.name]}" alt="">
            <div class="cartlist-detail">
              <p style="font-size: 1.5vw;">${item.name}</p>
              <p style="font-size: 1.2vw;">${item.price} THB</p>
            </div>
          </div>
          <div class="cartlist-right">
            <p class="btnc" onclick="updateCartItemQuantity(${item.quantity - 1}, ${cart.indexOf(item)})">-</p>
            <p style="margin: 0 20px;">${item.quantity}</p>
            <p class="btnc" onclick="updateCartItemQuantity(${item.quantity + 1}, ${cart.indexOf(item)})">+</p>
          </div>
        `;
        cartlist.appendChild(cartItem);
        total += item.price * item.quantity;
      });
  
      const totalSpan = document.querySelector(".btn-control .btn-buy");
      totalSpan.textContent = `Buy ($${total})`;
    }
  });
  
  function updateCartItemQuantity(newQuantity, index) {
    if (newQuantity >= 1) {
      cart[index].quantity = newQuantity;
      updateCartUI();
    }
  }
  
  const productImages = {
    "product name": "https://images.unsplash.com/photo-1525092029632-cb75fe5dd776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    // Add more product images and names here
  };

  
  