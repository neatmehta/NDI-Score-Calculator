// Please enter a score or rate each criterion from 0 to 5. The calculator will compute the Neurodivergent-Inclusiveness (NDI) Score based on your inputs.

document.getElementById('ndiForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Define weights for each criterion
  const weights = {
    inclusiveHiring: 6,
    employeeDiversity: 5,
    trainingPrograms: 5,
    accommodationPolicies: 6,
    supportNetworks: 3,
    accessibilityWorkspaces: 6,
    flexibleWorking: 6,
    communicationPreferences: 6,
    performanceEvaluation: 7,
    careerDevelopment: 7,
    feedbackMechanisms: 7,
    inclusionDecisionMaking: 6,
    communityEngagement: 5,
    transparency: 5,
    supplierPolicies: 5,
    continuousImprovement: 5,
    employeeSatisfaction: 5,
    externalReviews: 5
  };

  let totalScore = 0;
  for (const [key, weight] of Object.entries(weights)) {
    const inputElement = document.getElementById(key);
    const score = parseFloat(inputElement.value) || 0; // Default to 0 if input is empty
    totalScore += score * weight;
  }

  console.log(`Total Score: ${totalScore}`); // E.g. 279

  // Correct maximum: 5 (max score) × 100 (sum of all weights) = 500
  const maxPossibleScore = 5 * 100;

  const ndiScore = (totalScore / maxPossibleScore) * 100;
  console.log(`NDI Score: ${ndiScore}`); // E.g. 55.80

  // Display the result
  document.getElementById('scoreValue').textContent = ndiScore.toFixed(2);
});

// Global variable to store business profiles
let businessProfiles = [];

// Function to display business profiles
function displayProfiles(profiles) {
  const businessList = document.getElementById('business-list');
  businessList.innerHTML = '';
  profiles.forEach(business => {
    const businessItem = document.createElement('div');
    businessItem.classList.add('business-item');
    businessItem.innerHTML = `
      <h3>${business.name}</h3>
      <p><strong>Location:</strong> ${business.location}</p>
      <p><strong>Industry:</strong> ${business.industry}</p>
      <p><strong>NDI Score:</strong> ${business.ndiScore}</p>
      <p><strong>Accommodations:</strong> ${business.accommodations.join(', ')}</p>
      <h4>Reviews:</h4>
      <ul>
        ${business.reviews.map(review => `
          <li>
            <strong>${review.user}</strong> (Rating: ${review.rating}/5):
            ${review.comment}
          </li>
        `).join('')}
      </ul>
    `;
    businessList.appendChild(businessItem);
  });
}

// Fetch and display business profiles
function loadBusinessProfiles() {
  fetch('./data/businessProfiles.json')
    .then(response => response.json())
    .then(data => {
      // Store the fetched data globally for search functionality
      businessProfiles = data;
      // Display all profiles initially
      displayProfiles(businessProfiles);
    })
    .catch(error => {
      console.error('Error loading business profiles:', error);
    });
}

// Add search functionality: filter profiles as user types
document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filteredProfiles = businessProfiles.filter(business =>
    business.name.toLowerCase().includes(query) ||
    business.location.toLowerCase().includes(query) ||
    business.industry.toLowerCase().includes(query)
  );
  displayProfiles(filteredProfiles);
});

// Load profiles when the page loads
window.onload = function () {
  loadBusinessProfiles();
};
