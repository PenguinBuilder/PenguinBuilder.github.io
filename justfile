files := "index.html editor/index.html"
out := "docs"
port := "1234"

dev:
  npx parcel {{files}} --port {{port}}

build:
  npx parcel build {{files}} --dist-dir {{out}}

clean:
  rm -rf {{out}}
