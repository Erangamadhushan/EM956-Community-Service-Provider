package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// Example data structure
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
}

// Sample data
var users = []User{
	{ID: 10001, Name: "Eranga Madhushan", Email: "eranga@example.com"},
	{ID: 10002, Name: "Isuru Sampath", Email: "isuru@example.com"},
}

func main() {
	// Serve static files (HTML, CSS, JS) from the "static" directory
	fs := http.FileServer(http.Dir("./static/"))
	http.Handle("/", fs)

	// API endpoints
	http.HandleFunc("/api/users", handleUsers)
	http.HandleFunc("/api/users/", handleUserByID)
	http.HandleFunc("/api/health", handleHealth)

	// Start server
	fmt.Println("Server starting on :8080")
	fmt.Println("Static files served from ./static/")
	fmt.Println("API endpoints:")
	fmt.Println("  GET /api/users")
	fmt.Println("  GET /api/users/{id}")
	fmt.Println("  GET /api/health")
	
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Handle users endpoint
func handleUsers(w http.ResponseWriter, r *http.Request) {
	// Enable CORS for frontend requests
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case "GET":
		json.NewEncoder(w).Encode(users)
	case "POST":
		var newUser User
		if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}
		newUser.ID = len(users) + 1
		users = append(users, newUser)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(newUser)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// Handle individual user by ID
func handleUserByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	// Simple ID extraction from URL (you might want to use a router like gorilla/mux for more complex routing)
	userID := r.URL.Path[len("/api/users/"):]
	
	for _, user := range users {
		if fmt.Sprintf("%d", user.ID) == userID {
			json.NewEncoder(w).Encode(user)
			return
		}
	}
	
	http.Error(w, "User not found", http.StatusNotFound)
}

// Health check endpoint
func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "healthy",
		"time":   time.Now(),
	}
	json.NewEncoder(w).Encode(response)
}