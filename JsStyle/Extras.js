document.addEventListener('DOMContentLoaded', function() {
    
    // --- SECTION 1: SGPA & CGPA CALCULATOR LOGIC ---
    const addSubjectBtn = document.getElementById('add-subject-btn');
    const subjectRowsContainer = document.getElementById('subject-rows');
    const calculateBtn = document.getElementById('calculate-btn');
    const sgpaResultEl = document.getElementById('sgpa-result');
    const cgpaResultEl = document.getElementById('cgpa-result');

    // Converts marks (0-100) to grade points (0-10)
    const marksToGradePoint = (marks) => {
        if (marks >= 93) return 10;
        if (marks >= 85) return 9;
        if (marks >= 77) return 8;
        if (marks >= 69) return 7;
        if (marks >= 61) return 6;
        if (marks >= 53) return 5;
        if (marks >= 45) return 4;
        return 0; // Fail
    };

    // Adds a new row to the subjects table
    const addSubjectRow = () => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="number" class="credits" placeholder="e.g., 4"></td>
            <td><input type="number" class="marks" placeholder="e.g., 85"></td>
            <td><button class="remove-btn">Remove</button></td>
        `;
        subjectRowsContainer.appendChild(row);
        row.querySelector('.remove-btn').addEventListener('click', () => {
            row.remove();
        });
    };

    // Calculates SGPA and overall CGPA
    const calculateGrades = () => {
        const rows = subjectRowsContainer.querySelectorAll('tr');
        let totalCredits = 0;
        let weightedSum = 0;

        rows.forEach(row => {
            const credits = parseFloat(row.querySelector('.credits').value);
            const marks = parseFloat(row.querySelector('.marks').value);

            if (!isNaN(credits) && !isNaN(marks) && credits > 0 && marks >= 0 && marks <= 100) {
                const gradePoint = marksToGradePoint(marks);
                totalCredits += credits;
                weightedSum += credits * gradePoint;
            }
        });

        const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
        sgpaResultEl.textContent = `SGPA: ${sgpa}`;

        const prevCgpa = parseFloat(document.getElementById('prev-cgpa').value);
        const prevCredits = parseFloat(document.getElementById('prev-credits').value);

        if (!isNaN(prevCgpa) && !isNaN(prevCredits) && prevCredits > 0) {
            const totalWeightedSum = (prevCgpa * prevCredits) + weightedSum;
            const grandTotalCredits = prevCredits + totalCredits;
            const cgpa = grandTotalCredits > 0 ? (totalWeightedSum / grandTotalCredits).toFixed(2) : 0;
            cgpaResultEl.textContent = `Overall CGPA: ${cgpa}`;
        } else {
            cgpaResultEl.textContent = `Overall CGPA: ${sgpa}`;
        }
    };

    // --- SECTION 2: SGPA TARGET PLANNER LOGIC ---
    const planGradesBtn = document.getElementById('plan-grades-btn');
    const targetSgpaInput = document.getElementById('target-sgpa');
    const plannerResultBox = document.getElementById('planner-result-box');
    const plannerResultText = document.getElementById('planner-result-text');

    // Converts required grade points back to an approximate marks range
    const gradePointToMarks = (gp) => {
        if (gp > 10) return "100 (A+)";
        if (gp >= 9.3) return "93+ (A+)";
        if (gp >= 8.5) return "85+ (A)";
        if (gp >= 7.7) return "77+ (B+)";
        if (gp >= 6.9) return "69+ (B)";
        if (gp >= 6.1) return "61+ (C+)";
        if (gp >= 5.3) return "53+ (C)";
        if (gp >= 4.5) return "45+ (D)";
        if (gp > 0) return "at least 45 (D)";
        return "below 45 (Fail)";
    };

    // Calculates the average marks needed in remaining subjects
    const planGrades = () => {
        const targetSgpa = parseFloat(targetSgpaInput.value);
        if (isNaN(targetSgpa) || targetSgpa <= 0 || targetSgpa > 10) {
            alert('Please enter a valid target SGPA between 1 and 10.');
            return;
        }

        const rows = subjectRowsContainer.querySelectorAll('tr');
        let totalCredits = 0, knownWeightedSum = 0, unknownCredits = 0;

        rows.forEach(row => {
            const credits = parseFloat(row.querySelector('.credits').value);
            const marks = parseFloat(row.querySelector('.marks').value);

            if (!isNaN(credits) && credits > 0) {
                totalCredits += credits;
                if (!isNaN(marks)) {
                    knownWeightedSum += credits * marksToGradePoint(marks);
                } else {
                    unknownCredits += credits;
                }
            }
        });

        if (totalCredits === 0) {
            alert('Please enter credits for your subjects.');
            return;
        }
        if (unknownCredits === 0) {
            plannerResultText.textContent = "You've entered marks for all subjects! Use the main calculator.";
            plannerResultBox.style.display = 'block';
            return;
        }

        const requiredWeightedSum = (targetSgpa * totalCredits) - knownWeightedSum;
        const requiredAvgGradePoint = requiredWeightedSum / unknownCredits;

        plannerResultBox.style.display = 'block';
        if (requiredAvgGradePoint > 10) {
            plannerResultText.textContent = `It's not possible to achieve ${targetSgpa} SGPA. The required average grade point is ${requiredAvgGradePoint.toFixed(2)}, which is over 10.`;
        } else if (requiredAvgGradePoint < 0) {
            plannerResultText.textContent = `You've already surpassed your target! Your SGPA will be higher than ${targetSgpa}.`;
        } else {
            const requiredMarks = gradePointToMarks(requiredAvgGradePoint);
            plannerResultText.textContent = `You need to average ${requiredAvgGradePoint.toFixed(2)} grade points in your remaining subjects. This means scoring an average of ~${requiredMarks} in each.`;
        }
    };

    // --- INITIALIZATION ---
    addSubjectBtn.addEventListener('click', addSubjectRow);
    calculateBtn.addEventListener('click', calculateGrades);
    planGradesBtn.addEventListener('click', planGrades);

    // Add 4 rows by default to start
    for (let i = 0; i < 4; i++) {
        addSubjectRow();
    }
});
