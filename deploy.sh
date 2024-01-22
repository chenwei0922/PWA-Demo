#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build

# 将test.html中”/manifest.json“改成"/PWA-Demo/manifest.json"，并将结果写入到build/test.html中
sed 's/\/manifest.json/\/PWA-Demo\/manifest.json/g' test.html > build/test.html

# 进入待发布的目录
cd build


# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:chenwei0922/PWA-Demo.git main:gh-pages

cd -