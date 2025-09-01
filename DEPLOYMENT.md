# Deploying to Netlify

This guide will help you deploy your React application to Netlify.

## Prerequisites

1. Make sure you have a GitHub account
2. Your code is pushed to a GitHub repository
3. You have a Netlify account (free at [netlify.com](https://netlify.com))

## Deployment Steps

### Method 1: Deploy via Netlify UI (Recommended)

1. **Build your project locally first:**
   ```bash
   npm run build
   ```

2. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign in with your GitHub account

3. **Create a new site:**
   - Click "Add new site"
   - Choose "Import an existing project"
   - Connect your GitHub repository

4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (or higher)

5. **Deploy:**
   - Click "Deploy site"
   - Wait for the build to complete

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Environment Variables

If your app uses environment variables, add them in Netlify:
1. Go to Site settings > Environment variables
2. Add your variables (e.g., API keys)

## Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Follow the DNS configuration instructions

## Continuous Deployment

Netlify automatically deploys when you push to your main branch. You can:
- Configure branch deployments
- Set up preview deployments for pull requests
- Configure build hooks

## Troubleshooting

- **Build fails:** Check the build logs in Netlify
- **Routing issues:** Ensure `_redirects` file is in the `public` folder
- **Environment variables:** Verify they're set correctly in Netlify

## Support

- [Netlify Docs](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/#netlify)
