#!/usr/bin/env bash
source .environment.sh
echo $BUCKET
aws s3 cp source/ $BUCKET --recursive --exclude "*.DS_Store"
