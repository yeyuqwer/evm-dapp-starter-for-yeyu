import { readFile, rm, writeFile } from 'node:fs/promises'

const targets = [
  'src/app/examples',
  'src/ui/examples',
  'src/app/api/time',
  'src/api/time.ts',
  'src/hooks/time.ts',
  'src/api/tokens.ts',
  'src/hooks/tokens.ts',
]

for (const target of targets) {
  await rm(target, { recursive: true, force: true })
}

const homePagePath = 'src/app/(home)/page.tsx'
const examplesLinksBlock = `
      <div className="mt-3 flex flex-col space-y-2">
        <Link className="text-primary" href="/examples/transfer">
          Example: Transfer
        </Link>
        <Link className="text-primary" href="/examples/server-time">
          Example: Server Time
        </Link>
      </div>`

try {
  const originalContent = await readFile(homePagePath, 'utf8')
  let nextContent = originalContent

  nextContent = nextContent.replace("import Link from 'next/link'\n", '')
  nextContent = nextContent.replace(examplesLinksBlock, '')

  if (nextContent !== originalContent) {
    await writeFile(homePagePath, nextContent, 'utf8')
  }
} catch (error) {
  if (error != null && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
    // Home page may not exist in customized projects. Ignore and continue.
  } else {
    throw error
  }
}

console.log('Examples and related files removed.')
