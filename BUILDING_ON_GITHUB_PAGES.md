# Building and Deploying to GitHub Pages

This guide explains how to build and deploy the **Cultural Rhythm & Travel Explorer** to GitHub Pages.

## Prerequisites

- A GitHub account.
- [Node.js and npm](https://nodejs.org/) installed on your local machine.

## Steps to Deploy

### 1. Update `vite.config.ts`

Ensure your `base` property in `vite.config.ts` matches your repository name. If your repo is `https://github.com/username/repo-name`, set:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/repo-name/',
  // ... other config
})
```

### 2. Install the `gh-pages` package

Run the following command in your terminal:

```bash
npm install gh-pages --save-dev
```

### 3. Add Deployment Scripts

Open your `package.json` and add these two scripts:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist",
  // ... other scripts
}
```

### 4. Deploy

Run the deploy command:

```bash
npm run deploy
```

This will build your app and push the contents of the `dist` folder to a `gh-pages` branch on your repository.

### 5. Configure GitHub Settings

1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment**, ensure the **Source** is set to "Deploy from a branch".
4. Select the `gh-pages` branch and the `/ (root)` folder.
5. Click **Save**.

Your site should be live at `https://username.github.io/repo-name/` within a few minutes!

## Troubleshooting

- **Blank Page**: Check the browser console. If you see 404 errors for assets, ensure the `base` path in `vite.config.ts` is correct.
- **Routing**: If you use `react-router-dom`, consider using `HashRouter` instead of `BrowserRouter` for better compatibility with GitHub Pages' static hosting.
