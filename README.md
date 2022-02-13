# FLIPR HACKTHON XII
$$ FULL STACK WEB DEVELOPMENT TASK $$

## What we have done 



We have build a web application where dealers can book drivers through the application for transporting their goods.
Our Projects Contains 2 types of user logins and signups pages

- As the Dealer 
 for new dealer signup we have design  a signup form which will ask the
following details - Name, Mobile Number, Nature of Material, Weight of
Material, Quantity, City and State.
Also This user can book the drivers from the list of drivers in his dashboard whose interested routes are the same as the dealer's location (State and City).
For eg: If the dealer’s location is Madhya Pradesh-Indore , all the drivers going
from/to Madhya Pradesh-Indore should display in the dealers dashboard.
Dealers can also search Driver from (State and City) to (State and City).


- As the Driver
For new drivers we have design a sign up, there should be a sign up form which will ask the following details- Name, Age, Truck Number, Mobile Number, Truck Capacity,
Transporter Name, Driving Experience, 3 Interested routes (From- state and
city/To- state and city).
also after login, this user can only see the dealers who have booked for his services.



## Brief
 
1. Login via (HTML/CSS/JS)
● Username - password   
● Login using OTP through the mail for these we have use SMTP(simple mail transport protocol. This means OTP should be sent to mail ID.
2. Dealer Home screen should show the list of drivers going through the same route as the
dealer's State and City which means the dealer should be able to see the drivers who have
mentioned the same interested routes as the dealer’s State and City.
3. Drivers Home screen should show the list of Dealers that have booked them.
4. Also we  have created a database that contains all the states and their respective city which we further used  to display all the cities of the selected state.



## Technology Used 



- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [Express](https://expressjs.com/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Installation

 It requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i
node app.js
localhost:8000
```
## Developers Details 
```
Anshu Kumar    Sudhir Sharma     Lalit Mehta
```




