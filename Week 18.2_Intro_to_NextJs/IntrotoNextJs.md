# **NextJS Intro**

**Pre - requisites**

+ You need to understand basic Frontend before proceeding to this track
+ You need to know what is and how you can create a simple application in it

## **About `Next.js` and why it was developed**
----------
NextJS was a framework that was introduced because of some `minor inconviniencies` in React

1. In a React project, you have to __maintain a separate Backend project for your API routes__(as `React` is NOT a backend framework but you can `Next.js` is BOTH a frontend and backend framework)

2. React does not provide __out of the box routing[remember routing in `React` class] (you have to use react- router-dom)__
3. React is __not SEO (Search Engine Optimisation) Optimised__ (**MOST IMPORTANT**)
    + not exactly true today because of React Server components
    + we'll discuss soon why ??
4. __Waterfalling problem__

:bulb:**What is SEO (Search engine optimisation) ??**

-> Whenever you are making any website, you goal is to **make appear your website on the top of the serach result, and that is what most website strive for** But if you create a raw `HTML` website, then it will be **HIGHLY OPTIMIISED**

**Ranking according to the SEO optimisation :-**

1. **`HTML, CSS, JS` -> Highly SEO optimised**
2. **`Next.Js` -> will be SEO optimised => you can convert it to highly SEO optimised**
3. **`React.js` -> Not SEO optimised**

The above is the reason most of the website have their __Landing page__ in `HTML, CSS, JS` or `Next.js` and their **Internal dashboard** in `React.js`

Lets discuss some of the problems now 

## **SEO Optimisation**(common interview question)
----------

Google/Bing has a bunch of `crawlers` that hit websites and figure out what
the website does.

It __ranks it on `Google` based on the `HTML` it gets back__ (<span style="color:orange">**Very very important point**</span>)

The `crawlers` usually __run your `JS` and render your page to see the final output__

>:pushpin:while Googlebot can run Javascript, `dynamically generated` content is harder for the scraper to index. 

You can see that in any `React` Project, the **VERY FIRST RESPONSE jo jata h that `html` file does not consists of EMPTY DIV and because of this, search engine like `google`, `bing` does not find any relevant keyword in that `html` file(as search engine looks for `html` code file only) which gives their `crawlers` description about what your website does and hence ranks it lower and hence your website does not look up in the first page of browser**

<img src = "image.png" width=600 height=200>

Notice in the above figure, the first `request` that went out, it has **empty DIV as it is `react` project**


Googlebot(or simply saying `crawlers`) has no idea on what the project is. It only sees in the original HTML response.

Ofcourse when the JS file loads eventually, things get rendered but `googlebot` doesn't discover this content very well.

## **Waterfalling problem**
----------

Lets say you built a **blogging website** in `react`, what steps do you think the `req-res` cycle takes ??

The cycle looks like the below :-

<img src = "image-1.png" width=500 height=250>

**Step 1 ->** going on the website, you asked for its `index.html` file and server gives you (**empty `HTML` and `script` tag(as `script` tag me he `js` ka code h)**)

**Step 2 ->** the `script` tag tells the browser that they need these `js` files get backs these `js` file 

**Step 3 ->** `Js` file **runs**

**Step 4 ->** Now you will fetch certain endpoint primarily (the user dashboard) and then [off course browser will check for `logged in or not`] this will returned by the `server`

**Step 5 ->** and finally go to **blogs** endpoint, which will show users `blogs`

1. Fetching the index.html from the CDN
2. Fetching scriptjs from CDN
3. Checking if user is logged in (if not. redirect them to /login page)
4. Fetching the actual blogs

There are 4 round trips that happen one after the other (sequentially)

Can you see the steps involved in the above and **these steps are NOT even executed PARALLELY, they run SEQUENTIALLY** which will take hell lot of time (**4 sequential `request` and waiting time for `response` is also sequential [ek `req` ka `res` jb tk nhi aayega, tb tk agla `req` nhi jayega]**)

The above is what we call **WATERFALLING PROBLEM**

>:pushpin:**The `waterfalling problem` in React, and more broadly in web development, refers to a scenario where data fetching operations are chained or dependent on each other in a way that leads to inefficient loading behavior.**
>
>> the term got its name from the fact that if you take one section of `waterfall`, then it is dependent on other while falling

BUT, if you have did the same thing as above in `Next.js`, then **In First `request` i would get back the blogs**, something like this ->

<img src = "image-2.png" width=600 height=200>











