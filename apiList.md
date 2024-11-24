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
- POST /request/send/:status/:userId
status: "interested" , "ignore"
- POST /request/review/:status/:requestId
status: "accepted" , "rejected"
## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - Gets the profile of users on the platform 
