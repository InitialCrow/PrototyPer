#!/usr/bin/env bash
USERNAME='phpmyadmin'
PASSWORD='0000'
DBNAME='la_prototyper'
HOST='localhost'


MySQL=$(cat <<EOF
DROP DATABASE IF EXISTS $DBNAME;
CREATE DATABASE $DBNAME DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
EOF
)

echo $MySQL | mysql --user=$USERNAME --password=$PASSWORD

