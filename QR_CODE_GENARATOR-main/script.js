const wrapper = document.querySelector(".wrapper");
const qrInput = wrapper.querySelector("input");
const generateBtn = wrapper.querySelector(".form button");
const qrImg = wrapper.querySelector(".qr-code img");
const downloadBtn = document.getElementById("downloadBtn");
const downloadSection = document.querySelector(".download-btn");

let qrValue = "";

// Generate QR Code
generateBtn.addEventListener("click", async () => {
  const inputValue = qrInput.value.trim();
  if (!inputValue || inputValue === qrValue) return;
  
  qrValue = inputValue;
  generateBtn.textContent = "Generating...";
  
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(inputValue)}`;
  
  qrImg.onload = () => {
    wrapper.classList.add("active");
    generateBtn.textContent = "Generate QR Code";
    downloadSection.style.display = "block";
  };
});


// Download QR Code
downloadBtn.addEventListener("click", () => {
  fetch(qrImg.src)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `QR-Code-${Date.now()}.png`;
      a.click();

    })
    .catch(() => alert("Download failed!"));
});
