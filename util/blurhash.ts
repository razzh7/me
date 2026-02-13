import blurhashMap from '../public/blurhash-map.json'

const map: Record<string, string> = blurhashMap

export function getBlurhash(src: string): string | undefined {
  return map[src]
}

export function getBlurhashes(srcs: string[]): Record<string, string> {
  const result: Record<string, string> = {}

  for (const src of srcs) {
    const hash = map[src]
    if (hash) {
      result[src] = hash
    }
  }

  return result
}
