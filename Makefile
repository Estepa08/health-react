.PHONY: build run dev

build:
	cd client && npm run build

run:
	cd client && npm run dev

dev:
	@trap 'kill 0' EXIT; \
	(cd server && npm run dev) & \
	(cd client && npm run dev) & \
	wait
