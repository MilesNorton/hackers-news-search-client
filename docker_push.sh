#!/bin/bash -e

# Push only if it's not a pull request
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
# Push only if we're testing the master branch
if [ "$TRAVIS_BRANCH" == "master" ]; then


TARGET_IMAGE="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${REMOTE_IMAGE_URL}"


# This is needed to login on AWS and push the image on ECR
# Change it accordingly to your docker repo
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
eval $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)

# Build and push
docker build -t $IMAGE_NAME .
echo "Pushing $IMAGE_NAME:latest"
docker tag $IMAGE_NAME:latest "$TARGET_IMAGE:latest"
docker push "$TARGET_IMAGE:latest"
echo "Pushed $IMAGE_NAME:latest"
else
echo "Skipping deploy because branch is not 'master'"
fi
else
echo "Skipping deploy because it's a pull request"
fi