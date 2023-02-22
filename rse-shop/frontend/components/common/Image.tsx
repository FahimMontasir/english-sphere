import Img from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  className?: string;
  responsive?: boolean;
}

const Image = ({
  src,
  alt,
  blurDataURL = 'https://i.pravatar.cc/300',
  className = '',
  responsive = false
}: ImageProps) => {
  return (
    <div
      className={`relative ${
        responsive ? 'h-0 w-full pb-[100%]' : ''
      }  ${className}`}
    >
      <Img
        src={src}
        alt={alt}
        fill
        className="object-cover"
        quality={75}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  );
};

export default Image;
