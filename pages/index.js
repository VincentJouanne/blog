import Image from '@/components/Image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import ShortcutHome from '@/components/ShortcutHome'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { RoughNotation } from 'react-rough-notation'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-11 text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Hi 👋 I'm{' '}
                <span className="text-primary-color dark:text-primary-color-dark">Vincent</span>,
                <br></br>let's{' '}
                <span className="text-secondary-color dark:text-secondary-color-dark">
                  build better software
                </span>{' '}
                together.
              </h1>
            </div>
            <div>
              <Image
                src="/static/images/me.png"
                alt="avatar"
                width="200px"
                height="200px"
                className=" [clip-path:polygon(25%_0%,100%_0%,100%_100%,25%_100%,0%_50%)]"
              />
            </div>
          </div>
          <p className="text-lg leading-7 text-slate-600 dark:text-slate-300">
            <RoughNotation
              type="underline"
              show={true}
              color="#61dafb"
              animationDelay={800}
              animationDuration={1200}
            >
              Flutter,{' '}
            </RoughNotation>
            <RoughNotation
              type="underline"
              show={true}
              color="#84ba64"
              animationDelay={1400}
              animationDuration={1200}
            >
              Tests,{' '}
            </RoughNotation>
            <RoughNotation
              type="underline"
              show={true}
              color="#3178c6"
              animationDelay={1700}
              animationDuration={1200}
            >
              UI/UX{' '}
            </RoughNotation>
            and much more...
          </p>
          <div className="flex justify-center w-full">
            <div className="justify-center mt-2">
              <ShortcutHome />
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-slate-600 dark:text-slate-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-slate-800 dark:text-slate-200"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-slate-600 max-w-none dark:text-slate-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-color hover:text-blue-600 dark:hover:text-yellow-300 dark:text-primary-color-dark"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-color hover:text-blue-600 dark:hover:text-yellow-300 dark:text-primary-color-dark"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
