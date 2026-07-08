# Cypress Challenge

A simple, professional test automation project with **6 test scenarios** (3 UI + 3 API).

**Quick Start:** `npm install` → `npm run test:all:open` → Done!

Automated UI and API tests for the ServeRest demo app.

## Overview

- 3 UI test cases
- 3 API test cases
- Page Object Model for UI
- Allure HTML report

## Requirements

- Node.js 18+
- Java 11+ for Allure

Check your setup:

```bash
node --version
java -version
```

## Install

```bash
npm install
```

## Run tests

```bash
# Run UI + API + generate Allure report
npm run test:all

# Run UI + API + generate and open Allure report
npm run test:all:open

# Run only UI tests
npm run cypress:run:ui

# Run only API tests
npm run cypress:run:api

# Open Cypress interactive mode
npx cypress open
```

## Reports

```bash
npm run allure:generate
npm run allure:open
```

The HTML report is created in `allure-report/`.

## Tests

### UI
- `test_login.cy.js` - registration and authentication
- `test_e2e_sale.cy.js` - purchase flow
- `test_admin.cy.js` - admin user management

### API
- `auth_api.cy.js` - registration and authentication
- `sale_api.cy.js` - purchase flow
- `admin_api.cy.js` - user management

## Project structure

```text
cypress/
├── e2e/ui/
├── e2e/api/
├── pages/
├── support/
└── utils/
```

## Notes

- UI tests use Page Objects.
- API tests use Cypress `.then()` chaining.
- Test data is generated dynamically.
- If Allure does not open, confirm Java is installed and in PATH.
