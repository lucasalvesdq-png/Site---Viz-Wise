    // 1. Inicializa o EmailJS
    emailjs.init("uU1QRGXbGTYKV8eFZ");

    // 2. Esperamos o HTML carregar e "agarramos" o formulário
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById('contactForm');
        
        // 3. Este comando é à prova de balas para intercetar o botão de Enviar
        form.addEventListener('submit', function(event) {
            
            // ISTO É O QUE IMPEDE A PÁGINA DE LIMPAR E RECARREGAR!
            event.preventDefault(); 

            const submitBtn = form.querySelector('.form-submit');
            const successMsg = document.getElementById('successMsg');

            // Muda visualmente o botão para mostrar que está a trabalhar
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'A enviar...';
            submitBtn.disabled = true;

            // Envia os dados para a sua conta EmailJS
            emailjs.sendForm('service_f8ykuxh', 'template_z91h528', form)
                .then(function() {
                    // SUCESSO: O email foi!
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    form.reset(); // Agora sim limpamos os campos, mas de propósito
                    successMsg.style.display = 'block'; // Mostra a mensagem verde
                    
                    setTimeout(function() {
                        successMsg.style.display = 'none';
                    }, 6000);
                }, function(error) {
                    // ERRO: O EmailJS barrou
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    alert("Atenção, erro na comunicação com o EmailJS: " + JSON.stringify(error));
                });
        });
    });