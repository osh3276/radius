package main

import (
	"fmt"
	"log"
	"main/handlers"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

var (
	dbURL  = os.Getenv("DATABASE_URL")
	secret = os.Getenv("SECRET_KEY")
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using environment variables only")
	}

	http.HandleFunc("/api/user", handlers.GetUser)
	http.HandleFunc("/api/user/create", handlers.CreateUser)
	http.HandleFunc("/health", handlers.HealthCheck)
	http.HandleFunc("/ws", handlers.Ws)
	fmt.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
