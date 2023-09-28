

      function back() {
        window.open("./..", "_self");
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
