// assets/js/script.js
document.querySelectorAll('.menu .dropdown > a').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = btn.parentElement;
            parent.classList.toggle('open');
        }
    });
});

window.addEventListener("scroll", function () {
    const scrollBtn = document.querySelector(".back-to-top");
    if (window.scrollY > 200) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

// Comportement du bouton "Back to top"
document.querySelector(".back-to-top")?.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});


