FROM public.ecr.aws/docker/library/node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM public.ecr.aws/docker/library/node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
ARG DEPLOY_TYPE
ENV DEPLOY_TYPE=$DEPLOY_TYPE
RUN yarn build

EXPOSE 2001
# Run deploy when the container launches
CMD ["yarn", "start"]
