/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/CheckoutBody.module.scss';
import Image from 'next/image';
import { addIcon, deleteIcon, fulfillmentIcon, methodIcon, removeIcon } from '../../public/icons';
import CustomModal from '../organisms/CustomModal';

type PropTypes = {

};

const CheckoutBody: FC<PropTypes> = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {

  }, []);

  return (
    <div className={styles.checkoutBody}>
      <div className={styles.mainTitle}>
        <h4>Thanh toán</h4>
      </div>
      <div className={styles.content}>
        <div className={styles.leftArea}>
          <div className={styles.shippingPlan}>
            <h3>Chọn hình thức giao hàng</h3>
            <div className={styles.methodList}>
              <div className="d-flex gap-2 align-items-center">
                <input type="radio" name="" id="" className={styles.radio} />
                <div className="d-flex">
                  <Image
                    src="/assets/fast-logo.png"
                    width={32}
                    height={14}
                    alt="payment-logo"
                  />
                </div>
                <span className={styles.methodText}>Giao tiết kiệm</span>
                <div className="d-flex align-items-center gap-1">
                  <div className={styles.freeMoney}>-10k</div>
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
              <div className={styles.methodsArrow}>
                <Image
                  src="/assets/methods-arrow.png"
                  width={32}
                  height={12}
                  alt="payment-logo"
                />
              </div>
            </div>
            <div className={styles.shipment}>
              <div className={styles.packageLeadTimes}>
                <div className="d-flex">
                  <Image
                    src="/assets/pakage-time.png"
                    width={24}
                    height={24}
                    alt="payment-logo"
                  />
                </div>
                Gói: Giao vào Thứ Sáu, 06/01
              </div>
              <div className={styles.leftContent}>
                <div className={styles.packageSummary}>
                  <div className="d-flex gap-1 align-items-center">
                    <div>
                      <Image
                        src="/assets/fast-logo.png"
                        width={32}
                        height={14}
                        alt="payment-logo"
                      />
                    </div>
                    <div className={styles.methodText}>Giao Tiết Kiệm</div>
                  </div>
                  <div className={styles.shippingFees}>
                    <div className={styles.originalFee}>18.000 ₫</div>
                    <div className={styles.currentFee}>8.000 ₫</div>
                  </div>
                </div>
                {[...Array(5)].map(item => {
                  return (
                    <div className={styles.packageItemList} key={Math.random()}>
                      <div className="d-flex">
                        <Image
                          src="/assets/product-detail-1.jpg"
                          width={48}
                          height={48}
                          alt="product"
                        />
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemInfoProductName}>Áo Khoác Nỉ Nam Cao Cấp - Vải Nỉ Nhập Mặt Thoáng Mát,Có Nón Che Rộng Cao Cấp AK016 - Xám Khói,2XL(76-85KG)</div>
                        <div className={styles.itemInfoSecondLine}>
                          <div className={styles.quantity}>SL: x1</div>
                          <div className={styles.price}>229.000 ₫</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.rightContent}>
                <div className={styles.fulfillment}>
                  <div>{fulfillmentIcon}</div>
                  <div className={styles.fulfillmentText}>Được giao bởi CHANHS FASHION</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paymentMethod}>
            <h3>Chọn hình thức thanh toán</h3>
            <div>
              <div className="d-flex gap-3 align-items-center mt-3">
                <input type="radio" name="" id="" className={styles.radio} />
                <div>{methodIcon}</div>
                <span>Thanh toán tiền mặt khi nhận hàng</span>
              </div>
              <div className="d-flex gap-3 align-items-center mt-3">
                <input type="radio" name="" id="" className={styles.radio} />
                <div className="d-flex">
                  <Image
                    src="/assets/payment-method.png"
                    width={32}
                    height={32}
                    alt="payment-logo"
                  />
                </div>
                <span>Thanh toán bằng Viettel Money</span>
              </div>
            </div>
          </div>
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
              <div className="d-flex justify-content-between mt-1">
                <span className={styles.pricesText}>Khuyến mãi vận chuyển</span>
                <span className={`${styles.pricesValue} ${styles.summaryValuePositive}`}>-10.000đ</span>
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
          <div className={styles.buyBtn} onClick={() => setShowModal(true)} role="presentation">Thanh toán</div>
        </div>
      </div>
      <CustomModal title="xxxxxxx" show={showModal} setShow={setShowModal}>
        <p className={styles.modalDecs}>lllllllllllllll</p>
        kkkkkkkkkkkkkkkkkk
      </CustomModal>
    </div>
  );
};

export default CheckoutBody;
