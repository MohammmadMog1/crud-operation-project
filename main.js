// Declaration
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let table = document.getElementById("table");
let tr = document.createElement("tr");
var td = document.createElement("td");
let mood = "create";
let temp;

// get totale
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +ads.value - +taxes.value - +discount.value;
    total.innerText = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerText = "";
    total.style.backgroundColor = "tomato";
  }
}

// create product
// check data in localStorage
let mypro = [];
if (localStorage.Products != null) {
  mypro = JSON.parse(localStorage.Products);
} else {
  mypro = [];
}

//Entry Data In LocalStorage to save data
submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //valedation
  if (title.value != "" &&price.value != "" &&category.value != "" &&+count.value <= 100) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < +count.value; i++) mypro.push(newProduct);
      } else {
        mypro.push(newProduct);
      }
    } else {
      mypro[temp] = newProduct;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "create";
    }
        // To clear Data
    clearData();
  } else {
    // alert("wrong")

  }

  // svae in localsorage
  localStorage.setItem("Products", JSON.stringify(mypro));

  // show data
  ShowData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "tomato";
}

// read
function ShowData() {
  let tableContent = "";
  for (let i = 0; i < mypro.length; i++) {
    //data = mypro[0][Object.keys(mypro[0])[i]];
    tableContent += `<tr>
                <td>${i + 1}</td>
                <td>${mypro[i].title}</td>
                <td>${mypro[i].price}</td>
                <td>${mypro[i].taxes}</td>
                <td>${mypro[i].ads}</td>
                <td>${mypro[i].discount}</td>
                <td>${mypro[i].count}</td>
                <td>${mypro[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                <td><button onclick ="deleteData(${i}) "id="Delete">Delete</button></td>
            </tr>`;
  }
  tbody.innerHTML = tableContent;

  let deleteAll = document.getElementById("deletAll");
  if (mypro.length > 0) {
    deleteAll.innerHTML = `<button onclick ="deleteAll()">Delete All Data (${mypro.length})</button>`;
  } else {
    deleteAll.innerHTML = ``;
  }
}
ShowData();

// delete data
function deleteData(i) {
  console.log(i);

  localStorage.Products = JSON.stringify(mypro.splice(i, 1));
  ShowData();
}

// delete all data
function deleteAll() {
  localStorage.clear();
  mypro.splice(0);
  localStorage.Products = JSON.stringify(mypro);
  ShowData();
}

// update data
function updateData(i) {
  (title.value = mypro[i].title),
    (price.value = mypro[i].price),
    (taxes.value = mypro[i].taxes),
    (ads.value = mypro[i].ads),
    (discount.value = mypro[i].discount),
    (category.value = mypro[i].category);
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }

  search.focus();
  search.placeholder = `sreach by ${searchMood}`;
  console.log(searchMood);
}

//search Data
function searchData(value) {
  let tableContent = "";

  if (searchMood == "title") {
    for (let i = 0; i < mypro.length; i++) {
      if (mypro[i].title.toLowerCase().includes(value)) {
        tableContent += `<tr>
                <td>${i + 1}</td>
                <td>${mypro[i].title}</td>
                <td>${mypro[i].price}</td>
                <td>${mypro[i].taxes}</td>
                <td>${mypro[i].ads}</td>
                <td>${mypro[i].discount}</td>
                <td>${mypro[i].count}</td>
                <td>${mypro[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                <td><button onclick ="deleteData(${i}) "id="Delete">Delete</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < mypro.length; i++) {
      if (mypro[i].category.toLowerCase().includes(value)) {
        tableContent += `<tr>
                <td>${i + 1}</td>
                <td>${mypro[i].title}</td>
                <td>${mypro[i].price}</td>
                <td>${mypro[i].taxes}</td>
                <td>${mypro[i].ads}</td>
                <td>${mypro[i].discount}</td>
                <td>${mypro[i].count}</td>
                <td>${mypro[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                <td><button onclick ="deleteData(${i}) "id="Delete">Delete</button></td>
            </tr>`;
      }
    }
  }
  tbody.innerHTML = tableContent;
}
