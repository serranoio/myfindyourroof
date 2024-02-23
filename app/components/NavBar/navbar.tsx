'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './navbar.module.css';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const isRootPage = pathname === '/';

  return (
    <div className={`${styles.navContainer} ${isRootPage ? styles.absoluteNavbar : styles.fixedNavbar}`}>
      <Link href={'/'} className={ styles.logo }><img src='/logo.png' alt='FindYourRoof'/></Link>
      <div className={ styles.navList }>
        <Link className={ styles.navElem } href='/housing'>Housing</Link>
        <Link className={ styles.navElem } href='/job'>Job</Link>
        <Link className={ styles.navElem } href='/documents'>Documents</Link>
        <Link className={ styles.navElem } href='https://www.youtube.com/watch?v=0tOXxuLcaog'>chippy</Link>
      </div>
    </div>
  );
};

export default NavBar; 