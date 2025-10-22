#!/bin/bash

# TNEX Finance - Quick Deploy Script
# This script helps you quickly deploy to GitHub Pages

set -e

echo "🚀 TNEX Finance - GitHub Pages Deploy Script"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first.${NC}"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo -e "${YELLOW}⚠️  Not a git repository. Initializing...${NC}"
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi

# Check if there are any changes
if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
    echo ""
    echo "Your website is already up to date!"
    exit 0
fi

# Show status
echo -e "${BLUE}📋 Current changes:${NC}"
git status -s
echo ""

# Ask for commit message
echo -e "${YELLOW}💬 Enter commit message (or press Enter for default):${NC}"
read -r COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update website - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Stage all changes
echo -e "${BLUE}📦 Staging changes...${NC}"
git add .
echo -e "${GREEN}✓ Changes staged${NC}"
echo ""

# Commit changes
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "$COMMIT_MSG"
echo -e "${GREEN}✓ Changes committed${NC}"
echo ""

# Check if remote exists
if ! git remote | grep -q origin; then
    echo -e "${YELLOW}⚠️  No remote repository configured${NC}"
    echo -e "${BLUE}Please add your GitHub repository URL:${NC}"
    echo "Example: https://github.com/username/vaynhanhtnex.vn.git"
    read -r REPO_URL
    
    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✓ Remote repository added${NC}"
    else
        echo -e "${RED}❌ No repository URL provided${NC}"
        exit 1
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Check if branch is main or master
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo -e "${YELLOW}⚠️  Current branch is '$CURRENT_BRANCH'${NC}"
    echo -e "${BLUE}Renaming to 'main'...${NC}"
    git branch -M main
    CURRENT_BRANCH="main"
    echo -e "${GREEN}✓ Branch renamed to main${NC}"
fi

# Push to GitHub
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
if git push -u origin "$CURRENT_BRANCH"; then
    echo ""
    echo -e "${GREEN}✅ Successfully deployed to GitHub!${NC}"
    echo ""
    echo -e "${BLUE}📍 Your website will be available at:${NC}"
    
    # Try to get GitHub username and repo name
    REMOTE_URL=$(git config --get remote.origin.url)
    if [[ $REMOTE_URL =~ github.com[:/]([^/]+)/([^/.]+) ]]; then
        USERNAME="${BASH_REMATCH[1]}"
        REPO="${BASH_REMATCH[2]}"
        echo -e "${GREEN}   https://${USERNAME}.github.io/${REPO}/${NC}"
    else
        echo -e "${YELLOW}   https://YOUR_USERNAME.github.io/YOUR_REPO/${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}⏳ Note: It may take a few minutes for changes to appear${NC}"
    echo ""
    echo -e "${BLUE}📚 Don't forget to:${NC}"
    echo "   1. Enable GitHub Pages in repository Settings"
    echo "   2. Set Source to 'main' branch"
    echo "   3. Wait for deployment to complete"
    echo ""
    echo -e "${GREEN}🎉 Happy coding!${NC}"
else
    echo ""
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo ""
    echo -e "${YELLOW}💡 Common solutions:${NC}"
    echo "   1. Check your internet connection"
    echo "   2. Verify repository URL: git remote -v"
    echo "   3. Make sure you have push access to the repository"
    echo "   4. Try: git push --set-upstream origin main"
    exit 1
fi
