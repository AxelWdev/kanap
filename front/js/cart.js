
const cartDOM = document.querySelector("#cart__items");

fetch("http://localhost:3000/api/products")
    .then ((res) => res.json())
    .then((items) => {
    //console.table(items);
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
//Fonction qui affiche les produits dans le DOM 
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
//Fonction qui écoute le changement du nombre du produit, et modifie la quantité du produit dans le localStorage
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
//Fonction qui écoute le clic sur le bouton "supprimer", et retire le produit correspondant du localStorage
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
  
//Fonction qui récupère le prix des produits depuis l'api, et actualise la quantité et le prix total
function total() {
  fetch("http://localhost:3000/api/products")
      .then ((res) => res.json())
      .then((items) => {
      //console.table(items);
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


//------------------------------------------------------------------------------
// Formulaire
//------------------------------------------------------------------------------



//Fonction qui vérifié la validité des inputs dans le formulaire grâce aux REGEX, retourne true ou false.
function validate(){
  
  var firstName = document.getElementById("firstName").value;
  var firstNameError = document.getElementById("firstNameErrorMsg");
  var lastName = document.getElementById("lastName").value; 
  var lastNameError = document.getElementById("lastNameErrorMsg");
  var address = document.getElementById("address").value;
  var addressError = document.getElementById("addressErrorMsg");
  var city = document.getElementById("city").value;
  var cityError = document.getElementById("cityErrorMsg");
  var email = document.getElementById("email").value;
  var emailError = document.getElementById("emailErrorMsg");
  var letterRGEX = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\s-]+$/;
  var addressRGEX = /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\s-]+$/;
  var emailRGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  var firstNameResult = letterRGEX.test(firstName);
  var lastNameResult = letterRGEX.test(lastName);
  var addressResult = addressRGEX.test(address);
  var cityResult = letterRGEX.test(city);
  var emailResult = emailRGEX.test(email);

  if (firstNameResult == false){
    firstNameError.innerText = "Veuillez renseigner un prénom correct";
    return false;
  }else {
    firstNameError.innerText ="";
  }

  if(lastNameResult == false){
    lastNameError.innerText = "Veuillez renseigner un nom correct";
    return false;
  }else {
    lastNameError.innerText = "";
  }

  if (addressResult == false){
    addressError.innerText = "Veuillez renseigner une adresse correcte";
    return false;
  }else {
    addressError.innerText = "";
  }
  if (cityResult == false){
    cityError.innerText = "Veuillez renseigner une ville correcte";
    return false;
  }else {
    cityError.innerText = "";
  }

  if (emailResult == false){
    emailError.innerText = "Veuillez renseigner une addresse Email correcte";
    return false;
  } else {
    emailError.innerText = "";
  }
return true;

}




const orderButton = document.getElementById("order");



//Fonction qui crée  un object contact
function createContact(){
  let contactClient = {};
  contactClient.firstName = document.getElementById("firstName").value;
  contactClient.lastName = document.getElementById("lastName").value;
  contactClient.address = document.getElementById("address").value;
  contactClient.city = document.getElementById("city").value;
  contactClient.email = document.getElementById("email").value;
  localStorage.contactClient = JSON.stringify(contactClient);
}

let productsArray =[];
//Fonction qui crée un tableau contenant les ID des produits présents dans le localStorage.
function createProductsArray(){

  let cartProductsArray = JSON.parse(localStorage.getItem("storedCart"));
  console.log(cartProductsArray);
  if(cartProductsArray && cartProductsArray.length > 0){
    for(let item of cartProductsArray){
      productsArray.push(item._id); 
    }
  } else{
    console.log("panier vide")
  }
  
}


let contactObject;
//Fonction qui crée un object avec l'object contactClient et l'array productsArray
function packet(){
  let contact;
  contact = JSON.parse(localStorage.getItem("contactClient"));
  contactObject = {
    contact:
        {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        city: contact.city,
        email: contact.email,
        },
      products: productsArray,
  };

  
  productsArray = [];
}
//Fonction qui envoie le dernier object ContactObject à l'api avec la methode POST
//Récupère orderId depuis la réponde de l'api et redirige sur la page confirmation avec cet ID
  function postPacket(){
  createContact();
  createProductsArray();
  packet();
  console.log(contactObject);
  console.log(JSON.stringify(contactObject)); 

  fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(contactObject),
})
.then((res) => res.json())
.then((data) =>{
  console.log(data);
  window.location.href = "/front/html/confirmation.html?commande=" + data.orderId;
})
.catch((err)=> {
      console.log(err);
    })
}

console.log(productsArray)
//Ecoute le clic du bouton "Commander" et appelle postPacket() si validate() retourne true
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  validate();
  if(validate()) {
    postPacket();
  }
})



