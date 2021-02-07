function draw_lines() {
  const amount_letters = document.getElementById("amountLetters_number");
  console.log(amount_letters.value, typeof amount_letters.value);

  const amount_letters_numbertype=Number(amount_letters.value);
  console.log(amount_letters_numbertype, typeof amount_letters_numbertype);

  if (isNaN(amount_letters_numbertype)) {
    alert("Por favor ingrese un número.");
  } else {     
    document.getElementById("amountLetters").style.display = "none";  
  }


}
