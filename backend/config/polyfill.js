import buffer from 'buffer';

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = class SlowBuffer {};
}
if (!buffer.SlowBuffer.prototype) {
  buffer.SlowBuffer.prototype = {};
}
