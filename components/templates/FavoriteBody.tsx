/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/FavoriteBody.module.scss';
import Image from 'next/image';
import { addIcon, deleteIcon, favoriteRedIcon, removeIcon, starIcon } from '../../public/icons';

type PropTypes = {

};

const FavoriteBody: FC<PropTypes> = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);

  useEffect(() => {

  }, []);

  return (
    <div className={styles.favoriteBody}>
      <div className={styles.mainTitle}>
        <h4>Yêu thích</h4>
      </div>
      <div className={styles.content}>
        <div className={styles.productList}>
          {[...Array(24)].map(item => (
            <>
              <div className={styles.productItem} onClick={() => router.push('/product/1')} role="presentation">
                <div className="position-relative">
                  <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                  <div className={styles.thumbnail} style={{ backgroundImage: `url("/assets/product-1.jpg")` }} />
                  <div className={styles.addToFavorites}>{favoriteRedIcon}</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>
                    <h3>Áo Khoác Gió Thể Thao Nam 5S INSPIRATION (4 Màu), Công Nghệ Cao Cấp, Chống Thấm, Cản Bụi, Cản Gió Cực Ấm (AKG22001)</h3>
                  </div>
                  <div className="d-flex gap-2">
                    <div className={styles.fullRating}>
                      <span className={styles.point}>4.2</span>
                      <div className="d-flex">{starIcon('14', '#fdd836')}</div>
                    </div>
                    <div className={styles.bisectingLine} />
                    <span className={styles.quantity}>Đã bán 20</span>
                  </div>
                  <div className={`${styles.priceDiscount} ${styles.hasDiscount}`}>
                    <div className="price-discount__price">439.000 ₫</div>
                    <div className="price-discount__discount">-51%</div>
                  </div>
                  <div className={styles.badgeUnderPrice}>Tặng tới 1000 ASA (224k ₫) <br />≈ 1.0% hoàn tiền</div>
                  <div className={styles.badgeUnderRating}>
                    <div className={styles.item}>
                      <span>Freeship+</span>
                    </div>
                    <div className={styles.item}>
                      <span>Trả góp</span>
                    </div>
                  </div>
                </div>
                <div className={styles.badgeDelivery}>
                  <span>Giao thứ 3, ngày 03/01</span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteBody;
