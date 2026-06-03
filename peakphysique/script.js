// --- DATA: The Workout & Diet Database ---
const plans = {
    loss: {
        title: "Weight Loss (Fat Burn)",
        schedule: [
            { day: "Monday", focus: "HIIT + Legs", detail: "Squats, Lunges, 20 min HIIT Sprints" },
            { day: "Tuesday", focus: "Steady Cardio", detail: "45 Min Jog or Incline Walk" },
            { day: "Wednesday", focus: "Upper Body", detail: "Pushups, Rows, Shoulder Press (High Reps)" },
            { day: "Thursday", focus: "Active Recovery", detail: "Yoga or 10k Steps Walk" },
            { day: "Friday", focus: "Full Body Circuit", detail: "Burpees, Kettlebell Swings, Box Jumps" }
        ],
        diet: "<h3>Fat Loss Nutrition</h3><p><strong>Goal:</strong> Caloric Deficit.<br><strong>Post-Workout:</strong> 30g Protein, Minimal Carbs.<br><strong>Meal Example:</strong> Grilled Salmon with Asparagus. Avoid sugar post-workout to keep insulin low and maximize fat oxidation.</p>"
    },
    gain: {
        title: "Muscle Gain (Hypertrophy)",
        schedule: [
            { day: "Monday", focus: "Chest & Triceps", detail: "Bench Press (5x5), Dips, Flys" },
            { day: "Tuesday", focus: "Back & Biceps", detail: "Pullups, Barbell Rows, Curls" },
            { day: "Wednesday", focus: "Rest", detail: "Eat 500+ calorie surplus" },
            { day: "Thursday", focus: "Legs", detail: "Squats (Heavy), RDLs, Leg Press" },
            { day: "Friday", focus: "Shoulders", detail: "Overhead Press, Lateral Raises, Face Pulls" }
                ],
        diet: "<h3>Muscle Growth Nutrition</h3><p><strong>Goal:</strong> Caloric Surplus.<br><strong>Post-Workout:</strong> 30g Protein + 60g Fast Carbs.<br><strong>Meal Example:</strong> Chicken Breast with 2 Cups White Rice. You need the insulin spike to drive nutrients into the muscle cells.</p>"
    }
};

// --- STATE MANAGEMENT ---
// Check if the user has a saved goal, otherwise default to 'loss'
let currentGoal = localStorage.getItem('userGoal') || 'loss';

// --- INITIALIZE ---
window.onload = function() {
    updateUI(); // Load the correct text/colors when page opens
};

// --- NAVIGATION LOGIC ---
function showSection(id) {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Logic for Home Section vs Content Sections
    if(id === 'home') {
        document.getElementById('home').style.display = 'block';
        document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    } else {
        document.getElementById('home').style.display = 'none';
        
        // Hide all other sections
        document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
        
        // Show the clicked section
        document.getElementById(id).classList.add('active');
    }
}

// --- NEW TOGGLE LOGIC (For the Custom Slider) ---
function toggleGoal() {
    // Flip the goal: If it's loss, make it gain. If it's gain, make it loss.
    currentGoal = (currentGoal === 'loss') ? 'gain' : 'loss';
    
    // Save to browser memory
    localStorage.setItem('userGoal', currentGoal);
    
    // Update the screen
    updateUI();
}

// --- UPDATE UI FUNCTION ---
function updateUI() {
    // 1. Get the data for the current goal
    const plan = plans[currentGoal];
    
    // 2. Get the HTML elements we need to change
    const switchEl = document.getElementById('goalSwitch');
    const textEl = document.getElementById('goal-text');

    // 3. Update the Switch Visuals
    if(currentGoal === 'gain') {
        // Add class to slide the toggle to the right
        switchEl.classList.add('gain-active');
        textEl.innerText = "Current: Weight Gain";
        textEl.style.color = "#fff"; // White text for Gain
    } else {
        // Remove class to slide toggle back to left
        switchEl.classList.remove('gain-active');
        textEl.innerText = "Current: Weight Loss";
        textEl.style.color = "var(--primary-gold)"; // Gold text for Loss
    }

    // 4. Update Workout Table
    document.getElementById('workout-title').innerText = plan.title;
    
    // Create the table rows
    const tableHTML = plan.schedule.map(row => `
        <tr>
            <td>${row.day}</td>
            <td><strong>${row.focus}</strong></td>
            <td>${row.detail}</td>
        </tr>
    `).join('');
    
    document.getElementById('workout-table-body').innerHTML = tableHTML;

    // 5. Update Diet Box
    document.getElementById('diet-content').innerHTML = plan.diet;
}