import Img from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  className?: string;
}

const Image = ({
  src,
  alt,
  blurDataURL = '/static/blur.jpg',
  className = ''
}: ImageProps) => {
  return (
    <div
      className={`relative overflow-hidden ${
        className ? className : 'h-0 w-full pb-[100%]'
      }`}
    >
      <Img
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        className="content-center object-cover"
        quality={75}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  );
};

export default Image;
