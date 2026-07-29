#!/bin/bash
set -euo pipefail
cd "./.."
TOKEN="${COMMENTS_GITHUB_TOKEN:-$(gh auth token)}"
npx --yes vercel@latest env add COMMENTS_GITHUB_TOKEN production <<< "$TOKEN"
npx --yes vercel@latest env add COMMENTS_GITHUB_TOKEN preview <<< "$TOKEN"
npx --yes vercel@latest env add COMMENTS_GITHUB_TOKEN development <<< "$TOKEN"
npx --yes vercel@latest env add COMMENTS_GIST_ID production <<< "5253e9bc9987baf2d4a4ff0007aa5098"
npx --yes vercel@latest env add COMMENTS_GIST_ID preview <<< "5253e9bc9987baf2d4a4ff0007aa5098"
echo "Done. Redeploy production for the API to pick up the token."
