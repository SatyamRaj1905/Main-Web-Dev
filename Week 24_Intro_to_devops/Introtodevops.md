# **VMs and Deploying a MERN app**

## **Why deploying on the internet, isn't localhost enough ?**

---

Have you ever seen the below meme ->

<img src = "image.png" width=400 height=300>

## **Domains V/S IPs**

---

### **Localhost**

---

`Localhost` refers to the computer you're currently working on. **It's essentially a loopback address that points to the machine itself, allowing it to communicate with itself over a network.** In technical terms, the IP address for localhost is usually `127.0.0.1` for IPv4, or `::1` for IPv6

<img src = "image-1.png" width=400 height=200>

If you send the address(localhost one) of harkirat to raman, then in the raman machine, it will try to find out **its own localhost**

> [!IMPORTANT] > **`localhost` is the DOMAIN and `127.0.0.1` is known as IP**

<img src = "image-2.png" width=400 height=200>

**IP (Internet Protocol) Address:**

-   An IP address is a unique string of numbers that identifies a device on a network, like the internet. Think of it like a house address: it's how computers (or any devices on the network) know where to send information.
-   For example, `192.168.1.1` is an IP address.
-   An IP address is essential for routing data on the internet, but it's not the most human-friendly system.

**Domain Name**

-   A domain name is the readable, human-friendly address we use to access websites, like `google.com` or `facebook.com`

> [!NOTE] > **IPv4 V/S IPv6**
>
> **IPv4 ->** It can range from `0.0.0.0` to `255.255.255.255` (each is 8 bit(0 to 2^8-1 value)) only, Now this lead to the problem that it will be limited which is 256^4 (**only this much IPv4 addresses can be there in the world**) and hence because of this IPv6 was introduced
>
> **IPv6 ->**

### **Ping command**

---

Try running

```javascript
ping localhost
```

Now try running the below command

```javascript
ping google.com
```

Notice google points to a different IP address

### **Local Network, routing(mild hosting)**

---

If you have multiple laptops on the same wifi router , you can access one machine from another by using their __private IP address.__ This is a mild version of deploying your app on your local network (or __whats called the intranet__)

<img src = "image-3.png" width=400 height=200>

In the above picture, 2 people are connected to the same network(router) and as **router has a table which is basically storing the ip address so that it can serve it**

and as they both are connected to the same network, so they still be able to see the website on the two device connected without hosting on the internet as you can see above

**Steps to follow**

**Step 1 ->** Start a `node.js` process locally on port 3000

```javascript
const express = require('express')
const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})
```
**Step 2 ->** Find the IP of your machine on the local network 

```javascript
ifconfig or ipconfig 
```

>[!IMPORTANT]
> `ifconfig` or `ipconfig` -> **using this will show you all the Network interfaces (different ways to reach to your computer)**
>
> Finding your wi-fi address by running the above command is simple (just see for the human readable ip address and that is the ip address of the wifi)
>
> **You can also use `npx server` if you are still not able to see the ip address, this gives the ip address of the network your laptop is connected to**



**Loopback Address**








