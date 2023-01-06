// const API = `http://localhost:3000`;
function saveProduct(event) {
  event.preventDefault();
  const title = event.target.title.value;
  const image = event.target.image.value;
  const price = event.target.price.value;
  console.log(title);
  const obj = {
    title,
    image,
    price,
  };
  axios
    .post("http://localhost:3000/addProduct", obj)
    .then((res) => {
      alert(`${res.data.msg}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
