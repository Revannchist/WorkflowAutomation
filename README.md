🚀 WorkflowAutomation - CI/CD Pipeline

----------------------------------------------------------------------------------


This GitHub Actions workflow proof of concept automates the full CI/CD process for a project, ensuring code quality, performance, and seamless deployment to production. It runs automatically on every push or pull request to the main branch and includes three main stages:



1. Unit Testing (test)

   - Runs Vitest unit tests to ensure core functionality is working as expected.

   - Installs Node.js 20 and project dependencies.

   - Fails early if tests do not pass.

2. Deployment to Render (deploy)

   - Automatically deploys the application to Render after passing tests.

   - Triggered only on the main branch.

   - Uses a secure RENDER_DEPLOY_HOOK_URL to initiate deployment.

3. Load Testing (prod-load-test)

   - Runs performance and load tests using k6, with results sent to Grafana Cloud.

   - Targets the live deployed Render app using the TARGET_URL environment variable.

   - Helps catch performance regressions post-deployment.

----------------------------------------------------------------------------------

Secrets (Github Actions)

  - RENDER_DEPLOY_HOOK_URL	Webhook URL to trigger deployment on Render
  - K6_CLOUD_TOKEN	API token for authenticating with Grafana Cloud
  - K6_CLOUD_PROJECT_ID	Project ID in Grafana Cloud for storing load test results

File Structure

     .github/workflows/ci.yml — The CI/CD workflow file.

     load-test.js — k6 script used to perform load testing on the deployed app.
