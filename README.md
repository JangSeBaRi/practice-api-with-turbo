# Practice Api With Turborepo

## 개발환경

- package manager: `pnpm`
- nodejs : `v18`
- monorepo tool: `turbo`

## workspaces

- no-server
- rest-api
- graphql

## package 설치

- pnpm i

## 실행 및 사용방법

- turbo <client | server> <-F | --filter> [workspace]
- rest-api 와 graphql 은 client 와 server 를 모두 실행해야 정상 작동합니다.

## 실행 예시

```bash
turbo client -F no-server
```

```bash
turbo client -F rest-api
turbo server -F rest-api
```

```bash
turbo client -F graphql
turbo server -F graphql
```