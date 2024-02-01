document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.getElementById("captcha");
  let ctx = canvas.getContext("2d");
  let captchaText = generateCaptchaText(6);
  const captchaStatus = document.getElementById("captcha-status");
  drawCaptcha(captchaText);

  function verifyCaptcha() {
    let inputText = document.getElementById("captcha-input").value.toLowerCase();

    if(inputText === captchaText.toLowerCase()) {
     captchaStatus.textContent = "Captcha Correct! ✅";
     captchaStatus.style.color = "green";
    } else if (inputText.length < 6) {
      captionStatus.textContent = "Enter all characters!";
      captchaStatus.style.color = "red";
    } else {
      captchaStatus.textContent = "Captcha incorrect ❌ Please try again!";
      captchaStatus.style.color = "red";
    }
    setTimeout(() => {
      captchaStatus.textContent = "Status : UDLE";
      captchaStatus.style.color = "black";
    }, 3000);
    document.getElementById("captcha-input").value = "";
    captchaText = generateCaptchaText(6);
    drawCaptcha(captchaText);
  }

  document.getElementById("check-captcha").addEventListener("click", verifyCaptcha);

  document.getElementById("reload-captcha").addEventListener("click", function() {
    captchaText = generateCaptchaText(6);
    drawCaptcha(captchaText);
    document.getElementById("captcha-input").value = "";
    captchaStatus.textContent = "Status : UDLE";
  });

  function generateCaptchaText(length) {
    let result = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  }

  function drawCaptcha(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect = (0, 0, canvas.width, canvas.height);
    addNoise(ctx);
    ctx.fillStyle = "#06108c";
    ctx.font = "24px Arial";

    const textWidth = ctx.measureText(text).width;
    const startX = (canvas.width - textWidth) / 3;

    for (let i = 0; i < text.length; i++) {
      ctx.save();
      ctx.translate(startX + i * 20, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }    
  }

  function addNoise(ctx) {
    const imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageDate.data;
    for (let i = 0; i < pixels.length; i += 2) {
      let color = (Math.random() > 0.5) ? 255 : 0;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
    }
    ctx.putImageData(imageDate, 0, 0);
  }

});