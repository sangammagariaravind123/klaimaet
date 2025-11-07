# klaimaet

Weather app demo — Docker & Kubernetes guide

This repository contains a Vite + React weather app. The following files were added to help containerize and deploy the app:

- `Dockerfile.prod` - multi-stage production image (build with Vite and serve with nginx).
- `nginx/default.conf` - minimal nginx config for single-page app routing.
- `docker-compose.override.yml` - developer compose settings for hot-reload.
- `k8s/` - Kubernetes manifests: Deployment, Service, ConfigMap, Ingress example.

Local development with Docker Compose

1. Start dev container (hot reload):

```pwsh
docker compose up --build
```

Production image

```pwsh
# build production image using the prod Dockerfile
docker build -f Dockerfile.prod -t klaimaet:prod .

# run
docker run --rm -p 8080:80 klaimaet:prod
```

Kubernetes

1. Update the image reference in `k8s/deployment-frontend.yaml` to your registry (for example `ghcr.io/OWNER/klaimaet:TAG`).
2. Apply manifests:

```pwsh
kubectl apply -f k8s/
```

Runtime configuration

Because the app is built with Vite, build-time env variables (VITE_*) are baked into the bundle. If you need runtime-configurable environment variables in the container, consider one of these approaches:

- Use a small entrypoint script that templates a `config.js` or `index.html` at container start time from environment variables (ConfigMap/Secret).
- Serve a JSON file (from ConfigMap) that the app fetches on startup for runtime config.

Further improvements

- Add a GitHub Actions workflow to build and push images to a registry.
- Add a Helm chart for parameterized k8s deployments.

Runtime-configurable environment variables

If you need runtime-configurable variables (instead of bake-time VITE_* vars), use `Dockerfile.runtime`. It copies `public/config.template.js` into the served files and `entrypoint.sh` replaces placeholders using `envsubst` at container start. Example usage:

```pwsh
docker build -f Dockerfile.runtime -t klaimaet:runtime .
docker run -e VITE_API_BASE_URL=https://api.example.com -p 8080:80 klaimaet:runtime
```

CI example (GitHub Actions)

Add a workflow to build and push an image; here's a minimal example you can adapt in `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push]

jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Set up Node
				uses: actions/setup-node@v4
				with:
					node-version: '20'
			- run: npm ci
			- run: npm run build
			- name: Build and push Docker image
				uses: docker/build-push-action@v4
				with:
					push: true
					tags: ghcr.io/${{ github.repository_owner }}/klaimaet:latest
```

