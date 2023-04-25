# <div align="center"> HealData</div>

# Table of Contents
1. [ Problem Statement](#problem_statement)
2. [Solution](#solution)
3. [ Directory Flow](#directory)
4. [ Working ](#working)
5. [ Tech Stack Used ](#tech_stack)
6. [ Future Initiatives ](#future_initiatives)
7. [ Developers ](#developers)


<a name="problem_statement"></a>
# Problem Statement
The health data of the globe is highly distributed across various websites, webs and servers and not available on any single platform. This creates a huge difficulty for the programmers of health specialists to check the current or past trends of the health index of each area.

<a name="solution"></a>
# Solution
HealData is aggregating the health data of each area in one web app. Data of every disease and each area of the globe is available in single app.

<a href="https://healdata-1a.web.app/">Website Link</a>

<a name="directory"></a>
# Directory Flow
```
ngo-app
|--- backend
|    |--- index.js             # Apis
|    |--- package              # All packages used in backend(node js) 

|--- Frontend
|    |--- public
|    |    |--- index.js
|    |--- src
|    |    |--- App.js
|    |    |--- components
|    |    |     |--- Home.js
|    |    |     |--- Navbar.js
|    |    |     |--- Form.js
|    |    |     |--- Homecards.js
|    |    |     |--- Card.js
|    |    |     |--- Services.js
|    |    |     |--- Singlecard.js
|    |    |     |--- Updatedata.js
```

<a name="working"></a>
# Working
<ul>
<li>The data of each year areawise is entered manually on the app using the form provided</li>
<li>The data is stored in MySQL Database</li>
<li>User have to enter the area and age group of which health data, they are looking for.</li>
<li>The data is rendered of each disease of that area and age group in a very affirmative way in the form of plotly graphs</li>
</ul>

<a name="tech_stack"></a>
# Tech Stack

<a name="future_initiatives"></a>
# Future Initiatives

<a name="developer"></a>
# Developers

Webapp created using Node JS and React JS single page website. MySQL database is used to store the yearly data of each locaion of every disease in that area.
https://healdata-1a.web.app/ - Domain name where it is hosted, but there only static react app is hosted as dynamic deployement requires purchase of cloud MySQL and domain name.

Some photos are uploaded in ppt to show how it works if it works as dynamic web app on the localhost!

Packages installed for node JS
npm install express
npm install cors
npm install dotenv

Packages install for react JS
npm install react-plotly.js plotly.js
npm install -g concurrently
