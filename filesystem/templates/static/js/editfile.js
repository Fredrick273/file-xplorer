color = "light";
$(document).ready(function () {
  if (color != getCookie("theme")){
    change();
  }
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#all div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

function back() {
  window.open("./..", "_self");
}

function change() {
  if (color == "light") {
    color = "dark";
    document
      .getElementById("color-mode")
      .setAttribute("data-bs-theme", "dark");
    document
      .getElementById("color-mode-button")
      .setAttribute("class", "btn btn-outline-light");

    document.querySelector(".text-editor").style.backgroundColor =
      "rgb(21,27,37)";
    document.querySelector("#editor").style.backgroundColor =
      "rgb(21,27,37)";
      document.querySelector("#editor").style.color =
      "rgb(233,236,239)";
  } else {
    color = "light";
    document
      .getElementById("color-mode")
      .setAttribute("data-bs-theme", "light");
    document
      .getElementById("color-mode-button")
      .setAttribute("class", "btn btn-outline-secondary");

    document.querySelector(".text-editor").style.backgroundColor =
      "rgb(250,250,250)";
      document.querySelector("#editor").style.backgroundColor =
      "rgb(250,250,250)";
      document.querySelector("#editor").style.color =
      "rgb(0,0,0)";
  }
}

// Template function
function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i <ca.length; i++) {
let c = ca[i];
while (c.charAt(0) == ' ') {
c = c.substring(1);
}
if (c.indexOf(name) == 0) {
return c.substring(name.length, c.length);
}
}
return "";
}

function download(){
  window.open("{% url 'filepreview' dir=addr %}",'_blank');
}