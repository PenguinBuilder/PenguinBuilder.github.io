build:
    npx vite build

dev flag = "":
    npx vite {{flag}}

clean:
    rm -rf node_modules
    rm package-lock.json
    npm install
    rm -rf docs 
