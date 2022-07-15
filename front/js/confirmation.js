const orderIdDiv = document.getElementById('orderId');

function getOrderId(){
    let  str = window.location.href;
    let  url = new URL(str);
    let  search_params = new URLSearchParams(url.search); 
    if(search_params.has('commande')) {
    let  id = search_params.get('commande');
    return id;
    
    }
}

let orderId = getOrderId();
orderIdDiv.innerText = orderId;
orderId = undefined;
sessionStorage.clear();
localStorage.clear();

