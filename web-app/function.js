const saveSet = (node) => {
  localStorage.setItem("arrays", JSON.stringify(node));
};

const showGet = () => {
  const res = localStorage.getItem("arrays");
  try {
    return res !== null ? JSON.parse(res) : [];
  } catch (error) {
    return [];
  }
};

const toggleFun = (id) => {
  const del = array.find((item) => {
    return item.id === id;
  });
  if (del !== undefined) {
    del.exits = !del.exits;
  }
};

const removeItemFun = (id) => {
  const res = array.findIndex((item) => {
    return item.id === id;
  });
  if (res > -1) {
    array.splice(res, 1);
  }
};

const funSort = (array, bysort) => {
  if (bysort === "byEdited") {
    return array.sort((a, b) => {
      if (a.updated > b.updated) {
        return -1;
      } else if (a.updated < b.updated) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (bysort === "byCreated") {
    return array.sort((a, b) => {
      if (a.created > b.created) {
        return -1;
      } else if (a.created < b.created) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return array;
  }
};

const filterItemFun = (array, filter) => {
  array = funSort(array, filter.bySort);
  let res = array.filter((item) => {
    return item.title.toLowerCase().includes(filter.searchItem.toLowerCase());
  });

  res = res.filter((item) => {
    if (filter.toggleValue) {
      return item.exits;
    } else {
      return true;
    }
  });

  document.getElementById("show-product").innerHTML = "";
  res.forEach((item) => {
    document.getElementById("show-product").appendChild(renderDom(item));
  });
};

const renderDom = (item) => {
  const divEl = document.createElement("div");
  const checkBoxEl = document.createElement("input");
  const itemLinkEl = document.createElement("a");
  const removeEl = document.createElement("button");
  const PriceEl = document.createElement("p");

  //   -----------------------------

  checkBoxEl.setAttribute("type", "checkBox");
  checkBoxEl.checked = !item.exits;
  divEl.appendChild(checkBoxEl);
  checkBoxEl.addEventListener("change", (e) => {
    toggleFun(item.id);
    saveSet(array);
    filterItemFun(array, filter);
  });
  //   ---------------------------------
  itemLinkEl.textContent = item.title;
  itemLinkEl.setAttribute("href", `./item-product.html#${item.id}`);
  divEl.appendChild(itemLinkEl);
  // -----------------------------------
  PriceEl.textContent = `Price: ${item.price}`;
  divEl.appendChild(PriceEl);
  // -----------------------------------
  removeEl.textContent = "Remove";
  divEl.appendChild(removeEl);
  removeEl.addEventListener("click", () => {
    removeItemFun(item.id);
    saveSet(array);
    filterItemFun(array, filter);
  });
  return divEl;
};
