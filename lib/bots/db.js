#!/usr/bin/env node

// requires
var child_process = require('child_process')


// init
var defaultInterval = 4


/**
 * runs a command
 * @param  {object}   job  A kue job.
 * @param  {object}   done Called after done.
 */
function bot(job, done) {

  console.log(job.data)
  console.log('Running : ' + job.data.title)
  var cmd = job.data.cmd
  console.log(cmd)
  var interval = job.data.interval || defaultInterval
  console.log('interval is', interval)

  if (cmd) {
    child_process.exec(cmd, function(err, stdout, stderr){
      if (err) {
        console.error('error')
        console.error(err)
        setTimeout(done, interval*0)

      } else {
        console.log(stdout)
        console.error(stderr)
        setTimeout(done, interval*1000)

      }
    })
  } else {
    console.log('no command found')
    setTimeout(done, interval*0)
  }

}

module.exports = bot
