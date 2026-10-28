### Push your code from 'main' branch to 'branch-backend' for production
- `git subtree push --prefix=Backend origin branch-backend`

## Deploy to MS Azure
- Create VM resource 
- Get Public IP and *.pem key
- Run in shell:
    ```shell
        # 1. Lock the private key to be only read by owner 
        chmod 400 your-key.pem

        # 2. SSH to your Azure VM 
        ssh -i your-key.pem username@<ip>

        # 3. Update system package index
        sudo apt-get update

        # 4. Install prerequisites
        sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

        # 5. Add Docker's official GPG key
        sudo mkdir -p /etc/apt/keyrings

        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | 
        sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

        # 6. Set up the stable Docker repository
        echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

        # 7. Install Docker Engine and Docker Compose plugin
        sudo apt-get update

        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

        # 8. Add your user to the docker group (so you don't need 'sudo' for docker commands)
        sudo usermod -aG docker $USER

        # 9. Refresh the session to refetch the new permission
        newgrp docker

    ```
- Follow steps below.

## Pull image from GHCR and run directly
1. Create Project directory
    - `mkdir -p ~/finance-backend`
    - `cd ~/finance-backend`
2. Create docker-compose.yml file
    - `nano docker-compose.prod.yml`
    - Paste following:
        ```
        services:
            api:
                image: ghcr.io/prabeshnpl/tracker-backend:latest
                container_name: api-prod
                restart: unless-stopped
                command: sh /app/wsgi-entrypoint.sh
                depends_on:
                postgres-db:
                    condition: service_healthy
                redis:
                    condition: service_started
                ports:
                - "8000:8000"
                env_file:
                - .env
                volumes:
                - static_volume:/vol/web/static
                networks:
                - my-network

            postgres-db:
                image: postgres:18
                restart: unless-stopped
                container_name: "${DB_HOST}"
                volumes:
                - postgres_data:/var/lib/postgresql
                ports:
                - ${DB_PORT}:5432
                networks:
                - my-network
                environment:
                - POSTGRES_DB=${POSTGRES_DB}
                - POSTGRES_USER=${POSTGRES_USER}
                - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
                healthcheck:
                test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
                interval: 10s
                timeout: 5s
                retries: 5

            redis:
                image: redis:7
                container_name: redis
                restart: unless-stopped
                networks:
                - my-network

            networks:
                my-network:
                    name: my-network

            volumes:
                postgres_data:
                    name: postgres_data
                static_volume:
                    name: static_volume
        ```      
3. Set up your environment file (.env)
    - `nano .env`
    - Paste your variables, save, and exit.
4. Log into GHCR
    - `echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u prabeshnpl --password-stdin`
5. Start the app
    - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
    - or `docker-compose -f docker-compose.prod.yml up -d`

## Pull repo from Github and run
- First restore the data if needed. Command is provided below.
- Development(default loads override): 
    - `docker compose up`
    - `docker compose down`

## Create or check-out specific version of the project using tag

- Create and push a tag
```powershell
git tag -a v1.0.0 -m "Meta Data for the tag."
git push origin v1.0.0
```

- Retrieve specific version
```powershell
git clone https://github.com/username/repo.git
cd repo
git tag
git tag -n v1
git checkout v1.0.0
```

## Backup Postgres-db

### Run it strictly on `git bash` or `cmd` not in `powershell`
- Using plain SQL: `docker exec -t postgres-db pg_dump -U admin -d activity_tracker > backup.sql`
- Using custom dump file:: `docker exec -t postgres-db pg_dump -U admin -d activity_tracker -F c > backup.dump`

## Restore db
- Using plain SQL:  `docker exec -i postgres-db psql -U admin -d activity_tracker < backup.sql`
- Using custom dump file:  
    1. `docker cp backup.dump postgres-db:/tmp/backup.dump`
    2. `docker exec -it postgres-db pg_restore -U admin -d activity_tracker --clean --if-exists /tmp/backup.dump`

## If backing up to different db
```
docker exec -it postgres17-db psql -U new_admin -c "CREATE DATABASE tracker(or db name);"
```

## Transfer from db.sqlite3 into postgres

1. Dump the data from sqlite into data.json

    ```
    python manage.py dumpdata `
    --natural-primary --natural-foreign `
    --indent 2 > data.json
    ```
2. Switch to postgres database in settings.py

    ```
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv("POSTGRES_DB"),
            'USER': os.getenv("POSTGRES_USER"),
            'PASSWORD': os.getenv("POSTGRES_PASSWORD"),
            'HOST': 'postgres-db',
            'PORT': '5432',
        }
    }
    ```

3. Run migrations

4. Load the dumped data from json file into postgres data:
    - `docker compose exec api python manage.py loaddata data.json`




