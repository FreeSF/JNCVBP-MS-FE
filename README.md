# JNCVBP-MS-FE

================

A high-performance frontend project built with React, GraphQL, and TypeScript.

## Overview

---

This project provides a robust and scalable frontend infrastructure for modern web applications. It leverages the power of React, a popular JavaScript library for building user interfaces, GraphQL, a query language for APIs, and TypeScript, a superset of JavaScript with static typing.

This Repository is the Frontend of the project, designed to work seamlessly with the backend. It is built to showcase skills and provide a solid foundation for web applications.

The application also uses GraphQL Codegen to generate types for the GraphQL schema. This makes it easier to write type-safe code that is guaranteed to match the schema.

The application also provides support for pagination, sort, and search trough complex GraphQL queries, to improve performance and avoid loading too much data at once.

Please note that this application is for demonstration purposes only and should not be used as a reference for complex architectures. The code and configurations provided are intended to illustrate functionality and best practices for frontend development.

## Features

---

- **React**: A JavaScript library for building reusable UI components. It uses a virtual DOM to improve performance and makes it easy to manage state changes in applications.
- **GraphQL**: A query language for APIs that allows for flexible, efficient, and strongly-typed data retrieval. GraphQL APIs provide a single endpoint for accessing all data in the application, making it easier to fetch only the data needed for a given request. The GraphQL schema is strongly-typed, which makes it easier to reason about the data and catch errors early. Additionally, GraphQL provides a number of features that make it easy to optimize and cache data, such as query batching and automatic persisted queries.
- **TypeScript**: A superset of JavaScript that adds optional static typing, interfaces, and other features that help catch errors early and improve code maintainability. It also provides better support for object-oriented programming and is compatible with existing JavaScript code.

## Project Structure

---

- `src`: Source code for the application.

- `assets`: Static assets such as images, fonts, and videos.
- `components`: Reusable UI components used throughout the application.
- `queries`: GraphQL queries used to fetch data from the backend.
- `reports`: React components for generating PDF reports.
- `stylesheets`: Contains all the SCSS and CSS files that define the styling and layout of the application. This includes global styles, component-specific styles, and mixins. Organized to ensure maintainability and scalability of the application's visual design.
- `utils`: Utility functions and helper files for the application.
- `types.tsx`: TypeScript types and interfaces used for type-checking, Generated with GraphQL Codegen.
- `index.tsx`: The entry point of the application, which renders the React App.

## Configuration

---

The application's configuration is stored in the `constants.js` file, and environment variables can be defined in an `.env` file.

## GraphQL Codegen

---

GraphQL Codegen is used in this project to automatically generate TypeScript types and React hooks from your GraphQL schema and operations. This helps ensure type-safety and reduces boilerplate code when working with GraphQL in your React application.

### How to Use Codegen

1. Ensure that your GraphQL schema is accessible at the specified endpoint in the `codegen.yml` file.
2. Place your GraphQL queries and mutations in the `src/queries` or `src/components` directories as specified in the `codegen.yml`.
3. Run the code generation command to generate the TypeScript types and React hooks.

### How Codegen Works

- The `codegen.yml` configuration file specifies the schema endpoint, documents to process, and the output file for the generated types and hooks.
- It uses plugins to generate TypeScript types, TypeScript operations, and React Apollo hooks based on the operations defined in your GraphQL documents.

### Running Codegen

To run GraphQL Codegen, use the following command from the root of your project:

```bash
npm run codegen
```

This command uses the script defined in your `package.json` to execute the GraphQL Codegen process, based on the configuration provided in the `codegen.yml` file.

## Getting Started

---

### Prerequisites

- Node.js (16.x or higher)
- React (16.x or higher)

### Installation

1. Clone the repository: `git clone https://github.com/FreeSF/JNCVBP-MS-FE.git`
2. Install dependencies: `npm install` or `yarn install`
3. Configure `JNCVBP_URL` in the `.env` file, it must point to the `/graphql` url
4. Start the application: `npm start` or `yarn start`

## License

---

This project is licensed under the MIT License. See the `LICENSE` file for details.
