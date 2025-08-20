// Wait for the page content to load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- Rotating Quote Feature ---

    // Array of quotes and their authors
    const quotes = [
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "- Winston Churchill"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "- Theodore Roosevelt"
        },
        {
            text: "The journey of a thousand miles begins with a single step.",
            author: "- Lao Tzu"
        },
        {
            text: "Your time is limited, so don't waste it living someone else's life.",
            author: "- Steve Jobs"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "- Eleanor Roosevelt"
        }
    ];

    // Get the HTML elements to update
    const quoteTextElement = document.getElementById('rotating-quote');
    const quoteAuthorElement = document.getElementById('quote-author');
    
    let currentQuoteIndex = 0;

    // Function to change the quote
    function changeQuote() {
        // Update the index, looping back to 0 if it reaches the end
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

        // Update the text and author on the page
        quoteTextElement.textContent = `"${quotes[currentQuoteIndex].text}"`;
        quoteAuthorElement.textContent = quotes[currentQuoteIndex].author;
    }

    // Change the quote every 7 seconds (7000 milliseconds)
    setInterval(changeQuote, 7000);

});