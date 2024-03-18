# My pad

## curl requests

### create user

```
curl -X POST -H 'Content-Type: application/json; charset=utf-8' \
  -d '{"email": "johndoe@example.com", "password":"Abc.123@"}' \
  http://localhost:5060/api/auth/signup
```
