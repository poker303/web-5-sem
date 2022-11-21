function calcLoadTime() {
    let loadTime = window.performance.getEntriesByType('navigation');
    return "Время загрузки страницы: " + Math.round(loadTime[0].domComplete) + 'ms';
}

function loadingTime() {
    let element = document.getElementById('time-of-loading');
    let text = document.createTextNode(calcLoadTime());

    element.appendChild(text);
}