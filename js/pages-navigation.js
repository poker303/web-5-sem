function handleLocationChange(location, background, color) {
    let page = document.getElementById('home');

    if (location === page.href) {
        page.style.background = background;
        page.style.color = color;
        page.style.textDecorationLine = "underline"
    }
}