import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import sharp from 'sharp'

const maxSize = 1440

function bytesToHuman(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / 1024 ** i).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`.padStart(10, ' ')
}

async function compressImage(filepath: string) {
  const buffer = await fs.readFile(filepath)
  let image = sharp(buffer)
  const { format, width, height } = await image.metadata()

  if (!format || !width || !height) {
    console.log(`[SKIP] Could not read metadata: ${filepath}`)
    return
  }

  if (format !== 'jpeg' && format !== 'png' && format !== 'webp') {
    console.log(`[SKIP] Unsupported format ${format}: ${filepath}`)
    return
  }

  // Resize if too large
  if (width > maxSize || height > maxSize) {
    image = image.resize(maxSize)
  }

  // Compress with appropriate quality
  image = image[format]({
    quality: format === 'png' ? 100 : 80,
    compressionLevel: 9
  })

  const outBuffer = await image.withMetadata().toBuffer()
  const inSize = buffer.byteLength
  const outSize = outBuffer.byteLength
  const percent = (outSize - inSize) / inSize

  // Skip if compression doesn't reduce size by at least 10%
  if (percent > -0.10) {
    console.log(`[SKIP] ${bytesToHuman(inSize)} -> ${bytesToHuman(outSize)} ${(percent * 100).toFixed(1).padStart(6, ' ')}%  ${filepath}`)
    return
  }

  await fs.writeFile(filepath, new Uint8Array(outBuffer))
  console.log(`[COMP] ${bytesToHuman(inSize)} -> ${bytesToHuman(outSize)} \x1b[32m${(percent * 100).toFixed(1).padStart(6, ' ')}%\x1b[0m  ${filepath}`)
}

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const publicDir = path.resolve(__dirname, '../public')

  const files = await fg('**/*.{jpg,jpeg,png,webp}', {
    caseSensitiveMatch: false,
    absolute: true,
    cwd: publicDir
  })

  console.log(`Found ${files.length} images in public/\n`)

  let compressed = 0
  let skipped = 0

  for (const file of files) {
    try {
      const before = (await fs.stat(file)).size
      await compressImage(file)
      const after = (await fs.stat(file)).size
      if (after < before) compressed++
      else skipped++
    } catch (err) {
      console.error(`[ERR]  ${file}: ${err}`)
      skipped++
    }
  }

  console.log(`\nDone! Compressed: ${compressed}, Skipped: ${skipped}, Total: ${files.length}`)
}

main().catch(console.error)
