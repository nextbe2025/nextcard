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

| Variável                         | Obrigatória         | Uso                                                                                                                                                                              |
| -------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RD_STATION_API_KEY`             | Uma das duas (prod) | Token público do RD Station Marketing (Integrações > Tokens). Cada lead vira uma conversão no RD (`contato`, `cotacao_totem`, `cotacao_catraca`, `cotacao_comanda`, `parceria`). |
| `LEAD_WEBHOOK_URL`               | Uma das duas (prod) | Webhook opcional que também recebe os leads (`/api/leads`) em JSON.                                                                                                              |
| `TURNSTILE_SECRET_KEY`           | Não                 | Chave secreta do Cloudflare Turnstile (captcha do formulário).                                                                                                                   |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Não                 | Chave pública do Turnstile. Configure junto com a secreta.                                                                                                                       |

O lead é enviado a todos os destinos configurados e conta como recebido se ao menos um aceitar. Em produção, sem nenhum dos dois, o formulário responde que não está configurado; em desenvolvimento, o lead é só registrado no console.

Campos extras dos formulários (segmento, quantidades, mensagem etc.) só vão para o RD depois de criados como campos personalizados no RD e mapeados em `src/utils/rdStation.ts`.

## Deploy (Vercel)

- **Root Directory:** `site`
- Framework: Next.js (detectado automaticamente)
- Configure as variáveis de ambiente acima no projeto da Vercel.
