# **CI-CD Pipeline**

## **What is CI/CD ??**
----------

### __Continuous Integration__

Continuous Integration (CI) is a development practice where __developers frequently integrate their code changes into a shared repository,__ preferably several times a day. Each integration is automatically verified by
1. Building the project and
2. __Running automated tests.__

basically continuously running and integrating code into the repo on some version control systems like github

This process allows teams to detect problems early, improve software quality, and reduce the time it takes to validate and release new software updates.

Or inshort, before people push anything the maintainer can **run a workflow and can see is the code they are trying to merge in your repo is correctly LINTED, or FORMATTED**

### **Continuous Deployment**
----------
As the name suggests, deploying your code __continuously and automatically__ to various environments (dev/stage/prod).


## **CD in Github**
----------
We'll be deploying a next.js app to EC2 server via docker

> :bulb: You dont really need Docker here, since its deploying on a simple EC2 server
> If you deploy to 
>
> > 1. GCP App runner
> > 2. ECS
> > 3. Kubernetes
> 
> then it makes more sense to make it `dockerised`

### **Architecture diagram**
----------
<img src = "image.png" width=600 height=300>