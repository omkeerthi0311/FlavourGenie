async function sendPrompt() {

    const prompt = document.getElementById('prompt').value +'Write a  literature-style blog with vivid descriptions, with ingredients and add precautions at last with symbols';
    const responseBox = document.getElementById('response');
    responseBox.innerHTML = getRandomFoodJoke();
    //responseBox.innerHTML = 'Generating response...';
    function getRandomFoodJoke() {
        const jokes = [
            "Why did the tomato turn red? Because it saw the salad dressing!",
            "I'm on a seafood diet. I see food and I eat it!",
            "What does a lemon say when it answers the phone? Yellow!",
            "Why don’t eggs tell jokes? Because they might crack up!",
            "What’s a potato’s favorite form of transportation? A gravy train!"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        responseBox.innerHTML = `
            <div class="response-container">
                ${data.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold for **text**
                    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics for *text*
                    .replace(/\n/g, '<br>') // Line breaks for new lines
                    .replace(/- (.*?)(?=<br>)/g, '<li>$1</li>') // List items
                    .replace(/<li>.*<\/li>/g, '<ul>$&</ul>') // Wrap list items in <ul>
                }
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        responseBox.innerHTML = 'Error generating response.';
    }
}
