# Skin Tone & Palette Microservices

This project is a **microservices-based application** for detecting skin tone from images, generating complementary color palettes, suggesting jewelry, and creating AI-powered descriptions.  

It consists of five services, all containerized with Docker and orchestrated using Docker Compose.

---

## Services Overview

| Service Name          | Port  | Description |
|-----------------------|-------|-------------|
| **skin-tone-service** | 5002  | Detects skin tone from uploaded images |
| **palette-service**   | 5003  | Generates clothing/makeup color palettes based on skin/hair tone |
| **jewelry-service**   | 5004  | Suggests jewelry colors based on skin/hair tones |
| **ai-description-service** | 5001 | Generates descriptive text for skin tones & palettes using AI |
| **gateway-api**       | 8000  | Acts as the API gateway for all services |

---

## Prerequisites

Make sure you have installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/alaleh-ki/skin-tone-back.git
cd skin-tone-app
```

### 2️⃣ Build and start all services
```bash
docker-compose up --build
```
This command will:
- Build each service (runs `npm install` inside containers)
- Start all services
- Expose them on the ports listed above

> **Tip:** On subsequent runs, if you haven’t changed dependencies, you can use:
> ```bash
> docker-compose up
> ```

### 3️⃣ Access the services
- **Gateway API:** [http://localhost:8000](http://localhost:8000)
- **Skin Tone Service:** [http://localhost:5002](http://localhost:5002)
- **Palette Service:** [http://localhost:5003](http://localhost:5003)
- **Jewelry Service:** [http://localhost:5004](http://localhost:5004)
- **AI Description Service:** [http://localhost:5001](http://localhost:5001)

### 4️⃣ Stop all services
```bash
docker-compose down
```

---

## Folder Structure
```
.
├── skin-tone-service/         # Detects skin tone from images
├── palette-service/           # Generates clothing/makeup palettes
├── jewelry-service/           # Suggests matching jewelry colors
├── ai-description-service/    # AI-generated descriptive text
├── gateway-api/               # API gateway for all services
└── docker-compose.yml
```

---

## Development Notes
- Each service has its own `package.json` and dependencies.
- No need to run `npm install` manually — the `Dockerfile` for each service should handle this during `docker-compose build`.
- If you change dependencies in any service:
```bash
docker-compose build servicename
```
  or rebuild all:
```bash
docker-compose up --build
```
- For faster rebuilds, create a `.dockerignore` file in each service to skip unnecessary files (e.g., `node_modules`, `.git`).

---