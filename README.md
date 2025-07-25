# Skin Tone App Microservices

## Services

- **ai-description-service/**: Generates AI-powered descriptions for recommendations.
- **palette-service/**: Provides color palettes for eyes, clothing, makeup, and lipstick based on skin tone.
- **skin-tone-service/**: Analyzes RGB input and returns skin tone, undertone, and shade (light/medium/dark).
- **jewelry-service/**: Recommends the best jewelry color (gold, silver, rose gold) based on skin tone.
- **gateway-api/**: Orchestrates calls to all services and aggregates results for the frontend.

## Development

- Use `docker-compose.yml` to run all services locally.
