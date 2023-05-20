/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/OrderBody.module.scss';
import { OrderApiManagement } from '../../api-clients/order';
import { OrderType, billDetailType } from '@/models/order';
import CustomModal from '../organisms/CustomModal';
import Image from 'next/image';
import useFormat from '../../hooks/useFormat';
import { addIcon, deleteIcon, editIcon, removeIcon } from '../../public/icons';

export type ModalType = {
  isDelete: boolean,
  isDetail: boolean,
}

type PropTypes = {

};

const OrderBody: FC<PropTypes> = () => {
  const router = useRouter();
  const { formatNumberWithDot } = useFormat();
  const [numberSelectedTab, setNumberSelectedtab] = useState<number>(0);
  const [orderHistoryList, setOrderHistoryList] = useState<OrderType[]>([]);
  const [itemOderInfo, setItemOderInfo] = useState<billDetailType[]>([]);
  const [showModal, setShowModal] = useState<ModalType>({
    isDelete: false,
    isDetail: false,
  });
  const [billId, setBillId] = useState<number>(-1);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleOpenModal = (isDel: boolean, billId: number) => {
    setBillId(billId);
    setItemOderInfo(orderHistoryList?.find(item => item.id === billId)?.billDetails!);
    setShowModal({...showModal, isDelete: isDel, isDetail: !isDel });
  };

  const handleDeleteOrder = () => {
    OrderApiManagement.deleteOrderHistoryPending(billId).then(res => {
      setOrderHistoryList(res.data);
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    if (!userInfo) return;
    switch (numberSelectedTab) {
      case 0:
        OrderApiManagement.getAllOrderHistory(userInfo.id).then(res => {
          setOrderHistoryList(res.data);
        }).catch(err => console.log(err));
        break;
      case 1:
        OrderApiManagement.getOrderHistoryPending(userInfo.id).then(res => {
          setOrderHistoryList(res.data);
        }).catch(err => console.log(err));
        break;
      case 2:
        OrderApiManagement.getOrderHistoryDelivering(userInfo.id).then(res => {
          setOrderHistoryList(res.data);
        }).catch(err => console.log(err));
        break;
      case 3:
        OrderApiManagement.getOrderHistorySuccess(userInfo.id).then(res => {
          setOrderHistoryList(res.data);
        }).catch(err => console.log(err));
        break;
      case 4:
        OrderApiManagement.getOrderHistoryCancel(userInfo.id).then(res => {
          setOrderHistoryList(res.data);
        }).catch(err => console.log(err));
        break;
      default:
        OrderApiManagement.getOrderHistoryReturn(userInfo.id).then(res => {
          setOrderHistoryList(res.data);
        }).catch(err => console.log(err));
        break;
    }
  }, [numberSelectedTab]);

  const handleUpdateCart = () => {

  };

  return (
    <div className={styles.orderBody}>
      <div className="row">
        <div className="col-2">Tài khoản</div>
        <div className="col-10">
          <div className="mb-3">Đơn hàng của tôi</div>
          <div className={styles.tabList}>
            <div className={`${styles.tab} ${numberSelectedTab === 0 && styles.isSelected}`} onClick={() => setNumberSelectedtab(0)} role="presentation">Tất cả đơn</div>
            <div className={`${styles.tab} ${numberSelectedTab === 1 && styles.isSelected}`} onClick={() => setNumberSelectedtab(1)} role="presentation">Đơn chưa duyệt</div>
            <div className={`${styles.tab} ${numberSelectedTab === 2 && styles.isSelected}`} onClick={() => setNumberSelectedtab(2)} role="presentation">Đơn đang giao</div>
            <div className={`${styles.tab} ${numberSelectedTab === 3 && styles.isSelected}`} onClick={() => setNumberSelectedtab(3)} role="presentation">Đơn đã giao</div>
            <div className={`${styles.tab} ${numberSelectedTab === 4 && styles.isSelected}`} onClick={() => setNumberSelectedtab(4)} role="presentation">Đơn hủy</div>
            <div className={`${styles.tab} ${numberSelectedTab === 5 && styles.isSelected}`} onClick={() => setNumberSelectedtab(5)} role="presentation">Đơn hoàn trả</div>
          </div>
          {!orderHistoryList.length ? (
            <div className="m-3">Chưa có đơn hàng nào</div>
          ) : (
            <div className={styles.table}>
              <table className="table">
                <thead>
                  <tr className="table-row">
                    <th scope="col" className="col-2"><div className="ms-3">Số thứ tự</div></th>
                    <th scope="col" className="col-1">Ảnh</th>
                    <th scope="col" className="col-3">Tên sản phẩm</th>
                    <th scope="col" className="col-1">Màu sắc</th>
                    <th scope="col" className="col-1">Kích cỡ</th>
                    <th scope="col" className="col-1">Số lượng</th>
                    <th scope="col" className="col-1">Giá bán</th>
                    <th scope="col" style={{ minWidth: '100px' }}>Thành tiền</th>
                    <th scope="col" className="col-2"></th>
                    <th scope="col" className="col-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {(orderHistoryList || []).map((item, index) => (
                    <tr className={styles.rowBody} key={index}>
                      <td className="col-1"><div className={`ms-3 ${styles.center}`} >Đơn hàng {index + 1}</div></td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.image} style={{ backgroundImage: `url("/assets/${val.productDetail.thumnail}")` }} />
                          );
                        })}
                      </td>
                      <td className="col-2">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.center}>
                              <td className="mw-150">{val.productDetail.product.name}</td>
                            </div>
                          );
                        })}
                      </td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.center}>
                              <td key={ind} className="mw-150"><div>{val.productDetail.color}</div></td>
                            </div>
                          );
                        })}
                      </td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.center}>
                              <td key={ind} className="mw-150"><div>{val.productDetail.size}</div></td>
                            </div>
                          );
                        })}
                      </td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.center}>
                              <td key={ind} className="mw-150"><div>{val.quantity}</div></td>
                            </div>
                          );
                        })}
                      </td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.center}>
                              <td key={ind}><div>{formatNumberWithDot(val.unitPrice)}đ</div></td>
                            </div>
                          );
                        })}
                      </td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.center}>
                              <td key={ind} className="mw-100"><div>{formatNumberWithDot(val.total)}đ</div></td>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        <div className={`${styles.center} gap-4`}>
                          <td
                            className={`${numberSelectedTab === 1 && styles.mw50 || styles.minW75}`}
                            onClick={() => handleOpenModal(false, item.id)}
                            role="presentation"
                          >
                            {(numberSelectedTab === 1 && <div>{editIcon}</div>) || (numberSelectedTab === 3 && 'Hoàn trả')}
                          </td>
                          <td
                            className={`${numberSelectedTab === 1 && styles.mw50 || styles.minW75}`}
                            onClick={() => handleOpenModal(true, item.id)}
                            role="presentation"
                          >
                              {(numberSelectedTab === 1 && <div>{deleteIcon}</div>) || (numberSelectedTab === 3 && 'Đánh giá')}
                          </td>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <CustomModal
        size={showModal.isDelete ? "xl" : "md"}
        title={showModal.isDelete ? "Hủy đơn hàng" : "Sửa đơn hàng"}
        show={showModal.isDetail || showModal.isDelete}
        setShow={setShowModal}
      >
        {showModal.isDelete ? (
          <p className={styles.modalDecs}>Xác nhận hủy đơn hàng</p>
        ) : (
          <>
            {itemOderInfo?.map((item, index) => {
            return (
              <div className={styles.intened} key={Math.random()}>
                <div className="d-flex align-items-center">
                  <div className={styles.productInfo}>
                    <div className="d-flex">
                      <Image
                        src={`/assets/${item.productDetail.product.image}`}
                        width={77}
                        height={80}
                        alt={item.productDetail.product.name}
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>{(item.productDetail.product.name)}</div>
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
                    <div className={styles.realPrice}>{formatNumberWithDot(item.productDetail.product.price)} ₫</div>
                    <del className={styles.discountPrice}>{formatNumberWithDot(item.productDetail.product.price)} ₫</del>
                  </div>
                  {/* <CustomModal title="Khuyến mãi" show={showModalSelectedDiscount} setShow={setShowModalSelectedDiscount}>
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
                  </CustomModal> */}
                  <div className={styles.productQty}>
                    <div className={styles.groupnput}>
                      <div
                        className={`${styles.removeCart} ${styles.disable}`}
                        // onClick={() => handleUpdateCart(item.id, item.quantity, false)}
                        role="presentation"
                      >{removeIcon}</div>
                      <input type="text" value={item.quantity} className={styles.inputCart} />
                      <div
                        className={`${styles.addCart} ${styles.disable}`}
                        // onClick={() => handleUpdateCart(item.id, item.quantity, true)}
                        role="presentation"
                      >{addIcon}</div>
                    </div>
                  </div>
                  <div className={styles.finalProduct}>{formatNumberWithDot(item.productDetail.product.price)} ₫</div>
                  <div
                    className={styles.productremove}
                    // onClick={() => handleOpenModalDelete(item.id)}
                    role="presentation"
                  >{deleteIcon}</div>
                </div>
              </div>
            );
          })}
          </>
        )}
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalConfirm} onClick={() => handleDeleteOrder()} role="presentation">Xác nhận</div>
          <div className={styles.modalCancel} onClick={() => setShowModal({...showModal, isDetail: false, isDelete: false})} role="presentation">Hủy</div>
        </div>
      </CustomModal>
    </div>
  );
};

export default OrderBody;
