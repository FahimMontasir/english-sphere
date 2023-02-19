import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

function Second({ children }: Props) {
  return <Link href="/">Second</Link>;
}

export default Second;
