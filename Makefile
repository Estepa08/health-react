.PHONY: build run dev test test-client test-server test-coverage

build:
	cd client && npm run build

run:
	cd client && npm run dev

dev:
	@trap 'kill 0' EXIT; \
	(cd server && npm run dev) & \
	(cd client && npm run dev) & \
	wait

test: test-client test-server

test-client:
	cd client && npm run test -- run

test-server:
	cd server && npm test -- run

test-coverage:
	cd client && npm run test:coverage
