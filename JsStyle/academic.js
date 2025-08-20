document.addEventListener('DOMContentLoaded', function() {
    
    // --- INTERACTIVE DSA PROGRESS TRACKER ---
    const checklist = document.getElementById('dsa-checklist');
    
    // Check if the checklist element exists on the page before running the code
    if (checklist) {
        const checklistItems = checklist.querySelectorAll('li');
        const resetButton = document.getElementById('reset-progress-btn');
        const storageKey = 'dsaProgress';

        // Function to save the user's progress in their browser
        const saveProgress = () => {
            const completedTasks = [];
            checklistItems.forEach(item => {
                if (item.classList.contains('completed')) {
                    completedTasks.push(item.dataset.task);
                }
            });
            localStorage.setItem(storageKey, JSON.stringify(completedTasks));
        };

        // Function to load any saved progress when the page opens
        const loadProgress = () => {
            const savedProgress = JSON.parse(localStorage.getItem(storageKey));
            if (savedProgress) {
                checklistItems.forEach(item => {
                    if (savedProgress.includes(item.dataset.task)) {
                        item.classList.add('completed');
                    }
                });
            }
        };

        // Add a click listener to each checklist item to toggle its state
        checklistItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('completed');
                saveProgress(); // Save after every change
            });
        });

        // Add a click listener to the reset button
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your progress?')) {
                checklistItems.forEach(item => {
                    item.classList.remove('completed');
                });
                localStorage.removeItem(storageKey); // Clear saved data
            }
        });

        // Load progress right away
        loadProgress();
    }
});
