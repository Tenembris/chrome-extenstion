const inputBtn = document.querySelector("#inputBtn");
const input = document.querySelector("#input");
const ulElement = document.querySelector("#ulElement");
const deleteBtn = document.querySelector("#delete");
const saveTabBtn = document.querySelector("#saveTab");



localStorage.setItem("myLeads", "www.cos.com");

let inputArray = [];
let localInputArray = JSON.parse(localStorage.getItem("inputArray"));

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    inputArray.push(tabs[0].url);
    renderList(inputArray);
  });

  console.log(tabs[0].url);
});

deleteBtn.addEventListener("dblclick", function () {
  inputArray = [];
  localStorage.clear();
  renderList(inputArray);
});

inputBtn.addEventListener("click", function () {
  if (input.value != "" || input.value === null) {
    inputArray.push(input.value);
    console.log(inputArray);
    input.value = null;
    renderList(inputArray);
  }
});

function renderList(test) {
  ulElement.innerHTML = "";

  for (let leads of test) {
    const li = document.createElement("li");
    const linkTag = document.createElement("a");
    linkTag.href = leads;
    linkTag.target = "_blank";
    linkTag.textContent = leads;
    li.append(linkTag);
    ulElement.append(li);

    localStorage.setItem("inputArray", JSON.stringify(inputArray));
  }
}

if (localInputArray != null) {
  inputArray = localInputArray;
}

renderList(inputArray);
