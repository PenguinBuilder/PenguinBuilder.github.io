files := "index.html editor/index.html"
out := "dist"
port := "1234"
repo:= "/dev"

dev:
  npx parcel {{files}} --port {{port}} --dist-dir {{out}}

build:
  npx parcel build {{files}} --dist-dir {{out}} --public-url {{repo}}

clean:
  rm -rf {{out}}
