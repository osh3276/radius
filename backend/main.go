package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, world!")
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	log.Println("Received a request")
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error: ", err)
		return
	}

	defer conn.Close()
	log.Println("Client connected")

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error: ", err)
			break
		}

		log.Printf("Received message: %s", message)

		// echoes message
		err = conn.WriteMessage(mt, message)

		if err != nil {
			log.Println("Write error: ", err)
			break
		}

		if string(message) == "exit" {
			break
		}
	}
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)
	http.HandleFunc("/ws", handleWebSocket)

	fmt.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
