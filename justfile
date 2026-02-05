files := "index.html editor/index.html"
out := "dist"
port := "1234"

dev:
  npx parcel {{files}} --port {{port}} --dist-dir {{out}}

build:
  npx parcel build {{files}} --dist-dir {{out}}

clean:
  rm -rf {{out}}
