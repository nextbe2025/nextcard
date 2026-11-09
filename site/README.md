# NEXTCARD — site institucional

Site da NEXTCARD (automação comercial para food service: totens de autoatendimento, catracas e comandas eletrônicas).

## Stack

- Next.js 16 (App Router, Turbopack no dev), React 19, TypeScript 5
- Tailwind CSS 4
- GSAP, Lenis, Swiper, react-fast-marquee, Leaflet
- Gerenciador de pacotes: **npm** (use só o `package-lock.json`)

## Rodando localmente

Requer Node.js 20 ou mais recente. Todos os comandos rodam dentro da pasta `site/`.

```bash
npm install
npm run dev        # http://localhost:3000
```

Outros scripts:

```bash
npm run build      # build de produção
npm run start      # serve o build
npm run lint       # ESLint
npm run format     # Prettier
```

## Variáveis de ambiente

Crie um `.env.local` em `site/` para testar localmente (não é versionado).

| Variável                         | Obrigatória | Uso                                                                                                                            |
| -------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `LEAD_WEBHOOK_URL`               | Sim (prod)  | Webhook que recebe os leads do formulário (`/api/leads`). Sem ela, em produção o formulário responde que não está configurado. |
| `TURNSTILE_SECRET_KEY`           | Não         | Chave secreta do Cloudflare Turnstile (captcha do formulário).                                                                 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Não         | Chave pública do Turnstile. Configure junto com a secreta.                                                                     |

Em desenvolvimento, sem `LEAD_WEBHOOK_URL`, o lead é só registrado no console.

## Deploy (Vercel)

- **Root Directory:** `site`
- Framework: Next.js (detectado automaticamente)
- Configure as variáveis de ambiente acima no projeto da Vercel.
