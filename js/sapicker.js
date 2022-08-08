const sapicker = document.querySelectorAll(".sapicker");
const createDivs = (el) => {
  el.forEach((div, i) => {
    div.classList.add(`sapicker-${i}`);
    div.setAttribute("id", `sapicker-${i}`);
    let optionsArray = "";
    let options = div.querySelectorAll(".sapicker option");
    options.forEach(function (opt, x) {
      let img = opt.getAttribute("data-thumbnail");
      let text = opt.innerText;
      let value = opt.value;
      let option = "";
      if (value === "") {
        option =
          '<li class="sapicker-select-list" value=""><span>Select Option</span></li>';
      } else {
        option = `<li class="sapicker-select-list" value="${value}"><img src="${img}"/><span>${text}</span></li>`;
      }
      optionsArray += option;
    });

    let item = `<div class="sapicker-select"><button class="sapicker-select-btn" value="" data-id="${i}"><div class="selected-list"><span>Select Option</span></div></button><div class="sapicker-dropdown sapicker-select-div" id="sapicker-select-div-${i}"><ul class="sapicker-select-ul">${optionsArray}</ul></div></div>`;
    const childDiv = document.createElement("div");
    childDiv.classList.add("sapicker-wrap");
    childDiv.innerHTML = item;
    div.parentNode.appendChild(childDiv);
  });
};
createDivs(sapicker);

document.addEventListener("click", function (event) {
  if (!event.target.closest(".sapicker-select")) {
    document.querySelectorAll(".sapicker-dropdown").forEach((item1) => {
      item1.classList.add("sapicker-select-div");
    });
  }
});

document.querySelectorAll(".sapicker-select-btn").forEach((item) => {
  item.addEventListener("click", (event) => {
    document.querySelectorAll(".sapicker-dropdown").forEach((item1) => {
      item1.classList.add("sapicker-select-div");
    });
    let id = item.getAttribute("data-id");
    let elm = document.getElementById(`sapicker-select-div-${id}`);
    elm.classList.toggle("sapicker-select-div");
  });
});

document.querySelectorAll(".sapicker-select-ul li").forEach((item) => {
  item.addEventListener("click", (event) => {
    let value = item.getAttribute("value");
    let text = item.innerText;
    let selctedItem = "";
    if (value == "") {
      selctedItem = `<div class="selected-list" value=""><span>Select Option</span></div>`;
    } else {
      let img = item.querySelector("img").getAttribute("src");
      selctedItem = `<div class="selected-list"><img src="${img}" /><span>${text}</span></div>`;
    }
    let par_elm = item.parentNode.parentNode.parentNode.querySelector(
      ".sapicker-select-btn"
    );
    par_elm.innerHTML = selctedItem;
    par_elm.value = value;
    let id = par_elm.getAttribute("data-id");
    let elm = document.getElementById(`sapicker-select-div-${id}`);
    elm.classList.toggle("sapicker-select-div");

    let selectBox = document.getElementById(`sapicker-${id}`);
    let optionsList = selectBox.querySelectorAll("option");
    optionsList.forEach(function (opt, x) {
      if (opt.value === value) {
        selectBox.selectedIndex = x;
      }
    });
  });
});
