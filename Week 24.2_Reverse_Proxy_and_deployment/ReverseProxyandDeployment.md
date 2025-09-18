# **Reverse Proxy and deployemnt of the project**


## **AWS**
----------
AWS is Amazon's cloud services

It let's you 

1. Rent servers
2. Manange Domains
3. Upload objects (mp4 files, jpgs, mp3s, etc..)
4. Autoscale servers
5. create k8s clusters (kubernetes clusters)

The offering we will be focussing on today is `Renting servers`


It offers various things out of which **EC2 is the major one** which stands for **Elastic compute version 2**

:bulb:**What is elastic compute ??**

-> Just see the IntrotoDevos notes where we have understood the vm (Hardware -> Hypervisor -> VM concept) 

+ **Elastic ->** means it can change(increase/decrease the size of the machine) according to the need 
+ **Compute ->** Operations being performed on the hardware

and Version 2 is simply the version of this service given by AWS


### **Steps to create your own VM in aws**
----------
VMs on AWS are called as `EC2 Server`

Just go to the AWS dashboard and then in the search bar, write **Ec2** and you will see the option to create `EC2` click on it and then 

+ go to the `launch instances` button in the right side panel

give the name to the instance under the `Name and tags` input (basically name it your project)

+ select your OS (operating system)

most of the time Ubuntu is selected

There are also some cases in which you have to change the version of some os accroding to the need. one of them is 

+ Judge0 -> used by coding platform like leetcode to judge the problem and handle it (it actually has different C groups(**basically you want to ,limit the resource when you are building some thing like leetcode so that code submission does not takes too much time to get judged and these groups help in this**) which run only on Ubuntu version 20) so although Ubuntu has version 24 latest then also you have to shift to a later version to use in your project using Judge0.

+ now the next important option to choose from is the **instance type** which simply means which type of machine you want ?? 

>[!NOTE]
> **t2-micro is free** but keep in mind that if you have a **react or next.js project** then avoid renting the t2-micro machine, as they take a lot of memory so **you can serve react or next.js application but not build it**
>
> **Build the application and then push, dont build on the machine otherwise you will get memory exceeded so convert the tsx files to html, css and js files and then build and push it**

+ Next option is **keypair creation** (same theory as that present in the IntrotoDevops notes) clicking on this will let you give the option of various algorithm through which you can generate keypairs. (basically public key cryptography techniques)[how the keypair will look like]
creating this will download the keypair and now you can give this file to anyone whom you want to give access to the machine.










