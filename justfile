files := "index.html editor/index.html"
out := "docs"
port := "1234"

dev:
  npx parcel {{files}} --port {{port}} --public-url ./

build:
  npx parcel build {{files}} --dist-dir {{out}} --public-url ./

clean:
  rm -rf {{out}}
