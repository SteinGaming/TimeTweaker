# School Tool Upgrade your school experience

## Example ".env" file

```.env
# Webserver
PORT=3000

# Database
MONGODB_HOST="127.0.0.1:27017"
#MONGODB_USER=""
#MONGODB_PASSWORD=""
MONGODB_DATABASE="timeTweaker"

# Caching Database
REDIS_HOST=""
REDIS_USER=""
REDIS_PASSWORD=""

# User System
PASSWORD_PEPPER="pleaschangeinproduction"

```

## TODO

- [ ] Advanced logging system (log to file only if production mode)
- [ ] Registration only with link
- [ ] 2FA
- [x] Registration
