 const addButton = document.getElementById("addstaffBtn");
    const staffForm = document.getElementById("addstaffform");
    const staffListContainer = document.getElementById("unassignedStaffList");

    // Select ALL new form fields (since they have no IDs anymore)
    const nameInput = staffForm.querySelector("input[type='text']");
    const roleInput = staffForm.querySelector("select[name='role']");
    const phoneInput = staffForm.querySelector("input[type='tel']");
    const emailInput = staffForm.querySelector("input[type='email']");
    const photoInput = staffForm.querySelector("input[type='url']");

    // 1. Show the form
    addButton.addEventListener("click", () => {
        staffForm.style.display = "block";
    });

    // 2. Save on submit
    staffForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const photo = photoInput.value.trim();

        if (!name || !role || !phone || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        addStaffMemberToList(name, role, phone, email, photo);

        staffForm.reset();
        staffForm.style.display = "none";
    });

    // 3. Add the worker card
    function addStaffMemberToList(name, role, phone, email, photo) {
        const staffDiv = document.createElement("div");
        staffDiv.classList.add("staff-member-card");

        staffDiv.innerHTML = `
            <img src="${photo || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}" 
                 class="staff-photo">

            <h4>${name}</h4>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
        `;

        staffListContainer.appendChild(staffDiv);
    }
    // --- POPUP ELEMENTS ---
const assignPopup = document.getElementById("assignPopup");
const popupStaffList = document.getElementById("popupStaffList");

// 1. When clicking ➕ -> show popup with staff list
document.querySelectorAll(".add").forEach(btn => {
    btn.addEventListener("click", () => {
        const room = btn.dataset.room; // which room button clicked
        openAssignPopup(room);
    });
});

// 2. Open popup and show unassigned staff choices
function openAssignPopup(roomName) {
    popupStaffList.innerHTML = ""; // clear old list

    const staffCards = Array.from(staffListContainer.querySelectorAll(".staff-member-card"));

    if (staffCards.length === 0) {
        popupStaffList.innerHTML = "<p>No staff available</p>";
    }

    staffCards.forEach(card => {
        const option = document.createElement("div");
        option.classList.add("staff-option");
        option.textContent = card.querySelector("h4").textContent;

        option.addEventListener("click", () => {
            assignStaffToRoom(card, roomName);
            assignPopup.style.display = "none";
        });

        popupStaffList.appendChild(option);
    });

    assignPopup.style.display = "block";
}

// 3. Move selected staff to the room
function assignStaffToRoom(staffCard, roomName) {
    const roomDiv = document.querySelector(`.${roomName} .zone-content`);
    roomDiv.appendChild(staffCard);
}

function updateNoStaffMessage() {
    const hasStaff = staffListContainer.querySelectorAll(".staff-member-card").length > 0;
    document.getElementById("noStaffMsg").style.display = hasStaff ? "none" : "block";
}
function assignStaffToRoom(staffCard, roomName) {
    const roomDiv = document.querySelector(`.${roomName} .zone-content`);

    // Create a new row-style card for assigned staff
    const assigned = document.createElement("div");
    assigned.classList.add("assigned-staff");

    const staffName = staffCard.querySelector("h4").textContent;

    assigned.innerHTML = `
        <span>${staffName}</span>
        <button class="remove-btn">✖</button>
    `;

    // Remove staff from unassigned list
    staffCard.remove();

    // Add to room
    roomDiv.appendChild(assigned);

    // REMOVE button → send back to unassigned section
    assigned.querySelector(".remove-btn").addEventListener("click", () => {
        assigned.remove();
        staffListContainer.appendChild(staffCard);
    });
}