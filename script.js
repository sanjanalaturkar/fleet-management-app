document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    if (loginForm){
        const correctEmail = 'admin@example.com';
        const correctPassword = 'password';
        loginForm.addEventListener('submit',(e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            errorMessage.style.display = 'none';
            if (emailInput === correctEmail && passwordInput === correctPassword){
                alert('Login Successfull');
                window.location.href = 'admin.html';
            } else {
                errorMessage.style.display = 'block';
            }
        });
    }
});
let fleetData = [
    { regNo: "MH12AB1234", driverName: "ABC", category:"Car", availabilty: "Available", imageLink: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D"},
    { regNo: "MH12AB5678", driverName: "DEF", category:"Bus", availabilty: "Unavailable", imageLink: "https://www.shutterstock.com/image-illustration/image-bus-isolated-on-white-600nw-2578467979.jpg"},
    { regNo: "MH12AB59101", driverName: "GHI", category:"Auto", availabilty: "Unavailable", imageLink: "https://cdn.bajajauto.com/-/media/bajaj-auto/new-webp/3-wheeler/savings_calculator_image_re_new.webp"},
];
const cardContainer = document.getElementById('fleet-cards-conatiner');
function renderFleetCards(dataToRender){
    if(!cardContainer) return;
    cardContainer.innerHTML = '';
    dataToRender.forEach(fleet => {
        const card = document.createElement('div');
        card.className =`fleet-card ${fleet.availabilty === 'Unavailable' ? 'unavailable': ''}`;
        const imgSrc = fleet.imageLink && fleet.imageLink.startWith('http') ? fleet.imageLink : 'https://media.istockphoto.com/id/1445074332/photo/bright-colorful-big-rigs-semi-trucks-with-semi-trailers-standing-in-the-row-on-truck-stop.jpg?s=612x612&w=0&k=20&c=N5fVLeFT119Yv0QSH2Z9UgDXFOLW1qXHqL0p7EPkPRs=';
        card.innerHTML = `
        <img src="${imgSrc}" alt="${fleet.regNo}">
        <h4>Reg No: ${fleet.regNo}</h4>
        <p><strong>Category:</strong>${fleet.driverName}</p>
        <p><strong>Availabilty:</strong> <span class="availability-status">${fleet.availabilty}</span></p>
        <hr>
        <button class="update-driver-btn" data-regno="${fleet.regNo}">Update Driver</button>
        <button class="change-availability-btn" data-regno="${fleet.regNo}">Change Availability</button>
        <button class="delete-vehicle-btn" data-regno="${fleet.regNo}">Delete Vehicle</button>
        `;
        cardContainer.appendChild(card);
    })
}
function handleAddFleet() {
    const fleetForm = document.getElementById('fleet-form');
    if (fleetForm) {
        fleetForm.addEventListener('submit',(e) =>{
            e.preventDefault();
            const newRegNo = document.getElementById('regNo').value;
            if (fleetData.some(f => f.regNo === newRegNo)){
                alert("Error: vehicle with this registration number already exist");
                return;
            }
            const newFleet = {
                regNo: newRegNo,
                driverName: document.getElementById('diverName').value,
                category: document.getElementById('category').value,
                availabilty: document.getElementById('availability').value,
                imageLink: document.getElementById('imageLink').value,
            };
            fleetData.push(newFleet);
            applyFilters();
            fleetForm.reset();
            alert('Fleet Item Added Successfully');
        })
    }
}
function updateAndRender() {
    applyFilters();
}
 function handleCardActions(){
    if(!cardContainer) return;
    cardContainer.addEventListener('click', (e) => {
        const target=e.target;
        const regNo=target.gatAttribute('data-regno');
        if(!regNo) return;
        const vehicle = fleetData.find(f => f.regNo === regNo);
        if(!vehicle) return;
        if (target.classList.contains('change-availability-btn')) {
            const currentStatus = vehicle.availabilty;
            const newStatus = currentStatus === 'Available' ? 'Unavailable' : 'Available';
            vehicle.availabilty = newStatus;
            alert(`Availability for ${regNo} changed to ${newStatus}`);
            updateAndRender();
        }
        if(target.classList.contains('delete-vehicle-btn')){
            if (confirm(`Are you sure you want to delete ${regNo}`)){
                fleetData = fleetData.filter(f => f.regNo !== regNo);
                alert(`Vehicle ${regNo} deleted.`);
                updateAndRender();
            }
        }
    });
 }
function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    if (!categoryFilter || !availabilityFilter) return;
    const selectedCategory = categoryFilter.value;
    const selectAvailability = availabilityFilter.value;
    let filteredData = fleetData;
    if(selectedCategory !== 'All'){
        filteredData = filteredData.filter(f => f.category ===selectedCategory);
    }
    if (selectAvailability !== 'All'){
        filteredData = filteredData.filter(f => f.availabilty === selectAvailability);
    }
    renderFleetCards(filteredData);
}

function setupFilters(){

    const categoryFilterSelect = document.getElementById('category-filter');
    const availabilityFilterSelect = document.getElementById('availability-filter');
    const clearFilterBtn = document.getElementById('clear-filter-btn')
    const uniqueCategories = [...new Set(fleetData.map( f => f.category))];
    uniqueCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilterSelect.appendChild(option);
    });
    categoryFilterSelect.addEventListener('change',applyFilters);
    availabilityFilterSelect.addEventListener('change', applyFilters);
    clearFilterBtn.addEventListener('click', ()=>{
        categoryFilterSelect.value = 'All';
        availabilityFilterSelect.value = 'All';
        applyFilters();
    });
}
