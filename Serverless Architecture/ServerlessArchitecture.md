# **Serverless Backends / Architecture**

This whole section basically deals with deployment of your project on the serverless backend.

## **Backend servers**

When we were discussing the `Express.js`, we were seeing the below pic 

<img src = "image.png" width=400 height=200>

and have learnt that the above is the arhitecture which is generally followed when you are hitting the backend. as we have till now not deployed our app (i.e. till now we have run it locally) so thats why you have not come up with the above architecture.

But eventually, you will host your application to a particular servers and this is **where CLOUD PROVIDERs come into the picture**

Big giants came to know that it is very hard to buy these servers and hence came up with the solution that they will **rent these servers and instead of course will charge you some money to run and maintain these servers**

Example include -> **AWS (Amazon Web Services) or Azure or GCP (Google cloud platform), they are what called as CLOUD PROVIDERs**

:bulb:**What is cloud ??**

-> Its basically a term used to describe the condition that, you **dont have a PHYSICAL server over somewhere, you can host them on the cloud (i.e. -> Amazon has a very big DATA CENTER in some places and in these you can RENT a very SMALL SERVER here and this is where you will deploy your backend)**

:large_blue_diamond:`AWS` was the first to discover this problem and came up with this solution 

You might've used `express` to create a Backend server.

The way to run it usually is node index. js which starts a process on a certain port (`3000` for example)

When you have to deploy it on the intemet, there are a few ways -

1. Go to __aws, GCP, Aure, Cloudflare__
   1. Rent a VM (Virtual Machine) and deploy your app
   2. Put it in an Auto scaling group
   3. Deploy it in a Kubernetes cluster


__There are a few downsides to doing this -__
1. Taking __care of how / when to scale ??__
2. __Base cost is to be paid even if no one is visiting your website__
3. __Monitoring__ various servers to make sure __no server is down__[although this can be taken care of using various things such as prometheus, kubernetes etc..]

**What if, you could just write the code and someone else could take care of all of these problems / downsides?**

or simply saying what if i can be charged for the **Number of request which comes to my website instead of renting a server that is always running and also charging me hefty. also what if a huge request comes to my app, someone else autoscale it and make multiple servers to fulfill the request**

The above problem is solved by **SERVERLESS BACKENDs**

## **Serverless Backends**
----------
`"Serverless"` is a __backend deployment__ in which the __cloud provider dynamically manages the allocation and provisioning of servers.__

> :pushpin: __The term "serverless" doesn't mean there are NO SERVERS involved.__
>
> >__Instead, it means that developers and operators DO NOT HAVE TO WORRY ABOUT THE SERVERs.(it will be maintained by the cloud providers)__

**EASIER DEFINITION**
----------
What if you could just write your `express routes` and run a command. The app would automatically
1. Deploy
2. Autoscale
3. Charge you on a `per request basis` (rather than you paying for VMs)

### **Problems with this approach**
----------


1. **More expensive at scale**
2. **Cold start problem**

#### **Cold start problem**

Since `aws` is charging you on the **pre request basis (means if 0 request then you will not be charged)**. Now as they are not charging you, so **they are also not running server for your application backend as it is compute intensive and you have not paid also** so Now if suddenly someone comes to your application, `aws` have to **start a server really fast (basically they try to start a small CONTATINER so that they can handle this request) if no one has been visiting the website for very long time**

The above problem is known as **COLD START problem (the name is self explanatory -> start hone me time lgta h if boht din tk website kisi ne nhi visit kiya h to), only in the FIRST REQUEST this occurs as after that server is continuously running till a particular time (when no request is coming to the website)**

There are ways to solve the above problem though ->

1. **Keep pinging your application** after some seconds so that server does not gets cool down (i.e. running always)
2. **Warm pool Implementation** -> means **minimum one server(you can set it also) will always be running or (up always) and after this, it can AUTOSCALE depends on the number of request which comes to application**

## **Famous Serverless providers**
----------
There are many famous serverless providers :-

+ **AWS Lambda**

Link to their page -> [AWS Lambda](https://aws.amazon.com/pm/lambda/?trk=5cc83e4b-8a6e-4976-92ff-7a6198f2fe76&sc_channel=ps&ef_id=CjwKCAiAt5euBhB9EiwAdkXWO-i-th4J3onX9ji-tPt_JmsBAQJLWYN4hzTF0Zxb084EKUBxSCK5vhoC-1wQAvD_BwE:G:s&s_kwcid=AL!4422!3!651612776783!e!!g!!awslambda!19828229697!143940519541)

+ **Google cloud functions**

Link to their page -> [Google cloud functions](https://firebase.google.com/docs/functions)

+ **Cloudflare workers**
  
Link to their page -> [Cloudflare workers](https://workers.cloudflare.com/)

We will be using **Cloudflare workers in this module**[<span style="color:orange">**without using you credit card, you can deploy some of  your backend to the internet**</span>]

### **When should you use serverless architecture ?**

1. When you have to __get off the ground fast__ and __don't want to worry about deployments__
2. When you __can't anticipate the traffic and don't want to worry about autoscaling__
3. If you have __very low traffic__ and want to __optimise for costs__

simply saying <span style="color:orange">**Project kaise maintain hoga you dont even want to care about it**</span>

## **Setting up Cloudflare workers**
----------
Link to sign up -> [Sign up Cloudflare](https://cloudflare.com) 

Just go to the website and do sign up (its as simple as that)

**Biggest advantage of using cloudflare is that they have DDoS(Distributed Denial of Service) attack prevention so whenever your website face DDoS attack, you can come to cloudflare and the team can solve it as fast as they can**

After signining up, you will see page like this ->

<img src = "image-1.png" width=400 height=200>

What we are interested is, the option present in the left navigation bar is under the `Compute(workers)` section named as `Workers & Pages`

**`Workers` are the serverless offerings of the cloudflare. They lets you deploy or serve some backend and even frontend code SERVERLESSLY.(means these are behind where it should be deployed, what countries it is deployed and so on..)**

To start with **lets try to create a worker**. coming inside the `Compute(workers) > Workers & Pages` and then selecting `Start with Hello World` by clicking on the `Get Started` button






