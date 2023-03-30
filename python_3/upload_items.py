'''
	You must replace <FMI> with your bucket name
'''
import boto3
S3API = boto3.client("s3", region_name="us-west-2") 
bucket_name = "<FMI>"

filename = "/home/ec2-user/environment/resources/website/backdrop_camera.jpg"
S3API.upload_file(filename, bucket_name, "backdrop_camera.jpg", ExtraArgs={'ContentType': "image/jpg", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/config.js"
S3API.upload_file(filename, bucket_name, "config.js", ExtraArgs={'ContentType': "application/js", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/core.css"
S3API.upload_file(filename, bucket_name, "core.css", ExtraArgs={'ContentType': "text/css", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/flex_search.js"
S3API.upload_file(filename, bucket_name, "flex_search.js", ExtraArgs={'ContentType': "application/js", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/index.html"
S3API.upload_file(filename, bucket_name, "index.html", ExtraArgs={'ContentType': "text/html", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/jquery.js"
S3API.upload_file(filename, bucket_name, "jquery.js", ExtraArgs={'ContentType': "application/js", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/kiosk.png"
S3API.upload_file(filename, bucket_name, "kiosk.png", ExtraArgs={'ContentType': "image/png", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/main.css"
S3API.upload_file(filename, bucket_name, "main.css", ExtraArgs={'ContentType': "text/css", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/main.js"
S3API.upload_file(filename, bucket_name, "main.js", ExtraArgs={'ContentType': "application/js", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/products.js"
S3API.upload_file(filename, bucket_name, "products.js", ExtraArgs={'ContentType': "application/js", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/reset.css"
S3API.upload_file(filename, bucket_name, "reset.css", ExtraArgs={'ContentType': "text/css", "CacheControl": "max-age=0"})

filename = "/home/ec2-user/environment/resources/website/search.css"
S3API.upload_file(filename, bucket_name, "search.css", ExtraArgs={'ContentType': "text/css", "CacheControl": "max-age=0"})


print ("DONE")
"""
Copyright @2021 [Amazon Web Services] [AWS]
    
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
