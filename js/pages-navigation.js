function handleLocationChange(location) {
    let page = document.getElementById('home');

    if (location === page.href) {
        page.classList.add('home-button')
    }
}