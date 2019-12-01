document.body.addEventListener("click", clickHandler);

function clickHandler(event) {
  event.preventDefault();

  if (!event.target.hasAttribute("data-editable")) return;

  let targetElement = event.target;
  let parentElement = targetElement.parentNode;

  let type = targetElement.getAttribute("data-editable");

  let inputElement = document.createElement("input");
  inputElement.setAttribute("type", type);
  parentElement.appendChild(inputElement);
  inputElement.value = targetElement.innerText;
  inputElement.classList.add("form-control");

  parentElement.removeChild(targetElement);

  inputElement.select();

  inputElement.addEventListener("blur", function(event) {
    parentElement.appendChild(targetElement);
    parentElement.removeChild(inputElement);
  });

  inputElement.addEventListener("keyup", function(event) {
    switch (event.which) {
      case 13:
        targetElement.innerText = inputElement.value;
        inputElement.blur();
        break; // save
      case 27:
        inputElement.blur();
        break; // cancel
    }
  });
}
