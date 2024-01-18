# shopify_themes

Dev Setup

## Install Themekit
For more information see https://shopify.dev/tools/theme-kit

brew install themekit   
theme get --list --password=(password) --store=(store url)   

mkdir current-theme   
cd current-theme   
theme get -p=(password) -s=(store url) -t=(theme id from the list above)   

theme watch --allow-live

## Install npm dependencies
npm install

## Run webpack
npm run dev
