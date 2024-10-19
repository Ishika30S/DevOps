**This is a demo API created with Node.js and Express. The API serves a simple HTML form and responds with details of the incoming request, including headers, method, and body. It also includes Prometheus metrics for tracking the number of requests received.**
**Clone the Repository**
  git clone <repository-url>
  cd <repository-name>
 #Dockerfile is Created in Env/Prod/Dockerfile path 

**Setup in you local system **
1- Building Docker image
   docker build -t demoapi -f Env/Prod/Dockerfile .

2- Check Images
   docker images 

3- Run the docker image
   docker run -d -it -p 3000:3000 --name Demo-App --restart unless-stopped demoapi

4- Get the container id
   docker ps

5- To check the logs of container 
   docker logs <container_id>

6- To access the application 
   http://localhost:3000
   
7- Visit http://localhost:3000/metrics to see the Prometheus metrics, including the request counter.

**Deploying Demo API with CircleCI**
his README provides instructions on how to deploy a demo API created with Node.js and Express using CircleCI. The deployment process includes building a Docker image and deploying it 
**Prerequisites**
Docker- installed on your local machine.
CircleCI account linked to your GitHub or Bitbucket repository.
AWS ECR access for Docker image storage.
Environment variables for AWS credentials and other necessary configuration set in CircleCI.

**Setting Up CircleCI**
Create a CircleCI Project:
- Log in to your CircleCI account.
-Add your repository as a project.
Add Environment Variables:
Go to your project settings in CircleCI and add the following environment variables:

AWS_Demo_ACCESS_KEY
AWS_Demo_SECRET_KEY
AWS_REGION 
and add SSH Private key # circleci directory is added in github 

After setting Create tag for the deployment through branch you want to deploy 
example git tag v1.0.0

**To deploy your Node.js API service on a Kubernetes environment and verify that it works as expected, follow these detailed steps. For this example.** 
 Set Up Your Kubernetes Environment
If you haven't already set up a Kubernetes environment, here's how to do it for Minikube:
1- Install Minikube
2- Start Minikube:
   minikube start
3- Create deployment.yml and service.yml (code has both file present)
Apply the deployment and service
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

4- Check the Pods: After deploying, check the status of your pods to ensure they are running.
   kubectl get pods
5- Check the Service: Get details of your service to find out how to access it.
   kubectl get services
6- Get Minikube IP: If you're using Minikube, get the Minikube IP:
   minikube ip 
   Access Your Service
   http://<minikube-ip>:<node-port>
 





