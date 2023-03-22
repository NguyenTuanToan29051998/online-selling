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
import CustomDropdown from '../atoms/dropdowns/Dropdown';
import { NavDropdown } from 'react-bootstrap';

type Discount = {
  id: number,
  name: string,
  decreasePercent: number,
  isSelected: boolean,
  type: string,
}

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
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalSelectedProduct, setShowModalSelectedProduct] = useState<boolean>(false);
  const [showModalChangeAddress, setShowModalChangeAddress] = useState<boolean>(false);
  const [showModalSelectedDiscount, setShowModalSelectedDiscount] = useState<boolean>(false);
  const [cartId, setCartId] = useState<number>(-1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [transportFee, setTransportFee] = useState<number>(0);
  const [numberSelectedProduct, setNumberSelectedProduct] = useState<number>(0);
  const [discount, setDiscount] = useState<Discount>({
    id: 0,
    isSelected: false,
    type: '',
    name: '',
    decreasePercent: 0,
  });

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleUpdateCart = (cartId: number, quantity: number, isIncrease: boolean) => {
    if (!isIncrease && quantity === 1) {
      setShowModalDelete(true);
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
        setShowModalDelete(false);
      }).catch(err => console.log(err));
    });
  };

  const handleOpenModalDelete = (cartId: number) => {
    setShowModalDelete(true);
    setCartId(cartId);
  };

  const handleOpenModalSelectedDiscount = () => {

  };

  const handleSelectedProduct = (cartId: number) => {
    cartDetail.cartDetail.cartItems.map((item) => {
      if (item.id === cartId) {
        item.isSelected = !item.isSelected;
        setTotalPrice(item.isSelected ? totalPrice + item.newPrice * item.quantity : totalPrice - item.newPrice * item.quantity);
        return item;
      }
      return item;
    });
    setCartDetail({...cartDetail});
  };

  const handleSelectedAllProduct = () => {
    setSelectedAll(!selectedAll);
  };

  const handleCheckout = () => {
    if (numberSelectedProduct === 0) {
      setShowModalSelectedProduct(true);
      return;
    }
    router.push('/checkout');
  };

  const handleChangeAdress = () => {
    setShowModalChangeAddress(true);
  };

  const handleSelectedDiscount = (discountId: number, decreasePercent: number, typeDiscount: string) => {
    setDiscount({...discount, id: discountId, isSelected: true, decreasePercent: decreasePercent, type: typeDiscount});
  };

  const handleSaveDiscount = () => {
    setShowModalSelectedDiscount(false);
  };

  useEffect(() => {
    let total = 0;
    cartDetail.cartDetail.cartItems.map((item) => {
      item.isSelected = !selectedAll ? false : true;
      if (selectedAll) {
        total = total + item.newPrice * item.quantity;
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
          {/* <div className={styles.blockAddress}>
            <div className={styles.blockHeader}>
              <div className={styles.blockHeaderTitle}>Giao tới</div>
              <div className={styles.changeAddress} onClick={() => handleChangeAdress()} role="presentation">Thay đổi</div>
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
          </div> */}
          {/* <div className={styles.couponBlock}>
            <div className={styles.blockHeader}>
              <div className={styles.blockHeaderTitle}>Tiki Khuyến Mãi</div>
              <div className={styles.blockHeaderUsage}><span>Chỉ chọn 1</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="info-icon" aria-describedby="popup-22">
                  <path d="M12.75 11.25C12.75 10.8358 12.4142 10.5 12 10.5C11.5858 10.5 11.25 10.8358 11.25 11.25V15.75C11.25 16.1642 11.5858 16.5 12 16.5C12.4142 16.5 12.75 16.1642 12.75 15.75V11.25Z" fill="#787878"></path><path d="M12.75 8.25C12.75 8.66421 12.4142 9 12 9C11.5858 9 11.25 8.66421 11.25 8.25C11.25 7.83579 11.5858 7.5 12 7.5C12.4142 7.5 12.75 7.83579 12.75 8.25Z" fill="#787878"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12Z" fill="#787878"></path>
                </svg>
              </div>
            </div>
            <div className={styles.platformCoupon} onClick={() => setShowModalSelectedDiscount(true)} role="presentation">
              <svg className="coupon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2803 14.7803L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803Z" fill="#0B74E5"></path><path d="M10.125 10.5C10.7463 10.5 11.25 9.99632 11.25 9.375C11.25 8.75368 10.7463 8.25 10.125 8.25C9.50368 8.25 9 8.75368 9 9.375C9 9.99632 9.50368 10.5 10.125 10.5Z" fill="#0B74E5"></path><path d="M15 14.625C15 15.2463 14.4963 15.75 13.875 15.75C13.2537 15.75 12.75 15.2463 12.75 14.625C12.75 14.0037 13.2537 13.5 13.875 13.5C14.4963 13.5 15 14.0037 15 14.625Z" fill="#0B74E5"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25C3.33579 5.25 3 5.58579 3 6V9.75C3 10.1642 3.33579 10.5 3.75 10.5C4.61079 10.5 5.25 11.1392 5.25 12C5.25 12.8608 4.61079 13.5 3.75 13.5C3.33579 13.5 3 13.8358 3 14.25V18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18V14.25C21 13.8358 20.6642 13.5 20.25 13.5C19.3892 13.5 18.75 12.8608 18.75 12C18.75 11.1392 19.3892 10.5 20.25 10.5C20.6642 10.5 21 10.1642 21 9.75V6C21 5.58579 20.6642 5.25 20.25 5.25H3.75ZM4.5 9.08983V6.75H19.5V9.08983C18.1882 9.41265 17.25 10.5709 17.25 12C17.25 13.4291 18.1882 14.5874 19.5 14.9102V17.25H4.5V14.9102C5.81181 14.5874 6.75 13.4291 6.75 12C6.75 10.5709 5.81181 9.41265 4.5 9.08983Z" fill="#0B74E5"></path>
              </svg>
              <span>{discount.isSelected ? `Giảm ${discount.decreasePercent}${discount.type.includes("percent") ? "%" : "K"}` : "Chọn hoặc nhập Khuyến mãi khác"}</span>
            </div>
          </div> */}
          <div className={styles.priceSummary}>
            <div className={styles.pricesItems}>
              <div className="d-flex justify-content-between">
                <span className={styles.pricesText}>Tạm tính</span>
                <span className={styles.pricesValue}>{formatNumberWithDot(totalPrice)}đ</span>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <span className={styles.pricesText}>Phí vận chuyển</span>
                <span className={styles.pricesValue}>{formatNumberWithDot(transportFee)}đ</span>
              </div>
            </div>
            <div className={styles.pricesTotal}>
              <span className={styles.pricesText}>Tổng tiền</span>
              <div className={styles.pricesContent}>
                <span className={styles.pricesFinal}>{formatNumberWithDot(totalPrice - transportFee)}đ</span>
                <span className={styles.vat}>(Đã bao gồm VAT nếu có)</span>
              </div>
            </div>
          </div>
          <div className={styles.buyBtn} onClick={() => handleCheckout()} role="presentation">Mua hàng {`(${numberSelectedProduct})`}</div>
        </div>
      </div>
      <CustomModal title="Xoá sản phẩm" show={showModalDelete} setShow={setShowModalDelete}>
        <p className={styles.modalDecs}>Bạn có muốn xóa sản phẩm đang chọn?</p>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalConfirm} onClick={() => handleDeleteProductInCart(cartId)} role="presentation">Đồng ý</div>
          <div className={styles.modalCancel} onClick={() => setShowModalDelete(false)} role="presentation">hủy</div>
        </div>
      </CustomModal>
      <CustomModal title="Chọn sản phẩm" show={showModalSelectedProduct} setShow={setShowModalSelectedProduct}>
        <p className={styles.modalDecs}>Bạn chưa chọn sản phẩm nào!</p>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalCancel} onClick={() => setShowModalSelectedProduct(false)} role="presentation">Ok, đã hiểu</div>
        </div>
      </CustomModal>
      <CustomModal size="sm" title="Địa chỉ giao hàng" show={showModalChangeAddress} setShow={setShowModalChangeAddress}>
        <p className={styles.modalDecs}>Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính xác nhất.</p>
        <div>
          <div className="mb-3">
            <CustomDropdown
              label={'Tỉnh/Thành phố'}
              placeholder={'Vui lòng chọn tỉnh/thành phố'}
              value={''}
              name={'gender'}
            >
              {(['Nam', 'Nữ'] || []).map((val) => (
                <NavDropdown.Item key={Math.random()}>{val}</NavDropdown.Item>
              ))}
            </CustomDropdown>
          </div>
          <div className="mb-3">
            <CustomDropdown
              label={'Quận/Huyện'}
              placeholder={'Vui lòng chọn quận/huyện'}
              value={''}
              name={'gender'}
            >
              {(['Nam', 'Nữ'] || []).map((val) => (
                <NavDropdown.Item key={Math.random()}>{val}</NavDropdown.Item>
              ))}
            </CustomDropdown>
          </div>
          <div className="mb-4">
            <CustomDropdown
              label={'Phường/Xã'}
              placeholder={'Vui lòng chọn phường/xã'}
              value={''}
              name={'gender'}
            >
              {(['Nam', 'Nữ'] || []).map((val) => (
                <NavDropdown.Item key={Math.random()}>{val}</NavDropdown.Item>
              ))}
            </CustomDropdown>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center align-items-center py-3">
          <div className={styles.btnLocation} onClick={() => setShowModalChangeAddress(false)} role="presentation">Giao đến địa chỉ này</div>
        </div>
      </CustomModal>
      <CustomModal title="Khuyến mãi" show={showModalSelectedDiscount} setShow={setShowModalSelectedDiscount}>
        <p className={styles.modalDecs}>Chọn mã giảm giá</p>
        <div className={styles.couponList}>
          {cartDetail.discounts.map((item, index) => {
            return (
              <div key={index} className="d-flex gap-4 align-items-center">
                <input
                  type="radio"
                  className={styles.radio}
                  onClick={() => handleSelectedDiscount(item.discount.id, item.discount.decreasePercent, item.discount.unit)}
                />
                <div className="d-flex gap-5">
                  <Image
                    src={`/assets/logoweb.png`}
                    width={60}
                    height={40}
                    alt="tiki"
                  />
                  <div>
                    <div>{item.discount.discountName}</div>
                    Giảm {item.discount.decreasePercent}{item.discount.unit.includes("percent") ? "%" : "K"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalCancel} onClick={() => handleSaveDiscount()} role="presentation">Đồng ý</div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CartBody;
