document.addEventListener("DOMContentLoaded", function () {
  var modelFilterSelect = document.getElementById("model-filter");
  var mpnFilterInput = document.getElementById("mpn-filter");
  var modelList = document.getElementById("model-list");

  var uniqueValues = new Set();
  models.forEach(function (item) {
    if (item[2] && item[2].trim().length && item[2].length > 2) {
      var splitValues = item[2]
        .split(",")
        .map((value) => value.trim().replace(/\s/g, "").toUpperCase()); //value.replace(/\s/g, "") не надо а то потом фильтровать не удобно будет

      splitValues.forEach((value) => {
        uniqueValues.add(value);
      });
      var li = document.createElement("li");
      var div = document.createElement("div");
      div.classList.add("d-flex");

      var spanMpn = document.createElement("span");
      var spanArticle = document.createElement("span");
      var spanDescription = document.createElement("span");
      var spanModel = document.createElement("span");

      spanMpn.classList.add("mpn");
      spanMpn.innerText = item[0];
      spanMpn.title = "MPN"
      spanArticle.classList.add("article");
      spanArticle.title = "Article"
      spanArticle.innerText = item[3];
      spanDescription.classList.add("description");
      spanDescription.title = "Description"
      spanDescription.innerText = item[1];
      spanModel.classList.add("model");
      spanModel.innerText = item[2].replace(/\s/g, "").toUpperCase();
      div.appendChild(spanMpn);
      div.appendChild(spanArticle);
      div.appendChild(spanDescription);
      div.appendChild(spanModel);
      li.appendChild(div);
      modelList.appendChild(li);
    }
  });

  uniqueValues.forEach(function (value) {
    var option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    modelFilterSelect.appendChild(option);
  });

  
  modelFilterSelect.addEventListener("change", function () {
    var modelListItems = modelList.querySelectorAll("li");
    var selectedValue = modelFilterSelect.value;
    console.log(selectedValue);
    var mpnFilterInput = document.getElementById("mpn-filter").value;
    console.log(mpnFilterInput);


    modelListItems.forEach(function (item) {
      var modelText = item.textContent;
      if (selectedValue == "" || modelText.includes(selectedValue)) {

        if(mpnFilterInput ==="" || item.textContent.includes(mpnFilterInput) ){
          item.style.display = "block";
        }else {
          item.style.display = "none";
        }
        
      } else {
        item.style.display = "none";
      }
    });
  });

  mpnFilterInput.addEventListener("input", function () {
    var selectedValue = modelFilterSelect.value;
    console.log(selectedValue);

    var modelListItems = modelList.querySelectorAll("li");
    var filterValue = mpnFilterInput.value.toLowerCase();

    modelListItems.forEach(function (item) {
      var mpnText = item.textContent.toLowerCase();

      if (selectedValue !== "" && item.textContent.includes(selectedValue)) {
        console.log(filterValue);
        if (mpnText.includes(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      } else {
        item.style.display = "none";
      }
    });
  });

  modelFilterSelect.value = "CS55PLUS";
  modelFilterSelect.dispatchEvent(new Event('change'));
});
