window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/getOrders")
    .then((res) => {
      res.data.data.forEach((order) => {
        order.products.forEach((p) => {
          const parent = document.getElementById("mytable");
          const newItem = `<tr>
            <td>
              <img
                class="cart-item-image"
                src="${p.product.image}"
                width="100"
                height="100"
              /> 
            </td>
            <td> <span>${p.product.title}</span></td>
            <td><span>$${p.product.price}</span></td>
            <td>
              <label>${p.quantity}</label>
            </td>
            <td>
              <label>${order._id}</label>S
            </td>
          </tr>`;
          parent.innerHTML += newItem;
        });
      });
    })
    .catch((err) => console.log(err));
});
