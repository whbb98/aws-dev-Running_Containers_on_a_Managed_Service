#!/bin/bash
sudo yum -y remove python36
sudo yum -y install python38
sudo update-alternatives --set python /usr/bin/python3.8
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip ~/environment/awscliv2.zip && sudo ~/environment/aws/install
rm awscliv2.zip
sudo pip install boto3

echo Please enter a valid IP address:
read ip_address
echo IP address:$ip_address
echo Please wait...
#sudo pip install --upgrade awscli
bucket=`aws s3api list-buckets --query "Buckets[].Name" | grep s3bucket | tr -d ',' | sed -e 's/"//g' | xargs`
apigateway=`aws apigateway get-rest-apis | grep id | cut -f2- -d: | tr -d ',' | xargs`
echo $apigateway
FILE_PATH="/home/ec2-user/environment/resources/public_policy.json"
FILE_PATH_2="/home/ec2-user/environment/resources/permissions.py"
FILE_PATH_3="/home/ec2-user/environment/resources/setup.sh"
FILE_PATH_4="/home/ec2-user/environment/resources/website/config.js"
sed -i "s/<FMI_1>/$bucket/g" $FILE_PATH
sed -i "s/<FMI_2>/$ip_address/g" $FILE_PATH
sed -i "s/<FMI>/$bucket/g" $FILE_PATH_2

sed -i "s/API_GW_BASE_URL_STR: null,/API_GW_BASE_URL_STR: \"https:\/\/${apigateway}.execute-api.us-east-1.amazonaws.com\/prod\",/g" $FILE_PATH_4

aws s3 cp ./resources/website s3://$bucket/ --recursive --cache-control "max-age=0"

python /home/ec2-user/environment/resources/permissions.py
python /home/ec2-user/environment/resources/seed.py


cd /home/ec2-user/environment/resources/codebase_partner

touch Dockerfile

echo 'FROM node:11-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
' > Dockerfile

account_id=`aws sts get-caller-identity --query "Account" --output "text"`

docker build --tag cafe/node-web-app .

docker tag cafe/node-web-app:latest "${account_id}.dkr.ecr.us-east-1.amazonaws.com/cafe/node-web-app:latest"         

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "${account_id}.dkr.ecr.us-east-1.amazonaws.com"


docker push "${account_id}.dkr.ecr.us-east-1.amazonaws.com/cafe/node-web-app"
echo "done"