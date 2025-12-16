#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
npm run docs:build
# 进入生成的文件夹
cd docs/.vuepress/dist
# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:bootstet/boke.git master:gh-pages
git push -f git@github.com:bootstet/boke.git master:master
# 将本地代码关联到github上
# git remote add origin https://github.com/bootstet/boke.git
# git fetch origin master
#  (忽略版本不同造成的影响)
# git pull origin master --allow-unrelated-histories    
# git pull origin master
# 首先将远程仓库和本地仓库关联起来：
# git branch --set-upstream-to=origin/master master
# git push origin master

cd -