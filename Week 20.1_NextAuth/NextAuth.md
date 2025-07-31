# **Next Auth**

NextAuth is __a library__ that lets you do `Authentication` in `Next.js`

Can you do it without next-auth ?? - Yes

Should you - Probably not!

Popoular choices while doing auth include -
1. __External provider -__
    1.  https://authO.com/  (one of the biggest authentication provider)
    2. https://clerk.com/
    3. Firebase auth
2. __In house using cookies__
3. __NextAuth__

## **Why not use JWT + localstorage in case of `Next.js` ??**
----------

:bulb:**How did we do `authentication` in `Node.js` or `react` ??**

The below is the control flow of how we used to `authentication`

<img src = "image.png" width=500 height=250>

Now can we do the same thing with `Next.js` -> lets say i have my frontend in `Next.js` and backend in `Node.js` server or lets keep it simple, backend is also `Next.js` server and we are following the above control flow :-

In the regular `react`, code flow of loading the website goes something like this -> first the `HTML` code gets load up and then the browser **sends the `request` to backend, and then the `JS` part runs which do whatever is required (like getting profile info., etc..)**

**BUT**

in `Next.js`, you were providing the `request` to the `Next.js` server, **that `request` will itself get first rendered on the `Next.js` server and then it hit the database and then database gives the data and with that it comes back to `Next.js` server and RENDERs again with data and this readymade page rendered on the `Next.js` server gets DISPLAYED on the Browser.**[i.e. -> SERVER SIDE RENDERING]

<img src = "image-1.png" width=500 height=220>

Now here comes the problem with the above approach of using the `JWT` to **authenticate**, **basically you cant send the `JWT` you have stored inside the browser (see above pic) because YOU CANNOT SEND the `jwt` TO THE FIRST PAGE or basically FIRST REQUEST as it cannot do that.**

in short 

> :pushpin:<span style="color:orange">**Remember ->**</span>**You cant send header in the FIRST REQUEST in `Next.js`**
>
> > **Reason ->** Unless and until the page loads up, you **do not have access to the browser's localstorage**

`Next.js server` has to somehow get the **Header and authenticate itself and then use the info. present in the database corresponding to it, render it over the `Next.js` server and send it to the client NOW THIS IS NOT POSSIBLE WHEN YOU ARE USING LOCALSTORAGE TO STORE THE TOKEN**<span style="color:orange">**as you cannot send the token along [valid only for FIRST REQUEST] of course after first request, when you got the data in the client then you might be using `useEffect` that can hit the backend with the LOCALSTORAGE TOKEN (but in the first request this is not POSSIBLE)**</span>

The above is not the problem with `react` :-

in `react`, something like this was happening :-

<img src = "image-2.png" width=500 height=250>

When first time you are sending the `request` to `react server`(phle isi ke pas jata h phir ye convert krta h `react` code to `html, css, and js` code bundle(as browser can only understand the above 3 langauges)) to BROWSER and then from here there are some code which involes **hitting the backend like using of `fetch` or `axios` in the codebase** and hence this **sends the `request` to backend** whose url is above shown as "http://localhost:3001..." and this **also has HEADER which does the authentication and finally display the info. after getting it from database (which in turn passed to backend and finally to frontend)**

In __short, Just remember these points and you will know the difference :-__

**SUMMARY of all the above thing studied above ->**

__Next.js (SSR)__

1. The first request is made by the browser to the Next.js server to get the HTML.
2. The Next.js server tries to render the page before it is sent to the browser.(recall **Premeptive fetching**)
3. At this point, the server does not have access to the browser's localStorage (where your JWT is stored).[**as IT ONLY EXISTS in the browser after the page reloads**]
    + So, you cannot send the JWT in a header for authentication on the very first page load.

__React (CSR)__

1. The browser loads the static HTML/JS bundle.
2. All API requests (e.g., fetching user data) present in the bundle are made from the browser (client-side), after the JS runs.
3. The browser has access to localStorage[**as now the page has loaded once**] and can attach the JWT in headers for these API requests—even on the first API call after the page loads.

__Key Difference__

+ __Next.js SSR:__ First request is for `HTML`, made to the server, which can't access localStorage.
+ __React CSR:__ First instead of `HTML`, API request is made from the browser (**as `HTML, JS` wala part to `react server` bnake bhej he deta h browser ko to browser `request` kyu krega `HTML` file ka instead now it `requests` for the API present inside it**), which can access localStorage.

__In `React`, you control when and how to send the JWT because all logic runs in the browser. In `Next.js` SSR, the server renders the page first, so it can't access browser-only storage like localStorage.__





