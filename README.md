# tutorial-back-test
Node.js Rest API with Express and MySQL

## Pre-requisits
For running the application we should have installed: 
- node: v16.14.2
- npm: v8.5.5
- docker: Docker version 20.10.13

## Database container 
Init mysql docker container:
```
docker run --name={container_name} -p3306:3306 --env="MYSQL_ROOT_PASSWORD={DB_PASSWORD}" -d mysql:8.0
```

Create our schema to synchronize our models later:
```
docker exec {container_name} mysql -u root -p{DB_PASSWORD} -e "CREATE SCHEMA {DB_NAME};"
```

## JWT requirements
We must generata our private/public key pair to be able to sign our JWS (Signed JSON Web Token).

Generate private key
```
openssl genrsa -out {private_key_name}.pem 2048
```

Extatract public key from it:
```
openssl rsa -in {private_key_name}.pem -pubout > {public_key_name}.pem
```


## Env variables configuration
```
DB_NAME=
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000

JWT_USER_TOKEN_EXPIRES_IN=3h
JWT_ALGORITM=RS256
JWT_PUBLIC_KEY_PATH='{public_key_path}/{public_key_name}.pem'
JWT_PRIVATE_KEY_PATH='{private_key_path}/{private_key_name}.pem'
```