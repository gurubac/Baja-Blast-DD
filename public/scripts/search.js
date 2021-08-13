
function searchAddress() {
  //First, set visibility of the unordered list once user enter text 
  //Then search for results :O 
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  //setting visibility first

  if (ul.style.display === "none") {
    ul.style.display = "inline";
  } else if (input.value.length == 0) {
    ul.style.display = "none"
  } else {
    ul.style.display = "inline";
  }
  //searching for items
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    //if text matches, show the matching item
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      //if text does not match the item, do not show the item
      li[i].style.display = "none";
    }
  }
}
