

// function validarFormulario() {
//     // Valida campos vazios
//     if (!validarCampos()) {
//         return false;
//     }
    
//     // Valida idade mínima (16 anos)
//     if (!validarIdade()) {
//         return false;
//     }
    
//     // Valida CPF
//     if (!validarCPF()) {
//         return false;
//     }
    
//     // Valida senha
//     if (!validarSenha()) {
//         return false;
//     }
    
//     // Se todas as validações passarem, redireciona
//     location.href = "Biblioteca.html";
//     return true;
// }

async function validarFormulario(event) {
    if (event) event.preventDefault(); // Impede o envio imediato
    console.log("Iniciando validação do formulário...");

    // Validações em ordem
    if (!validarCampos()) return false;
    if (!validarIdade()) return false;
    if (!validarCPF()) return false;
    if (!validarSenha()) return false;
    if (!validarTelefoneCompleto()) return false;

    // Exibe o balão de confirmação
    const { isConfirmed } = await Swal.fire({
        title: 'Termos e Condições',
        html: `
            <div style="text-align: left;">
                <p>Você confirma que:</p>
                <ul>
                    <li>Concorda com nossos <a href="termos.html" target="_blank" style="color: #B45502;">Termos e Condições</a></li>
                    <li>Todos os dados fornecidos são legítimos e verdadeiros</li>
                    <li>Está ciente das consequências de fornecer informações falsas</li>
                </ul>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, concordo',
        cancelButtonText: 'Não concordo',
        confirmButtonColor: '#B45502',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        backdrop: `
            rgba(0,0,0,0.7)
            url("https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif")
            center top
            no-repeat
        `,
        customClass: {
            popup: 'swal-termos',
            confirmButton: 'swal-confirm-btn'
        }
    });

    if (isConfirmed) {
        window.location.href = "Cadastro.php";
    }
}


// Função para validar telefone completo (11 dígitos)
function validarTelefoneCompleto() {
    var telefone = document.getElementById('telefone').value.replace(/\D/g, "");
    if (telefone.length < 11) {
        alert("O telefone deve conter 11 dígitos!");
        return false;
    }
    return true;
}



// Função para validar idade mínima (16 anos)
function validarIdade() {
    var dataNascimento = document.getElementById('data').value;
    var hoje = new Date();
    var nascimento = new Date(dataNascimento);
    
    // Calcula a idade
    var idade = hoje.getFullYear() - nascimento.getFullYear();
    var mes = hoje.getMonth() - nascimento.getMonth();
    
    // Ajusta se ainda não fez aniversário este ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    // Verifica se tem pelo menos 16 anos
    if (idade < 16) {
        alert("Você deve ter pelo menos 16 anos para se cadastrar!");
        return false;
    }
    
    return true;
}

// Função validarCampos()
function validarCampos() {
    var campos = ['nome', 'data', 'email', 'senha', 'senha2', 'cpf'];
    for (var campo of campos) {
        if (document.getElementById(campo).value === "") {
            alert("Preencha todos os campos!");
            return false;
        }
    }
    return true;
}


function validarCPF() {
    var cpf = document.getElementById('cpf').value;
    var cpfSonumeros = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    
    // Verifica CPFs inválidos conhecidos
    if (cpfSonumeros === '00000000000' || 
        cpfSonumeros === '11111111111' || 
        cpfSonumeros === '22222222222' || 
        cpfSonumeros === '33333333333' || 
        cpfSonumeros === '44444444444' || 
        cpfSonumeros === '55555555555' || 
        cpfSonumeros === '66666666666' || 
        cpfSonumeros === '77777777777' || 
        cpfSonumeros === '88888888888' || 
        cpfSonumeros === '99999999999') {
        alert("CPF inválido!");
        return false;
    }
    
    var primeirosNumeros = cpfSonumeros.substr(0, 9);
    var dezPrimeiros = cpfSonumeros.substr(0, 10);
    var somaNove = 0;
    var somaDez = 0;
    var multiplicador = 10;

    for (var i = 0; i < primeirosNumeros.length; i++) {
        var numero = primeirosNumeros.substr(i, 1);
        somaNove += numero * multiplicador;
        multiplicador--;
    }

    multiplicador = 11;

    for (var i = 0; i < dezPrimeiros.length; i++) {
        var numero = dezPrimeiros.substr(i, 1);
        somaDez += numero * multiplicador;
        multiplicador--;
    }

    var resultadoModulo1 = (somaNove * 10) % 11;
    var resultadoModulo2 = (somaDez * 10) % 11;
    
    // Se o resto da divisão for 10, consideramos 0
    resultadoModulo1 = resultadoModulo1 === 10 ? 0 : resultadoModulo1;
    resultadoModulo2 = resultadoModulo2 === 10 ? 0 : resultadoModulo2;

    if ((resultadoModulo1.toString() + resultadoModulo2.toString()) !== cpfSonumeros.substr(9, 2)) {
        alert("CPF inválido!");
        return false;
    }
    return true;
}

// Função original para validação no submit
function validarSenha() {
    var senha = document.getElementById('senha').value;
    var senha2 = document.getElementById('senha2').value;

    if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres!");
        return false;
    }

    if (senha !== senha2) {
        alert("As senhas não coincidem!");
        return false;
    }

    return true;
}

// Função para validação em tempo real
function validarConfirmacaoSenha() {
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
    const feedback = document.getElementById('senha2-feedback');
    
    if (senha2.length === 0) {
        feedback.textContent = "";
    } else if (senha !== senha2) {
        feedback.textContent = "✖ As senhas não coincidem";
        feedback.style.color = "red";
    } else {
        feedback.textContent = "✔ Senhas coincidem";
        feedback.style.color = "green";
    }
}

// Adiciona os event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('senha').addEventListener('input', validarConfirmacaoSenha);
    document.getElementById('senha2').addEventListener('input', validarConfirmacaoSenha);
});




//visualiza senha
function mostrarsenha(){
    var inputpass = document.getElementById('senha')
    var btnshowpass = document.getElementById('btn-senha')

    if(inputpass.type === 'password'){
        inputpass.setAttribute('type', 'text')
        btnshowpass.classList.replace('fa-eye', 'bi-eye-slash')
    }else {
        inputpass.setAttribute('type', 'password')
        btnshowpass.classList.replace('bi-eye-slash', 'fa-eye')
    }
}

function mostrarsenha2(){
    var inputpass = document.getElementById('senha2')
    var btnshowpass = document.getElementById('btn-senha2')

    if(inputpass.type === 'password'){
        inputpass.setAttribute('type', 'text')
        btnshowpass.classList.replace('fa-eye', 'bi-eye-slash')
    }else {
        inputpass.setAttribute('type', 'password')
        btnshowpass.classList.replace('bi-eye-slash', 'fa-eye')
    }
}


// Configuração da máscara e validação em tempo real do telefone
var celular = document.getElementById("telefone");
var telefoneFeedback = document.createElement('small');
telefoneFeedback.id = 'telefone-feedback';
celular.parentNode.appendChild(telefoneFeedback);

celular.addEventListener("input", function(e) {
    // Código da máscara (mantido igual)
    var cursorPosition = e.target.selectionStart;
    var inputValue = celular.value;
    var limparvalor = inputValue.replace(/\D/g, "");
    var isDeleting = inputValue.length > celular.value.length;
    limparvalor = limparvalor.substring(0, 11);
    
    var numeroformatado = "";
    if (limparvalor.length > 0) numeroformatado += `(${limparvalor.substring(0, 2)}`;
    if (limparvalor.length > 2) numeroformatado += `) ${limparvalor.substring(2, 7)}`;
    if (limparvalor.length > 7) numeroformatado += `-${limparvalor.substring(7)}`;
    
    celular.value = numeroformatado;
    
    if (!isDeleting) {
        if (limparvalor.length <= 2) cursorPosition = numeroformatado.length;
        else if (limparvalor.length <= 7) cursorPosition = numeroformatado.length;
        else cursorPosition = numeroformatado.length;
    }
    
    celular.setSelectionRange(cursorPosition, cursorPosition);
    
    // Validação em tempo real
    if (limparvalor.length === 0) {
        telefoneFeedback.textContent = "";
    } else if (limparvalor.length < 11) {
        telefoneFeedback.textContent = "✖ Telefone incompleto (11 dígitos necessários)";
        telefoneFeedback.className = "invalid";
    } else {
        telefoneFeedback.textContent = "✔ Telefone válido";
        telefoneFeedback.className = "valid";
    }
});

// Adicione este CSS para o feedback
document.head.insertAdjacentHTML('beforeend', `
<style>
    #telefone-feedback {
        display: block;
        font-size: 0.8em;
        margin-top: 5px;
    }
    #telefone-feedback.valid {
        color: green;
    }
    #telefone-feedback.invalid {
        color: red;
    }
</style>
`);



// Permite navegação com teclas de seta e delete
celular.addEventListener("keydown", function(e) {
    // Permite: backspace, delete, tab, escape, enter, setas
    if ([46, 8, 9, 27, 13, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
        return;
    }
    
    // Impede caracteres não numéricos
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//mascara cpf
let campocpf = document.getElementById("cpf")
campocpf.addEventListener("keypress", () => {
    let tamanhocampo = campocpf.value.length;
    if(tamanhocampo === 3 || tamanhocampo === 7){
        campocpf.value += "."
    } else if(tamanhocampo === 11){
        campocpf.value += "-"
    }
})


// Adicione este evento ao formulário
document.querySelector('form').addEventListener('submit', validarFormulario);
