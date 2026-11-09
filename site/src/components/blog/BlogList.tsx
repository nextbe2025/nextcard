'use client';
import { BlogCategory, BlogPost, blogCategories } from '@/data/blog-posts';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import BackgroundMark from '../shared/BackgroundMark';

const PAGE_SIZE = 9;

const PostCard = ({ post }: { post: BlogPost }) => {
  const href = `/blog/${post.slug}`;

  return (
    <div className="h-full">
      <article className="group bg-background-1 dark:bg-background-6 border-secondary/10 hover:border-primary-500/40 flex h-full flex-col overflow-hidden rounded-[24px] border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(35,35,31,0.14)]">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="bg-secondary/70 text-tagline-3 absolute top-4 left-4 rounded-full border border-white/20 px-3 py-1.5 font-bold text-white backdrop-blur-md">
            {post.category}
          </span>
        </Link>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-heading-6">
            <Link href={href} className="hover:text-primary-500 transition-colors">
              {post.title}
            </Link>
          </h3>
          <p className="text-tagline-1 line-clamp-3">{post.excerpt}</p>
          <Link
            href={href}
            className="text-primary-500 text-tagline-1 mt-auto inline-flex items-center gap-2 pt-2 font-medium">
            Ler artigo
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
};

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  const [category, setCategory] = useState<BlogCategory | 'Todos'>('Todos');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = blogCategories.filter((item) => posts.some((post) => post.category === item));
  const filtered = category === 'Todos' ? posts : posts.filter((post) => post.category === category);
  const shown = filtered.slice(0, visible);

  const select = (next: BlogCategory | 'Todos') => {
    setCategory(next);
    setVisible(PAGE_SIZE);
  };

  return (
    <section id="artigos" className="relative isolate scroll-mt-24 py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
      <BackgroundLines variant="grid" />
      <BackgroundMark className="text-secondary dark:text-accent w-[380px]" position="right-[3%] bottom-[3%]" />
      <div className="main-container space-y-10 md:space-y-12">
        <div className="mx-auto max-w-[720px] space-y-4 text-center">
          <RevealAnimation delay={0.1}>
            <h2>Últimos artigos</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p>Dicas e boas práticas para otimizar processos no seu estabelecimento gastronômico.</p>
          </RevealAnimation>
        </div>

        {categories.length > 1 && (
          <RevealAnimation delay={0.3}>
            <ul className="flex flex-wrap justify-center gap-3" aria-label="Filtrar por categoria">
              {(['Todos', ...categories] as const).map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => select(item)}
                    aria-pressed={category === item}
                    className={cn(
                      'text-tagline-2 cursor-pointer rounded-full border px-5 py-2.5 font-medium transition-colors duration-300',
                      category === item
                        ? 'bg-primary-500 border-primary-500 text-white'
                        : 'bg-background-1 border-secondary/10 text-secondary hover:border-primary-500/50 hover:text-primary-500',
                    )}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </RevealAnimation>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, index) => (
            <RevealAnimation key={post.slug} delay={(index % 3) * 0.1} start="top 95%">
              <PostCard post={post} />
            </RevealAnimation>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setVisible((current) => current + PAGE_SIZE)}
              className="btn btn-secondary hover:btn-primary btn-lg cursor-pointer">
              <span>Ver mais artigos</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
