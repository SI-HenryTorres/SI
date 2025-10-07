document.addEventListener('DOMContentLoaded', () => {
    // Seletor para o contêiner dos links de navegação à direita
    const navRight = document.querySelector('.hidden.md\\:flex.items-center.space-x-6');
    if (!navRight) return; 

    // Encontra o link original 'Entrar' (geralmente o último elemento)
    const btnEntrar = navRight.querySelector('a:last-child');
    
    // Obter o estado e o tipo de login do localStorage (armazenado como string)
    const isLoggedIn = window.localStorage.getItem('isLoggedIn') === 'true';
    const userType = window.localStorage.getItem('userType');

    // Executa a substituição dos botões somente se o usuário estiver logado
    if (isLoggedIn) {
        let dashboardLink = '';
        let buttonText = '';
        let buttonColor = 'bg-aqua-main';
        let iconClass = 'fas fa-user-circle';

        // 1. Determina o link, texto, cor e ícone com base no userType
        if (userType === 'CPF') {
            dashboardLink = 'perfilUsuario.html';
            buttonText = 'Meu Perfil';
            // Cor e ícone padrão de usuário CPF
        } else if (userType === 'CNPJ') {
            // CORREÇÃO: Fluxo correto para Empresa Parceiro
            dashboardLink = 'perfilEmpresaDashBoard.html';
            buttonText = 'Dashboard Parceiro';
            buttonColor = 'bg-impact-green'; 
            iconClass = 'fas fa-chart-line';
        } else {
            // Se estiver logado mas o tipo for desconhecido, encerra
            return;
        }

        // 2. Remove o botão original 'Entrar'
        if (btnEntrar && (btnEntrar.href.includes('abaEntrar_login.html') || btnEntrar.textContent.trim() === 'Entrar')) {
            btnEntrar.remove();
        } else {
            // Se o botão não estiver lá (página já carregada dinamicamente), evita duplicação
            return;
        }
        
        // 3. Insere o botão de Perfil/Dashboard
        const profileButton = document.createElement('a');
        profileButton.href = dashboardLink;
        profileButton.className = `flex items-center py-2 px-5 ${buttonColor} text-white rounded-lg hover:${buttonColor}/80 transition duration-300 font-semibold`;
        profileButton.innerHTML = `<i class="${iconClass} mr-2"></i> ${buttonText}`;
        
        navRight.appendChild(profileButton);

        // 4. Insere o link de Logout
        const logoutButton = document.createElement('a');
        logoutButton.href = '#';
        logoutButton.className = `text-slate-800 hover:text-aqua-main transition duration-300 font-semibold ml-4`; 
        logoutButton.innerHTML = `<i class="fas fa-sign-out-alt mr-1"></i> Sair`;
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.localStorage.removeItem('isLoggedIn');
            window.localStorage.removeItem('userType');
            window.location.href = 'attLandindPage.html'; // Redireciona para o Início deslogado
        });
        navRight.appendChild(logoutButton);
    }
});