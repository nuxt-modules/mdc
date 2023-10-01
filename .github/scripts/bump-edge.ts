import { execSync } from 'node:child_process'
import { inc } from 'semver'
import { determineBumpType, loadWorkspace } from './utils'

async function main () {
  const workspace = await loadWorkspace(process.cwd())

  const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim().slice(0, 8)
  const date = Math.round(Date.now() / (1000 * 60))

  const bumpType = await determineBumpType()

  if (!workspace.packages.length) {
    workspace.packages.push(workspace.workspacePkg)
  }

  for (const pkg of workspace.packages.filter(p => !p.data.private)) {
    const newVersion = inc(pkg.data.version, bumpType || 'patch')
    workspace.setVersion(pkg.data.name, `${newVersion}-${date}.${commit}`, {
      updateDeps: true
    })
    const newname = (pkg.data.name + '-edge')
    workspace.rename(pkg.data.name, newname)
  }

  await workspace.save()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
