import { execSync } from 'node:child_process'

// try {
//   const { stdout, stderr, status } = spawnSync('node', ['./bin/my-helper-cli.mjs', 'template'])
//   console.log('stdout', stdout.toString())
//   console.log('stderr', stderr)
//   console.log('status', status)
//   // console.log('signalDescription', signalDescription)
// }
// catch (error) {
//   console.log('error', error)
// }

try {
  const result = execSync(`node ./bin/my-helper-cli.mjs template --type --dir=./TEMPLATE`, { encoding: 'utf-8', shell: '/bin/bash', input: '1\n' })
  console.log('result', result)
}
catch (error) {
  console.log('error', error)
}
