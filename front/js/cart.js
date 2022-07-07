
const cartDOM = document.querySelector("#cart__items");

fetch("http://localhost:3000/api/products")
    .then ((res) => res.json())
    .then((items) => {
    console.table(items);
    getCart(items);

    

    })
    .catch((err)=> {
    console.log(err);
});


//Fonction qui récupère le panier depuis le locale storage et rajoute les informations des produits correspondants en parcourant la réponse de l'api.
function getCart(items){
    let cart = JSON.parse(localStorage.getItem("storedCart"));
    console.log(cart);
    if(cart.length > 0){
        for (let cartItem of cart) {
            for(let i=0, j = items.length; i<j; i++) {
                if (cartItem._id == items[i]._id){
                    cartItem.name = items[i].name;
                    cartItem.price = items[i].price;
                    cartItem.description = items[i].description; 
                    cartItem.image = items[i].imageUrl;
                    cartItem.altTxt = items[i].altTxt;
                }
            }
        }

        showProductsDOM(cart);
      
        
    } 
    changeQuantity();
    deleteItem();
}
//affiche les produits
function showProductsDOM(cart){
    let result = '';
    
    cart.forEach((cartItem) => {
        result +=`<article class="cart__item" data-id="${cartItem._id}" data-color="${cartItem.colors}" data-quantity="${cartItem.quantity}">
                <div class="cart__item__img">
                  <img src="${cartItem.image}" alt="${cartItem.altTxt}"> 
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${cartItem.name}</h2>
                    <p>${cartItem.colors}</p>
                    <p>${cartItem.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${cartItem._id}" data-color="${cartItem.colors}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    });
    
    cartDOM.innerHTML = result;
    total();

}

function changeQuantity(){
  const cartItemDiv = document.querySelectorAll(".cart__item");

  cartItemDiv.forEach(cartItemDiv => {
    console.log(cartItemDiv.dataset.id + " " + cartItemDiv.dataset.color + " " + cartItemDiv.dataset.quantity)
    cartItemDiv.addEventListener("change", (e) => {
      let cart = JSON.parse(localStorage.getItem("storedCart"));
      for (item of cart){
        if(item._id == cartItemDiv.dataset.id && item.colors == cartItemDiv.dataset.color){
          item.quantity = e.target.value;
          localStorage.storedCart = JSON.stringify(cart);
        }
      }
      total();
    })
  })
}

function deleteItem() {
  const cartDelete = document.querySelectorAll(".deleteItem");
  cartDelete.forEach((cartDelete) => {
    cartDelete.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("storedCart"));
      let nextStoredCart = JSON.parse(localStorage.getItem("storedCart"));
      for ( let i = 0; i < cart.length; i++ ) {
        if(cart[i]._id == cartDelete.dataset.id && cart[i].colors == cartDelete.dataset.color){
            const n = [i];
            

            nextStoredCart.splice(n, 1);
        }
        localStorage.storedCart = JSON.stringify(nextStoredCart);
      }
      total();
      return location.reload();
    })
  })
}
  

function total() {
  fetch("http://localhost:3000/api/products")
      .then ((res) => res.json())
      .then((items) => {
      console.table(items);
      let cart = JSON.parse(localStorage.getItem("storedCart"));
      if(cart.length > 0){
        for (let cartItem of cart) {
            for(let i=0, j = items.length; i<j; i++) {
                if (cartItem._id == items[i]._id){
                  cartItem.price = items[i].price;
                }
            }
        } 
  let totalItems = 0;

  let itemsPrice = 0;

  let totalPrice = 0;

  for(let item of cart){
    totalItems += Number(item.quantity);
    itemsPrice = Number(item.quantity) * item.price;
    totalPrice += itemsPrice;
  }




  document.getElementById("totalQuantity").innerText = totalItems;

  document.getElementById("totalPrice").innerText = totalPrice;   
    }


      })
      .catch((err)=> {
      console.log(err);
      });


  
}


