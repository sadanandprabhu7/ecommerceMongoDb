window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("updateProduct").style.visibility = "hidden";
  const res = await axios.get("http://localhost:3000/adminProducts");
  const parentDiv = document.getElementsByClassName("shop-items")[0];
  parentDiv.innerHTML = "";
  res.data.data.forEach((product) => {
    const itemsDiv = `<div class="shop-item" id="${product._id}">
                    <span class="shop-item-title">${product.title}</span>
                    <img class="shop-item-image" src="${product.image}">
                    <div class="shop-item-details">
                      <span class="shop-item-price">$${product.price} </span>
                       <span class="shop-item-price"><button class="btn btn-edit"onclick="editProduct('${product._id}')" type="button">EDIT</button> </span>
                        <button class="btn btn-danger" onclick="deleteProduct('${product._id}')" type="button">DELETE</button>  
                    </div>`;
    parentDiv.innerHTML += itemsDiv;
  });
});

async function deleteProduct(productId) {
  const res = await axios.delete(
    `http://localhost:3000/productDelete/${productId}`
  );
  if (res.status === 200) {
    document.getElementById(productId).remove();
    alert(`${res.data.msg}`);
  }
}
async function editProduct(productId) {
  const res = await axios.get(`http://localhost:3000/productEdit/${productId}`);
  if (res.status === 200) {
    updateProduct(res.data.data[0]);
  }
}
async function updateProduct(product) {
  document.getElementById("updateProduct").style.visibility = "visible";
  document.getElementById("pTitle").value = `${product.title}`;
  document.getElementById("pImage").value = `${product.image}`;
  document.getElementById("pPrice").value = `${product.price}`;
  const updateBtn = document.getElementById("updateBtn");
  updateBtn.addEventListener("click", async () => {
    const updatedTitle = document.getElementById("pTitle").value;
    const updatedImage = document.getElementById("pImage").value;
    const updatedPrice = document.getElementById("pPrice").value;
    console.log(product._id);
    if (updatedTitle == "" || updatedImage == "" || updatedPrice == "") {
      return alert("please fill the details");
    }
    const obj = { updatedTitle, updatedImage, updatedPrice, _id: product._id };
    const res = await axios.post(`http://localhost:3000/updateProduct`, obj);
    console.log(res);
    if (res.status === 200) {
      alert(`${res.data.msg}`);
      document.getElementById("updateProduct").style.visibility = "hidden";
    }
  });
}
