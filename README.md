This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Troubleshooting

### "queryTxt EREFUSED" on local dev

If `npm run dev` or the admin "Restore DB" button fails with:
`queryTxt EREFUSED cluster0.xxxxx.mongodb.net`

This is a LOCAL DNS issue (your ISP/router DNS refuses MongoDB Atlas SRV/TXT queries). It does NOT affect production deployment on Vercel.

**Quick fixes (any one works):**

1. **Change DNS to Cloudflare or Google** (most reliable)
   - macOS: System Settings → Network → Wi-Fi → Details → DNS → add `1.1.1.1` and `8.8.8.8`
   - Windows: Control Panel → Network → Adapter Properties → IPv4 → DNS → `1.1.1.1`, `8.8.8.8`
   - Linux: edit /etc/resolv.conf or NetworkManager

2. **Use a non-SRV connection string** (fallback)
   In .env.local, replace your mongodb+srv:// URI with the equivalent mongodb:// URI listing all replica members explicitly. Get this from MongoDB Atlas → Connect → Drivers → "Use standard connection string".

3. **Use mobile hotspot** for one-off seeding — mobile networks usually have working DNS.

This issue is purely local — production environment (Vercel) uses Cloudflare DNS and works correctly without any of these fixes.
