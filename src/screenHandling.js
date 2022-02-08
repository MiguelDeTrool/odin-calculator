function addTextContent(content) {
    document.querySelector(".screen").textContent += content;
}

let operandAndOperatorButtons = document.querySelectorAll("button:not(.top):not(.evaluate)");

operandAndOperatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        addTextContent(button.textContent);
    });
});