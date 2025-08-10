
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fetchUsersBtn")?.addEventListener("click", fetchUsers);
    document.getElementById("addUserBtn")?.addEventListener("click", addUser);
    document.getElementById("checkHealthBtn")?.addEventListener("click", checkHealth);

    // Initial fetch of users
    fetchUsers();
});

const API_BASE_URL = "/api/";

function showState(message: string, isError: boolean = false): void {
    const statusDiv: HTMLElement | any = document.getElementById("status");
    statusDiv.textContent = message;
    statusDiv.className = `status ${isError ? 'error' : 'success'}`;
    setTimeout(() => {
        statusDiv.textContent = '';
    }, 3000);
}

async function fetchUsers(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users: Array<{ id: number, name: string, email: string }> = await response.json();
        const usersDiv: HTMLElement | any = document.getElementById("users");

        if (users.length === 0) {
            usersDiv.innerHTML = "<p>No users found.</p>";
            return;
        }

        usersDiv.innerHTML = users.map(user => `
            <div class="user">
                <strong>${user.name}</strong> - ${user.email}<br/>
                ID: ${user.id}
            </div>
        `).join("");

        showState("Users fetched successfully");
    } catch (error) {
        console.error("Error fetching users:", error);
        showState("Failed to fetch users", true);
        
    }
}

async function addUser(): Promise<void> {
    const nameInput: string | null = (document.getElementById('userName') as HTMLInputElement)?.value?.trim();
    const emailInput: string | null = (document.getElementById('userEmail') as HTMLInputElement)?.value?.trim();

    if (!nameInput || !emailInput) {
        showState("Please provide both name and email.", true);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: nameInput, email: emailInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showState("User added successfully");
        fetchUsers();  // Refresh the user list
    } catch (error) {
        console.error("Error adding user:", error);
        showState("Failed to add user", true);
    }
}

async function checkHealth(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}health`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const health = await response.json();
        showState(`Service is ${health.status} - ${new Date(health.time).toLocaleString()}`, health.status === "UP" ? false : true);
    } catch (error) {
        console.error("Error checking health:", error);
        showState("Failed to check health", true);
    }
}
