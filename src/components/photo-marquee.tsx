import LightboxImage from '@/components/lightbox-image';
import { aspect } from '@/lib/responsive';

type Photo = { src: string; alt: string };

// A slow, large strip of photos at their natural proportions; click one to see it full size.
// The list is rendered twice and the track slides by half its width, so the loop is seamless
// (spacing is a margin on each photo, not a gap, so both halves are equal). It pauses on hover
// and stands still for reduced motion.
const PhotoMarquee = ({
    photos,
    label,
    reverse = false,
    className = 'h-[360px] md:h-[540px]'
}: {
    photos: Photo[];
    label: string;
    reverse?: boolean;
    className?: string;
}) => (
    <div className='overflow-hidden' aria-label={label}>
        <div className={`photo-marquee flex w-max hover:[animation-play-state:paused] ${reverse ? 'photo-marquee-reverse' : ''}`}>
            {[...photos, ...photos].map((photo, i) => (
                <LightboxImage
                    key={`${photo.src}-${i}`}
                    src={photo.src}
                    alt={i < photos.length ? photo.alt : ''}
                    ariaHidden={i >= photos.length}
                    sizes='(max-width: 767px) 80vw, 40vw'
                    loading={i < 4 ? 'eager' : 'lazy'}
                    style={{ aspectRatio: aspect(photo.src) }}
                    className={`mr-3 w-auto shrink-0 object-cover ${className}`}
                />
            ))}
        </div>
    </div>
);

export default PhotoMarquee;
