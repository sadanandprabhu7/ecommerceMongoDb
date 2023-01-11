window.addEventListener("DOMContentLoaded", () => {
  const parentDiv = document.getElementsByClassName("shop-items")[0];
  parentDiv.innerHTML = "";
  axios.get("http://localhost:3000/getCart").then((res) => {
    if (res.data.data.length > 0) {
      document.getElementById("orderBtn").style.visibility = "visible";
    } else {
      document.getElementById("orderBtn").style.visibility = "hidden";
    }
    res.data.data.forEach((product) => {
      const itemsDiv = `<div class="shop-item" id="${product._id}">
                    <span class="shop-item-title">${product.title}</span>
                    <img class="shop-item-image" src="${product.image}">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$${product.price}</span>
                        <span class="shop-item-price"> <input id="quantityInput" type="number" value="${product.quantity}" /></span>
                        <button class="btn btn-danger" onclick="deleteFromCart('${product._id}')" type="button">REMOVE</button>  
                    </div>`;
      parentDiv.innerHTML += itemsDiv;
    });
  });
});

async function deleteFromCart(id) {
  const res = await axios.post(`http://localhost:3000/deleteFromCart`, {
    productId: id,
  });
  if (res.status == 200) {
    alert(`${res.data.msg}`);
    document.getElementById(id).remove();
  }
}

const orderBtn = document.getElementById("orderBtn");

orderBtn.addEventListener("click", async () => {
  const res = await axios.post(`http://localhost:3000/postOrder`);
  if (res.status == 200) {
    alert(`${res.data.msg}`);
    window.location.href = "ordersPage.html";
  }
});
