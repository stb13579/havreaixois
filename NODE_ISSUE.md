# Node.js Issue Detected

## Problem
Your Node installation appears to have a library dependency issue (libicui18n.70.dylib).

## Quick Fixes (Choose One)

### Option 1: Use nvm (Recommended)
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20
nvm use 20
nvm alias default 20

# Try building again
cd /Users/shaunbrown/Documents/GitHub/havreaixois
npm run build
```

### Option 2: Reinstall Node with Homebrew
```bash
# Remove old node
brew uninstall node@14

# Install latest LTS
brew install node@20

# Link it
brew link node@20

# Try building again
cd /Users/shaunbrown/Documents/GitHub/havreaixois
npm run build
```

### Option 3: Fix icu4c library
```bash
# Reinstall icu4c
brew reinstall icu4c

# Try building again
cd /Users/shaunbrown/Documents/GitHub/havreaixois
npm run build
```

## After Fixing

Once Node is working, run:
```bash
cd /Users/shaunbrown/Documents/GitHub/havreaixois
npm run build
```

You should see output like:
```
✓ Compiled successfully
✓ Exporting (static)
✓ Generating static pages
✓ Finalizing page optimization
```

Then you can deploy your site!
