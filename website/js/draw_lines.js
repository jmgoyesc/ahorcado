function draw_lines(amount_letters_numbertype) {
  document.getElementById("amountLetters").style.display = "none";
  document.getElementById("lines").style.display = "flex";

  for (let i = 0; i < amount_letters_numbertype; i++) {
    // create a new div element
    const new_div_line = document.createElement("div");
    new_div_line.setAttribute("class", "line");
    new_div_line.id = "line_"+i;
    new_div_line.setAttribute("onclick", "assign_letter(this)");

    // and give it some content
    const new_content_line = document.createElement("p");
    new_content_line.innerHTML = "";

    // add the text to the newly created div
    new_div_line.appendChild(new_content_line);

    // add the newly created element and its content into the DOM
    const lines_container = document.getElementById("lines");
    lines_container.appendChild(new_div_line);
  }
}
