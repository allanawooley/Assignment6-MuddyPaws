//defining the variables for my main product image to swap out by color selected and size selected
var colorBox = {
    strawberryHarness : "<img src='./images/dogHarness-strawberry.png' class='mainProductImages'>",
    blackberryHarness : "<img src='./images/dogHarness-blackberry.jpg' class='mainProductImages'>",
    crazyberryHarness : "<img src='./images/dogHarness-crazyberry.jpg' class='mainProductImages'>",
    fireOrangeHarness : "<img src='./images/dogHarness-fireOrange.png' class='mainProductImages'>",
};

var sizeBox = {
    tinyBox : "",
    smallBox : "",
    mediumBox : "",
    largeBox : ""
};


//functions file will execute
$(document).ready(function(){
  console.log("ready");

  var colorSelect = ""
  var inputImage = ""

//adding indicators of chosen details, changing images, setting variables
  $('.strawberryBox').click(function(){
    $('.mainProduct').empty('.mainProductImages');
    $('.mainProduct').append(colorBox.strawberryHarness);
    $('.colorBox').removeClass('buttonActive');
    $('.strawberryBox').addClass('buttonActive');
    colorSelect = "strawberry";
    inputImage = "<img src='./images/dogHarness-strawberry.png'>";
  });

  $('.blackberryBox').click(function(){
    $('.mainProduct').empty('.mainProductImages');
    $('.mainProduct').append(colorBox.blackberryHarness);
    $('.colorBox').removeClass('buttonActive');
    $('.blackberryBox').addClass('buttonActive');
    colorSelect = "blackberry";
    inputImage = "<img src='./images/dogHarness-blackberry.jpg'>";
  });

  $('.crazyberryBox').click(function(){
    $('.mainProduct').empty('.mainProductImages');
    $('.mainProduct').append(colorBox.crazyberryHarness);
    $('.colorBox').removeClass('buttonActive');
    $('.crazyberryBox').addClass('buttonActive');
    colorSelect = "crazyberry";
    inputImage = "<img src='./images/dogHarness-crazyberry.jpg'>";
  });

  $('.fireOrangeBox').click(function(){
    $('.mainProduct').empty('.mainProductImages');
    $('.mainProduct').append(colorBox.fireOrangeHarness);
    $('.colorBox').removeClass('buttonActive');
    $('.fireOrangeBox').addClass('buttonActive');
    colorSelect = "fireOrange";
    inputImage = "<img src='./images/dogHarness-fireOrange.png'>"
  });

  var sizeSelect = ""

  $('.tinyBox').click(function(){
    $('.sizeBox').removeClass('buttonActive');
    $('.tinyBox').addClass('buttonActive');
    sizeSelect = "tiny";
  });

  $('.smallBox').click(function(){
    $('.sizeBox').removeClass('buttonActive');
    $('.smallBox').addClass('buttonActive');
    sizeSelect = "small";
  });

  $('.mediumBox').click(function(){
    $('.sizeBox').removeClass('buttonActive');
    $('.mediumBox').addClass('buttonActive');
    sizeSelect = "medium";
  });

  $('.largeBox').click(function(){
    $('.sizeBox').removeClass('buttonActive');
    $('.largeBox').addClass('buttonActive');
    sizeSelect = "large";
  });

//setting event listener
    function onReady () {
      var button = document.getElementById('addToCart');
      if (button) {
        button.addEventListener('click', onCartBtnClick);
        }
      }
    onReady();

    var cart = [];

//creating array to put product details into
    function onCartBtnClick() {
        //Get Quantity from input
        var input = document.getElementById('quantity');
        var inputValue = input.value;
        var inputName = document.getElementById("addToCart").getAttribute("data-name");
        var inputPrice = document.getElementById("addToCart").getAttribute("data-price");
        var item = {
          //property : key,
          quantity : inputValue,
          name : inputName,
          color : colorSelect,
          size : sizeSelect,
          price : Number(inputPrice),
          image: inputImage
        };

        //cart = getFromStorage();
        cart.push(item);
        console.log(item);
        //adding cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    //the below line was used pretty heavily as I was testing and debugging
    //localStorage.clear();


var finalCart = localStorage.getItem('cart');
var parseCart = JSON.parse(finalCart);
console.log(finalCart, parseCart);

//creating divs and connecting them so I can dynamically build page
function buildCheckoutPage(itemNumber) {
  var cartProduct = document.createElement("div");
  cartProduct.setAttribute("class", "cartProduct");

  var cartImage = document.createElement("div");
  cartImage.setAttribute("class", "cartImage");

  var cartText = document.createElement("div");
  cartText.setAttribute("class", "cartText");

  var productName = document.createElement("h3");
  productName.setAttribute("id", "productName");

  var cartProductDetails = document.createElement("div");
  cartProductDetails.setAttribute("class", "cartProductDetails");

  var itemColor = document.createElement("div");
  itemColor.setAttribute("class", "itemColor");

  var itemSize = document.createElement("div");
  itemSize.setAttribute("class", "itemSize");

  var colorChosen = document.createElement("p");
  colorChosen.setAttribute("id", "colorChosen");

  var sizeChosen = document.createElement("p");
  sizeChosen.setAttribute("id", "sizeChosen");

  var itemQuantity = document.createElement("div");
  itemQuantity.setAttribute("class", "itemQuantity");

  var quantityInput = document.createElement("p");
  quantityInput.setAttribute("id", "quantityInput");

  var itemPrice = document.createElement("div");
  itemPrice.setAttribute("class", "itemPrice");

  var priceInput = document.createElement("p");
  priceInput.setAttribute("id", "priceInput");

  var cartProductEdit = document.createElement("div");
  cartProductEdit.setAttribute("class", "cartProductEdit");

  var itemTotal = document.createElement("div");
  itemTotal.setAttribute("class", "itemTotal");

  var remove = document.createElement("a");
  remove.setAttribute("a", "remove");

//adding attributes from array to each dynamically built item on checkout page
  document.getElementById("cartItems").append(cartProduct);
  cartProduct.setAttribute("id", itemNumber);
  productName.innerHTML=parseCart[itemNumber].name;

  cartImage.innerHTML=parseCart[itemNumber].image;
  cartProduct.appendChild(cartImage);
  cartProduct.append(cartText);

  cartText.append(productName);
  cartText.append(cartProductDetails);

  cartProductDetails.append(itemColor);
  cartProductDetails.append(itemSize);
  cartProductDetails.append(itemQuantity);
  cartProductDetails.append(itemPrice);
  colorChosen.innerHTML=parseCart[itemNumber].color;
  itemColor.append("Color:  ");
  itemColor.append(colorChosen);
  sizeChosen.innerHTML=parseCart[itemNumber].size;
  itemSize.append("Size:  ");
  itemSize.append(sizeChosen);
  quantityInput.innerHTML=parseCart[itemNumber].quantity;
  itemQuantity.append("Quantity: ");
  itemQuantity.append(quantityInput);


  priceInput.innerHTML=parseCart[itemNumber].price;
  itemPrice.append("$  ");
  itemPrice.append(priceInput);


  cartText.append(cartProductEdit);
  cartProductEdit.setAttribute("data-index", itemNumber)

  var btn = document.createElement("button");
  btn.className = 'buttonSmall';
  var t = document.createTextNode("Remove");
  btn.appendChild(t);
  cartProductEdit.append(btn);
};

for (var i=0; i < parseCart.length; i++){
  buildCheckoutPage(i);
}

//setting variable and getting total price for entire cart
var itemTotal = 0;

  function updateTotal() {
    for (var i=0; i < parseCart.length; i++) {
      parseCart[i].price;
      var cartPrice = parseCart[i].price;
      itemTotal += cartPrice;
    }
    itemTotal = itemTotal + 7.89;
  };

updateTotal();
document.getElementById("appendCost").append(itemTotal);
console.log(itemTotal);

//setting variable and getting quantity for shopping cart icon update
var cartCount = 0;

  function updateCartCount() {
    cartCount = 0;
    for (var i=0; i < parseCart.length; i++) {
      parseCart[i].quantity;
      var count = Number(parseCart[i].quantity);
      cartCount += count;
    }
  }
updateCartCount();
  $("#shoppingCartCount").html(cartCount);


//function to remove item
  $(".cartProductEdit").click(removeCartItem);


  function removeCartItem() {
    console.log("hello!");
    var index = $(this).data("index");
    console.log(index);
    $("#"+index).remove();
    parseCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(parseCart));
    updateCartCount();
    updateTotal();
    //so item is removed and quantity updated without having to refresh page
    location.reload();
    }


//.class #id
});
