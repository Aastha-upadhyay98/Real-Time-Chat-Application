// 1. Backend server se connection establish karein 
// Note: Ensure karein ki server index.js port 5000 par chal raha hai
const socket = io('http://localhost:5000'); 


const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// 2. Message send karne ka logic 
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye

    if (input.value.trim() !== "") {
        const messageText = input.value;

        // Message ko server par emit (send) karein 
        socket.emit('chat message', messageText);

        // Khud ka message screen par dikhane ke liye function call
        displayMessage(`You: ${messageText}`, 'my-msg');

        input.value = ''; // Input field clear karein
    }
});

// 3. Server se aane wale message ko listen karein 
socket.on('chat message', (msg) => {
    // Dusre user ka message screen par dikhayein
    displayMessage(`Other: ${msg}`, 'other-msg');
});

// Helper function: Message ko HTML list mein add karne ke liye
function displayMessage(text, className) {
    const item = document.createElement('li');
    item.textContent = text;
    item.classList.add(className); // Styling ke liye class add karein
    messages.appendChild(item);
    
    // Auto-scroll takki naya message dikhe
    messages.scrollTop = messages.scrollHeight;
}