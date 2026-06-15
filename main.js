AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

/* NAVBAR SCROLL & ACTIVE LINK  */
window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('btt').classList.toggle('show', window.scrollY > 300);
    document.querySelectorAll('section[id]').forEach(function(sec) {
        var top = sec.offsetTop - 110,
            bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) {
            document.querySelectorAll('.nav-link').forEach(function(l) {
                l.classList.remove('active');
            });
            var lnk = document.querySelector('.nav-link[href="#' + sec.id + '"]');
            if (lnk) lnk.classList.add('active');
        }
    });
});

/*  SMOOTH SCROLL + MOBILE NAV CLOSE  */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            // Close Bootstrap mobile navbar if open
            var navCollapse = document.getElementById('navmenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navCollapse.classList.remove('show');
                }
            }
            // Scroll after slight delay to let navbar close
            setTimeout(function() {
                window.scrollTo({
                    top: t.offsetTop - 78,
                    behavior: 'smooth'
                });
            }, 50);
        }
    });
});


var searchOv = document.getElementById('searchOv');

document.getElementById('navSearchBtn').addEventListener('click', function() {
    searchOv.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
        document.getElementById('searchInput').focus();
    }, 220);
});

document.getElementById('searchClose').addEventListener('click', closeSearch);

// Close when clicking backdrop
searchOv.addEventListener('click', function(e) {
    if (e.target === searchOv) closeSearch();
});

function closeSearch() {
    searchOv.classList.remove('open');
    document.body.style.overflow = '';
}

// Category buttons inside search box
document.querySelectorAll('.sovcat').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.sovcat').forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        var f = this.getAttribute('data-cat');
        closeSearch();
        setTimeout(function() {
            filterMenu(f);
            document.getElementById('menu').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    });
});

// Trending tags fill the search input
document.querySelectorAll('.sovtrend .ttag').forEach(function(t) {
    t.addEventListener('click', function() {
        document.getElementById('searchInput').value = this.textContent.trim();
        document.getElementById('searchInput').focus();
    });
});


$(document).ready(function() {
	$('.magnific_popup').magnificPopup({
	  disableOn: 700,
	  type: 'iframe',
	  mainClass: 'mfp-fade',
	  removalDelay: 160,
	  preloader: false,
	  fixedContentPos: false,
	  disableOn: 300
	});	
});


function filterMenu(cat) {
    // sync filter buttons
    document.querySelectorAll('.filtbtn').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-f') === cat);
    });
    // sync category cards
    document.querySelectorAll('.catcard').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === cat);
    });
    // show/hide menu cards
    document.querySelectorAll('.mwrap').forEach(function(w) {
        var c = w.getAttribute('data-c');
        if (cat === 'all' || c === cat) {
            w.classList.remove('gone');
            w.style.opacity = '0';
            w.style.transform = 'translateY(16px)';
            setTimeout(function() {
                w.style.transition = 'opacity .38s,transform .38s';
                w.style.opacity = '1';
                w.style.transform = 'translateY(0)';
            }, 60);
        } else {
            w.classList.add('gone');
        }
    });
}

// Filter buttons
document.querySelectorAll('.filtbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterMenu(this.getAttribute('data-f'));
    });
});

// Category section cards â†’ scroll + filter
document.querySelectorAll('.catcard').forEach(function(card) {
    card.addEventListener('click', function() {
        var f = this.getAttribute('data-filter');
        window.scrollTo({
            top: document.getElementById('menu').offsetTop - 80,
            behavior: 'smooth'
        });
        setTimeout(function() {
            filterMenu(f);
        }, 480);
    });
});


var menuPop = document.getElementById('menuPop');
var mpQty = 1;

function openMenuPop(card) {
    var img = card.getAttribute('data-img');
    var title = card.getAttribute('data-title');
    var cat = card.getAttribute('data-cat');
    var price = card.getAttribute('data-price');
    var old = card.getAttribute('data-old');
    var rating = parseFloat(card.getAttribute('data-rating'));
    var reviews = card.getAttribute('data-reviews');
    var cal = card.getAttribute('data-cal');
    var time = card.getAttribute('data-time');
    var desc = card.getAttribute('data-desc');
    var tags = card.getAttribute('data-tags') || '';

    document.getElementById('mpImg').setAttribute('src', img);
    document.getElementById('mpCat').textContent = cat;
    document.getElementById('mpTitle').textContent = title;

    var full = Math.round(rating),
        empty = 5 - full;
    document.getElementById('mpStars').innerHTML =
        '<i class="fas fa-star"></i>'.repeat(full) + 'â˜†'.repeat(empty) +
        ' <span style="color:#bbb;font-size:.78rem;">' + rating + ' (' + reviews + ' reviews)</span>';

    document.getElementById('mpDesc').textContent = desc;

    document.getElementById('mpPrice').innerHTML =
        price + (old ? '<small style="color:#ccc;text-decoration:line-through;margin-left:8px;font-size:1rem;">' + old + '</small>' : '');

    document.getElementById('mpMeta').innerHTML =
        '<div class="mpm"><div class="mpmv">' + cal + ' kcal</div><div class="mpml">Calories</div></div>' +
        '<div class="mpm"><div class="mpmv">' + time + ' min</div><div class="mpml">Prep Time</div></div>' +
        '<div class="mpm"><div class="mpmv">' + rating + '/5</div><div class="mpml">Rating</div></div>';

    document.getElementById('mpTags').innerHTML =
        tags.split(',').filter(Boolean).map(function(t) {
            return '<span class="mptag">' + t.trim() + '</span>';
        }).join('');

    mpQty = 1;
    document.getElementById('mpQnum').textContent = 1;
    document.getElementById('mpAddCart').innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    document.getElementById('mpAddCart').style.background = '';

    menuPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Card click open popup
document.querySelectorAll('.mcard').forEach(function(card) {
    card.addEventListener('click', function() {
        openMenuPop(this);
    });
});

// + button  open popup (stop propagation to avoid double firing)
document.querySelectorAll('.madd').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        openMenuPop(this.closest('.mcard'));
    });
});

// Heart toggle (no popup)
document.querySelectorAll('.mhrt').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var ico = this.querySelector('i');
        ico.classList.toggle('far');
        ico.classList.toggle('fas');
        this.style.color = ico.classList.contains('fas') ? 'var(--primary)' : '#ccc';
    });
});

// Close popup
document.getElementById('mpClose').addEventListener('click', closeMenuPop);
menuPop.addEventListener('click', function(e) {
    if (e.target === this) closeMenuPop();
});

function closeMenuPop() {
    menuPop.classList.remove('open');
    document.body.style.overflow = '';
}

// Qty +/-
document.getElementById('mpPlus').addEventListener('click', function() {
    document.getElementById('mpQnum').textContent = ++mpQty;
});
document.getElementById('mpMinus').addEventListener('click', function() {
    if (mpQty > 1) document.getElementById('mpQnum').textContent = --mpQty;
});

// ====== SHOPPING CART LOGIC ======
var cartItems = [];
var cartSidebarOv = document.getElementById('cartSidebarOv');

document.getElementById('cartBtn').addEventListener('click', function() {
    cartSidebarOv.classList.add('open');
    document.body.style.overflow = 'hidden';
});

document.getElementById('csClose').addEventListener('click', closeCartSidebar);
cartSidebarOv.addEventListener('click', function(e) {
    if (e.target === this) closeCartSidebar();
});

function closeCartSidebar() {
    cartSidebarOv.classList.remove('open');
    document.body.style.overflow = '';
}

// Make these global so they can be called from onclick attributes
window.updateCartQty = function(index, delta) {
    cartItems[index].qty += delta;
    if (cartItems[index].qty <= 0) {
        cartItems.splice(index, 1);
    }
    renderCart();
};

window.removeFromCart = function(index) {
    cartItems.splice(index, 1);
    renderCart();
};

function renderCart() {
    var cartItemsList = document.getElementById('cartItemsList');
    var cartTotal = document.getElementById('cartTotal');
    var cartCount = document.getElementById('cartCount');
    
    if (cartItems.length === 0) {
        cartItemsList.innerHTML = '<div class="cs-empty">Your cart is empty.</div>';
        cartTotal.textContent = '$0.00';
        cartCount.textContent = '0';
        return;
    }
    
    var html = '';
    var totalAmount = 0;
    var totalCount = 0;
    
    cartItems.forEach(function(item, index) {
        var itemTotal = item.price * item.qty;
        totalAmount += itemTotal;
        totalCount += item.qty;
        
        html += '<div class="cs-item">';
        html += '<img src="' + item.img + '" class="cs-item-img" alt=""/>';
        html += '<div class="cs-item-details">';
        html += '<div class="cs-item-title">' + item.title + '</div>';
        html += '<div class="cs-item-price">$' + item.price.toFixed(2) + '</div>';
        html += '<div class="cs-item-actions">';
        html += '<button class="cs-qty-btn" onclick="updateCartQty(' + index + ', -1)">-</button>';
        html += '<span class="cs-qty-val">' + item.qty + '</span>';
        html += '<button class="cs-qty-btn" onclick="updateCartQty(' + index + ', 1)">+</button>';
        html += '</div></div>';
        html += '<button class="cs-item-remove" onclick="removeFromCart(' + index + ')"><i class="fas fa-trash-alt"></i></button>';
        html += '</div>';
    });
    
    cartItemsList.innerHTML = html;
    cartTotal.textContent = '$' + totalAmount.toFixed(2);
    cartCount.textContent = totalCount;
}

// Add to cart button
document.getElementById('mpAddCart').addEventListener('click', function() {
    // Get product details from popup
    var title = document.getElementById('mpTitle').textContent;
    var priceText = document.getElementById('mpPrice').innerHTML;
    // Price text might contain `<small>` if there's an old price, extract the first dollar amount
    var priceMatch = priceText.match(/\$([0-9\.]+)/);
    var price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    var img = document.getElementById('mpImg').getAttribute('src');
    
    // Check if item already exists in cart
    var existingItem = cartItems.find(function(item) {
        return item.title === title;
    });
    
    if (existingItem) {
        existingItem.qty += mpQty;
    } else {
        cartItems.push({
            title: title,
            price: price,
            img: img,
            qty: mpQty
        });
    }
    
    renderCart();
    
    // UI feedback
    this.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
    this.style.background = 'linear-gradient(135deg,var(--green),#1a4a35)';
    var self = this;
    setTimeout(function() {
        closeMenuPop();
        self.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        self.style.background = '';
    }, 1000);
});


document.getElementById('resBtn').addEventListener('click', function() {
    var name = document.getElementById('resName').value.trim();
    var phone = document.getElementById('resPhone').value.trim();
    var email = document.getElementById('resEmail').value.trim();
    var date = document.getElementById('resDate').value;
    
    // Validate inputs
    if (!name || !phone || !email || !date) {
        document.getElementById('resError').style.display = 'block';
        document.getElementById('resError').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
        return;
    }
    
    document.getElementById('resError').style.display = 'none';
    
    var btn = this;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Reservation';
        btn.disabled = false;
        
        // Hide success banner if already shown
        document.getElementById('resOk').style.display = 'none';
        
        // Trigger reservation payment flow
        isReservationFlow = true;
        
        // Open payment options modal directly
        paymentPop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }, 800);
});


document.getElementById('ctcBtn').addEventListener('click', function() {
    var btn = this;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        var ok = document.getElementById('ctcOk');
        ok.style.display = 'block';
        ok.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }, 1500);
});


var galPop = document.getElementById('galPop');
var galData = [];
var galIdx = 0;

document.querySelectorAll('.gitem').forEach(function(item) {
    galData.push({
        img: item.getAttribute('data-gimg'),
        title: item.getAttribute('data-gtitle'),
        desc: item.getAttribute('data-gdesc')
    });
    item.addEventListener('click', function() {
        openGal(parseInt(this.getAttribute('data-gi')));
    });
});

function openGal(i) {
    galIdx = i;
    var g = galData[i];
    document.getElementById('gpImg').setAttribute('src', g.img);
    document.getElementById('gpTitle').textContent = g.title;
    document.getElementById('gpDesc').innerHTML = g.desc;
    galPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('gpClose').addEventListener('click', closeGal);
galPop.addEventListener('click', function(e) {
    if (e.target === this) closeGal();
});

function closeGal() {
    galPop.classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('gpPrev').addEventListener('click', function() {
    openGal((galIdx - 1 + galData.length) % galData.length);
});
document.getElementById('gpNext').addEventListener('click', function() {
    openGal((galIdx + 1) % galData.length);
});

/*  ESC key closes everything */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        closeMenuPop();
        closeGal();
        if (typeof $.magnificPopup !== 'undefined') $.magnificPopup.close();
    }
});


new Swiper('.tesSwiper', {
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});


var cH = 8,
    cM = 45,
    cS = 30;
setInterval(function() {
    cS--;
    if (cS < 0) {
        cS = 59;
        cM--;
    }
    if (cM < 0) {
        cM = 59;
        cH--;
    }
    if (cH < 0) {
        cH = 8;
        cM = 45;
        cS = 30;
    }
    document.getElementById('cdH').textContent = String(cH).padStart(2, '0');
    document.getElementById('cdM').textContent = String(cM).padStart(2, '0');
    document.getElementById('cdS').textContent = String(cS).padStart(2, '0');
}, 1000);

/* â”€â”€ NEWSLETTER â”€â”€ */
document.getElementById('nlBtn').addEventListener('click', function() {
    var email = document.getElementById('nlEmail').value;
    if (email && email.includes('@')) {
        var btn = this;
        btn.textContent = 'âœ“ Subscribed!';
        btn.style.background = '#4ade80';
        btn.style.color = '#222';
        document.getElementById('nlEmail').value = '';
        setTimeout(function() {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }
});

/*  NUMBER COUNTER ANIMATION*/
var numAnimated = false;
window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    if (!numAnimated && hero && window.scrollY > hero.offsetHeight - 300) {
        numAnimated = true;
        document.querySelectorAll('.snum').forEach(function(el) {
            var txt = el.textContent;
            var num = parseInt(txt);
            var suf = txt.replace(/[0-9]/g, '');
            if (isNaN(num)) return;
            var start = 0;
            var step = Math.ceil(num / 55);
            var iv = setInterval(function() {
                start += step;
                if (start >= num) {
                    start = num;
                    clearInterval(iv);
                }
                el.textContent = start + suf;
            }, 1400 / 55);
        });
    }
});// ====== CHECKOUT & PAYMENT LOGIC ======
var isReservationFlow = false;
var paymentPop = document.getElementById('paymentPop');
var addressPop = document.getElementById('addressPop');

// 1. Checkout button opens Address Form
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    closeCartSidebar();
    addressPop.classList.add('open');
});

// Address Form Close logic
document.getElementById('addrClose').addEventListener('click', function() {
    addressPop.classList.remove('open');
});
addressPop.addEventListener('click', function(e) {
    if (e.target === this) {
        addressPop.classList.remove('open');
    }
});

// 2. Proceed to Payment button
document.getElementById('proceedToPayBtn').addEventListener('click', function() {
    var name = document.getElementById('chName').value.trim();
    var phone = document.getElementById('chPhone').value.trim();
    var address = document.getElementById('chAddress').value.trim();
    
    // Basic validation
    if (!name || !phone || !address) {
        document.getElementById('addrError').style.display = 'block';
        return;
    }
    
    document.getElementById('addrError').style.display = 'none';
    
    // Move to payment options
    addressPop.classList.remove('open');
    paymentPop.classList.add('open');
});

// 3. Payment Modal Close logic
document.getElementById('payClose').addEventListener('click', function() {
    paymentPop.classList.remove('open');
});
paymentPop.addEventListener('click', function(e) {
    if (e.target === this) {
        paymentPop.classList.remove('open');
    }
});
document.getElementById('confirmPayBtn').addEventListener('click', function() {
    var btn = this;
    var isCod = document.getElementById('payCod').checked;
    
    var payMethod = 'Credit / Debit Card';
    if (document.getElementById('payPaypal').checked) payMethod = 'PayPal';
    else if (isCod) payMethod = isReservationFlow ? 'Pay at Restaurant' : 'Cash on Delivery';

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    setTimeout(function() {
        btn.innerHTML = isReservationFlow ? '<i class="fas fa-check"></i> Reservation Confirmed' : '<i class="fas fa-check"></i> Order Confirmed';
        btn.style.background = '#4ade80';
        
        setTimeout(function() {
            paymentPop.classList.remove('open');
            btn.innerHTML = 'Confirm Payment';
            btn.style.background = '';
            
            // Always generate bill for reservation, or for checkout if it's COD
            if (isReservationFlow || isCod) {
                generateBill(payMethod);
            } else {
                // Clear cart normally for other methods
                cartItems = [];
                renderCart();
            }
        }, 1200);
    }, 1500);
});

// ====== BILL LOGIC ======
var billPop = document.getElementById('billPop');

function generateBill(payMethod) {
    var orderId = isReservationFlow ? 'RES-' + Math.floor(Math.random() * 1000000) : 'ORD-' + Math.floor(Math.random() * 1000000);
    var date = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    
    document.getElementById('billOrderId').textContent = orderId;
    document.getElementById('billDate').textContent = date;
    
    // Set payment method name dynamically
    var methodLabel = payMethod || 'Cash on Delivery';
    document.querySelector('.bill-meta .text-end strong').textContent = methodLabel;
    
    if (isReservationFlow) {
        // Customize receipt layout for table reservation
        document.querySelector('.bill-header h4').textContent = 'Reservation Receipt';
        document.getElementById('billInfoTitle').textContent = 'Reservation Details:';
        
        var name = document.getElementById('resName').value.trim();
        var phone = document.getElementById('resPhone').value.trim();
        var email = document.getElementById('resEmail').value.trim();
        var guests = document.getElementById('resGuests').value;
        var resDate = document.getElementById('resDate').value;
        var resTime = document.getElementById('resTime').value;
        var notes = document.getElementById('resNotes').value.trim();
        
        document.getElementById('billCustName').textContent = name;
        document.getElementById('billCustPhone').textContent = phone;
        document.getElementById('billCustEmail').textContent = email ? email : 'No email provided';
        
        var addrText = '<strong>Guests:</strong> ' + guests + '<br>' +
                       '<strong>Date & Time:</strong> ' + resDate + ' at ' + resTime;
        if (notes) {
            addrText += '<br><strong>Special Request:</strong> ' + notes;
        }
        document.getElementById('billCustAddress').innerHTML = addrText;
        
        // 25$ Table Deposit item
        var tbody = document.getElementById('billItems');
        tbody.innerHTML = '<tr>' +
                          '<td style="padding-left:0;">Table Reservation Deposit</td>' +
                          '<td class="text-center">1</td>' +
                          '<td class="text-end" style="padding-right:0;">$25.00</td>' +
                          '</tr>';
        
        document.getElementById('billTotalAmount').textContent = '$25.00';
        
        if (email) {
            showEmailToast(email);
        }
    } else {
        // Standard Checkout Flow
        document.querySelector('.bill-header h4').textContent = 'Order Receipt';
        document.getElementById('billInfoTitle').textContent = 'Delivery To:';
        
        document.getElementById('billCustName').textContent = document.getElementById('chName').value.trim();
        document.getElementById('billCustPhone').textContent = document.getElementById('chPhone').value.trim();
        
        var email = document.getElementById('chEmail').value.trim();
        document.getElementById('billCustEmail').textContent = email ? email : 'No email provided';
        
        if (email) {
            showEmailToast(email);
        }
        
        document.getElementById('billCustAddress').textContent = document.getElementById('chAddress').value.trim();
        
        var tbody = document.getElementById('billItems');
        var html = '';
        var totalAmount = 0;
        
        cartItems.forEach(function(item) {
            var itemTotal = item.price * item.qty;
            totalAmount += itemTotal;
            html += '<tr>';
            html += '<td style="padding-left:0;">' + item.title + '</td>';
            html += '<td class="text-center">' + item.qty + '</td>';
            html += '<td class="text-end" style="padding-right:0;">$' + itemTotal.toFixed(2) + '</td>';
            html += '</tr>';
        });
        
        tbody.innerHTML = html;
        document.getElementById('billTotalAmount').textContent = '$' + totalAmount.toFixed(2);
    }
    
    billPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeBill() {
    billPop.classList.remove('open');
    document.body.style.overflow = '';
    
    if (isReservationFlow) {
        // Display Table Reservation Success message
        var ok = document.getElementById('resOk');
        ok.style.display = 'block';
        ok.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
        
        // Reset form inputs
        document.getElementById('resName').value = '';
        document.getElementById('resPhone').value = '';
        document.getElementById('resEmail').value = '';
        document.getElementById('resDate').value = '';
        document.getElementById('resNotes').value = '';
        
        isReservationFlow = false;
    } else {
        // Clear cart after checkout bill is closed
        cartItems = [];
        renderCart();
    }
}

document.getElementById('billClose').addEventListener('click', closeBill);
document.getElementById('billDoneBtn').addEventListener('click', closeBill);

function showEmailToast(email) {
    // Create toast element
    var toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = '<i class=\"fas fa-envelope-circle-check\"></i>' +
                      '<div class=\"toast-notif-content\">' +
                      '<strong>Email Sent!</strong>' +
                      '<span>Order confirmation sent to ' + (email || 'your email') + '</span>' +
                      '</div>';
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            toast.remove();
        }, 400);
    }, 4000);
}
