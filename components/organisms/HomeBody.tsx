/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTrans from '../../hooks/useTrans';
import { starIcon } from '../../public/icons';
import styles from '../../styles/components/organisms/HomeBody.module.scss';

type PropType = {

};

const HomeBody: NextPage<PropType> = (props) => {
  const trans = useTrans();
  const router = useRouter();

  return (
    <>
      <div className={styles.containerRevamp}>
        <div>
          <div className={styles.leftArea}>
            <div className={styles.items}>
              <div className={styles.title}>Nổi bật</div>
              <div className={styles.item}>
                <div className="d-flex">
                  <Image
                    src="/assets/item-1.png"
                    width={32}
                    height={32}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.subTitle}>Mã giảm giá</div>
              </div>
              <div className={styles.item}>
                <div className="d-flex">
                  <Image
                    src="/assets/item-1.png"
                    width={32}
                    height={32}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.subTitle}>Mua nhiều</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.title}>Danh mục</div>
              <div className={styles.item}>
                <div className="d-flex">
                  <Image
                    src="/assets/item-1.png"
                    width={32}
                    height={32}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.subTitle}>Mã giảm giá</div>
              </div>
              <div className={styles.item}>
                <div className="d-flex">
                  <Image
                    src="/assets/item-1.png"
                    width={32}
                    height={32}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.subTitle}>Mua nhiều</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightArea}>
          <div className="d-flex gap-3">
            <div className={styles.bannerLeft} />
            <div className={styles.bannerRight} />
          </div>
          <div className={styles.homeBrand}>
            <div className={styles.homeBrandTitle}>
              <div>Thương Hiệu Chính Hãng</div>
              <div className="d-flex">
                <Image
                  src="/assets/brand.png"
                  width={70}
                  height={16}
                  alt="main-logo"
                />
              </div>
            </div>
            <div className={`row ${styles.homeBrandList}`}>
              <div className={`col-2`}>
                <div className={styles.itembrand} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itembrand} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itembrand} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itembrand} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itembrand} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itembrand} />
              </div>
            </div>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlightsTitle}>
              <div>Bộ sưu tập nổi bật</div>
            </div>
            <div className={`row ${styles.highlightsList}`}>
              <div className={`col-2`}>
                <div className={styles.itemHighlights} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itemHighlights} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itemHighlights} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itemHighlights} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itemHighlights} />
              </div>
              <div className={`col-2`}>
                <div className={styles.itemHighlights} />
              </div>
            </div>
          </div>

          <div className={styles.suggestToday}>
            <h2 className={styles.suggestTodayTitle}>Gợi ý hôm nay</h2>
            <div className={styles.suggestTodayList}>
              <div className={`${styles.itemSuggest} ${styles.selectedSuggest}`}>
                <div className="d-flex justify-content-center">
                  <Image
                    src="/assets/suggest-1.png"
                    width={40}
                    height={40}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.tabText}>Dành cho bạn</div>
              </div>
              <div className={styles.itemSuggest}>
                <div className="d-flex justify-content-center">
                  <Image
                    src="/assets/suggest-2.png"
                    width={40}
                    height={40}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.tabText}>Mua 1 tặng 1</div>
              </div>
              <div className={styles.itemSuggest}>
                <div className="d-flex justify-content-center">
                  <Image
                    src="/assets/suggest-2.png"
                    width={40}
                    height={40}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.tabText}>Mua 1 tặng 1</div>
              </div>
              <div className={styles.itemSuggest}>
                <div className="d-flex justify-content-center">
                  <Image
                    src="/assets/suggest-2.png"
                    width={40}
                    height={40}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.tabText}>Mua 1 tặng 1</div>
              </div>
              <div className={styles.itemSuggest}>
                <div className="d-flex justify-content-center">
                  <Image
                    src="/assets/suggest-2.png"
                    width={40}
                    height={40}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.tabText}>Mua 1 tặng 1</div>
              </div>
              <div className={styles.itemSuggest}>
                <div className="d-flex justify-content-center">
                  <Image
                    src="/assets/suggest-2.png"
                    width={40}
                    height={40}
                    alt="main-logo"
                  />
                </div>
                <div className={styles.tabText}>Mua 1 tặng 1</div>
              </div>
            </div>

            <div className={styles.productList}>
              {[...Array(11)].map(item => (
                <>
                  <div className={styles.productItem}>
                    <div>
                      <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                      <div className={styles.thumbnail} style={{ backgroundImage: `url("/assets/product-1.jpg")` }} />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>
                        <h3>Áo Khoác Gió Thể Thao Nam 5S INSPIRATION (4 Màu), Công Nghệ Cao Cấp, Chống Thấm, Cản Bụi, Cản Gió Cực Ấm (AKG22001)</h3>
                      </div>
                      <div className="d-flex gap-2">
                        <div className={styles.fullRating}>
                          <span className={styles.point}>4.2</span>
                          <div className="d-flex">{starIcon}</div>
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
      </div>
    </>
  );
};

export default HomeBody;
