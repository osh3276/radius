package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Conn *pgxpool.Pool

func Connect(databaseURL string) {
	var err error

	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		log.Fatalf("Error parsing database URL: %v", err)
	}

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("Error creating connection pool: %v", err)
	}

	err = pool.Ping(context.Background())
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	Conn = pool
	log.Println("Successfully connected to the database!")
}

// Close closes the database connection pool.
func Close() {
	if Conn != nil {
		Conn.Close()
		log.Println("Database connection pool closed.")
	}
}
