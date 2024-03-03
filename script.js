const iconCart = document.getElementById("cart");
const body = document.querySelector('body');
const closeCart = document.querySelector(".close");
const listProductHTML = document.querySelector(".listProduct");
const listCartHTML = document.querySelector(".listCart");
const iconCartSpan = document.querySelector(".contain-cart span");

let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart") 
})
closeCart.addEventListener("click", () =>{
    body.classList.toggle("showCart")
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add("item1");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML =`<img src="${product.image}" alt="">
            <h4>${product.name}</h4>
            <div class="price">${product.price}</div>
            <i class="fa-regular fa-heart" id="heart"></i>
            <button class="addCart">Add to cart</button>
            `;
            listProductHTML.appendChild(newProduct)
        })
    }
}
listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("addCart")){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})


const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1
    }
    addDataToHTML();
    console.log(carts);       
}
addToCart()


const initApp = () => {
    //get data from json
    fetch("./products.json")
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        // console.log(listProducts);
        addDataToHTML();
    })

}
initApp()


