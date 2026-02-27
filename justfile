build:
    npx vite build
    cp ./googlea93a741178982221.html ./docs/

dev flag = "":
    npx vite {{flag}}

clean:
    rm -rf node_modules
    rm package-lock.json
    npm install
    rm -rf docs 
