export default function trunc(str: string, limit: number, useDots?: boolean): string {
  return str.length > limit ? str.substr(0, limit - 1) + (useDots ? '...' : '&hellip;') : str.toString()
}
