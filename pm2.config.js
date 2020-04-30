module.exports = {
  apps: [{
    name: "node webhook",
    script: "npm",
    args: "start",
    error_file: "./log/stderr.log",
    out_file: "./log/stdout.log"
  }]
}