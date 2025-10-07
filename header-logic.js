document.addEventListener('DOMContentLoaded', () => {
    // 1. Defina os elementos que você precisa esconder/substituir
    const navRight = document.querySelector('.hidden.md\\:flex.items-center.space-x-6');
    if (!navRight) return; 

    // O botão Entrar é sempre o último elemento do menu de navegação no seu HTML
    const btnEntrar = navRight.querySelector('a:last-child');
    
    // Obtenha o estado de login
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const userType = window.localStorage.getItem('userType');

    if (isLoggedIn === 'true') {
        let dashboardLink = '';
        let buttonText = '';
        let buttonColor = 'bg-aqua-main';
        let iconClass = 'fas fa-user-circle';

        if (userType === 'CPF') {
            dashboardLink = 'perfilUsuario.html'; // Corrigido para o nome do arquivo do usuário
            buttonText = 'Meu Perfil';
        } else if (userType === 'CNPJ') {
            dashboardLink = 'perfilEmpresaDashBoard.html'; // Corrigido para o nome do arquivo da empresa
            buttonText = 'Dashboard Parceiro';
            buttonColor = 'bg-impact-green'; 
            iconClass = 'fas fa-chart-line';
        }

        // 2. Esconda o botão "Entrar" e crie o novo botão de perfil
        if (btnEntrar) {
             // Esconde o botão original "Entrar"
            btnEntrar.style.display = 'none';

            // Cria o novo botão "Meu Perfil" / "Dashboard"
            const profileButton = document.createElement('a');
            profileButton.href = dashboardLink;
            profileButton.className = `flex items-center py-2 px-5 ${buttonColor} text-white rounded-lg hover:${buttonColor}/80 transition duration-300 font-semibold`;
            profileButton.innerHTML = `<i class="${iconClass} mr-2"></i> ${buttonText}`;

            // Insere o novo botão
            navRight.appendChild(profileButton);

            // Opcional: Adicionar um botão de Logout
            const logoutButton = document.createElement('a');
            logoutButton.href = '#';
            logoutButton.className = `text-slate-800 hover:text-aqua-main transition duration-300 ml-4`; 
            logoutButton.innerHTML = `Sair`;
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.localStorage.removeItem('isLoggedIn');
                window.localStorage.removeItem('userType');
                window.location.href = 'attLandindPage.html'; // Redireciona para o Início deslogado
            });
            navRight.appendChild(logoutButton);
        }
    }
});