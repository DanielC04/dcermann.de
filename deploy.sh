#!/usr/bin/expect
spawn sftp -r deployment@dcermann.de 
expect -exact "deployment@dcermann.de's password: \r"
send -- "deploynow69!\r"
expect -exact "sftp> \r"
send -- "cd Personal_projects/test/\r"
expect -exact "sftp> \r"
send -- "rm index.html\r"
expect -exact "sftp>\r"
send -- "mput dist/index.html\r"
expect -exact "sftp> \r"
send -- "rm assets/*\r"
expect -exact "sftp> \r"
send -- "cd assets\r"
expect -exact "sftp> \r"
send -- "mput -r dist/assets/*\r"
expect -exact "sftp> \r"
send -- "bye\r"

