/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/CartBody.module.scss';
import Image from 'next/image';
import { addIcon, deleteIcon, removeIcon } from '../../public/icons';

type PropTypes = {

};

const CartBody: FC<PropTypes> = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);

  useEffect(() => {

  }, []);

  return (
    <div className={styles.cartBody}>
      <div className={styles.mainTitle}>
        <h4>Giỏ Hàng</h4>
      </div>
      <div className={styles.content}>
        <div className={styles.leftArea}>
          <div className={styles.heading}>
            <div className="d-flex align-items-center">
              <div className={styles.productInfo}>
                <input className={styles.checkbox} type="checkbox" />
                <div>Tất cả (2 sản phẩm)</div>
              </div>
              <div className={styles.productPrice}>
                Đơn giá
              </div>
              <div className={styles.productQty}>
                Số lượng
              </div>
              <div className={styles.finalProduct}>Thành tiền</div>
              <div className={styles.productremove}>{deleteIcon}</div>
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div className={styles.milestone}>
                <div className={`${styles.milestoneInfo} ${styles.milestoneInfoBottomStart}`}>Mua</div>
              </div>
              <div className={`${styles.milestone} ${styles.ring}`}>
                <div className={styles.milestoneInfo}>-10k</div>
                <div className={`${styles.milestoneInfo} ${styles.milestoneInfoBottom}`}>149k</div>
              </div>
              <div className={`${styles.milestone} ${styles.ring}`}>
                <div className={styles.milestoneInfo}>-20k</div>
                <div className={`${styles.milestoneInfo} ${styles.milestoneInfoBottom}`}>299k</div>
              </div>
            </div>
            <div className={styles.rightInfo}>
              <div className="d-flex">
                <Image
                  src="/assets/freeship.png"
                  width={76}
                  height={24}
                  alt="freeship"
                />
              </div>
            </div>
          </div>
          {[...Array(5)].map((item, index) => {
            return (
              <div className={styles.intened} key={Math.random()}>
                <div className="d-flex align-items-center">
                  <div className={styles.productInfo}>
                    <input className={styles.checkbox} type="checkbox" />
                    <div className="d-flex">
                      <Image
                        src="/assets/product-detail-1.jpg"
                        width={77}
                        height={80}
                        alt="product-detail"
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>Áo Khoác Nỉ Hooide Nam Nữ Unisex - Nỉ in hình 3d, Áo Hoodie Cặp Đôi Nam Nữ EUROCAT Cú Mèo HOT RẺ ĐẸP Hoodie Company Unisex - Nỉ Ngoại Kiểu Khoác Chống Nắng Couple - Hooide Nỉ Ngoại - L 51-65kg</div>
                      <div className={styles.shippingInfoItemHeader}>
                        <div className="d-flex">
                          <Image
                            src="/assets/fast-logo.png"
                            width={32}
                            height={14}
                            alt="fast-logo"
                          />
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.shippingInfoItemHeaderHighlight}>Trước 14:00 hôm nay</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.productPrice}>
                    <div className={styles.realPrice}>100.000 ₫</div>
                    <del className={styles.discountPrice}>112.000 ₫</del>
                  </div>
                  <div className={styles.productQty}>
                    <div className={styles.groupnput}>
                      <div className={`${styles.removeCart} ${styles.disable}`}>{removeIcon}</div>
                      <input type="text" value="1" className={styles.inputCart} />
                      <div className={`${styles.addCart} ${styles.disable}`}>{addIcon}</div>
                    </div>
                  </div>
                  <div className={styles.finalProduct}>100.000 ₫</div>
                  <div className={styles.productremove}>{deleteIcon}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.rightArea}>
          <div className={styles.blockAddress}>
            <div className={styles.blockHeader}>
              <div className={styles.blockHeaderTitle}>Giao tới</div>
              <div className={styles.changeAddress}>Thay đổi</div>
            </div>
            <div className={styles.customerInfo}>
              <div className={styles.customerInfoName}>Nguyễn Toàn</div>
              <div className={styles.separate} />
              <div className={styles.customerInfoName}>0383759469</div>
            </div>
            <div className={styles.address}>
              <span className={styles.home}>Nhà</span>
              số 15, Phường Cửa Đông, Quận Hoàn Kiếm, Hà Nội
            </div>
          </div>
          {/* khuyến mãi */}
          <div className={styles.priceSummary}>
            <div className={styles.pricesItems}>
              <div className="d-flex justify-content-between">
                <span className={styles.pricesText}>Tạm tính</span>
                <span className={styles.pricesValue}>100.000đ</span>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <span className={styles.pricesText}>Phí vận chuyển</span>
                <span className={styles.pricesValue}>18.000đ</span>
              </div>
            </div>
            <div className={styles.pricesTotal}>
              <span className={styles.pricesText}>Tổng tiền</span>
              <div className={styles.pricesContent}>
                <span className={styles.pricesFinal}>118.000đ</span>
                <span className={styles.vat}>(Đã bao gồm VAT nếu có)</span>
              </div>
            </div>
          </div>
          <div className={styles.buyBtn} onClick={() => router.push('/checkout')} role="presentation">Mua hàng (1)</div>
        </div>
      </div>
    </div>
  );
};

export default CartBody;
