document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.parametro-senha__botao');
    const campoSenha = document.querySelector('#campo-senha');
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
    const numeros = '0123456789';
    const simbolos = '!@%*?';
    const checkbox = document.querySelectorAll('.checkbox');
    const forcaSenha = document.querySelector('.forca');
    const valorEntropia = document.querySelector('.entropia');

    let tamanhoSenha = 12;
    const numeroSenha = document.querySelector('.parametro-senha__texto');
    numeroSenha.textContent = tamanhoSenha;

    botoes[0].addEventListener('click', diminuiTamanho);
    botoes[1].addEventListener('click', aumentaTamanho);
    checkbox.forEach(cb => cb.addEventListener('change', geraSenha));

    function diminuiTamanho() {
        if (tamanhoSenha > 1) {
            tamanhoSenha--;
        }
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }

    function aumentaTamanho() {
        if (tamanhoSenha < 20) {
            tamanhoSenha++;
        }
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }

    function classificaSenha() {
        let alfabeto = '';
        if (checkbox[0].checked) alfabeto += letrasMaiusculas;
        if (checkbox[1].checked) alfabeto += letrasMinusculas;
        if (checkbox[2].checked) alfabeto += numeros;
        if (checkbox[3].checked) alfabeto += simbolos;

        const entropia = tamanhoSenha * Math.log2(alfabeto.length);
        valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
        console.log(entropia);
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        if (entropia > 57) {
            forcaSenha.classList.add('forte');
        } else if (entropia > 35) {
            forcaSenha.classList.add('media');
        } else {
            forcaSenha.classList.add('fraca');
        }
    }

    function geraSenha() {
        let alfabeto = '';
        if (checkbox[0].checked) alfabeto += letrasMaiusculas;
        if (checkbox[1].checked) alfabeto += letrasMinusculas;
        if (checkbox[2].checked) alfabeto += numeros;
        if (checkbox[3].checked) alfabeto += simbolos;

        if (alfabeto.length === 0) {
            campoSenha.value = 'Selecione pelo menos uma opção';
            valorEntropia.textContent = '';
            forcaSenha.classList.remove('fraca', 'media', 'forte');
            return;
        }

        let senha = '';
        for (let i = 0; i < tamanhoSenha; i++) {
            const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
            senha += alfabeto[numeroAleatorio];
        }
        campoSenha.value = senha;
        classificaSenha();
    }

    geraSenha(); // Gera uma senha inicial
});
