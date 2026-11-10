'use client';

import { useEffect, useRef } from 'react';

// Section on OpenTable, in the site's cream, salmon and mauve.
// The wide (horizontal) theme on large screens, OpenTable's standard (compact) theme below 1024px.
const loaderSrc = (theme: 'wide' | 'standard') =>
    `https://www.opentable.ca/widget/reservation/loader?rid=1528420&type=standard&theme=${theme}&color=1&dark=false&iframe=false&domain=ca&lang=en-CA&newtab=false&ot_source=Restaurant%20website&font=arial&ot_logo=standard&primary_color=f4ebd3&primary_font_color=390918&button_color=390918&button_font_color=f4ebd3&cfe=true`;

const OpenTableWidget = ({
    theme = 'auto',
    className = 'flex w-full justify-center'
}: {
    theme?: 'auto' | 'standard';
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!document.getElementById('ot-widget-overrides')) {
            const style = document.createElement('style');
            style.id = 'ot-widget-overrides';
            style.textContent = [
                '.ot-dtp-picker .ot-title{display:none!important}',
                // Their button colour setting is ignored; a mauve pill reads on the salmon hero.
                '.ot-dtp-picker .ot-dtp-picker-button{background:#390918!important;border-color:#390918!important;color:#f4ebd3!important;border-radius:9999px!important;font-weight:600!important;letter-spacing:.08em}',
                '.ot-dtp-picker .ot-dtp-picker-button:hover{background:#f4ebd3!important;border-color:#f4ebd3!important;color:#390918!important}',
                // The form's own white, square-cornered panel showed behind the round fields. Drop it and
                // give every field its own white pill with a hairline, spaced apart, on every screen size.
                '.ot-dtp-picker{background:transparent!important;padding:0!important;border:0!important;box-shadow:none!important}',
                '.ot-dtp-picker .ot-dtp-picker-form{background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important}',
                '.ot-dtp-picker .ot-dtp-picker-selector{background:#fff!important;border:1px solid rgba(57,9,24,.18)!important;border-radius:9999px!important;margin-right:8px!important}',
                '.ot-dtp-picker .ot-dtp-picker-selector-link{border-radius:9999px!important;background:transparent!important}',
                // Large screens: a 2 by 2 grid (party and date, then time and the button) so the wide
                // theme fits the hero's text column instead of running as one long strip.
                '@media (min-width:1024px){',
                '[id^=ot-widget-container],#ot-reservation-widget,.ot-dtp-picker{width:100%!important;max-width:100%!important;min-width:0!important}',
                '.ot-dtp-picker .ot-dtp-picker-form{width:100%!important;display:grid!important;grid-template-columns:1fr 1fr;gap:10px}',
                '.ot-dtp-picker .ot-dtp-picker-selector,.ot-dtp-picker .ot-dtp-picker-button{width:100%!important;max-width:none!important;margin:0!important;float:none!important}',
                '}',
                // The wide theme lays its fields out side by side at a fixed width;
                // stack them full-width on phones so nothing runs off screen.
                '@media (max-width:767px){',
                '[id^=ot-widget-container],#ot-reservation-widget{width:100%!important;max-width:100%!important}',
                '.ot-dtp-picker{width:100%!important;max-width:100%!important;min-width:0!important}',
                '.ot-dtp-picker .ot-dtp-picker-form{width:100%!important}',
                '.ot-dtp-picker .ot-dtp-picker-selector,.ot-dtp-picker .ot-dtp-picker-button{display:block!important;width:100%!important;max-width:100%!important;margin:0 0 8px 0!important}',
                '}'
            ].join('');
            document.head.appendChild(style);
        }
        // The loader inserts a widget container every time it executes, which under
        // StrictMode/Fast Refresh can stack duplicates. Keep only the first container.
        const dedupe = () => {
            const containers = el.querySelectorAll('[id^="ot-widget-container"]');
            for (let i = 1; i < containers.length; i++) containers[i].remove();
        };
        const observer = new MutationObserver(dedupe);
        observer.observe(el, { childList: true, subtree: true });
        dedupe();
        if (!el.querySelector('[id^="ot-widget-container"], script')) {
            const resolved =
                theme === 'standard' || window.matchMedia('(max-width: 1023px)').matches ? 'standard' : 'wide';
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = loaderSrc(resolved);
            script.async = true;
            el.appendChild(script);
        }

        return () => {
            observer.disconnect();
            el.replaceChildren();
        };
    }, [theme]);

    return <div ref={ref} className={className} />;
};

export default OpenTableWidget;
