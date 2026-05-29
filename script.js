document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("petShopForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", (event) => {
        // Impede o envio padrão do formulário (recarregar a página)
        event.preventDefault();

        // Captura dos inputs
        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");

        // Flag de controle de validação
        let isValid = true;

        // 1. Validação do Campo Nome
        if (nome.value.trim() === "") {
            showError(nome, "error-nome");
            isValid = false;
        } else {
            clearError(nome, "error-nome");
        }

        // 2. Validação do Campo E-mail (Presença e Formato)
        if (email.value.trim() === "") {
            showError(email, "error-email", "O e-mail é obrigatório.");
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, "error-email", "Por favor, insira um e-mail válido.");
            isValid = false;
        } else {
            clearError(email, "error-email");
        }

        // 3. Validação do Campo Mensagem
        if (mensagem.value.trim() === "") {
            showError(mensagem, "error-mensagem");
            isValid = false;
        } else {
            clearError(mensagem, "error-mensagem");
        }

        // Se tudo estiver correto, simula o sucesso do envio
        if (isValid) {
            form.style.display = "none";       // Oculta o formulário
            successMessage.style.display = "flex"; // Exibe mensagem de sucesso

            // Aqui você capturaria os dados reais se fosse enviar para um servidor/API:
            console.log("Dados validados com sucesso:", {
                nome: nome.value,
                email: email.value,
                petNome: document.getElementById("petNome").value,
                mensagem: mensagem.value
            });
        }
    });

    // Funções Auxiliares de Validação
    function showError(inputElement, errorId, customMessage) {
        const parent = inputElement.parentElement;
        const errorSpan = document.getElementById(errorId);

        parent.classList.add("invalid");
        errorSpan.style.display = "block";
        if (customMessage) {
            errorSpan.textContent = customMessage;
        }
    }

    function clearError(inputElement, errorId) {
        const parent = inputElement.parentElement;
        const errorSpan = document.getElementById(errorId);

        parent.classList.remove("invalid");
        errorSpan.style.display = "none";
    }

    // Expressão regular básica para validar formatos de e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});