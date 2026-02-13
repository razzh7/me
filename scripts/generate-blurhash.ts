import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { encode as blurhashEncode } from 'blurhash'
import fg from 'fast-glob'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const outputFile = path.join(publicDir, 'blurhash-map.json')
const force = process.argv.includes('--force')

async function main() {
  // Load existing map (if not forced)
  let map: Record<string, string> = {}
  if (!force && existsSync(outputFile)) {
    map = JSON.parse(await fs.readFile(outputFile, 'utf-8'))
  }

  // Scan all images in public/
  const files = await fg('**/*.{jpg,jpeg,png,webp}', {
    caseSensitiveMatch: false,
    absolute: true,
    cwd: publicDir
  })

  console.log(`Found ${files.length} images in public/`)

  let generated = 0
  let skipped = 0

  for (const filepath of files) {
    // Convert to relative path like "/img/foo.png"
    const relativePath = '/' + path.relative(publicDir, filepath).replace(/\\/g, '/')

    // Skip if already exists and not forced
    if (map[relativePath] && !force) {
      skipped++
      continue
    }

    try {
      const buffer = await fs.readFile(filepath)
      const { data, info } = await sharp(buffer)
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: 'cover' })
        .toBuffer({ resolveWithObject: true })

      const blurhash = blurhashEncode(
        new Uint8ClampedArray(data),
        info.width,
        info.height,
        4,
        4
      )

      map[relativePath] = blurhash
      generated++
      console.log(`✓ ${relativePath}`)
    } catch (err) {
      console.error(`✗ ${relativePath}: ${err}`)
    }
  }

  // Sort keys for stable output
  const sorted = Object.keys(map)
    .sort()
    .reduce<Record<string, string>>((acc, key) => {
      acc[key] = map[key]
      return acc
    }, {})

  await fs.writeFile(outputFile, JSON.stringify(sorted, null, 2))

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}, Total: ${Object.keys(sorted).length}`)
  console.log(`Output: ${outputFile}`)
}

main().catch(console.error)
