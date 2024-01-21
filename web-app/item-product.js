const proTitleEl = document.getElementById("pro-Title");
const proPriceEl = document.getElementById("pro-price");
const removeProEl = document.getElementById("remove-pro");
const showDataEl = document.getElementById("show-Data");

const res = location.hash.substring(1);
let array = showGet();
let product = array.find((item) => {
  return item.id === res;
});

if (product === undefined) {
  location.assign("./index.html");
}

proTitleEl.value = product.title;
proPriceEl.value = product.price;
showDataEl.textContent = `آخرین آپدیت: ${moment(product.updated)
  .locale("fa")
  .fromNow()}`;

proTitleEl.addEventListener("input", (e) => {
  product.title = e.target.value;
  product.updated = moment().valueOf();
  showDataEl.textContent = `آخرین آپدیت: ${moment(product.updated)
    .locale("fa")
    .fromNow()}`;
  saveSet(array);
});
proPriceEl.addEventListener("input", (e) => {
  product.price = e.target.value;
  product.updated = moment().valueOf();
  showDataEl.textContent = `آخرین آپدیت: ${moment(product.updated)
    .locale("fa")
    .fromNow()}`;
  saveSet(array);
});
removeProEl.addEventListener("click", (e) => {
  removeItemFun(product.id);
  saveSet(array);
  location.assign("./index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "arrays") {
    array = JSON.parse(e.newValue);
    product = array.find((item) => {
      return item.id === res;
    });
    if (product === undefined) {
      location.assign("./index.html");
    }

    proTitleEl.value = product.title;
    proPriceEl.value = product.price;
    showDataEl.textContent = `آخرین آپدیت: ${moment(product.updated)
      .locale("fa")
      .fromNow()}`;
  }
});
