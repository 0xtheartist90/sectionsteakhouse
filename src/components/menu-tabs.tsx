'use client';

import { useRef, useState } from 'react';

type Item = { name: string; price: string; desc?: string };
type Group = { title?: string; items: Item[] };
type Tab = { label: string; note?: string; groups: Group[] };

// From the food and drinks menus on section.ca.
const TABS: Tab[] = [
    {
        label: 'Raw Bar',
        groups: [
            {
                items: [
                    { name: 'Oysters', price: '27', desc: 'Half dozen. Daily selection of east coast oysters, traditional fixings' },
                    { name: 'King Salmon', price: '32', desc: 'Beet-cured, crème fraîche, crostini' },
                    { name: 'Tuna Tartare', price: '36', desc: 'Avocado, cucumber, everything bagel spice, chilli, lime' },
                    { name: 'Shrimp Cocktail', price: '34', desc: 'Bombay cocktail sauce, lemon' },
                    { name: 'Lobster & Caviar Roll', price: '26', desc: 'East coast lobster salad, rémoulade. By the piece' }
                ]
            }
        ]
    },
    {
        label: 'Starters & Salads',
        groups: [
            {
                title: 'Starters',
                items: [
                    { name: 'Monte Cristo', price: '23', desc: 'Smoked ham, rye, emmental, pickles, mustard' },
                    { name: 'Spinach & Artichoke Dip', price: '21', desc: 'House-cut tortilla chips' }
                ]
            },
            {
                title: 'Salads',
                items: [
                    { name: 'Caesar', price: '26', desc: 'Gem lettuce, country bread croutons, shaved parmesan' },
                    { name: 'Chopped', price: '26', desc: 'Endive, walnuts, avocado, apple, grapes, burnt honey dressing' },
                    { name: 'Wedge', price: '26', desc: 'Iceberg, creamy blue cheese dressing, smoked bacon, tomatoes' }
                ]
            }
        ]
    },
    {
        label: "Butcher's Counter",
        note: 'Sauces 6: au poivre, béarnaise, chimichurri, bordelaise.',
        groups: [
            {
                items: [
                    { name: 'Bone-in Filet Mignon', price: '98', desc: '18 oz, US Prime, dry-aged, steak salt' },
                    { name: 'Bone-in Dry-Aged Ribeye', price: '140', desc: '32 oz, Canadian Prime, dry-aged, steak salt' },
                    { name: 'Wagyu NY Striploin', price: '175', desc: '14 oz, Oakleigh Ranch, steak salt' },
                    { name: 'Wagyu French Dip', price: '56', desc: 'Westholme ribeye, caramelized onions, cheese fonduta, au jus' },
                    {
                        name: 'Prime Rib Cheeseburger',
                        price: '42',
                        desc: 'Marie Rose sauce, champagne onions, pickles, cheddar and bacon, hand-cut fries'
                    }
                ]
            }
        ]
    },
    {
        label: 'Classics',
        groups: [
            {
                items: [
                    { name: 'Lobster Thermidor', price: '78', desc: 'Cognac, tarragon cream, gruyère, hand-cut fries' },
                    { name: 'Dover Sole Almondine', price: '95', desc: 'Pan-seared with toasted almonds and lemon butter sauce' },
                    { name: 'King Crab Tagliatelle', price: '80', desc: 'Crab butter, saffron, Calabrian chilli' },
                    { name: 'Chicken Fricassée', price: '48', desc: 'Crispy roasted half chicken, mushrooms, porcini cream' },
                    { name: 'Sizzling Shrimp Scampi', price: '52', desc: 'Garlic butter, chilli, parsley' }
                ]
            }
        ]
    },
    {
        label: 'Sides',
        groups: [
            {
                items: [
                    { name: 'Truffle Mac & Cheese', price: '29' },
                    { name: 'Café de Paris Mushrooms', price: '23' },
                    { name: 'Crispy Brussels & Smoked Bacon', price: '21' },
                    { name: 'Grilled Broccoli & Romesco', price: '19' },
                    { name: 'Garlic Mashed Potatoes', price: '17' },
                    { name: 'Hand-Cut Fries', price: '15' }
                ]
            }
        ]
    },
    {
        label: 'Martinis',
        groups: [
            {
                title: 'Martinis',
                items: [
                    { name: 'House', price: '29', desc: 'Premium gin or vodka, your way, with olives, a lemon twist or a cocktail onion' },
                    { name: 'Vesper', price: '24', desc: "Gordon's, Ketel One, Cocchi Americano" },
                    { name: 'French', price: '24', desc: 'Grey Goose, crème de framboise, pineapple' },
                    { name: 'Espresso', price: '26', desc: 'Belvedere, caffè moka, espresso, vanilla, chocolate' },
                    { name: 'Cucumber', price: '23', desc: 'Ketel One, elderflower, fresh lime, cucumber' }
                ]
            },
            {
                title: 'Old Fashioneds',
                items: [
                    { name: 'Classic', price: '22', desc: 'Lot 40 rye, demerara, bitters' },
                    { name: 'Bourbon', price: '27', desc: 'Woodford Reserve, demerara, angostura, black walnut' },
                    { name: 'Oaxacan', price: '27', desc: 'Los Siete mezcal, Altos reposado, agave, mole bitters' },
                    { name: 'Tokyo', price: '46', desc: 'Hibiki Harmony, kokuto, sakura' }
                ]
            }
        ]
    },
    {
        label: 'Cocktails',
        groups: [
            {
                title: 'Margaritas',
                items: [
                    { name: 'House', price: '22', desc: 'Altos blanco, Cointreau, fresh lime' },
                    { name: "Tommy's", price: '26', desc: 'Casamigos reposado, agave, fresh lime' },
                    { name: 'Cadillac', price: '64', desc: 'Don Julio 1942, Grand Marnier, fresh lime' }
                ]
            },
            {
                title: 'Shaken & Stirred',
                items: [
                    { name: 'Rum Punch', price: '24', desc: 'El Dorado, Smith & Cross, grapefruit, passionfruit, falernum' },
                    { name: 'Last Word', price: '22', desc: "Hendrick's, green Chartreuse, maraschino, lime" },
                    { name: 'Penicillin', price: '25', desc: 'Monkey Shoulder, honey, ginger, lemon' },
                    { name: 'Negroni', price: '23', desc: 'Tanqueray No. 10, Campari, Cocchi Torino' },
                    { name: 'Bijou', price: '23', desc: 'Plymouth gin, green Chartreuse, Cocchi Torino' },
                    { name: 'Manhattan', price: '27', desc: 'Four grain rye, Cynar, Cocchi Torino' }
                ]
            }
        ]
    },
    {
        label: 'Wine',
        note: 'A deep French and Italian list, from half bottles to large formats.',
        groups: [
            {
                title: 'By the Glass',
                items: [
                    { name: 'Prosecco, Zardetto Brut', price: '19', desc: 'Italy' },
                    { name: 'Chardonnay, Bretonnière', price: '21', desc: 'France' },
                    { name: 'Rosé, Château Mentone', price: '21', desc: 'Côtes de Provence' },
                    { name: 'Bordeaux, Cuvelier', price: '21', desc: 'France' },
                    { name: 'Super Tuscan, Perluva', price: '24', desc: 'Italy' }
                ]
            },
            {
                title: 'From the Cellar',
                items: [
                    { name: 'NV Krug Grande Cuvée 172ème', price: '850', desc: 'Champagne' },
                    { name: '2010 Sassicaia, Tenuta San Guido', price: '1,350', desc: 'Tuscany' },
                    { name: '1985 Latour, 1er Cru Classé', price: '2,700', desc: 'Bordeaux' },
                    { name: '1986 Château Margaux, 1er Cru Classé', price: '2,700', desc: 'Bordeaux' },
                    { name: '2005 Masseto, Tenuta dell’Ornellaia', price: '3,300', desc: 'Tuscany' }
                ]
            }
        ]
    }
];

// Tabs on the salmon field, dishes on a cream card.
const MenuTabs = () => {
    const [active, setActive] = useState(0);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const tab = TABS[active];

    const select = (i: number) => {
        setActive(i);
        tabs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    return (
        <div>
            <div className='-mx-5 md:mx-0'>
                <div
                    role='tablist'
                    className='flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden'>
                    {TABS.map((t, i) => (
                        <button
                            key={t.label}
                            role='tab'
                            aria-selected={i === active}
                            ref={(el) => {
                                tabs.current[i] = el;
                            }}
                            onClick={() => select(i)}
                            className={`label shrink-0 rounded-full border px-4 py-2.5 whitespace-nowrap transition-colors ${
                                i === active
                                    ? 'border-cream bg-cream text-salmon'
                                    : 'border-cream/40 text-cream/85 hover:border-cream hover:text-cream'
                            }`}>
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div role='tabpanel' className='bg-cream text-mauve mt-6 px-5 py-8 md:px-12 md:py-12'>
                <div className='border-mauve/20 flex flex-col gap-2 border-b pb-6 md:flex-row md:items-end md:justify-between'>
                    <h3 className='font-display text-4xl font-extrabold tracking-tight uppercase md:text-5xl'>
                        {tab.label}
                    </h3>
                    {tab.note && <p className='text-mauve/70 md:text-right'>{tab.note}</p>}
                </div>

                {tab.groups.map((group) => (
                    <div key={group.title ?? tab.label} className='mt-9 first:mt-8'>
                        {group.title && <h4 className='label text-salmon mb-5'>{group.title}</h4>}
                        <div className='grid gap-x-14 gap-y-6 lg:grid-cols-2'>
                            {group.items.map((item) => (
                                <div key={item.name}>
                                    <div className='flex items-baseline gap-3'>
                                        <h5 className='font-display text-[0.95rem] font-bold tracking-[0.06em] uppercase'>
                                            {item.name}
                                        </h5>
                                        <span className='border-mauve/20 mb-1 flex-1 border-b border-dotted' />
                                        <span className='font-display shrink-0 font-bold'>{item.price}</span>
                                    </div>
                                    {item.desc && <p className='text-mauve/70 mt-1 leading-snug'>{item.desc}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuTabs;
