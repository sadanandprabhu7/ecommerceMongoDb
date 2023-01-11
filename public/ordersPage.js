window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/getOrders")
    .then((res) => {
      res.data.data.forEach((order) => {
        const parent = document.getElementById("mytable");
        const newItem = `<tr>
            <td>
              <img
                class="cart-item-image"
                src="${order.items[0].image}"
                width="100"
                height="100"
              /> 
            </td>
            <td> <span>${order.items[0].title}</span></td>
            <td><span>$${order.items[0].price}</span></td>
            <td>
              <label>${order.items[0].quantity}</label>
            </td>
            <td>
              <label>${order._id}</label>S
            </td>
          </tr>`;
        parent.innerHTML += newItem;
      });
    })
    .catch((err) => console.log(err));
});
