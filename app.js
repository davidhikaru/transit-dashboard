/* Main Controller Module: Coordinates API and UI modules */

import { fetchTransitData } from './api.js';
import { renderLoading, renderError, renderTRAList, renderBikeList, updateStatus } from './ui.js';

const tabButtons = document.querySelectorAll('.tab-btn');
const refreshBtn = document.getElementById('refresh-btn');

let currentMode = 'tra';

/**
 * Loads transit data according to the current active mode.
 */
async function loadData() {
    renderLoading(currentMode.toUpperCase());

    try {
        if (currentMode === 'tra') {
            // TRA Hsinchu Station ID: 1020
            const data = await fetchTransitData('v2/Rail/TRA/LiveBoard/Station/1020?$format=JSON');
            renderTRAList(data);
        } else if (currentMode === 'bike') {
            // Hsinchu YouBike Availability Top 5
            const data = await fetchTransitData('v2/Bike/Availability/City/Hsinchu?$top=5&$format=JSON');
            renderBikeList(data);
        } else {
            updateStatus('Coming Soon', `${currentMode.toUpperCase()} module is currently under development.`);
            document.getElementById('content-box').innerHTML = `<p class="comment">${currentMode.toUpperCase()} module coming soon!</p>`;
        }
    } catch (err) {
        console.error('Data loading error:', err);
        renderError('Connection failed.');
    }
}

/**
 * Initializes tab switching and refresh event listeners.
 */
function initEvents() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            });

            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary');

            currentMode = button.getAttribute('data-target');
            loadData();
        });
    });

    refreshBtn.addEventListener('click', () => {
        loadData();
    });
}

// Entry point initialization
document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    loadData();
});