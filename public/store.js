const parentDiv = document.getElementsByClassName("shop-items")[0];
window.addEventListener("load", () => {
  axios.get(`http://localhost:3000/products`).then((res) => {
    showProducts(res.data.data);
  });
});

function showProducts(products) {
  parentDiv.innerHTML = "";
  products.forEach((product) => {
    const itemsDiv = `<div class="shop-item">
                    <span class="shop-item-title">${product.title}</span>
                    <img class="shop-item-image" src="${product.image}">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$${product.price}</span>
                        <button class="btn btn-primary shop-item-button" onclick="addToCart('${product._id}')" type="button">ADD TO CART</button>  
                    </div>`;
    parentDiv.innerHTML += itemsDiv;
  });
}

function addToCart(product) {
  axios
    .post("http://localhost:3000/postCart", { productId: product })
    .then((res) => {
      if (res.status == 200) {
        alert(`${res.data.msg}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
