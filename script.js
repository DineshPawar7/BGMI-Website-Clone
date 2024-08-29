document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer for animating news items when they enter the viewport
    const newsItems = document.querySelectorAll(".news-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop observing if you don't want to re-trigger animation
            }
        });
    }, { threshold: 0.1 });

    newsItems.forEach(item => {
        observer.observe(item);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Slideshow functionality
    const slidesContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the start
        showSlides();
    }

    function previousSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop back to the end
        showSlides();
    }

    // Event listener for dragging to change slides
    slidesContainer.addEventListener('mousedown', (event) => {
        const startX = event.clientX;

        function onMouseUp(event) {
            const endX = event.clientX;

            if (startX > endX) {
                nextSlide();
            } else if (startX < endX) {
                previousSlide();
            }

            slidesContainer.removeEventListener('mouseup', onMouseUp); // Clean up event listener
        }

        slidesContainer.addEventListener('mouseup', onMouseUp, { once: true });
    });

    // Optionally add swipe support for touch devices
    slidesContainer.addEventListener('touchstart', (event) => {
        const startX = event.touches[0].clientX;

        function onTouchEnd(event) {
            const endX = event.changedTouches[0].clientX;

            if (startX > endX) {
                nextSlide();
            } else if (startX < endX) {
                previousSlide();
            }

            slidesContainer.removeEventListener('touchend', onTouchEnd); // Clean up event listener
        }

        slidesContainer.addEventListener('touchend', onTouchEnd, { once: true });
    });

    // Initial display of slides
    showSlides();
});
