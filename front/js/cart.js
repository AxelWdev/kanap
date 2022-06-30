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
}

function showProductsDOM(cart){
    let result = '';
    cart.forEach((cartItem) => {
        result +=`<article class="cart__item" data-id="${cartItem._id}" data-color="${cartItem.color}">
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
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    });
    cartDOM.innerHTML = result;

}