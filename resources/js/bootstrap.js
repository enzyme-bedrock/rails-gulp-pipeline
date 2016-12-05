import Q from 'qoob'
import debug from 'debug'

const log = debug('app:log')

if (ENV !== 'production') {
  debug.enable('*')
} else {
  debug.disable()
}

// Sharable dependencies.
export default {
  Q,
  log,
}
