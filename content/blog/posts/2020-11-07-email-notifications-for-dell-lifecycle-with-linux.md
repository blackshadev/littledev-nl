---
title: Email notifications for Dell LifeCycle with Linux
description: >-
  So I got myself a fancy new server. It really is great, I really love it, it
  performs great and I noticed that there was an option to execute an executable
  when an event was generated by the LifeCycle manager (which checks the status
  of all the hardware for you), which is awesome. But I couldn’t find an
  application which sends the report to me. I searched, and searched, but found
  only solutions for windows or I needed to lay down money for a simple script.
  My solution: I will make my own simple script and share it.
date: '2014-08-24T10:51:00+02:00'
---
## The server

Let me first introduce you to BigDev, it’s a PowerEdge T610 with PERC H700 RAID controller, 2x Xeon L5520 (we didn’t need that much process power anyway), 42GB Ram, 2x 2TB RAID 0 and 6x 4TB RAID 5, all and all really nice. But… I have one major complaint, the support for linux distro’s like Debian or Ubuntu with regard to the support for Windows is dreadful. In windows you got a really nice tool in which you can update your hardware, view its status and from my understanding automatically send a formatted email. In Linux you get some CLI tools, with which you can configure some things and view the status and the logs. So no automatic emailing, no updating. This really is a shame, but luckily you can config each event in the lifeCycle manager to execute a program.

## The script

Script Files

So a script I made! This simple script calls the GNU program [sendEmail](http://caspian.dotconf.net/menu/Software/SendEmail/). I have written it in nodeJS, not really for a specific reason, I also could have done it in Python or C or anything. At first I tried bash, but unfortunately I d

iscovered that my Bash skills are greatly lacking. Anyway I stored the script along with a shell script to execute the JS file with nodeJS and the sendEmail program in /opt/scripts/. You can change all you want, or use it as it is. It is a simple script which only requires the Dell srvadmin, nodeJS and sendEmail. I run Ubuntu, so be carefull with the paths and commands, they can differ a little bit from other distros. The scripts are included in a zip (link also on top) and viewed at the bottom of this post.

Pro Tip: You may want to change the from and destination email address before using it, in the script referred to as \`from\` and \`to\`

#### mail_system_event.js

```javascript
var sys = require('sys')
var exec = require('child_process').exec;
var format = require('util').format;
var child;
var date_re = new RegExp("Date and Time\s:\s([a-zA-Z0-9: ]*)", "gm");
var subj_re = new RegExp("Description\s:\s([a-zA-Z0-9: ]*)", "mg");
var from = "server@littledev.nl"; // from address
var to   = "info@littledev.nl";   // which address to send to
var sendEmail = "/opt/scripts/sendEmail"
 
child = exec("/opt/dell/srvadmin/bin/omreport system alertlog | tail -n 50", function(err, stdout, stderr) {
    var blocks = stdout.split("\n\n");
    blocks.shift(); // remove first
    blocks.reverse();
    blocks.shift(); // remove last (only an enter)
    var date = blocks[0].match(/Date and Time\s*:\s*([a-zA-Z0-9: ]*)/)[1];
    var desc = blocks[0].match(/Description\s*:\s*([a-zA-Z0-9: ]*)/)[1];
     
    var message = "Server event\n---------\n" + blocks[0];
     
    var args = format("-f \"%s\" -t \"%s\" -u \"%s\" -m \"%s\" -o tls=no ", from, to, desc, message);
    exec(sendEmail + " " + args, function(err, stdout, stderr) {
        if(err)
            console.log(stderr);
    });
});
```

#### send_alert.sh

```sh
nodejs /opt/scripts/mail_system_event.js
```

#### SetDellEvents.sh

```sh
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=powersupply execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=powersupplywarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=tempwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=tempfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=fanwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=fanfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=voltwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=voltfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=intrusion execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=redundegrad execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=redunlost execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=memprefail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=memfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=hardwarelogwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=hardwarelogfull execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=processorwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=processorfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=watchdogasr execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=batterywarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=batteryfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=systempowerwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=systempowerfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=systempeakpower execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=removableflashmediapresent execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=removableflashmediaremoved execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=removableflashmediafail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=storagesyswarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=storagesysfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=storagectrlwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=storagectrlfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=pdiskwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=pdiskfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=vdiskwarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=vdiskfail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=enclosurewarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=enclosurefail execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=storagectrlbatterywarn execappath="/opt/scripts/send_alert.pl"
sudo /opt/dell/srvadmin/bin/omconfig system alertaction event=storagectrlbatteryfail execappath="/opt/scripts/send_alert.pl"
```