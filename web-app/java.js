let array = showGet();

const filter = {
  searchItem: "",
  toggleValue: false,
  bySort: "byEdited",
};

filterItemFun(array, filter);

document.getElementById("searchItemDom").addEventListener("input", (e) => {
  filter.searchItem = e.target.value;
  filterItemFun(array, filter);
});

document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = uuidv4();
  const timeStamp = moment().valueOf();
  array.push({
    id: id,
    title: e.target.elements.productTitle.value,
    price: e.target.elements.productPrice.value,
    exits: true,
    updated: timeStamp,
    created: timeStamp,
  });
  saveSet(array);
  filterItemFun(array, filter);
  console.log(e.target.elements.productTitle.value);
  console.log(e.target.elements.productPrice.value);
  e.target.elements.productTitle.value = "";
  e.target.elements.productPrice.value = "";
  console.log(array);
});
document.getElementById("toggle").addEventListener("change", (e) => {
  filter.toggleValue = e.target.checked;
  filterItemFun(array, filter);
});

document.getElementById("sort").addEventListener("change", (e) => {
  filter.bySort = e.target.value;
  filterItemFun(array, filter);
});
window.addEventListener("storage", (e) => {
  if (e.key === "arrays") {
    array = JSON.parse(e.newValue);
    filterItemFun(array, filter);
  }
});
