# devHub APIs
 
## authRouter
- POST /signUp
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
<!-- - POST /request/send/interested/:userId -->
<!-- - POST /request/send/ignore/:userId
Merged to ::::  -->
- POST /request/send/:status/:userId


<!-- - POST /request/review/accepted/:requestId -->
<!-- - POST /request/review/rejected/:requestId -->
 Merged to : 
- POST /request/review/:status/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - Gets the profile of users on the platform 
