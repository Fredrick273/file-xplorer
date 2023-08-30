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

      const showButton = document.querySelectorAll("#shownefolderdialog");
      const newfolderDialog = document.getElementById("newfolderdialog");
      const uploadfileshowbutton = document.querySelectorAll("#showuploadfiledialog");
      const uploadfiledialog = document.getElementById("uploadfiledialog");
      const deletefiledialog = document.getElementById("deletefiledialog");
      const showdeletedialog = document.getElementById("showdeletedialog");
      const showrenamedialog = document.getElementById("showrenamedialog");
      const renamedialog = document.getElementById("renamefiledialog")
      const newfiledialog = document.getElementById("newfiledialog");
      const shownewfiledialog = document.getElementById("shownewfiledialog");
      

      shownewfiledialog.addEventListener("click", ()=>{
        newfiledialog.showModal();
      })


      showButton.forEach((e) =>
        e.addEventListener("click", () => {
          newfolderDialog.showModal();
        })
      );

      uploadfileshowbutton.forEach((e) =>
        e.addEventListener("click", () => {
          uploadfiledialog.showModal();
        })
      );

     // Add an event listener to show the delete dialog when "Delete" is clicked
showrenamedialog.addEventListener("click", () => {
  const folderName = event.target.getAttribute("data-folder");
  const renamefolderinput = document.getElementById("renamefoldername");
  renamefolderinput.value = folderName;
  renamedialog.showModal();
});

showdeletedialog.addEventListener("click", () => {
  const folderName = event.target.getAttribute("data-folder");
  const deleteFolderNameInput = document.getElementById("deleteFolderName");
  deleteFolderNameInput.value = folderName;
  deletefiledialog.showModal();
});


function closeREnameDialog(){
renamedialog.close();
}

// Function to close the delete dialog
function closeDeleteFileDialog() {
  deletefiledialog.close();
}

function closenewfiledialog(){
  newfiledialog.close();
}

      function closeUploadFileDialog() {
        uploadfiledialog.close();
      }

      function hideCustomContextMenu() {
        document.getElementById("customContextMenu").style.display = "none";
        document.getElementById("customContextMenu-file").style.display = "none";
      }
  
      function showCustomContextMenu(event) {
  event.preventDefault();
  var myContextMenu = document.getElementById("customContextMenu");
  var myContextMenuFile = document.getElementById("customContextMenu-file");
  const folderName = event.target.getAttribute("data-folder");
    const delebutton = document.getElementById("showdeletedialog");
    const renamebutton = document.getElementById("showrenamedialog");

  myContextMenu.style.display = "none";
  myContextMenuFile.style.display = "none";
  
  if (event.target.classList.contains('folder')) {
    
    delebutton.setAttribute("data-folder", folderName); 
    renamebutton.setAttribute("data-folder", folderName);
    myContextMenuFile.style.display = "block";
    myContextMenuFile.style.left = (event.pageX + 10) + "px";
    myContextMenuFile.style.top = (event.pageY + 10) + "px";
  } else if (event.target.classList.contains('file')) {
 
    delebutton.setAttribute("data-folder", folderName);  
    renamebutton.setAttribute("data-folder", folderName);
    myContextMenuFile.style.display = "block";
    myContextMenuFile.style.left = (event.pageX + 10) + "px";
    myContextMenuFile.style.top = (event.pageY + 10) + "px";
  } else {
    myContextMenu.style.display = "block";
    myContextMenu.style.left = (event.pageX + 10) + "px";
    myContextMenu.style.top = (event.pageY + 10) + "px";
  }
}



function hideCustomContextMenu() {
  var myContextMenu = document.getElementById("customContextMenu");
  var myContextMenuFile = document.getElementById("customContextMenu-file");

  myContextMenu.style.display = "none";
  myContextMenuFile.style.display = "none";
}

document.onclick = hideCustomContextMenu;
document.oncontextmenu = showCustomContextMenu;

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