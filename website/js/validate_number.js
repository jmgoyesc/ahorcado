function validate_number() {
  const amount_letters = document.getElementById("amountLetters_number");
  console.log(amount_letters.value, typeof amount_letters.value);

  const amount_letters_numbertype = Number(amount_letters.value);
  console.log(amount_letters_numbertype, typeof amount_letters_numbertype);

  if (isNaN(amount_letters_numbertype)) {
    alert("Por favor ingrese un número.");
  } else {
    if (amount_letters_numbertype <= 0 || amount_letters_numbertype > 30) {
      alert(
        "Por favor ingrese un número mayor a cero (0) y menor a treinta (30)."
      );
    } else {
      draw_lines(amount_letters_numbertype);
    }
  }
}
