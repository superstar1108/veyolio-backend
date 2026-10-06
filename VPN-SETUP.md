# Installing with Astrill VPN

`npm install` fails with **ECONNRESET** when Astrill drops npm's many parallel downloads.
The most reliable fix is to let Node.js (which runs npm, Next.js and Prisma) bypass the VPN,
while your browser and other apps stay on Astrill.

## Option 1 — StealthVPN / WireGuard / OpenVPN: exclude Node.js (recommended)
1. Open Astrill → menu (☰ / three dots) → **App Filter** (called *Application filter* in some versions).
2. Choose **Exclude selected** (tunnel everything except the listed apps).
3. Add `C:\Program Files\nodejs\node.exe`
   (not sure where it is? run `where node` in cmd).
4. Reconnect Astrill, then run `install.bat`.

## Option 2 — OpenWeb protocol: exclude npm's sites
1. Astrill → settings for **OpenWeb** → **Site Filter** → **Exclude these sites**.
2. Add:
   ```
   registry.npmjs.org
   npmjs.org
   npmjs.com
   binaries.prisma.sh
   fonts.gstatic.com
   ```
3. Or set OpenWeb **Tunnel Mode** to **Browsers** so command-line tools aren't tunneled.

## Option 3 — Route npm through Astrill's proxy
If Astrill's **Set System Proxy** option is on, `install.bat` detects the proxy
automatically and passes it to npm and Prisma — just run `install.bat`.

## Still failing?
- Switch Astrill to a nearer server or a different protocol and retry.
- Pause antivirus real-time scanning during install (fixes the `EPERM` warnings).
- Disconnect Astrill for the one-time install; everything works on the VPN afterwards.

## Undo manual npm proxy settings
```
npm config delete proxy
npm config delete https-proxy
```
