document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');

    // Inicializa o display com '0'
    display.value = '0';

    // Função para adicionar o caractere digitado no display
    function adicionarCaracter(caracter) {
        // Se o valor do display for '0' e o caractere não for um operador, substitui o '0' pelo número
        if (display.value === '0' && !isNaN(caracter)) {
            display.value = caracter;
        } else {
            display.value += caracter;
        }
    }

    // Função para limpar a tela
    function limparTela() {
        display.value = '0';  // Garante que o valor inicial seja '0'
    }

    // Função para calcular o valor no display
    function calcular() {
        const expressao = display.value;

        // Previne a divisão por zero
        if (expressao.includes('/0')) {
            display.value = 'Erro';
        } else {
            try {
                // Usa a função eval para calcular a expressão, se possível
                display.value = eval(expressao);
            } catch {
                // Exibe erro para expressões inválidas
                display.value = 'Erro';
            }
        }
    }

    // Função para inverter o sinal do valor atual no display
    function inverte() {
        display.value = (parseFloat(display.value) * -1).toString();
    }

    // Captura eventos de teclado para realizar operações
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        // Adiciona números e operadores
        if (!isNaN(key) || ['+', '-', '*', '/'].includes(key)) {
            event.preventDefault(); // Evita a ação padrão do teclado
            adicionarCaracter(key); // Adiciona números e operadores
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault(); // Evita o comportamento padrão do Enter
            calcular(); // Calcula o resultado ao pressionar Enter ou =
        } else if (key === 'Backspace') {
            event.preventDefault(); // Evita o comportamento padrão do Backspace
            // Remove o último caractere
            display.value = display.value.slice(0, -1);
            if (display.value === '') {
                display.value = '0'; // Se o display ficar vazio, volta a exibir 0
            }
        }
    });

    // Liga os botões da calculadora aos seus respectivos eventos
    const botoes = document.querySelectorAll('button');
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const valor = this.textContent;
            if (valor === 'AC') {
                limparTela();
            } else if (valor === '=') {
                calcular();
            } else if (valor === '+/-') {
                inverte();
            } else {
                adicionarCaracter(valor);
            }
        });
    });

    // Garante que o display tenha foco inicial
    display.focus();
});