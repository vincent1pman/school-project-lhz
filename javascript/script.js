console.log('hello');

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//
const vegetable= document.querySelector('#vegetable')
const itemList=document.querySelector('#itemList')

myForm.addEventListener('submit', onSubmit)

function onSubmit(e){
  e.preventDefault();
  const li= document.createElement('li');
  li.appendChild(document.createTextNode(`${vegetable.value}`))
  itemList.appendChild(li)
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  var id = shopItem.dataset.itemId
  addItemToCart(title, price, imageSrc, id)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc,id) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  cartRow.dataset.itemId = id
  var cartItems = document.getElementById('itemList')[0]
  var cartItemNames = cartItems.getElementsByClassName('itemList')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }}