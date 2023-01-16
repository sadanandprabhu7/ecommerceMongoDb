window.addEventListener("DOMContentLoaded", async () => {
  try {
    const parentDiv = document.getElementsByClassName("shop-items")[0];
    parentDiv.innerHTML = "";
    const res = await axios.get("http://localhost:3000/getCart");
    if (res.data.data.length > 0) {
      document.getElementById("orderBtn").style.visibility = "visible";
    } else {
      document.getElementById("orderBtn").style.visibility = "hidden";
    }
    res.data.data.forEach((product) => {
      const itemsDiv = `<div class="shop-item" id="${product.productId._id}">
                    <span class="shop-item-title">${product.productId.title}</span>
                    <img class="shop-item-image" src="${product.productId.image}">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$${product.productId.price}</span>
                        <span class="shop-item-price"> <input id="quantityInput" type="number" value="${product.quantity}" /></span>
                        <button class="btn btn-danger" onclick="deleteFromCart('${product.productId._id}')" type="button">REMOVE</button>  
                    </div>`;
      parentDiv.innerHTML += itemsDiv;
    });
  } catch (e) {
    console.log(e);
  }
});

async function deleteFromCart(id) {
  try {
    const res = await axios.post(`http://localhost:3000/deleteFromCart`, {
      productId: id,
    });
    if (res.status == 200) {
      alert(`${res.data.msg}`);
      document.getElementById(id).remove();
    }
  } catch (e) {
    console.log(e);
  }
}

const orderBtn = document.getElementById("orderBtn");

orderBtn.addEventListener("click", async () => {
  try {
    const res = await axios.post(`http://localhost:3000/postOrder`);
    if (res.status == 200) {
      alert(`${res.data.msg}`);
      window.location.href = "ordersPage.html";
    }
  } catch (e) {
    console.log(e);
  }
});
