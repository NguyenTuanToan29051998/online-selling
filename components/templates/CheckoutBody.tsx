/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/CheckoutBody.module.scss';
import Image from 'next/image';
import { addIcon, deleteIcon, fulfillmentIcon, methodIcon, removeIcon } from '../../public/icons';
import CustomModal from '../organisms/CustomModal';
import { CartType } from '@/models/cart';
import useFormat from '../../hooks/useFormat';
import axios from 'axios';
import CustomDropdown from '../atoms/dropdowns/Dropdown';
import { NavDropdown } from 'react-bootstrap';
import { CheckoutApiManagement } from '../../api-clients/checkout';

type Discount = {
  id: number,
  name: string,
  decreasePercent: number,
  isSelected: boolean,
  type: string,
}

type DeliveryType = {
  nameTransportUnit: string,
  address: string,
  ward: string,
  idWard: number,
  district: string,
  idDistrict: number,
  province: string,
  idProvince: number,
}

type ProvinceType = {
  ProvinceID: number,
  ProvinceName: string,
}[]

type DistrictType = {
  DistrictID: number,
  ProvinceID: number
  DistrictName: string,
}[]

type WardType = {
  DistrictID: number,
  WardName: string,
}[]

type PropTypes = {
  paymentProductList: CartType
};

const CheckoutBody: FC<PropTypes> = (props) => {
  const {paymentProductList} = props;
  const router = useRouter();
  const { isCheckout } = router.query;
  const {formatNumberWithDot} = useFormat();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalOrderSuccess, setShowModalOrderSuccess] = useState<boolean>(isCheckout ? true: false);
  const [showModalSelectedDiscount, setShowModalSelectedDiscount] = useState<boolean>(false);
  const [showModalChangeAddress, setShowModalChangeAddress] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [transportFee, setTransportFee] = useState<number>(0);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryType>({
    nameTransportUnit: '',
    address: '',
    ward: '',
    idWard: -1,
    district: '',
    idDistrict: -1,
    province: '',
    idProvince: -1,
  });
  const [discount, setDiscount] = useState<Discount>({
    id: 0,
    isSelected: false,
    type: '',
    name: '',
    decreasePercent: 0,
  });
  const [provinceList, setProvinceList] = useState<ProvinceType[]>([]);
  const [districtList, setDistrictList] = useState<DistrictType[]>([]);
  const [wardList, setWardList] = useState<WardType[]>([]);
  const [isPaypalPayment, setIspaypalPayment] = useState<boolean>(false);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleCheckout = () => {
    CheckoutApiManagement.checkoutProduct(
      userInfo.id,
      totalPrice,
      'Số 15',
      deliveryAddress.ward,
      deliveryAddress.district,
      deliveryAddress.province,
      // transportFee/100 * totalPrice + (totalPrice < 300000 ? 0 : ((totalPrice >= 300000 && totalPrice <=500000) ? 10000 : 20000)),
      discount.decreasePercent,
      discount.id,
      isPaypalPayment ? 'online' : 'cash',
    ).then((res) =>{
      if (isPaypalPayment) {
        window.location.href = res.data.message;
        // window.open(res.data.message, "_blank");
      } else {
        // setShowModalOrderSuccess(true);
        router.push('checkout?isCheckout=true');
      }
      setShowModal(false);
    }).catch(err => console.log(err));
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

  const handleChangeProvince = (provinceId: number, provinceName: string) => {
    setDeliveryAddress({...deliveryAddress, province: provinceName, idProvince: provinceId});
    const headers = {
      'shop_id': '120837',
      'token': 'f1e25a8c-6ec0-11ed-b62e-2a5743127145'
    };
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`, { headers: headers })
    .then(res => {
      setDistrictList(res.data.data);
    })
    .catch(error => console.log(error));
  };

  const handleChangeDistrict = (districtId: number, districtName: string) => {
    setDeliveryAddress({...deliveryAddress, district: districtName, idDistrict: districtId});
    const headers = {
      'shop_id': '120837',
      'token': 'f1e25a8c-6ec0-11ed-b62e-2a5743127145'
    };
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`, { headers: headers })
    .then(res => {
      setWardList(res.data.data);
    })
    .catch(error => console.log(error));
  };

  const handleConfirm = () => {

  };

  useEffect(() => {
    let total = 0;
    paymentProductList.cartDetail.cartItems.map((item) => {
      total = total + item.newPrice*item.quantity;
    });
    setTotalPrice(total);
  }, []);

  useEffect(() => {
    if (isCheckout) setShowModalOrderSuccess(true);
  }, [isCheckout]);

  useEffect(() => {
    const headers = {
      'shop_id': '120837',
      'token': 'f1e25a8c-6ec0-11ed-b62e-2a5743127145'
    };
    // axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=53321&insurance_value=100000&from_district_id=3440&to_district_id=2194&to_ward_code=220714&height=1&length=15&weight=300&width=15`, { headers: headers })
    //   .then(res => {
    //     setTransportFee(res.data.data.total);
    //   })
    //   .catch(error => console.log(error));
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=120837&from_district=3440&to_district=2194`, { headers: headers })
      .then(res => {
        setDeliveryAddress({ ...deliveryAddress, nameTransportUnit: res.data.data[0].short_name });
      })
      .catch(error => console.log(error));
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, { headers: headers })
      .then(res => {
        setProvinceList(res.data.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (deliveryAddress.idDistrict === -1 || deliveryAddress.idWard === -1) return;
    const headers = {
      'shop_id': '120837',
      'token': 'f1e25a8c-6ec0-11ed-b62e-2a5743127145'
    };
    axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=53320&insurance_value=100000&from_district_id=3440&to_district_id=${deliveryAddress.idDistrict}&to_ward_code=${deliveryAddress.idWard}&height=1&length=15&weight=300&width=15`, { headers: headers })
      .then(res => {
        setTransportFee(res.data.data.total);
      })
      .catch(error => console.log(error));
  }, [deliveryAddress.idWard, deliveryAddress.idDistrict, deliveryAddress.idProvince]);


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
                <input type="radio" name="" id="" className={styles.radio} checked />
                <div className="d-flex">
                  <Image
                    src="/assets/fast-logo.png"
                    width={32}
                    height={14}
                    alt="payment-logo"
                  />
                </div>
                <span className={styles.methodText}>{deliveryAddress.nameTransportUnit}</span>
                <div className="d-flex align-items-center gap-1">
                  <div className={styles.freeMoney}>-{formatNumberWithDot((totalPrice >= 300000 && totalPrice <=500000) ? 10000 : 20000)}</div>
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
                Gói: Giao vào Thứ Sáu, 08/02
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
                    <div className={styles.methodText}>{deliveryAddress.nameTransportUnit}</div>
                  </div>
                  <div className={styles.shippingFees}>
                    <div className={styles.originalFee}>{formatNumberWithDot(transportFee)}₫</div>
                    <div className={styles.currentFee}>{formatNumberWithDot(transportFee - ((totalPrice >= 300000 && totalPrice <=500000) ? 10000 : 20000))} ₫</div>
                  </div>
                </div>
                {(paymentProductList.cartDetail.cartItems || []).map(item => {
                  return (
                    <div className={styles.packageItemList} key={Math.random()}>
                      <div className="d-flex">
                        <Image
                          src={`/assets/${item.product.thumnail}`}
                          width={48}
                          height={48}
                          alt="product"
                        />
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemInfoProductName}>{item.product.product.name}</div>
                        <div className={styles.itemInfoSecondLine}>
                          <div className={styles.quantity}>SL: x{item.quantity}</div>
                          <div className={styles.price}>{item.newPrice}₫</div>
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
                <input type="radio" name="" id="" className={styles.radio} checked={!isPaypalPayment} onClick={() => setIspaypalPayment(false)} />
                <div>{methodIcon}</div>
                <span>Thanh toán tiền mặt khi nhận hàng</span>
              </div>
              <div className="d-flex gap-3 align-items-center mt-3">
                <input type="radio" name="" id="" className={styles.radio} checked={isPaypalPayment} onClick={() => setIspaypalPayment(true)} />
                <div className="d-flex">
                  <Image
                    src="/assets/payment-method.png"
                    width={32}
                    height={32}
                    alt="payment-logo"
                  />
                </div>
                <span>Thanh toán bằng Paypal</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightArea}>
          <div className={styles.blockAddress}>
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
              số 15, {deliveryAddress.ward}, {deliveryAddress.district}, {deliveryAddress.province}
            </div>
          </div>
          <div className={styles.couponBlock}>
            <div className={styles.blockHeader}>
              <div className={styles.blockHeaderTitle}>Chọn Mã khuyến mãi</div>
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
          </div>
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
              <div className="d-flex justify-content-between mt-1">
                <span className={styles.pricesText}>Khuyến mãi vận chuyển</span>
                <span className={`${styles.pricesValue} ${styles.summaryValuePositive}`}>-{formatNumberWithDot((totalPrice >= 300000 && totalPrice <=500000) ? 10000 : 20000)}đ</span>
              </div>
              {discount.decreasePercent !== 0 && (
                <div className="d-flex justify-content-between mt-1">
                  <span className={styles.pricesText}>Giảm giá</span>
                  <span className={`${styles.pricesValue} ${styles.summaryValuePositive}`}>-{discount.type.includes("percent") ? discount.decreasePercent : formatNumberWithDot(discount.decreasePercent)}{discount.type.includes("percent") ? "%" : "đ"}</span>
                </div>
              )}
            </div>
            <div className={styles.pricesTotal}>
              <span className={styles.pricesText}>Tổng tiền</span>
              <div className={styles.pricesContent}>
                <span className={styles.pricesFinal}>
                  {formatNumberWithDot(totalPrice + transportFee - ((totalPrice >= 300000 && totalPrice <=500000) ? 10000 : 20000) - (discount.type.includes("percent") ? (discount.decreasePercent / 100 * totalPrice) : discount.decreasePercent))}đ</span>
                <span className={styles.vat}>(Đã bao gồm VAT nếu có)</span>
              </div>
            </div>
          </div>
          <div className={styles.buyBtn} onClick={() => setShowModal(true)} role="presentation">Thanh toán</div>
        </div>
      </div>
      <CustomModal title="Thanh toán đơn hàng" show={showModal} setShow={setShowModal}>
        <p className={styles.modalDecs}>Xác nhận thanh toán</p>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalConfirm} onClick={() => handleCheckout()} role="presentation">Đồng ý</div>
          <div className={styles.modalCancel} onClick={() => setShowModal(false)} role="presentation">hủy</div>
        </div>
      </CustomModal>
      <CustomModal size="xl" title="Địa chỉ giao hàng" show={showModalChangeAddress} setShow={setShowModalChangeAddress}>
        <p className={styles.modalDecs}>Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính xác nhất.</p>
        <div>
          <div className="mb-3">
            <CustomDropdown
              label={'Tỉnh/Thành phố'}
              placeholder={'Vui lòng chọn tỉnh/thành phố'}
              value={deliveryAddress.province}
              name={''}
            >
              <div style={{height: '250px', overflow: 'auto'}}>
                {(provinceList || []).map((val: any) => (
                  <NavDropdown.Item key={Math.random()} onClick={() => handleChangeProvince(val.ProvinceID, val.ProvinceName)}>{val.ProvinceName}</NavDropdown.Item>
                ))}
              </div>
            </CustomDropdown>
          </div>
          <div className="mb-3">
            <CustomDropdown
              label={'Quận/Huyện'}
              placeholder={'Vui lòng chọn quận/huyện'}
              value={deliveryAddress.district}
              name={''}
            >
              <div style={{height: '250px', overflow: 'auto'}}>
                {(districtList || []).map((val: any) => (
                  <NavDropdown.Item key={Math.random()} onClick={() => handleChangeDistrict(val.DistrictID, val.DistrictName)}>{val.DistrictName}</NavDropdown.Item>
                ))}
              </div>
            </CustomDropdown>
          </div>
          <div className="mb-4">
            <CustomDropdown
              label={'Phường/Xã'}
              placeholder={'Vui lòng chọn phường/xã'}
              value={deliveryAddress.ward}
              name={''}
            >
              <div style={{height: '250px', overflow: 'auto'}}>
                {(wardList || []).map((val: any) => (
                  <NavDropdown.Item key={Math.random()} onClick={() => setDeliveryAddress({...deliveryAddress, ward: val.WardName, idWard: val.WardCode})}>{val.WardName}</NavDropdown.Item>
                ))}
              </div>
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
          {paymentProductList.discounts.map((item, index) => {
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
      <CustomModal title="Đặt hàng thành công" show={showModalOrderSuccess} setShow={setShowModalOrderSuccess}>
        <p className={styles.modalDecs}>Đơn hàng của bạn đang chờ được xác nhận</p>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalConfirm} onClick={() => router.push('/order')} role="presentation">Xem chi tiết</div>
          <div className={styles.modalCancel} onClick={() => router.push('/home')} role="presentation">Quay lại tang chủ</div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CheckoutBody;
