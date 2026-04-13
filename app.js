import { branches } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const scannedBranchId = urlParams.get('branch');

    const loader = document.getElementById('loader');
    const homeView = document.getElementById('home-view');
    const menuView = document.getElementById('menu-view');
    const branchesContainer = document.getElementById('branches-list');
    
    // Tezgah Yükleme Ekranı Bitişi
    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 800);
    }, 1800);

    function renderHome() {
        branchesContainer.innerHTML = '';
        
        branches.forEach((branch, index) => {
            const isHere = branch.id === scannedBranchId;
            const hasScanned = !!scannedBranchId;
            
            const card = document.createElement('div');
            card.className = `branch-card ${hasScanned ? (isHere ? 'active-branch' : 'inactive-branch') : ''}`;
            card.style.animationDelay = `${index * 0.15}s`;
            
            const hereBadge = isHere 
                ? `<div class="you-are-here-bottom">📍 ŞU AN BURADASINIZ</div>`
                : '';

            card.innerHTML = `
                <div class="branch-img-wrapper">
                    <!-- GitHub Pages veya lokalde resmin yüklenememe ihtimaline karşı fallback fotoğraf -->
                    <img src="${branch.image}" alt="${branch.name}" onerror="this.src='https://images.unsplash.com/photo-1555507036-ab1d4075c3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
                <div class="branch-info">
                    <h3>${branch.name}</h3>
                    <p class="address-text">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${branch.address}
                    </p>
                    ${hereBadge}
                </div>
            `;

            card.addEventListener('click', () => openMenu(branch));
            branchesContainer.appendChild(card);
        });
    }

    let currentBranch = null;

    function openMenu(branch) {
        currentBranch = branch;
        
        homeView.classList.remove('active');
        homeView.classList.add('hidden');
        menuView.classList.remove('hidden');
        menuView.classList.add('active');
        
        const heroEl = document.getElementById('menu-hero');
        document.getElementById('menu-branch-name').innerText = branch.name;
        document.getElementById('menu-branch-address').innerText = branch.address;
        
        heroEl.style.backgroundImage = `url('${branch.image}'), url('https://images.unsplash.com/photo-1555507036-ab1d4075c3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`;
        
        renderCategories(branch.categories);
        renderMenuItems(branch.menu[0].items);

        window.scrollTo(0, 0);
    }

    document.getElementById('back-button').addEventListener('click', () => {
        menuView.classList.remove('active');
        menuView.classList.add('hidden');
        homeView.classList.remove('hidden');
        homeView.classList.add('active');
        window.scrollTo(0, 0);
    });

    function renderCategories(categories) {
        const catContainer = document.getElementById('categories-container');
        catContainer.innerHTML = '';
        
        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `category-btn ${index === 0 ? 'active' : ''}`;
            btn.innerText = cat;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const categoryData = currentBranch.menu.find(m => m.category === cat);
                if(categoryData) {
                    renderMenuItems(categoryData.items);
                }
            });
            
            catContainer.appendChild(btn);
        });
    }

    function renderMenuItems(items) {
        const container = document.getElementById('menu-items');
        container.innerHTML = '';
        
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.style.animationDelay = `${index * 0.08}s`;
            
            const imageHtml = item.img 
                ? `<div class="item-img-wrapper"><img src="${item.img}" alt="${item.name}"></div>` 
                : '';

            div.innerHTML = `
                ${imageHtml}
                <div class="item-info">
                    <h4>${item.name}</h4>
                    ${item.desc ? `<p>${item.desc}</p>` : ''}
                </div>
                <div class="item-price">${item.price}</div>
            `;
            
            container.appendChild(div);
        });
    }

    renderHome();

    document.querySelector('.app-header').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
