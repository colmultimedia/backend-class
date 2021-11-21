# backend-class

This is my repo for the backend course class

MATTHEUV OSORIO


SET PASSWORD [FOR root] =
    {
        PASSWORD(‘Maria db’)
      | OLD_PASSWORD('')
      | 'encrypted password'
    }


#NGINX

ROUTE FOR CONFIG NGINX
cd /usr/local/etc/nginx

nginx.conf have the settings for NGINX

server {
        listen       8080;
        server_name  localhost;


#route html files on NGINX
/usr/local/Cellar/nginx/1.21.3/bin/nginx

nginx -s reload after change port or whatever setting of the .conf file


#ARTILLERY COMMANDS

artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > result_cluster.txt

Run at the console:
node app.js 8081 CLUSTER
node app.js 8081 FORK