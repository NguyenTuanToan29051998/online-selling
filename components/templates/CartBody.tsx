/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/CartBody.module.scss';
import Image from 'next/image';
import { addIcon, deleteIcon, removeIcon } from '../../public/icons';
import { CartType } from '@/models/cart';
import useFormat from '../../hooks/useFormat';
import { CartApiManagement } from '../../api-clients/cart';
import CustomModal from '../organisms/CustomModal';

type PropTypes = {
  cartDetail: CartType,
  setCartDetail: Dispatch<SetStateAction<CartType | undefined>>
};

const CartBody: FC<PropTypes> = (props) => {
  const {cartDetail, setCartDetail} = props;
  const router = useRouter();
  const {formatNumberWithDot} = useFormat();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cartId, setCartId] = useState<number>(-1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [transportFee, setTransportFee] = useState<number>(0);
  const [numberSelectedProduct, setNumberSelectedProduct] = useState<number>(0);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleUpdateCart = (cartId: number, quantity: number, isIncrease: boolean) => {
    if (!isIncrease && quantity === 1) {
      setShowModal(true);
      return;
    }
    CartApiManagement.updateProductInCart(cartId, isIncrease ? quantity + 1 : quantity -1).then((_) => {
      CartApiManagement.getCartDetail(userInfo.id).then((res) => {
        setCartDetail(res.data);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  };

  const handleDeleteProductInCart = (cartId: number) => {
    CartApiManagement.deleteProductInCart(userInfo.id, cartId).then((_) => {
      CartApiManagement.getCartDetail(userInfo.id).then((res) => {
        setCartDetail(res.data);
        setShowModal(false);
      }).catch(err => console.log(err));
    });
  };

  const handleOpenModalDelete = (cartId: number) => {
    setShowModal(true);
    setCartId(cartId);
  };

  const handleSelectedProduct = (cartId: number) => {
    cartDetail.cartDetail.cartItems.map((item) => {
      if (item.id === cartId) {
        item.isSelected = !item.isSelected;
        setTotalPrice(item.isSelected ? totalPrice + item.newPrice : totalPrice - item.newPrice);
        return item;
      }
      return item;
    });
    setCartDetail({...cartDetail});
  };

  const handleSelectedAllProduct = () => {
    // cartDetail.cartDetail.cartItems.map((item) => {
    //   item.isSelected = !selectedAll ? false : true;
    //   setTotalPrice(item.isSelected ? totalPrice + item.newPrice : totalPrice - item.newPrice);
    //   return item;
    // });
    // setCartDetail({...cartDetail});
    setSelectedAll(!selectedAll);
  };

  useEffect(() => {
    let total = 0;
    cartDetail.cartDetail.cartItems.map((item) => {
      item.isSelected = !selectedAll ? false : true;
      if (selectedAll) {
        total = total + item.newPrice;
      }
    });
    setTotalPrice(selectedAll ? total : 0);
    setCartDetail({...cartDetail});
  }, [selectedAll]);

  useEffect(() => {
    if (totalPrice >= 300000) {
      setTransportFee(10000);
    } else if (totalPrice >= 500000) {
      setTransportFee(20000);
    } else setTransportFee(0);

  }, [totalPrice]);

  useEffect(() => {
    let numberSelected = 0;
    cartDetail.cartDetail.cartItems.map((item) => {
      if (item.isSelected) {
        numberSelected++;
      }
    });
    setNumberSelectedProduct(numberSelected);
  }, [cartDetail]);

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
                <input className={styles.checkbox} type="checkbox" checked={selectedAll} onClick={() => handleSelectedAllProduct()} />
                <div>Tất cả ({cartDetail.cartDetail.cartItems.length} sản phẩm)</div>
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
                <div className={`${styles.milestoneInfo} ${styles.milestoneInfoBottom}`}>299k</div>
              </div>
              <div className={`${styles.milestone} ${styles.ring}`}>
                <div className={styles.milestoneInfo}>-20k</div>
                <div className={`${styles.milestoneInfo} ${styles.milestoneInfoBottom}`}>499k</div>
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
          {(cartDetail.cartDetail.cartItems || []).map((item, index) => {
            return (
              <div className={styles.intened} key={Math.random()}>
                <div className="d-flex align-items-center">
                  <div className={styles.productInfo}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={item.isSelected}
                      onClick={() => handleSelectedProduct(item.id)}
                    />
                    <div className="d-flex">
                      <Image
                        src={`/assets/${item.product.product.image}`}
                        width={77}
                        height={80}
                        alt={item.product.product.name}
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>{(item.product.product.name)}</div>
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
                    <div className={styles.realPrice}>{formatNumberWithDot(item.newPrice)} ₫</div>
                    <del className={styles.discountPrice}>{formatNumberWithDot(item.product.product.price)} ₫</del>
                  </div>
                  <div className={styles.productQty}>
                    <div className={styles.groupnput}>
                      <div
                        className={`${styles.removeCart} ${styles.disable}`}
                        onClick={() => handleUpdateCart(item.id, item.quantity, false)}
                        role="presentation"
                      >{removeIcon}</div>
                      <input type="text" value={item.quantity} className={styles.inputCart} />
                      <div
                        className={`${styles.addCart} ${styles.disable}`}
                        onClick={() => handleUpdateCart(item.id, item.quantity, true)}
                        role="presentation"
                      >{addIcon}</div>
                    </div>
                  </div>
                  <div className={styles.finalProduct}>{formatNumberWithDot(item.newPrice)} ₫</div>
                  <div
                    className={styles.productremove}
                    onClick={() => handleOpenModalDelete(item.id)}
                    role="presentation"
                  >{deleteIcon}</div>
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
                <span className={styles.pricesValue}>{totalPrice}đ</span>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <span className={styles.pricesText}>Phí vận chuyển</span>
                <span className={styles.pricesValue}>{transportFee}đ</span>
              </div>
            </div>
            <div className={styles.pricesTotal}>
              <span className={styles.pricesText}>Tổng tiền</span>
              <div className={styles.pricesContent}>
                <span className={styles.pricesFinal}>{totalPrice + transportFee}đ</span>
                <span className={styles.vat}>(Đã bao gồm VAT nếu có)</span>
              </div>
            </div>
          </div>
          <div className={styles.buyBtn} onClick={() => router.push('/checkout')} role="presentation">Mua hàng {numberSelectedProduct !== 0 && `(${numberSelectedProduct})`}</div>
        </div>
      </div>
      <CustomModal title="Xoá sản phẩm" show={showModal} setShow={setShowModal}>
        <p className={styles.modalDecs}>Bạn có muốn xóa sản phẩm đang chọn?</p>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalConfirm} onClick={() => handleDeleteProductInCart(cartId)} role="presentation">Đồng ý</div>
          <div className={styles.modalCancel} onClick={() => setShowModal(false)} role="presentation">hủy</div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CartBody;
