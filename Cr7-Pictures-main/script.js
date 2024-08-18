const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');

gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-img')) {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
    }
});

close.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});



function loadImages() {
    return new Promise((resolve) => {
        const images = document.images;
        const totalImages = images.length;
        let loadedImages = 0;

        // If there are no images, resolve immediately
        if (totalImages === 0) {
            resolve();
        }

        // Load each image
        Array.from(images).forEach(img => {
            if (img.complete) {
                incrementCounter();
            } else {
                img.addEventListener('load', incrementCounter);
                img.addEventListener('error', incrementCounter);
            }
        });

        function incrementCounter() {
            loadedImages++;
            if (loadedImages === totalImages) {
                resolve();
            }
        }
    });
}

window.addEventListener('load', () => {
    loadImages().then(() => {
        // Hide loader and show content
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    });
});