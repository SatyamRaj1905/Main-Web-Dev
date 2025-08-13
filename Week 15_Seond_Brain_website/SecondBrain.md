# **Second Brain Project**

## **What we're building**
----------
<img src = "image.png" width=500 height=250>

## **Backend**
----------

###  __Endpoints required__
----------


1. **Sign up**

Below is the hints to start making it  

POST /api/v1/signup

```javascript
{
  "username" : "harkirat"
  "password" : "123123"
}
```

**Constraints**

1. username should be 3-10 letters
2. Password should be 8 to 20 letters, should have atleast one uppercase, one lowercase, one special character, one number 

**Response**

1. Status 200 - Signed up
2. Status 411 - Error in inputs 
3. Status 403 - User already exists with this username
4. Status 500 - Server Error 

2. **Sign in**

POST /api/v1/signin 

```javascript
{
  "username" : "harkirat",
  "password" : "123123"
}
```

Returns 

+ 200 

```javascript
{
  "token" : "jwt_token"
}
```

+ 403 - Wrong email password 
+ 500 - Internal Server error

3. **Add new content**

/api/v1/content 

```javascript
{
  "type": "document" | "tweet" | "youtube" | "link",
  "link": "url",
  "title": "Title of doc/video",
  "tags" : ["productivity", "politics", ...] // this part is slightly complicated see below the reason // 2 point 
}
```

**Adding a content will also make you to send your authorisation token first in the header**

**Explanation of `// 2` code**

So the reason for this to be slightly complicated is that **tags are DYNAMIC** (means they can be added new from the user end) 

A good usecase of above is that when you go to any job forms, they ask you for college details and if your college is not present in the list then they add that so that the next candidate which fills this form should be able to see your college from the option can choose it (hence it is made dynamic)

**List that grows by time**

4. **Fetching existing documents**(no pagination)

GET api/v1/content

```javascript
{
  "content" : [
    {
      "type": "document" | "tweet" | "youtube" | "link",
      "link": "url",
      "title": "Title of doc/video",
      "tags" : ["productivity", "politics", ...]
    }
  ]
}
```

will return **your content which means in the header of this endpoint, you have to send your authorisation token**

5. **Delete a document**

DELETE api/v1/content 

```javascript
{
  "contentId" : "1" 
}
```

Returns :-

1. 200 - Delete succeeded
2. 403 - Trying to delete a doc you don't own 

6. **Create a sharable link for your second brain**

POST /api/v1/brain/share

```javascript
{
  "share" : true,
}
```

Initially it will be false, if the user makes it true then make a **sharable link so that the user can share it to the whole world**

Returns 

```javascript
{
  "link" : "link_to_open_brain"  // a link to share the user idea or brain 
}
```

### **Schema (Database design)**
----------

<img src = "image-1.png" width=500 height=250>




