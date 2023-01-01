import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from '../../styles/components/organisms/Header.module.scss';
import { Menu } from '@/models/menu';
import { favoriteIcon } from '../../public/icons';

type PropsType = {
  isMasterPage?: boolean,
  menus?: Menu[],
  userType?: string,
};

const currentColor = ['#A4C955', '#E88E49', '#2D6AAA'];

const HEADER_HEIGTH = '83px';

const Header: FC<PropsType> = (props) => {
  const router = useRouter();
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  const [inputSearch, setInputSearch] = useState<string>('');

  const handleSearch = (event: any) => {
    setInputSearch(event.target.value);
    if (event.key === 'Enter') {
      router.push(`/product?searchInput=${event.target.value}`);
    }
  };

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
  }, [scrollDirection]);


  return (
    <>
      <header
        className={scrollDirection === 'up' ? `${styles.wrapper} ${styles.stiky}` : styles.wrapper}
        style={{ top: scrollDirection === 'up' ? '0' : `-${HEADER_HEIGTH}` }}
      >
        <div className={styles.header}>
          <div className={styles.leftArea}>
            <div className={styles.leftAreaMainlogo} onClick={() => router.push('/home')} role="presentation">
              <Image
                src="/assets/logo-tiki.png"
                width={66}
                height={40}
                alt="main-logo"
              />
            </div>
            <div className={styles.formSearch}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.iconSearch} src="/assets/img-search.png" alt="icon-search" />
              <input
                className={styles.searchInput}
                placeholder="Bạn tìm gì hôm nay"
                value={inputSearch}
                onKeyDown={(e) => handleSearch(e)}
                onChange={(e) => handleSearch(e)}
              />
              <button
                className={styles.searchBtn}
                onClick={() => router.push(`/product?searchInput=${inputSearch}`, undefined, { shallow: true })}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
          <div className={styles.rightArea}>
            <div className={styles.menuItem}>
              <div className="d-flex align-items-center">
                <Image
                  src="/assets/home.png"
                  alt="header_menu_item_home"
                  width={24}
                  height={24}
                />
              </div>
              <p className={styles.homeText} onClick={() => router.push('/home')} role="presentation">Trang chủ</p>
            </div>
            <div className={styles.menuItem}>
              <div className="d-flex align-items-center">
                <Image
                  src="/assets/product.png"
                  alt="header_menu_item_home"
                  width={24}
                  height={24}
                />
              </div>
              <p className={styles.product} onClick={() => router.push('/product')} role="presentation">Sản phẩm</p>
            </div>
            <div className={styles.menuItem}>
              <div>{favoriteIcon}</div>
              <p className={styles.product} onClick={() => router.push('/product')} role="presentation">Yêu thích</p>
            </div>
            <div className={`${styles.menuItem} me-2`}>
              <div className="d-flex align-items-center">
                <Image
                  src="/assets/user.png"
                  alt="header_menu_item_home"
                  width={24}
                  height={24}
                />
              </div>
              <p className={styles.product}>Tui</p>
            </div>
              <div className="d-flex align-items-center">
                <div className={styles.cart}>
                  <div className={styles.cartIcon} onClick={() => router.push('/cart')} role="presentation">
                    <Image
                      src="/assets/cart.png"
                      alt="header_menu_item_home"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className={styles.quickLink}>
          <p className={styles.quickLinkItem} onClick={() => router.push('/product')} role="presentation">áo ấm nam</p>
          <p className={styles.quickLinkItem}>áo khoác nam</p>
          <p className={styles.quickLinkItem}>áo khoác</p>
          <p className={styles.quickLinkItem}>áo ấm</p>
          <p className={styles.quickLinkItem}>áo mùa đông</p>
          <p className={styles.quickLinkItem}>áo dạ nam</p>
        </div>
      </header>
    </>
  );
};

export default Header;
