## Setup
Ensure you have postgres running on port 5432 or setup docker:
```bash
docker container run --env POSTGRES_PASSWORD=password  -p 5432:5432 --name open-fc-db -d postgres:15.3
```
Run project:
```bash
npm run dev
```
