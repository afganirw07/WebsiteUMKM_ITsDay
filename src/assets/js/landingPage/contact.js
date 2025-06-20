document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Simulasi kirim data, bisa diganti dengan fetch ke backend
  console.log("Data Formulir:", data);

  alert("Terima kasih! Pesan Anda telah dikirim.");
  this.reset();
});
