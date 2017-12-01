export default function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getTime(time) {
  return `${time.toLocaleDateString('zh')}  ${time.toTimeString().substring(0, 8)}`;
}