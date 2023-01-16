// const API = `http://localhost:3000`;
async function saveProduct(event) {
  try {
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
    const res = await axios.post("http://localhost:3000/addProduct", obj);
    alert(`${res.data.msg}`);
    event.target.title.value = "";
    event.target.image.value = "";
    event.target.price.value = "";
  } catch (e) {
    console.log(e);
  }
}
