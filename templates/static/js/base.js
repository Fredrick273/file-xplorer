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

      
      function change() {
        if (color == "light") {
          color = "dark";
          document.cookie = "theme=dark; expires=Thu, 18 Dec 2050 12:00:00 UTC";
          document
            .getElementById("color-mode")
            .setAttribute("data-bs-theme", "dark");
          document
            .getElementById("color-mode-button")
            .setAttribute("class", "btn btn-outline-light");

          document.querySelector(".root").style.backgroundColor =
            "rgb(40,40,40)";
        } else {
          color = "light";
          document.cookie = "theme=light; expires=Thu, 18 Dec 2050 12:00:00 UTC";
          document
            .getElementById("color-mode")
            .setAttribute("data-bs-theme", "light");
          document
            .getElementById("color-mode-button")
            .setAttribute("class", "btn btn-outline-secondary");

          document.querySelector(".root").style.backgroundColor =
            "rgb(250,250,250)";
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