# Radius
A location based messaging app.
- **/mobile**: React Native client
- **/backend**: Rust (axum, tokio, sqlx)

## Quick Start

### Mobile
```
cd mobile
npm install
npx react-native run-ios # or run-android
```

### Backend
```
cd backend
cp .env.example .env
cargo run
```

## Stack
- React Native
- Rust
	- axum
	- tokio
	- sqlx
- Supabase

## Repo Structure
```
/mobile ->  React Native app
/backend -> Rust server (REST + WebSocket)
```
