window.addEventListener('keydown', function(e) {
    const selBut = this.document.querySelector(`button[data-key="${e.key}"]`);
    selBut.classList.add('hit');


    switch (e.key) {
        case 'Backspace':
            backspace();
            break;
        case 'Shift':
            clearScreenAndMemory();
            break;
        case 'Enter':
            evaluate();
            lastOperator = "";
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(selBut.textContent);
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            handleNumber(selBut.textContent);
            break;
    }
});

const allButtons = document.querySelectorAll(".key");

allButtons.forEach(function(button) {
    button.addEventListener('transitionend', function(e) {
        e.target.classList.remove('hit');
    });
    button.addEventListener("click", function (key) {
        button.classList.add('hit');
    });
});