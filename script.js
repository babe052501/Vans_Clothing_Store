document.addEventListener('DOMContentLoaded', () => {
  // Load cart count and items from localStorage
  let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
  let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// Update cart counter on page load
 updateCartCounter();
if (document.getElementById('cart-items')) {
  renderCartItems();
}

// Toggle mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.getElementById('nav-toggle');

hamburger.addEventListener('click', toggleMenu);

// Accessibility: Allow Enter or Space key to toggle menu
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
}
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
    closeMenu();
  }
});

function toggleMenu() {
  navMenu.classList.toggle('active');
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  navToggle.checked = !navToggle.checked;
}

function closeMenu() {
  navMenu.classList.remove('active');
  mobileMenu.style.display = 'none';
  navToggle.checked = false;
}

function addToCart(productName, price, imageSrc) {
  // Load existing cart items
  cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

  // Check if the product already exists in the cart
  const existingItem = cartItems.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity
  } else {
    // Add new item to cart
    cartItems.push({
      name: productName,
      price: price,
      image: imageSrc,
     quantity: 1
    });
  }

  // Update cart count
  cartCount++;
  localStorage.setItem('cartCount', cartCount);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

 updateCartCounter();
  alert(`${productName} added to cart! Total items: ${cartCount}. Redirecting to cart...`);
  setTimeout(() => {
    window.location.href = 'cart.html';
    }, 1000);
  }

function removeFromCart(index) {
  // Decrease quantity or remove item
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    cartCount--;
  } else {
    cartCount -= cartItems[index].quantity;
    cartItems.splice(index, 1); // Remove item
  }

  // Prevent negative count
  if (cartCount < 0) cartCount = 0;

  // Save updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartCount', cartCount);

  // Re-render cart and update counter
  updateCartCounter();
  renderCartItems();
  alert('Item removed from cart!');
}

function updateCartCounter() {
  const cartCounter = document.querySelector('.cart-counter');
  if (cartCounter) {
    cartCounter.setAttribute('data-count', cartCount);
    cartCounter.classList.toggle('has-items', cartCount > 0);
  }
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = ''; // Clear existing items

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElement.textContent = '0.00';
    return;
  }

  let total = 0;
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="BWP{item.image}" alt="BWP{item.name}" style="width: 100px;">
        <div>
          <h3>${item.name}</h3>
          <p>Price: BWPBWP{item.price.toFixed(2)}</p>
          <p>Quantity: BWP{item.quantity}</p>
          <p>Subtotal: BWPBWP{itemTotal.toFixed(2)}</p>
        </div>
        <button onclick="removeFromCart(BWP{index})">Remove</button>
      `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = total.toFixed(2);
}

function placeOrder() {
  if (cartItems.length === 0) {
    alert('Your cart is empty. Add items before checking out.');
    return;
  }
  alert('Order placed successfully! You will be redirected to the homepage to shop for more.');
  // Clear cart
  cartItems = [];
  cartCount = 0;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartCount', cartCount);
  updateCartCounter();
  renderCartItems();
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[name="name"]')?.value.trim();
  const email = form.querySelector('input[name="email"]')?.value.trim();
  const message = form.querySelector('textarea[name="message"]')?.value.trim();
  const inputs = form.querySelectorAll('input, textarea');

  // Reset error states
  inputs.forEach(input => input.classList.remove('error'));

  // Basic validation
  let hasError = false;
  if (!name) {
    form.querySelector('input[name="name"]').classList.add('error');
    hasError = true;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    form.querySelector('input[name="email"]').classList.add('error');
    hasError = true;
  }
  if (!message) {
    form.querySelector('textarea[name="message"]').classList.add('error');
    hasError = true;
  }

  if (!hasError) {
    alert('Form submitted successfully! (.)');
    form.reset();
  } else {
    alert('Please fill out all fields correctly.');
  }
}

function signUpAndRedirect() {
  alert('Sign-up successful! You will be redirected to the homepage.');
  window.location.href = 'index.html';
}

function submitFeedback() {
  alert('Thank you for your feedback!');
}

// Expose functions to global scope for HTML onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.placeOrder = placeOrder;
window.handleSubmit = handleSubmit;
window.signUpAndRedirect = signUpAndRedirect;
window.submitFeedback = submitFeedback;
});
function submitFeedback() {
  alert('Thank you for your feedback!');
  window.location.href = 'index.html';
}

function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  navMenu.classList.toggle('active');
  navToggle.checked = !navToggle.checked;
}

function closeMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  navMenu.classList.remove('active');
  navToggle.checked = false;
}

// Accessibility: Allow Enter key to toggle menu
document.querySelector('.hamburger').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
    closeMenu();
  }
});
function submit() {
  alert('Thank you for contacting us a short message will be sent to your email!');
  window.location.href = 'index.html';
}  
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  navMenu.classList.toggle('active');
  navToggle.checked = !navToggle.checked;
}

function closeMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  navMenu.classList.remove('active');
  navToggle.checked = false;
}

    
// Accessibility: Allow Enter key to toggle menu
document.querySelector('.hamburger').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
    closeMenu();
  }
});
function placeOrder() {
  alert('Order placed successfully! You will be redirected to the homepage and shop for more.');
  window.location.href = 'index.html';
}

function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  navMenu.classList.toggle('active');
  navToggle.checked = !navToggle.checked;
}

function closeMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  navMenu.classList.remove('active');
  navToggle.checked = false;
}

// Accessibility: Allow Enter key to toggle menu
document.querySelector('.hamburger').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
    closeMenu();
  }
});
// Load cart count and items from localStorage
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    // Update cart counter on page load
    updateCartCounter();
    renderCartItems();

    function toggleMenu() {
      const navMenu = document.querySelector('.nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      navMenu.classList.toggle('active');
      navToggle.checked = !navToggle.checked;
    }

    function closeMenu() {
      const navMenu = document.querySelector('.nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      navMenu.classList.remove('active');
      navToggle.checked = false;
    }

    function updateCartCounter() {
      const cartCounter = document.querySelector('.cart-counter');
      cartCounter.setAttribute('data-count', cartCount);
      if (cartCount > 0) {
        cartCounter.classList.add('has-items');
      } else {
        cartCounter.classList.remove('has-items');
      }
    }

    function renderCartItems() {
      const cartItemsContainer = document.getElementById('cartItems');
      const cartTotalElement = document.getElementById('cartTotal');
      cartItemsContainer.innerHTML = ''; // Clear existing items

      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = 'Total: BWP0.00';
        return;
      }

      let total = 0;
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="BWP{item.image}" alt="BWP{item.name}">
          <div>
            <h3>BWP{item.name}</h3>
            <p>Price: BWPBWP{item.price.toFixed(2)}</p>
            <p>Quantity: BWP{item.quantity}</p>
          </div>
          <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      cartTotalElement.textContent = `Total: BWP{total.toFixed(2)}`;
    }

    function removeFromCart(index) {
      // Decrease quantity or remove item
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
      } else {
        cartItems.splice(index, 1); // Remove item if quantity is 1
      }

      // Update cart count
      cartCount--;
      if (cartCount < 0) cartCount = 0; // Prevent negative count

      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartCount', cartCount);

      // Re-render cart and update counter
      updateCartCounter();
      renderCartItems();
      alert('Item removed from cart!');
    }

    // Accessibility: Allow Enter key to toggle menu
    document.querySelector('.hamburger').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const navMenu = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
