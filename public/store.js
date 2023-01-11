// LOADING ALL THE PRODUCT ON SITE FROM DATABASE WHENEVR SITE IS VISITED

const parentDiv = document.getElementsByClassName("shop-items")[0];
//const pagination = document.getElementById("pagination");
window.addEventListener("load", () => {
  axios.get(`http://localhost:3000/products`).then((res) => {
    // productList(res.data);

    showProducts(res.data.data);
  });
  // const page = 1;
  // axios.get(`http://localhost:3000/products?page=${page}`).then((res) => {
  //   productList(res.data);
  //   showProducts(res.data.products);
  // });
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

// function productList({
//   currentPage,
//   hasNextPage,
//   nextPage,
//   hasPreviousPage,
//   priviousPage,
//   lastPage,
// }) {
//   pagination.innerHTML = "";

//   if (currentPage !== 1 && priviousPage !== 1) {
//     const btn1 = document.createElement("button");
//     btn1.innerHTML = 1;
//     btn1.addEventListener("click", () => getProducts(1));
//     pagination.appendChild(btn1);
//   }
//   if (hasPreviousPage) {
//     const btn2 = document.createElement("button");
//     btn2.innerHTML = priviousPage;
//     btn2.addEventListener("click", getProducts(priviousPage));
//     pagination.appendChild(btn2);
//   }
//   const btn1 = document.createElement("button");
//   btn1.innerHTML = `<h3>${currentPage}</h3>`;
//   btn1.addEventListener("click", () => getProducts(currentPage));
//   pagination.appendChild(btn1);

//   if (hasNextPage) {
//     const btn3 = document.createElement("button");
//     btn3.innerHTML = nextPage;
//     btn3.addEventListener("click", () => getProducts(nextPage));
//     pagination.appendChild(btn3);
//   }
//   if (lastPage !== currentPage && nextPage !== lastPage) {
//     const btn4 = document.createElement("button");
//     btn4.innerHTML = lastPage;
//     btn4.addEventListener("click", () => getProducts(lastPage));
//     pagination.appendChild(btn4);
//   }
// }
// function getProducts(page) {
//   axios
//     .get(`http://localhost:3000/products?page=${page}`)
//     .then((res) => {
//       productList(res.data);
//       showProducts(res.data.products);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

///  ADD TO CART FUNCTION
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

const submit = document.getElementById("submitCart");

submit.addEventListener("click", () => {
  const parentTd = document.getElementById("table");
  axios.post("http://localhost:3000/orders").then((res) => {
    console.log(res.data.message);

    parentTd.innerHTML = "";
  });
});
