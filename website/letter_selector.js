let i = 2;
function select_letter(selected_element) {
  let selected_letter = selected_element.childNodes[1].innerHTML;
  console.log(selected_letter);
  /*console.log(typeof selected_letter);*/
  let txt;
  let r = confirm("¿Está la letra " + selected_letter + " en la palabra? ");
  if (r == true) {
    txt = "La letra " + selected_letter + ", SI está en la palabra.";
    console.log(txt);
  } else {
    txt = "La letra " + selected_letter + ",  NO está en la palabra";
    console.log(txt);
    selected_element.setAttribute("class", "letter letter_dissable p");
    selected_element.setAttribute("onclick", "");
    let gallows_image = document.getElementById("gallows_image");
    console.log(gallows_image);
    gallows_image.setAttribute("src", "./img/Gallows" + i + ".png");
    if (i < 10) {
      i = i + 1;
    } else gallows_image.setAttribute("src", "./img/Gallows10.png");
  }
}
