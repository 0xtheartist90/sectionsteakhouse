import type { ReactNode } from 'react';

import HeroSlideshow from '@/components/hero-slideshow';
import LightboxImage from '@/components/lightbox-image';
import MenuTabs from '@/components/menu-tabs';
import OpenTableWidget from '@/components/opentable-widget';
import PhotoMarquee from '@/components/photo-marquee';
import Reveal from '@/components/reveal';

import { Clock, Gem, GlassWater, Martini, Shirt, Wine } from 'lucide-react';

const PHONE = '+19055130181';
const PHONE_LABEL = '905.513.0181';
const MAPS = 'https://maps.app.goo.gl/RDKipA1gV5VNGbneA';

const CallButton = ({ className = '', tone = 'salmon' }: { className?: string; tone?: 'salmon' | 'cream' }) => (
    <a
        href={`tel:${PHONE}`}
        className={`label inline-flex items-center justify-center rounded-full px-6 py-3.5 transition-colors ${
            tone === 'salmon'
                ? 'bg-salmon text-cream hover:bg-mauve'
                : 'bg-cream text-mauve hover:bg-marigold'
        } ${className}`}>
        Call to Reserve
    </a>
);

const Logo = ({ className = '' }: { className?: string }) => (
    <span role='img' aria-label='Section' className={`mask-logo block aspect-[338/369] ${className}`} />
);

// A centred section: the label sits as a small eyebrow above the heading (a side column threw
// the content off centre).
const Section = ({
    id,
    label,
    className,
    children
}: {
    id: string;
    label: string;
    className: string;
    children: ReactNode;
}) => (
    <section id={id} className={`relative px-5 py-20 md:px-10 md:py-28 ${className}`}>
        <div className='mx-auto max-w-6xl'>
            <p className='label mb-5 text-center opacity-80'>{label}</p>
            {children}
        </div>
    </section>
);


const FOOD_PHOTOS = [
    { src: '/images/sliced-steak.jpg', alt: 'Sliced dry-aged steak with fries and sides' },
    { src: '/images/oysters.jpg', alt: 'East coast oysters on ice with mignonette, horseradish and lemon' },
    { src: '/images/tartare-caviar.jpg', alt: 'Tartare crowned with caviar' },
    { src: '/images/caviar-bites.jpg', alt: 'Crispy potato bites topped with crème fraîche and caviar' },
    { src: '/images/steak-dinner.jpg', alt: 'Dry-aged steak with hand-cut fries, a Caesar salad and red wine' },
    { src: '/images/lobster-caviar-rolls.jpg', alt: 'Lobster and caviar rolls' },
    { src: '/images/tuna-crudo.jpg', alt: 'Tuna crudo with mint, shallot rings and golden pepper dressing' },
    { src: '/images/cheeseburger.jpg', alt: 'The prime rib cheeseburger' },
    { src: '/images/lobster-roll.jpg', alt: 'Lobster roll with chilli and hand-cut fries' },
    { src: '/images/old-fashioned.jpg', alt: 'An old fashioned over a clear block of ice' }
];

const ROOM_PHOTOS = [
    { src: '/images/house-evening.jpg', alt: 'The Section house on Main Street Unionville at dusk' },
    { src: '/images/bar.jpg', alt: 'The bar under its glowing ceiling' },
    { src: '/images/porch-sign.jpg', alt: 'The lit Section sign on the porch' },
    { src: '/images/dining-room.jpg', alt: 'Floral chairs, leather banquettes and mirrored walls' },
    { src: '/images/cocktail-leaf.jpg', alt: 'A stirred cocktail with a single leaf' },
    { src: '/images/bar-counter.jpg', alt: 'Bar stools along the counter' },
    { src: '/images/dining-room-windows.jpg', alt: 'The dining room under its pitched ceiling' }
];

const CUTS = [
    { name: 'Bone-in Filet Mignon', spec: '18 oz · US Prime · dry-aged', price: '98' },
    { name: 'Bone-in Ribeye', spec: '32 oz · Canadian Prime · dry-aged', price: '140' },
    { name: 'Wagyu NY Striploin', spec: '14 oz · Oakleigh Ranch', price: '175' }
];

const EXPERIENCE = [
    {
        icon: Clock,
        title: 'Late nights',
        text: 'Open Tuesday to Saturday from 5pm until midnight. Stay for one more round at the bar.'
    },
    {
        icon: Martini,
        title: 'The martini hour',
        text: 'A house martini made your way, a Vesper, or a Tokyo old fashioned with Hibiki.'
    },
    {
        icon: GlassWater,
        title: 'The raw bar',
        text: 'East coast oysters, tuna tartare, shrimp cocktail and lobster with caviar.'
    },
    {
        icon: Wine,
        title: 'A serious cellar',
        text: 'Burgundy, Bordeaux and Tuscany by the bottle, up to 1985 Latour and 2005 Masseto.'
    },
    {
        icon: Gem,
        title: 'A room from another era',
        text: 'Crystal chandeliers, leather banquettes and dark wood in a Victorian house on Main Street.'
    },
    {
        icon: Shirt,
        title: 'Smart elegant',
        text: 'Dress for the evening. Section is a grown-up room, for guests 10 and older.'
    }
];

const Page = () => (
    <main className='overflow-x-clip'>
        {/* Nav */}
        <header className='fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8'>
            <nav className='bg-cream/95 mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pr-2 pl-5 shadow-[0_10px_30px_-12px_rgba(57,9,24,0.45)] backdrop-blur'>
                <a href='#top' className='flex items-center gap-3' aria-label='Section, back to top'>
                    <Logo className='bg-mauve w-8' />
                </a>
                <div className='text-mauve/80 hidden items-center gap-7 md:flex'>
                    {[
                        ['#food', 'Food'],
                        ['#menu', 'Menu'],
                        ['#room', 'Room'],
                        ['#visit', 'Visit']
                    ].map(([href, text]) => (
                        <a key={href} href={href} className='label hover:text-salmon transition-colors'>
                            {text}
                        </a>
                    ))}
                </div>
                <CallButton className='px-5! py-3!' />
            </nav>
        </header>

        {/* Hero. The booking widget sits right under the headline on the salmon field. Phones: text
            and widget, then the food slideshow edge to edge. Desktop: text column left, slideshow
            filling the right half to the edge, all inside the first viewport. */}
        <section id='top' className='bg-salmon relative overflow-hidden lg:grid lg:h-svh lg:min-h-[620px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
            <div aria-hidden className='mask-shapes bg-salmon-deep absolute inset-0' />
            <div className='text-cream relative flex flex-col justify-end px-5 pt-28 pb-10 md:px-10 lg:pt-32 lg:pr-12 lg:pb-14 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]'>
                <div className='rise'>
                    <p className='label text-marigold'>Steakhouse & Supper Club · Unionville</p>
                    <h1 className='font-display mt-5 text-[clamp(2.6rem,4.9vw,5.4rem)] leading-[0.92] font-extrabold tracking-tight uppercase'>
                        Prime cuts.
                        <br />
                        Cold martinis.
                        <br />
                        <span className='text-mauve'>Late nights.</span>
                    </h1>
                    <p className='label text-cream/90 mt-6 flex items-center gap-2'>
                        <span className='text-marigold text-base tracking-normal'>★ 4.7</span>
                        from 31 OpenTable reviews
                    </p>
                </div>
                <div className='rise-late mt-8 max-w-xl'>
                    <OpenTableWidget className='w-full' />
                </div>
            </div>
            <HeroSlideshow className='relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-auto lg:h-full' />
        </section>

        {/* Food */}
        <Section
            id='food'
            label='Food'
            className='bg-cream text-mauve pb-12! md:pb-14!'>
            <Reveal>
                <h2 className='font-display mx-auto max-w-3xl text-center text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.95] font-extrabold tracking-tight uppercase'>
                    From the butcher&apos;s counter to the raw bar
                </h2>
            </Reveal>

            <div className='mt-10 grid gap-3 md:grid-cols-3'>
                {CUTS.map((cut, i) => (
                    <Reveal key={cut.name} delay={i * 100}>
                        <div className='bg-mauve text-cream flex h-full flex-col justify-between p-6'>
                            <p className='label text-marigold'>{cut.spec}</p>
                            <div className='mt-10 flex items-end justify-between gap-4'>
                                <h3 className='font-display text-2xl leading-none font-extrabold uppercase'>{cut.name}</h3>
                                <span className='font-display text-marigold text-3xl font-extrabold'>{cut.price}</span>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Section>
        <div className='bg-cream'>
            <PhotoMarquee photos={FOOD_PHOTOS} label='Dishes from the Section kitchen' />
        </div>

        {/* Menu */}
        <Section
            id='menu'
            label='Menu'
            className='bg-salmon text-cream'>
            <Reveal>
                <h2 className='font-display mb-10 text-center text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.95] font-extrabold tracking-tight uppercase'>
                    Tonight at Section
                </h2>
            </Reveal>
            <MenuTabs />
        </Section>

        {/* Full-width break between the menu and the evening */}
        <div className='bg-mauve relative aspect-[3/2] overflow-hidden md:aspect-[3/1]'>
            <LightboxImage
                src='/images/bar.jpg'
                alt='The Section bar under its glowing ceiling'
                sizes='100vw'
                className='h-full w-full object-cover'
            />
            <div aria-hidden className='pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent' />
            <p className='label text-cream pointer-events-none absolute bottom-6 left-5 md:bottom-8 md:left-10'>The bar</p>
        </div>

        {/* Experience */}
        <Section
            id='evening'
            label='Evening'
            className='bg-cream text-mauve'>
            <Reveal>
                <h2 className='font-display text-salmon mx-auto max-w-3xl text-center text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.95] font-extrabold tracking-tight uppercase'>
                    Dinner, then stay a while
                </h2>
            </Reveal>
            <div className='mt-12 grid gap-x-12 md:grid-cols-2'>
                {EXPERIENCE.map(({ icon: Icon, title, text }, i) => (
                    <Reveal key={title} delay={(i % 2) * 100}>
                        <div className='border-mauve/15 flex gap-5 border-t py-7'>
                            <Icon strokeWidth={1} className='text-salmon size-9 shrink-0' />
                            <div>
                                <h3 className='font-display text-xl font-bold uppercase'>{title}</h3>
                                <p className='text-mauve/75 mt-2 leading-snug'>{text}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Section>

        {/* Room: a strip of the house, bar and dining room */}
        <div id='room' className='bg-cream'>
            <PhotoMarquee photos={ROOM_PHOTOS} label='The Section house, bar and dining room' className='h-[300px] md:h-[440px]' />
        </div>

        {/* Footer */}
        <footer id='visit' className='bg-mauve text-cream overflow-hidden'>
            <div className='mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28'>
                <Reveal className='bg-salmon relative flex flex-col gap-10 overflow-hidden px-7 py-12 md:flex-row md:items-end md:justify-between md:px-14 md:py-16'>
                    <span aria-hidden className='mask-triangle bg-salmon-deep absolute right-0 bottom-0 hidden h-full w-1/3 -scale-x-100 md:block' />
                    <div className='relative'>
                        <p className='label text-marigold'>Find us</p>
                        <a
                            href={MAPS}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-display mt-4 block text-[2.6rem] leading-[0.92] font-extrabold uppercase transition-opacity hover:opacity-80 sm:text-6xl md:text-7xl'>
                            162 Main
                            <br />
                            Street
                        </a>
                        <p className='text-cream/80 mt-4'>Unionville, Markham, ON L3R 2G9</p>
                    </div>
                    <div className='relative flex flex-col items-start gap-4 md:items-end'>
                        <CallButton tone='cream' />
                        <a href={`tel:${PHONE}`} className='font-display text-2xl font-bold tracking-wide hover:opacity-75'>
                            {PHONE_LABEL}
                        </a>
                    </div>
                </Reveal>

                <div className='grid grid-cols-2 gap-x-6 gap-y-12 py-16 text-center md:grid-cols-3 md:gap-x-12 md:text-left'>
                    <div>
                        <h3 className='font-display text-marigold text-2xl font-extrabold uppercase'>Visit</h3>
                        <p className='mt-4 leading-snug'>
                            162 Main Street
                            <br />
                            Unionville, ON L3R 2G9
                        </p>
                        <a
                            href={MAPS}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='label text-marigold mt-4 inline-block underline-offset-4 hover:underline'>
                            Get directions
                        </a>
                    </div>

                    <div className='md:order-3'>
                        <h3 className='font-display text-marigold text-2xl font-extrabold uppercase'>Contact</h3>
                        <a href={`tel:${PHONE}`} className='hover:text-marigold mt-4 block transition-colors'>
                            {PHONE_LABEL}
                        </a>
                        <a href='mailto:info@section.ca' className='hover:text-marigold block transition-colors'>
                            info@section.ca
                        </a>
                        <a
                            href='https://www.opentable.ca/r/section-markham'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='label text-marigold mt-4 inline-block underline-offset-4 hover:underline'>
                            Book on OpenTable
                        </a>
                    </div>

                    <div className='col-span-2 md:order-2 md:col-span-1'>
                        <h3 className='font-display text-marigold text-2xl font-extrabold uppercase'>Hours</h3>
                        <dl className='mx-auto mt-4 max-w-xs space-y-2 md:mx-0'>
                            {[
                                { day: 'Tuesday to Saturday', time: '5pm to midnight' },
                                { day: 'Sunday & Monday', time: 'Closed' },
                                { day: 'Dress code', time: 'Smart elegant' },
                                { day: 'Guests', time: '10 and older' }
                            ].map((row) => (
                                <div key={row.day} className='flex items-baseline justify-between gap-4'>
                                    <dt className='text-cream/60'>{row.day}</dt>
                                    <dd className='text-right'>{row.time}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* The house logo set large to close the page */}
            <div aria-hidden className='pointer-events-none flex flex-col items-center px-5 pt-2 pb-14 select-none md:pb-20'>
                <Logo className='bg-salmon w-[46vw] max-w-[300px]' />
                <p className='label text-cream/60 mt-6 tracking-[0.5em]'>Steakhouse · Unionville</p>
            </div>

            <div className='border-cream/10 border-t'>
                <div className='text-cream/55 mx-auto flex max-w-7xl flex-col items-center gap-2 px-5 py-5 text-center text-[0.7rem] font-semibold tracking-[0.15em] uppercase md:flex-row md:justify-between md:px-10 md:text-left'>
                    <span>© {new Date().getFullYear()} Section</span>
                    <span>Walk-ins welcome when space allows</span>
                    <span>162 Main Street, Unionville</span>
                </div>
            </div>
        </footer>
    </main>
);

export default Page;

