//Zone d'ajout des éléments dans le DOM
const itemsDOM = document.querySelector('.items');
// Récupération des produits

fetch("http://localhost:3000/api/products")
    //Récupère le résultat au format .json
    .then ((res) => res.json())
    //Le résultat est nommé products
    .then((products) => {
    //affiche le résultat dans la console
        console.table(products);
    //Appel de la fonction d'affichage des produits
        showProducts(products);
    })
    //gestion des erreurs
    .catch((err)=> {
        console.log(err);
    })

//Fonction qui ajoute l'html pour chaque produit
function showProducts(items) {
    let result = '';
    items.forEach((item) => {
        result +=`<a href="./product.html?id=${item._id}">
            <article>
                <img src="${item.imageUrl}" alt="${item.altTxt}">
                <h3 class="productName">${item.name}</h3>
                <p class="productDescription">${item.description}</p>
            </article>
        </a>`;
    });
    itemsDOM.innerHTML = result;

}