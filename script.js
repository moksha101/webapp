// بيانات المنتجات
const products = [
    { id: 1, name: "طماطم", price: 200, description: "افضل واجود انواع الخضراوات", images: ["pic/طماطم.png", "pic/طماطم.png"], category: "خضراوات" },
    { id: 2, name: "فلفل", price: 50, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "خضراوات" },
    { id: 3, name: "بطاطس", price: 5, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "خضراوات" },
    { id: 4, name: "تفاح", price: 20, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "فواكهه" },
    { id: 5, name: "موز", price: 30, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "جديد" },
    { id: 6, name: "بطيخ", price: 40, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "عروض حصرية" },
    { id: 7, name: "خيار", price: 50, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "جديد" },
    { id: 8, name: "جزر", price: 60, description: "افضل واجود انواع الخضراوات", images: ["pic/بطيخ.png", "pic/بطيخ.png"], category: "جديد" },
  ];
  
// البحث الديناميكي
document.getElementById("search-box").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
  });
  
  const categories = document.getElementById("categories");

  let isDown = false;
  let startX;
  let scrollLeft;
  
  // بدء السحب
  categories.addEventListener("mousedown", (e) => {
    isDown = true;
    categories.classList.add("active");
    startX = e.pageX - categories.offsetLeft;
    scrollLeft = categories.scrollLeft;
  });
  
  // إيقاف السحب
  categories.addEventListener("mouseleave", () => {
    isDown = false;
    categories.classList.remove("active");
  });
  
  categories.addEventListener("mouseup", () => {
    isDown = false;
    categories.classList.remove("active");
  });
  
  // أثناء السحب
  categories.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - categories.offsetLeft;
    const walk = (x - startX) * 2; // التحكم في سرعة السحب
    categories.scrollLeft = scrollLeft - walk;
  });
  

// منع الزوم
  document.addEventListener("wheel", function(e) {
    if (e.ctrlKey) {
      e.preventDefault(); // منع الزوم عند التمرير مع الضغط على مفتاح Ctrl
    }
  }, { passive: false });
  




  // عرض المنتجات بناءً على قائمة محددة
  const displayProducts = (filteredProducts) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p class='text-center'>لا توجد منتجات تطابق البحث.</p>";
        return;
    }

    filteredProducts.forEach((product) => {
        const cartItem = cart.find(item => item.id === product.id);
        const productCount = cartItem ? cartItem.quantity : 0;
        const productCard = `
            <div class="col-6 position-relative">
        <div class="card" onclick="viewProduct(${product.id})" style="cursor: pointer;">
          <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
          <span class="badge-circle" data-id="${product.id}" style="display: ${productCount > 0 ? 'block' : 'none'};">${productCount}</span>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">السعر: ${product.price} جنيه</p>
          </div>
        </div>
      </div>
        `;
        productList.innerHTML += productCard;
    });
     // تحديث شارات العدد بعد عرض المنتجات
     updateCartCount();
};



// تصفية المنتجات حسب التصنيف
//const filterByCategory = (category) => {
   // const filteredProducts = products.filter((product) => product.category === category);
  //  displayProducts(filteredProducts);
//  };
  






  const filterByCategory = (category) => {
    const filteredProducts = category ? products.filter((product) => product.category === category) : products;
    displayProducts(filteredProducts);
};



  // السلة
  let cart = [];
  
  // تحميل المنتجات
  const loadProducts = (filter = "") => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    const filteredProducts = filter
      ? products.filter((product) => product.category === filter)
      : products;
  
    filteredProducts.forEach((product) => {
      const imageUrl = product.images && product.images[0] ? product.images[0] : 'placeholder.jpg';
      const productCard = `
        <div class="col-6">
          <div class="card">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">السعر: ${product.price} جنيه</p>
              <button class="btn btn-primary" onclick="viewProduct(${product.id})">عرض</button>
            </div>
          </div>
        </div>
      `;
      productList.innerHTML += productCard;
    });
  };
  


  // عرض تفاصيل المنتج
  const viewProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById("product-title").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = product.price;
        document.getElementById("product-quantity").value = 1;

        // عرض الصور في Carousel
        const imagesContainer = document.getElementById("product-images");
        imagesContainer.innerHTML = "";
        product.images.forEach((image, index) => {
            const activeClass = index === 0 ? "active" : "";
            imagesContainer.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${image}" class="d-block w-100" alt="${product.name}">
                </div>
            `;
        });
        
        const addToCartButton = document.getElementById("add-to-cart");
        addToCartButton.onclick = () => addToCart(product);

        const modal = new bootstrap.Modal(document.getElementById("product-modal"));
        modal.show();
    }
};


// اضافة دالة جديدة لحساب الاجمالي
const updateCartTotal = () => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0); // مجموع الأسعار
  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `إجمالي السعر: ${total.toFixed(2)} جنيه`;
};



// تعديل دالة `addToCart` لحفظ السلة
const addToCart = (product) => {
  const quantity = parseInt(document.getElementById("product-quantity").value);
  const cartItem = cart.find(item => item.id === product.id);
  if (cartItem) {
      cartItem.quantity += quantity;
  } else {
      cart.push({ ...product, quantity });
  }
  updateCartCount();
  updateCartTotal(); // تحديث الإجمالي
  saveCart();


// تحديث الـ Badge الخاصة بالمنتج
const badge = document.querySelector(`.badge-circle[data-id="${product.id}"]`);
if (badge) {
  badge.textContent = cart.find(item => item.id === product.id).quantity;
  badge.style.display = "block"; // إظهار الـ Badge
}

  // استبدال زر الإضافة إلى السلة بأزرار الزيادة والنقصان
  const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
  if (productCard) {
      const addToCartButton = productCard.querySelector(".btn-add-to-cart");
      const quantityControls = productCard.querySelector(".quantity-controls");
      addToCartButton.style.display = "none";
      quantityControls.style.display = "flex";
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById("product-modal"));
  modal.hide();
};

  // تحديث عداد السلة
  const updateCartCount = () => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
  };

// تحديث شارة عدد المنتجات لكل منتج
cart.forEach((item) => {
  const badge = document.querySelector(`.badge-circle[data-id='${item.id}']`);
  if (badge) {
      badge.textContent = item.quantity;
      badge.style.display = item.quantity > 0 ? "block" : "none";
  }
});

  // إضافة حدث للزيادة والنقصان
document.getElementById("increase-quantity").addEventListener("click", () => {
    const quantityInput = document.getElementById("product-quantity");
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = ++quantity;
  });
  
  document.getElementById("decrease-quantity").addEventListener("click", () => {
    const quantityInput = document.getElementById("product-quantity");
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = --quantity;
    }
  });
  


  // تحميل البيانات عند بدء التشغيل
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
  });



// عرض صفحة عربة التسوق
  const showCartPage = () => {
    document.getElementById("cart-page").style.display = "block";
    document.getElementById("checkout-page").style.display = "none";
    document.getElementById("product-list").style.display = "none";

  // إخفاء مربع البحث وقائمة التصنيفات
  document.getElementById("search-box").classList.add("hidden");
  const searchIcon = document.getElementById("search-icon");
  if (searchIcon) {
    searchIcon.classList.add("hidden");
  }
  document.getElementById("categories").classList.add("hidden");

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='text-center'>السلة فارغة.</p>";
        return;
    }

    cart.forEach((item) => {
        const cartItem = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <img src="${item.images[0]}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h5>${item.name}</h5>
                    <p>السعر: ${item.price} × ${item.quantity} = ${item.price * item.quantity} جنيه</p>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-secondary btn-sm" onclick="decreaseCartItem(${item.id})">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-secondary btn-sm" onclick="increaseCartItem(${item.id})">+</button>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">حذف</button>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });
};

const increaseCartItem = (id) => {
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
      cartItem.quantity += 1;
      updateCartCount();
      saveCart();
      showCartPage();
  }
};

const decreaseCartItem = (id) => {
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
          removeFromCart(id); // حذف المنتج إذا أصبحت الكمية 0
      } else {
          updateCartCount();
          saveCart();
          showCartPage();
      }
  }
};

  // حذف منتج من السلة
  const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    updateCartCount();




    if (cart.length === 0) {
      // إذا كانت السلة فارغة
      const confirmEmpty = confirm("هل أنت متأكد أنك تريد إفراغ السلة؟");
      if (!confirmEmpty) {
        // إرجاع السلة إذا ضغط المستخدم على "إلغاء"
        cart.push({ id, name, price, quantity }); // يمكنك استخدام بيانات المنتج الأصلية هنا لإعادتها
        updateCartCount();
        return;
      }
    }

    saveCart(); // حفظ السلة بعد التعديل
    showCartPage();
  };
  // عرض صفحة إتمام الطلب
const showCheckoutPage = () => {
    document.getElementById("checkout-page").style.display = "block";
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("product-list").style.display = "none";
 
  // إخفاء مربع البحث وقائمة التصنيفات
  document.getElementById("search-box").classList.add("hidden");
  const searchIcon = document.getElementById("search-icon");
  if (searchIcon) {
    searchIcon.classList.add("hidden");
  }
  document.getElementById("categories").classList.add("hidden");

    const checkoutSummary = document.getElementById("checkout-summary");
    checkoutSummary.innerHTML = "";

    cart.forEach((item) => {
      const summaryItem = `
          <div class="checkout-item">
              <img src="${item.images[0]}" alt="${item.name}">
              <div>
                  <h6>${item.name}</h6>
                  <p>الكمية: ${item.quantity}</p>
              </div>
              <p>${item.price * item.quantity} جنيه</p>
          </div>
      `;
      checkoutSummary.innerHTML += summaryItem;
  });
};
  
  // معالجة بيانات الطلب
  document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
  
    alert(`تم إرسال الطلب بنجاح!\n\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${address}`);
    cart = []; // إفراغ السلة
    updateCartCount();
    saveCart(); // حفظ السلة الفارغة في localStorage
    goBack(); // العودة إلى الصفحة الرئيسية
  });
// العودة إلى الصفحة الرئيسية
  const goBack = () => {
    document.getElementById("product-list").style.display = "block";
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("checkout-page").style.display = "none";
// إعادة إظهار مربع البحث وأيقونة البحث وقائمة التصنيفات
document.getElementById("search-box").classList.remove("hidden");
const searchIcon = document.getElementById("search-icon");
if (searchIcon) {
  searchIcon.classList.remove("hidden");
}
document.getElementById("categories").classList.remove("hidden");

    updateCartCount();
    displayProducts(products); // تحديث عرض المنتجات بدون إعادة تحميل الصفحة
    location.reload();
};

// حفظ السلة في localStorage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// تحميل السلة من localStorage
const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  cart = savedCart ? JSON.parse(savedCart) : [];
  updateCartCount();
  updateCartTotal(); // تحديث الإجمالي بعد تحميل السلة
  displayProducts(products); // إعادة عرض المنتجات لتحديث شارة العدد
};

// تحميل السلة عند بدء التشغيل
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});


function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
if (isMobileDevice()) {
  // منع تحديد النصوص
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });

  // منع النسخ
  document.addEventListener('copy', function (e) {
    e.preventDefault();
    alert("عذرًا، النسخ غير مسموح على الأجهزة المحمولة.");
  });

  // منع الضغط الطويل لتحديد النصوص أو عرض القائمة
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // تعطيل التحديد عبر اللمس
  document.addEventListener('touchstart', function (e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });
}
