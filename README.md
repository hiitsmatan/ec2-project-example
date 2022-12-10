# AWSteps

## Backend

1. Create EC2 instance for the backend (mongoDB and express).
	1. Security group rules:
			- ssh port 22, source: My IP
			- custom tcp port 27017, source: My IP
			- custom tcp port 27017, source: Backend-SG
			- custom tcp port 3005, source: ALL
			- custom tcp port 3005, source: Frontend-SG
			- HTTP port 80, source: Frontend-SG
	2. EC2 instance *User Data*: [Refer to 'whist-backened-userdata-script'](./whist-backened-userdata-script.sh)
			
2. Create EBS volume for mongodb consistent storage (gp2).
    - Make sure the instance is in the same availab zone as the EBS volume.
3. Attach the EBS volume to the *EC2-backend* that was create in the previous steps.

4. SSH into the EC2 and then:
	1. Make sure the instance is in the same availability zone as the EBS volume
	2. Attach the EBS volume using the following commands:
            ```
			sudo mkfs -t ext4 /dev/xvdf
			sudo mkdir /dbvolume
			sudo mount /dev/xvdf /dbvolume/
            ```
	3. Run the following docker commands to start containers:
        - mongo: `docker run --restart always -d --name mongodb -v /dbvolume/mongo-data:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo` 
        - express: `docker run --restart always -d --name nodexpress -p 3005:3005 matanski/nodexpress:yuvali6`
			
5. Create DB for the first time (in the next time it will be already be configured because of the docker -v volume option) with mongo compass via: 
	mongodb://mongo:mongo@*VM_PUBLIC_IP*:27017/

## Frontend

6. Create EC2 instance for the frontend (vue)
	1. Security group rules:
		- ssh port 22, source: My IP
		- custom tcp port 8080, source: ALL 
	2. EC2 instance *User Data*: [Refer to 'whist-frontend-userdata-script'](./whist-frontend-userdata-script.sh)

7. SSH into the EC2 and then:
	- Run the following docker commands to start containers:
		- vue: `docker run --restart always -d --name vueapp -p 8080:8080 matanski/vueapp:yuvali3`




	
			

