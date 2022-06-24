const itemDOM = document.getElementsByTagName("article");
const itemImage = document.querySelector(".item__img");
const itemTitle = document.querySelector("#title");
const itemPrice = document.querySelector("#price");
const itemDescription = document.querySelector("#description");
const itemColors = document.querySelector("#colors");



function getUrlId(){
    let  str = window.location.href;
    let  url = new URL(str);
    let  search_params = new URLSearchParams(url.search); 
    if(search_params.has('id')) {
    let  id = search_params.get('id');
    return id;
    
    }
}

function getProduct(url){
    fetch(url)
    .then ((res) => res.json())
    .then((product) => {
        console.table(product);
        showProducts(product);
    })
    .catch((err)=> {
        console.log(err);
    })
}

function showProducts(product) {
    itemImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    itemTitle.innerText = product.name;
    itemPrice.innerText = product.price;
    itemDescription.innerText = product.description;
    for (let color of product.colors) {
        itemColors.innerHTML += `<option value="${color}">${color}</option>`;
    }


}




let id = getUrlId();
let url = "http://localhost:3000/api/products/" + id;
getProduct(url);
console.log(id);
console.log(url);



