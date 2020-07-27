document.querySelector('header button').addEventListener("click", function() {
    // toggle = se não tiver a class, remove; se não, coloca.
    document.querySelector('.form').classList.toggle('hide')
})