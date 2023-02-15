function notifyHandlers() {
    let notifyButton = document.getElementById('click-me');
    notifyButton.addEventListener('click', () => notify());
}

function notify() {
    Swal.fire({
        position: 'top-end',
        showConfirmButton: true,
        timer: 5000,
        imageUrl: "../../images/HonestWork.jpg",
        imageHeight: 200
    })
}