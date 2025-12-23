function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = img.src;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* optional: close on click outside */
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});
