document.addEventListener('DOMContentLoaded', () => {
    // 1. Навигация по главам
    const navLinks = document.querySelectorAll('.toc-nav a');
    const pages = document.querySelectorAll('.content-page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === `page-${pageId}`) {
                    page.classList.add('active');
                }
            });

            // Прокрутка документа вверх
            document.querySelector('.content-viewer').scrollTop = 0;
        });
    });

    // 2. Сворачивание панели Содержания
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // 3. Масштабирование
    let zoomLevel = 100;
    const sheet = document.getElementById('document-sheet');
    const zoomVal = document.getElementById('zoom-value');

    document.getElementById('zoom-in').addEventListener('click', () => {
        if (zoomLevel < 150) {
            zoomLevel += 10;
            updateZoom();
        }
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        if (zoomLevel > 70) {
            zoomLevel -= 10;
            updateZoom();
        }
    });

    function updateZoom() {
        sheet.style.transform = `scale(${zoomLevel / 100})`;
        zoomVal.textContent = `${zoomLevel}%`;
    }

    // 4. Темы (Светлая / Темная)
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeBtn.textContent = document.body.classList.contains('dark-theme') ? 'Жарық' : 'Қараңғы';
    });

    // 5. Полноэкранный режим
    const fsBtn = document.getElementById('fullscreen-toggle');
    fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
});
