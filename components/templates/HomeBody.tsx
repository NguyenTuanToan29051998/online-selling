import { Dispatch, FC, SetStateAction, useEffect, useRef, useState, MouseEvent } from 'react';
import Banner from '../organisms/Banner';
import useTrans from '../../hooks/useTrans';
import { useRouter } from 'next/router';
import BackToTop from '../atoms/buttons/BackToTop';
import styles from '../../styles/components/templates/HomeBody.module.scss';
import CustomContainer from '../molecules/CustomContainer';
import Image from 'next/image';
import { favoriteGrayIcon, favoriteRedIcon, starIcon } from '../../public/icons';
import PaginationSection from '../organisms/PaginationSection';
import { ProductOverviewType } from '@/models/product';
import useFormat from '../../hooks/useFormat';
import { FavoriteApiManagement } from '../../api-clients/favorite';
import { homeApiManagement } from '../../api-clients/home';

type PropTypes = {
  productList: ProductOverviewType[],
  setProductList: Dispatch<SetStateAction<ProductOverviewType[]>>,
  topBuyList: ProductOverviewType[],
  setTopBuyList: Dispatch<SetStateAction<ProductOverviewType[]>>,
  pageCount: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
};

const HomeBody: FC<PropTypes> = (props) => {
  const {productList, setProductList, pageCount, currentPage, setCurrentPage, topBuyList, setTopBuyList} = props;
  const router = useRouter();
  const {formatNumberWithDot} = useFormat();

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleAddToFavorite = (e: MouseEvent<HTMLDivElement>, proId: number) => {
    e.stopPropagation();
    FavoriteApiManagement.addProductToFavorite(userInfo.id, proId).then(res => {
      homeApiManagement.getAllProductHome(userInfo.id && userInfo.id || '').then((res) => {
        setProductList(res.data.allProducts.content);
      }).catch(err => console.log(err));
    }).catch(err => console.log());
  };

  useEffect(() => {

  }, []);

  return (
    <>
      {/* <Banner /> */}
      <div className={styles.homepage}>
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
                  <div className={styles.subTitle}>Đang khuyến mãi</div>
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
                  <div className={styles.subTitle}>Mua nhiều Nhất</div>
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
                  <div className={styles.subTitle}>Tương tác nhiều nhất</div>
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
                <div>Sản phẩm nổi bật</div>
              </div>
              <div className={`row ${styles.highlightsList}`}>
                {(topBuyList || []).map((item, index) => (
                  <div className={`col-2`} key={index}>
                    <div
                      className={styles.itemHighlights}
                      style={{ backgroundImage: `url("/assets/${item.product.image}")` }}
                      onClick={() => router.push(`/product/${item.product.id}`)} role="presentation"
                    />
                  </div>
                ))}
                {/* <div className={`col-2`}>
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
                </div> */}
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
                {(productList || []).map((item, index) => {
                  return (
                    <div className={styles.productItem} onClick={() => router.push(`/product/${item.product.id}`)} role="presentation" key={index}>
                      <div className="position-relative">
                        <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                        <div className={styles.thumbnail} style={{ backgroundImage: `url("/assets/${item.product.image}")` }} />
                        <div className={styles.addToFavorites} onClick={(e) => handleAddToFavorite(e, item.product.id)} role="presentation">{item.like ? favoriteRedIcon : favoriteGrayIcon}</div>
                      </div>
                      <div className={styles.info}>
                        <div className={styles.name}>
                          <h3>{item.product.name}</h3>
                        </div>
                        {!!item.boughtQuantity ? (
                          <div className="d-flex gap-2">
                            <div className={styles.fullRating}>
                              <span className={styles.point}>{item.rating}</span>
                              <div className="d-flex">{starIcon('14', '#fdd836')}</div>
                            </div>
                            <div className={styles.bisectingLine} />
                            <span className={styles.quantity}>Đã bán {item.boughtQuantity}</span>
                          </div>
                        ) : (
                          <div className={styles.emptyRating} />
                        )}
                        <div className={`${styles.priceDiscount} ${styles.hasDiscount}`}>
                          <div className="price-discount__price">{item.decreasePercent ? formatNumberWithDot(item.newPrice) : formatNumberWithDot(item.product.price)} đ</div>
                          {!!item.decreasePercent && (
                            <div className="price-discount__discount">-{item.decreasePercent}%</div>
                          )}
                        </div>
                        {/* <div className={styles.badgeUnderPrice}>Tặng tới 1000 ASA (224k ₫) <br />≈ 1.0% hoàn tiền</div> */}
                        <div className={styles.badgeUnderRating}>
                          <div className={styles.item}>
                            <span>Freeship+</span>
                          </div>
                          {/* <div className={styles.item}>
                            <span>Trả góp</span>
                          </div> */}
                        </div>
                      </div>
                      {/* <div className={styles.badgeDelivery}>
                        <span>Giao thứ 3, ngày 03/01</span>
                      </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-5">
              <PaginationSection currentPage={currentPage} pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </div>
          </div>
        </div>
      </div>
      {/* <div ref={supportInforRef} /> */}
      <div className="d-flex flex-row-reverse me-3 pb-3"><BackToTop /></div>
    </>
  );
};

export default HomeBody;
