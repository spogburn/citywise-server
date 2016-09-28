# citywise-server

##About 

The CityWise api allows users to POST to city-wise.herokuapp.com/api after authenticating with Google Oauth and receiving a JWT token. 

Cities can authenticat view a POST request to city-wise.herokuapp.com/login

It allows cities to view the data by sending a GET request to city-wise.herokuapp.com/api after authenticating via the application interface. 

Cities can mark wiseups as fixed or archived via a POST to city-wise.herokuapp.com/api/:id

##Technologies

The API is built in NodeJS and Express with a PostgreSQL database. 

