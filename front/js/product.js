let id = getUrlId();
console.log(id);
let url = "http://localhost:3000/api/products/" + id;
console.log(url);
let product = {};
product._id = id;
let cart = [];

const itemDOM = document.getElementsByTagName("article");
const itemImage = document.querySelector(".item__img");
const itemTitle = document.querySelector("#title");
const itemPrice = document.querySelector("#price");
const itemDescription = document.querySelector("#description");
const itemColors = document.querySelector("#colors");
const itemQuantity = document.querySelector("#quantity");
const buttonDOM = document.querySelector("#addToCart");




//Récupère l'id du produit depuis l'url
function getUrlId(){
    let  str = window.location.href;
    let  url = new URL(str);
    let  search_params = new URLSearchParams(url.search); 
    if(search_params.has('id')) {
    let  id = search_params.get('id');
    return id;
    
    }
}
//récupère le produit correspondant à l'id depuis l'api

fetch(url)
    .then ((res) => res.json())
    .then((item) => {
    console.table(item);
    showProducts(item);

    

    })
    .catch((err)=> {
    console.log(err);
})


//affiche les produits
function showProducts(item) {
    itemImage.innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
    itemTitle.innerText = item.name;
    itemPrice.innerText = item.price;
    itemDescription.innerText = item.description;
    for (let color of item.colors) {
        itemColors.innerHTML += `<option value="${color}">${color}</option>`;
    }
    

}

//choix de la couleur
itemColors.addEventListener("input", (e)=>{
    let color = e.target.value;
    product.colors = color;
    console.log(product);
});

//choix de la quantité
itemQuantity.addEventListener("input", (e)=>{
    let quantity = e.target.value;
    product.quantity = quantity;
    console.log(product);
});

buttonDOM.addEventListener('click',()=>{
    if (product.colors === "" || product.colors === undefined || product.quantity < 1 || product.quantity > 100 || product.quantity === undefined){
        alert("Veuillez sélectionner une quantité entre 1 et 100 et une couleur.")
    }
    else{
        Cart();
        console.log("achat")
    }
});

let selectedProducts = [];
let savedProducts = [];
let productBuffer = [];
let productToPush = [];

function firstProduct() { 
    
    if (savedProducts === null){
        selectedProducts.push(product);

        return (localStorage.storedCart = JSON.stringify(selectedProducts));
    }
}

function addProduct(){
    productToPush = [];
    productBuffer.push(product);
    productToPush = [...savedProducts, ...productBuffer];
    productBuffer = [];
    return (localStorage.storedCart = JSON.stringify(productToPush))
}

function Cart() {
    savedProducts = JSON.parse(localStorage.getItem("storedCart"));
    //si le panier n'est pas vide
    if(savedProducts){
        for(let i of savedProducts){
            if(i._id === id && i.colors === product.colors){
                alert("Cet article est déjà présent dans le panier");
                let addQuantity = parseInt(i.quantity) + parseInt(product.quantity);
                i.quantity = JSON.stringify(addQuantity);
                return (localStorage.storedCart = JSON.stringify(savedProducts));
            }
        }
        return addProduct();
    }
    return  firstProduct();
    
}