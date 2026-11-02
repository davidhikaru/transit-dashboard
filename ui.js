/* UI Module: Handles DOM element rendering and interface updates */

const contentBox = document.getElementById('content-box');
const statusText = document.getElementById('status-text');
const statusDesc = document.getElementById('status-desc');

/**
 * Updates status text elements.
 * @param {string} status - Main status text.
 * @param {string} description - Detailed description text.
 */
export function updateStatus(status, description) {
    statusText.textContent = status;
    statusDesc.textContent = description;
}

/**
 * Shows loading indicator in the content box.
 * @param {string} modeName - Name of the transit mode being loaded.
 */
export function renderLoading(modeName) {
    contentBox.innerHTML = `<p class="comment">Loading ${modeName} data...</p>`;
    updateStatus('Updating...', `Fetching live ${modeName} information.`);
}

/**
 * Renders error message in the content box.
 * @param {string} message - Error message to display.
 */
export function renderError(message) {
    contentBox.innerHTML = `<p class="comment" style="color: #ff477e;">${message}</p>`;
    updateStatus('Error', 'Failed to update data. Please try again.');
}

/**
 * Renders TRA train schedule list.
 * @param {Array} trains - Array of TRA train schedule items.
 */
export function renderTRAList(trains) {
    if (!trains || trains.length === 0) {
        contentBox.innerHTML = '<p class="comment">No train data available.</p>';
        updateStatus('No Data', 'No upcoming trains found for Hsinchu Station.');
        return;
    }

    let html = '<div style="text-align: left; font-size: 0.85rem; line-height: 1.8;">';
    trains.slice(0, 5).forEach(item => {
        const trainNo = item.TrainNo;
        const dest = item.EndingStationName.Zh_tw;
        const delay = item.DelayTime > 0 
            ? `<span style="color: #ff477e; font-weight: bold;">+${item.DelayTime}m</span>` 
            : `<span style="color: #28a745; font-weight: bold;">On Time</span>`;
        
        html += `<div style="border-bottom: 1px dashed #ffc6d0; padding: 4px 0;">
            <b>${trainNo}</b> to ${dest} - ${delay}
        </div>`;
    });
    html += '</div>';

    contentBox.innerHTML = html;
    updateStatus('Active', 'Showing TRA Hsinchu Station real-time timetable.');
}

/**
 * Renders YouBike station status list.
 * @param {Array} stations - Array of YouBike station items.
 */
export function renderBikeList(stations) {
    if (!stations || stations.length === 0) {
        contentBox.innerHTML = '<p class="comment">No YouBike data available.</p>';
        updateStatus('No Data', 'No YouBike stations found.');
        return;
    }

    let html = '<div style="text-align: left; font-size: 0.85rem; line-height: 1.8;">';
    stations.forEach(item => {
        const name = item.StationName.Zh_tw.replace('YouBike2.0_', '');
        const bikes = item.AvailableRentBikes;
        const spaces = item.AvailableReturnBikes;

        html += `<div style="border-bottom: 1px dashed #ffc6d0; padding: 4px 0;">
            <b>${name}</b><br>
            <span style="color: #ff477e;">Bikes: ${bikes}</span> | <span>Spaces: ${spaces}</span>
        </div>`;
    });
    html += '</div>';

    contentBox.innerHTML = html;
    updateStatus('Active', 'Showing nearby Hsinchu YouBike station statuses.');
}