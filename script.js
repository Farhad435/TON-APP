const tg = window.Telegram.WebApp;

tg.ready(); // Initialize the Web App
console.log("Telegram Web App Data:", tg.initDataUnsafe);

// Update Main Button
const mainButton = tg.MainButton;
mainButton.setText("Hello, Telegram!").show();

// Event Listener for Button
document.getElementById("mainButton").addEventListener("click", () => {
  tg.MainButton.text = "Button Clicked!";
  tg.sendData("Button clicked!"); // Sends data back to the bot
});

