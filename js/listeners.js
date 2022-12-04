window.addEventListener('load', () => loadingTime());

document.addEventListener('DOMContentLoaded',
    () => handleLocationChange(document.location.href));

document.addEventListener('DOMContentLoaded', () => setUpSubmitHandlers())

document.addEventListener('DOMContentLoaded', () => setUpActionHandlers())

document.addEventListener('DOMContentLoaded', () =>
    uploadTable(
        document.getElementById('dynamic-table'),
        Number(localStorage.getItem('tableColumnsNumber')),
        Number(localStorage.getItem('tableRowsNumber'))
    ));