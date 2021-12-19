#!/bin/bash
cd /home/ubuntu/DONUT/server

export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REST_API_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names REST_API_KEY --query Parameters[0].Value | sed 's/"//g')
export REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GRANT_TYPE=$(aws ssm get-parameters --region ap-northeast-2 --names GRANT_TYPE --query Parameters[0].Value | sed 's/"//g')
export ORIGIN=$(aws ssm get-parameters --region ap-northeast-2 --names ORIGIN --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js
sleep 10s && pm2 status