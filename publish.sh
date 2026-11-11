#!/usr/bin/env bash
# Build the site and publish html/ to S3, then refresh CloudFront.
#
#   ./publish.sh        Preview: build, then list what WOULD upload. Nothing changes.
#   ./publish.sh --go   Build, upload changed files, and invalidate CloudFront.
#
# Needs BUCKET in .environment.sh (for example s3://vickywang.me).
# Optional: DISTRIBUTION_ID in .environment.sh; otherwise it is looked up by domain.

set -euo pipefail
cd "$(dirname "$0")"
source .environment.sh
: "${BUCKET:?BUCKET is not set in .environment.sh}"

DOMAIN="vickywang.me"

# Finished case studies. Add a folder name here when a case study is done.
PUBLISHED_CASES=(
  bq_b2c_vrbo
  bq_b2b_inventory_management
)

# Allowlist: only these paths are published. Everything else in html/ stays local.
FILTERS=(
  --exclude "*"
  --include "index.html"
  --include "resume/*"
  --include "robots.txt"
  --include "sitemap.xml"
  --include "site.webmanifest"
  --include "favicon*"
  --include "apple-touch-icon.png"
  --include "android-chrome-*"
  --include "photo_profile_avatar.png"
  --include "project_images/*"      # landing card images
  --include "thumbnails/*"
  --include "workroom/index.html"     # private hub for job applications
  --include "workroom/style.css"
  --include "workroom/scripts.js"
  --include "workroom/case-study.js"
)
for case_name in "${PUBLISHED_CASES[@]}"; do
  FILTERS+=(--include "workroom/$case_name/*")
done
FILTERS+=(--exclude "*.md" --exclude "*.DS_Store")

echo "Building..."
npm run build-ejs --silent > /dev/null

if [[ "${1:-}" != "--go" ]]; then
  echo
  echo "PREVIEW ONLY. Nothing was uploaded. Files that would upload to $BUCKET:"
  echo
  aws s3 sync html/ "$BUCKET" "${FILTERS[@]}" --dryrun | sed 's/^(dryrun) upload: html\//  /; s/ to s3:.*$//'
  echo
  echo "If the list looks right, run: ./publish.sh --go"
  exit 0
fi

echo "Uploading changed files to $BUCKET..."
aws s3 sync html/ "$BUCKET" "${FILTERS[@]}" --acl public-read

if [[ -z "${DISTRIBUTION_ID:-}" ]]; then
  QUERY='DistributionList.Items[?contains(Aliases.Items || `[]`, `"'"$DOMAIN"'"`)].Id | [0]'
  DISTRIBUTION_ID="$(aws cloudfront list-distributions --query "$QUERY" --output text)"
fi

if [[ -z "$DISTRIBUTION_ID" || "$DISTRIBUTION_ID" == "None" ]]; then
  echo "Uploaded, but no CloudFront distribution found for $DOMAIN."
  echo "Add DISTRIBUTION_ID=... to .environment.sh, then invalidate \"/*\" in the console."
  exit 1
fi

echo "Refreshing CloudFront ($DISTRIBUTION_ID)..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" \
  --query 'Invalidation.Id' --output text > /dev/null

echo "Published. The live site updates within a few minutes."
