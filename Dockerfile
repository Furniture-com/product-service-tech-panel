FROM node:22 AS builder
WORKDIR /home/node

RUN npm install -g pnpm
COPY . .

RUN pnpm i --no-frozen-lockfile

ENV PORT=80

RUN pnpm build

FROM node:22 AS runtime
WORKDIR /home/node

ENV PORT=80
EXPOSE 80

COPY --from=builder /home/node/package.json ./
COPY --from=builder /home/node/node_modules/ ./node_modules/
COPY --from=builder /home/node/dist/ ./dist/

CMD ["pnpm", "run", "dev"]