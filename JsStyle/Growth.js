// Wait for the entire page to load before running our scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // --- FEATURE 1: INTERACTIVE JOURNAL PROMPT ---
    const promptButton = document.getElementById('new-prompt-btn');
    const promptDisplay = document.getElementById('journal-prompt');

    // This code only runs if the journal prompt elements exist on the page
    if (promptButton && promptDisplay) {
        const journalPrompts = [
            "What is one thing I'm proud of this week, no matter how small?",
            "What was the most challenging part of my day, and how did I handle it?",
            "If I could give my past self one piece of advice, what would it be?",
            "What activity makes me lose track of time?",
            "Describe a moment recently where I felt genuinely happy.",
            "What is a skill I want to learn, just for fun?",
            "Who is someone I'm grateful for, and why?",
            "What is one thing I can do tomorrow to make the day a little better?",
            "How have I grown as a person in the last year?",
            "What does 'success' look like to me right now, beyond academics?"
        ];

        let lastPromptIndex = 0;

        // Function to show a new, random prompt
        function showNewPrompt() {
            let randomIndex;
            // Make sure we don't show the same prompt twice in a row
            do {
                randomIndex = Math.floor(Math.random() * journalPrompts.length);
            } while (randomIndex === lastPromptIndex);
            lastPromptIndex = randomIndex;
            
            // Fade out the old prompt, change the text, then fade it back in
            promptDisplay.style.opacity = '0';
            setTimeout(() => {
                promptDisplay.textContent = `"${journalPrompts[randomIndex]}"`;
                promptDisplay.style.opacity = '1';
            }, 300); // 0.3 second fade
        }
        // Listen for clicks on the button
        promptButton.addEventListener('click', showNewPrompt);
    }

    // --- FEATURE 2: INTERACTIVE BREATHING EXERCISE ---
    const startBtn = document.getElementById('start-breathing-btn');
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');

    // This code only runs if the breathing exercise elements exist
    if (startBtn && circle && text) {
        
        // This function controls the entire breathing sequence
        function startExercise() {
            // Disable the button to prevent multiple clicks
            startBtn.disabled = true;
            text.textContent = 'Get ready...';

            // Sequence of timed events for the exercise
            setTimeout(() => {
                text.textContent = 'Breathe In...';
                circle.classList.add('grow'); // Start growing the circle

                setTimeout(() => {
                    text.textContent = 'Hold';

                    setTimeout(() => {
                        text.textContent = 'Breathe Out...';
                        circle.classList.remove('grow'); // Shrink the circle

                        // After the cycle is complete, reset the tool
                        setTimeout(() => {
                            text.textContent = 'Great job! Go again?';
                            startBtn.disabled = false; // Re-enable the button
                        }, 8000); // Wait for exhale animation
                    }, 7000); // Hold duration
                }, 4000); // Inhale duration
            }, 2000); // Initial "Get ready" delay
        }
        // Listen for clicks on the start button
        startBtn.addEventListener('click', startExercise);
    }
});
