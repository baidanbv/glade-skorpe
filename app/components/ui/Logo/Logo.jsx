import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ width = 'w-11', height = 'h-9' }) => {
  return (
    <Link href="/" className={`${width} ${height} block relative z-0 opacity-80 lg:w-20 lg:h-20`}>
      <Image src="/images/logo.png" alt="Den Glade Skorpe" fill style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    </Link>
  );
};

export default Logo;
