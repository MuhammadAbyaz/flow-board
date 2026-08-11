---
name: strict-tdd
description: Mandatory workflow for writing any new feature, component, or API endpoint. Enforces Red-Green-Refactor using Vitest and React Testing Library.
---

# Strict TDD Workflow

This skill enforces a Test-Driven Development (TDD) workflow for all feature development on FlowBoard.

## The Three Phases

### 1. Red — Write Failing Tests First
Before writing any application code, write tests that specify the desired behavior and currently fail.

#### Unit Tests
- Write unit tests for all UI components using React Testing Library
- Write unit tests for all utility functions
- Tests should verify the component/function behaves correctly with various inputs and edge cases

#### Integration Tests
- Write integration tests for database interactions via Prisma
- Write integration tests for REST API endpoints
- Test the full request/response cycle

### 2. Green — Minimal Implementation
Write the minimal code necessary to make the tests pass. Do not add extra features or over-engineer.

- Implement the component or utility function with correct typing
- Implement the API route handler to handle the request
- Write only what's needed to make tests pass

### 3. Refactor — Improve Without Breaking Tests
Once all tests pass, refactor for clarity, performance, and maintainability. Tests ensure nothing breaks.

- Improve code organization and naming
- Remove duplication
- Optimize if needed
- All tests must still pass

## When to Use This Skill

Invoke this skill whenever you:
- Implement a new feature
- Add a new component (UI or utility)
- Create a new API endpoint
- Add significant functionality to existing code

## Mandatory Test Coverage

All new code must have corresponding tests:
- **UI Components**: Unit tests with React Testing Library covering render, user interaction, and edge cases
- **Utility Functions**: Unit tests covering normal cases, edge cases, and error conditions
- **API Endpoints**: Integration tests for successful requests, error handling, and database interactions
- **Database Layer**: Integration tests verifying Prisma queries work correctly

## Test Tools

- **Test Runner**: Vitest
- **UI Testing**: React Testing Library
- **Database Testing**: Real database (use test fixtures or transactions)
