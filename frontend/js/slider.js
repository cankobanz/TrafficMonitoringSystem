import { formatDate, getFormattedDate } from './helpers.js';

// Function to initialize the slider
export function initializeSlider(onSliderChange) {
    const dateSlider = document.getElementById('dateSlider');
    const selectedDateDisplay = document.getElementById('selectedDate');

    // Set up slider properties
    const maxDaysInFuture = 15;
    dateSlider.max = maxDaysInFuture;
    dateSlider.value = 0; // Default to today's date
    selectedDateDisplay.textContent = formatDate(getFormattedDate(0));

    // Add event listener to handle slider changes
    dateSlider.addEventListener('input', function () {
        const selectedDate = getFormattedDate(dateSlider.value);
        selectedDateDisplay.textContent = formatDate(selectedDate);

        // Call the callback function passed from app.js
        onSliderChange(selectedDate);
    });
}
