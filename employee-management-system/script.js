let employees = JSON.parse(localStorage.getItem("employees")) || [];

const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");
const searchInput = document.getElementById("search");

function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function displayEmployees(employeeData = employees) {
    employeeTable.innerHTML = "";

    employeeData.forEach((employee) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>
                <button class="delete-btn" onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>
            </td>
        `;

        employeeTable.appendChild(row);
    });

    updateDashboard();
}

employeeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const position = document.getElementById("position").value.trim();

    const newEmployee = {
        id: Date.now(),
        name,
        email,
        department,
        position
    };

    employees.push(newEmployee);
    saveEmployees();
    employeeForm.reset();
    displayEmployees();

    alert("Employee added successfully!");
});

function deleteEmployee(id) {
    const confirmDelete = confirm("Are you sure you want to delete this employee?");

    if (!confirmDelete) return;

    employees = employees.filter(employee => employee.id !== id);
    saveEmployees();
    displayEmployees();
}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchText) ||
        employee.email.toLowerCase().includes(searchText) ||
        employee.department.toLowerCase().includes(searchText) ||
        employee.position.toLowerCase().includes(searchText)
    );

    displayEmployees(filteredEmployees);
});

function updateDashboard() {
    document.getElementById("totalEmployees").textContent = employees.length;

    const departments = new Set(
        employees.map(employee => employee.department)
    );

    document.getElementById("totalDepartments").textContent = departments.size;
}

displayEmployees();
