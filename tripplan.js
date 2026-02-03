let tripData = {};
let currentPlan = [];
let dayCount = 1;

// Load JSON trip plans
fetch('tripPlans.json')
  .then(res => res.json())
  .then(data => {
    tripData = data;
    console.log('Trip plans loaded');
  })
  .catch(err => console.error('Error loading trip plans:', err));

// Called when form is submitted
function loadPlan() {
  const destinationInput = document.getElementById("destination").value.toLowerCase();
  const daysInput = parseInt(document.getElementById("days").value);

  const destinationData = tripData[destinationInput];

  if (!destinationData) {
    alert("Trip plan for the selected location is not available.");
    return;
  }

  // Set banner image
  const bannerImg = document.getElementById('banner-img');
  if (bannerImg) {
    bannerImg.src = destinationData.bannerImage || '';
  }

  currentPlan = destinationData.days.slice(0, daysInput);
  dayCount = currentPlan.length + 1;

  renderPlan(destinationData.location);
}

function renderPlan(locationName) {
  const container = document.getElementById("days-container");
  container.innerHTML = ""; // Clear old content

  document.getElementById("location-title").textContent = locationName;
  document.getElementById("trip-info").textContent = `${currentPlan.length} Days | Luxury Budget`;

  currentPlan.forEach((day, index) => {
    const html = `
      <div class="bg-gray-100 p-4 rounded-lg flex items-start gap-4">
        <img src="${day.image}" alt="${day.place}" class="w-24 h-24 object-cover rounded-md" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'" />
        <div>
          <p class="font-semibold">Day ${index + 1}: ${day.place}</p>
          <p class="text-sm text-gray-600">${day.description}</p>
          <p class="text-sm text-gray-600">Hotel: <span class="font-medium">${day.hotel.name}</span></p>
          <p class="text-sm text-gray-600">
            <a href="${day.maps}" target="_blank" class="text-blue-500 underline">📍 View on Map</a>
          </p>
        </div>
      </div>
    `;
    
    container.innerHTML += html;
  });
}

// Optional: Add day dynamically
function addDay() {
  if (dayCount > 7 || currentPlan.length >= 7) {
    alert("Maximum 7 days allowed per plan.");
    return;
  }

  const destinationInput = document.getElementById("destination").value.toLowerCase();
  const nextPlace = tripData[destinationInput]?.days[dayCount - 1];

  if (!nextPlace) {
    alert("No more places to add.");
    return;
  }

  currentPlan.push(nextPlace);
  renderPlan(tripData[destinationInput].location);
  dayCount++;
}
