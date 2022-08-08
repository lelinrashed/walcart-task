# Summary

This is a simple nested category implementation.

- User can create category.
- User can search category and response will be back with parent categories.
- If user delete category child category will be delete automatically.
- If user deactivate category then child categories will be deactivate automatically.

## Technology Stack

- Node js
- Express js
- Typescript
- MongoDB
- typegoose
- GraphQL
- TypeGraphQL
- Docker

## Steps to install

For local development :

1. Clone the repository
2. run `npm install` or `yarn install`
3. then run `npm run dev` or `yarn dev` for run the development server

You can also run with docker

**command:** docker-compose up -d

After start development server GraphQL playground will be available in 4000 port

## Deployment Env

- I'll use MongoDB Atlas could for host my database.
- For server i'll use Droplets from DigitalOcean.
- For deploy with CI/CD pipeline I'll use GitHub actions.
