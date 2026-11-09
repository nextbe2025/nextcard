import BlogCta from '@/components/blog/BlogCta';
import RevealAnimation from '@/components/animation/RevealAnimation';
import BackgroundLines from '@/components/shared/BackgroundLines';
import Cta from '@/components/shared/tracking/Cta';
import { BlogBlock, BlogPost, blogPosts, getBlogPost } from '@/data/blog-posts';
import { defaultMetadata } from '@/utils/generateMetaData';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) {
    return defaultMetadata;
  }
  return { ...defaultMetadata, title: `${post.title} | NEXTCARD`, description: post.excerpt };
}

const Block = ({ block }: { block: BlogBlock }) => {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-heading-5 mt-10 mb-4 first:mt-0">{block.text}</h2>;
    case 'p':
      return <p className="text-tagline-1 mb-5 leading-[1.7]">{block.text}</p>;
    case 'ul':
      return (
        <ul className="mb-6 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="text-tagline-1 flex items-start gap-3">
              <span aria-hidden className="bg-primary-500 mt-2.5 size-2 shrink-0 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'dl':
      return (
        <dl className="mb-6 space-y-3">
          {block.items.map(({ term, text }) => (
            <div key={term} className="bg-background-1 border-secondary/10 rounded-[16px] border p-5">
              <dt className="text-secondary text-tagline-1 font-medium">{term}</dt>
              <dd className="text-tagline-1 mt-1">{text}</dd>
            </div>
          ))}
        </dl>
      );
  }
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const post: BlogPost | undefined = getBlogPost((await params).slug);
  if (!post) {
    notFound();
  }
  const related = blogPosts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3);

  return (
    <main className="dark:bg-background-8 bg-white">
      <section className="relative isolate pt-32 pb-14 md:pt-40 md:pb-16 lg:pb-[88px]">
        <BackgroundLines variant="grid" />
        <div className="main-container">
          <div className="mx-auto max-w-[820px]">
            <RevealAnimation delay={0.1}>
              <Link
                href="/blog"
                className="text-tagline-2 text-secondary hover:text-primary-500 inline-flex items-center gap-2 font-medium transition-colors">
                <span aria-hidden>←</span> Voltar ao blog
              </Link>
            </RevealAnimation>
            <div className="mt-6 space-y-5">
              <RevealAnimation delay={0.2}>
                <span className="badge badge-primary">{post.category}</span>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <h1 className="text-heading-3">{post.title}</h1>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p className="text-tagline-1">{post.excerpt}</p>
              </RevealAnimation>
            </div>
          </div>

          <RevealAnimation delay={0.5}>
            <figure className="relative mx-auto my-10 aspect-[16/8] max-w-[1100px] overflow-hidden rounded-[28px] md:my-14">
              <Image src={post.cover} alt={post.coverAlt} fill priority sizes="1100px" className="object-cover" />
            </figure>
          </RevealAnimation>

          <article className="mx-auto max-w-[760px]">
            {post.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}

            {post.solution && (
              <div className="bg-secondary mt-12 flex flex-col items-start justify-between gap-5 rounded-[24px] p-7 text-white md:flex-row md:items-center">
                <p className="text-heading-6 max-w-[380px] text-white">Quer ver isso funcionando no seu negócio?</p>
                <Cta
                  href={post.solution.href}
                  id={`blog_${post.slug}_solucao`}
                  location="blog_artigo"
                  className="btn btn-primary hover:btn-white btn-lg shrink-0">
                  <span>{post.solution.label}</span>
                </Cta>
              </div>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-background-3 dark:bg-background-7 py-14 md:py-16 lg:py-[88px]">
          <div className="main-container space-y-8">
            <h2 className="text-heading-4">Continue lendo</h2>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <a
                    href={item.body ? `/blog/${item.slug}` : `https://nextcard.com.br/${item.slug}/`}
                    target={item.body ? undefined : '_blank'}
                    rel={item.body ? undefined : 'noopener noreferrer'}
                    className="group bg-background-1 border-secondary/10 hover:border-primary-500/40 block h-full rounded-[20px] border p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(35,35,31,0.12)]">
                    <span className="text-tagline-3 text-primary-500 font-bold">{item.category}</span>
                    <h3 className="text-heading-6 mt-2">{item.title}</h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BlogCta location="blog_artigo_cta" />
    </main>
  );
};

export default page;
