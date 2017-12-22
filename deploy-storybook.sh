#!/bin/bash

TRAVIS_BRANCH=$1

if [[ ${TRAVIS_BRANCH} == *"master"* ]]
then
	echo "Master branch deploy to npm and GH-Pages"
	npm run deploy-storybook && npm publish
else
	echo "Unknown branch type...not deploying"
fi
