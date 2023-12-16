import { defineConfig } from 'vite';
export default defineConfig({
    // Base URL for the application
    base: '/cos_426_final/',
    homepage: "https://tonyowensjr.github.io/cos_426_final/",
    scripts:
    {    "predeploy" : "npm run build",
    "deploy" : "gh-pages -d dist",
    "dev": "vite",
        "build": "vite build",
    }

});

