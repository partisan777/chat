export function getModalWindow() {
    let div = document.createElement('div')
    div.classList.add("modal");
    div.setAttribute("id", "myModal");
    div.innerHTML = 
      `<div class="modal-content" id="modal-content">
            <p>Некоторый текст в модальном..</p>
        </div>`
    return div;
}