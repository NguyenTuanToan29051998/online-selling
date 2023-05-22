/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState, MouseEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/OrderBody.module.scss';
import { OrderApiManagement } from '../../api-clients/order';
import { ColorBillDetail, OrderType, billDetailType } from '@/models/order';
import CustomModal from '../organisms/CustomModal';
import Image from 'next/image';
import useFormat from '../../hooks/useFormat';
import { addIcon, deleteIcon, editIcon, logoutIcon, removeIcon } from '../../public/icons';
import { Form, Formik, FormikHelpers } from 'formik';
import CustomDropdown from '../atoms/dropdowns/Dropdown';
import { NavDropdown } from 'react-bootstrap';
import { Discounts } from '@/models/cart';
import { NUMBER_REG } from '../../public/const';
import InputField from '../atoms/inputs/InputField';
import Label from '../atoms/labels/Label';
import CustomLabel from '../atoms/labels/CustomLabel';

export type ModalType = {
  isDelete: boolean,
  isDetail: boolean,
  isDeleteChidren: boolean,
  isLogout: boolean,
}

type Discount = {
  id: number | null,
  name: string,
  decreasePercent: number,
  isSelected: boolean,
  type: string,
}

type PropTypes = {

};

let idProductInBill: number;

const OrderBody: FC<PropTypes> = () => {
  const router = useRouter();
  const { formatNumberWithDot } = useFormat();

  const [numberSelectedTab, setNumberSelectedtab] = useState<number>(0);
  const [isShowAccontInfo, setIsShowAccountInfo] = useState<boolean>(false);
  const [orderHistoryList, setOrderHistoryList] = useState<OrderType[]>([]);
  const [itemOderInfo, setItemOderInfo] = useState<billDetailType[]>([]);
  const [showModal, setShowModal] = useState<ModalType>({
    isDelete: false,
    isDetail: false,
    isDeleteChidren: false,
    isLogout: false,
  });
  const [billId, setBillId] = useState<number>(-1);
  const [quantityInBill, setQuantityBill] = useState<number>(0);
  const [colorBillDetails, setColorBillDetails] = useState<ColorBillDetail[]>([]);
  const [showModalSelectedDiscount, setShowModalSelectedDiscount] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discounts, setDiscounts] = useState<Discounts[]>([
    {
      reason: null,
      able: true,
      discount: {
        id: 0,
        // isSelected: false,
        condition: 0,
        decreasePercent: 0,
        discountName: '',
        quantity: 0,
        memberType: null,
        unit: '',
      }
    }
  ]);

  const [discount, setDiscount] = useState<Discount>({
    id: null,
    isSelected: false,
    type: '',
    name: '',
    decreasePercent: 0,
  });

  let userInfo: any;
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleOpenModal = (isDel: boolean, billId: number) => {
    setBillId(billId);
    setItemOderInfo(orderHistoryList?.find(item => item.id === billId)?.billDetails!);
    setShowModal({ ...showModal, isDelete: isDel, isDetail: !isDel });
  };

  const handleDeleteOrder = () => {
    OrderApiManagement.deleteOrderHistoryPending(billId).then(res => {
      setShowModal({ ...showModal, isDelete: false });
      OrderApiManagement.getOrderHistoryPending(userInfo.id).then(res => {
        setOrderHistoryList(res.data);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  };

  const handleShowModalDeleteItem = (idBillDetail: number) => {
    setShowModal({ ...showModal, isDeleteChidren: true });
    idProductInBill = idBillDetail;
  };

  const handleDeleteChidrenItem = () => {
    const data = [];
    data.push(idProductInBill);
    OrderApiManagement.deleteItemInBill(data).then((_) => {
      OrderApiManagement.getOrderHistoryPending(userInfo.id).then(res => {
        setOrderHistoryList(res.data);
      }).catch(err => console.log(err));
      setShowModal({ ...showModal, isDetail: false, isDeleteChidren: false });
    });
  };

  const handleQuantity = (isAdd: boolean, idProductInBill: number) => {
    const updatedData = [...itemOderInfo];
    const itemIndex = updatedData.findIndex(obj => obj.id === idProductInBill);
    if (!isAdd && updatedData[itemIndex].quantity === 1) return;
    if (itemIndex !== -1) {
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        quantity: isAdd ? updatedData[itemIndex].quantity + 1 : updatedData[itemIndex].quantity - 1
      };
    }
    setItemOderInfo(updatedData);
  };

  const handleInputQuantity = (quantityNew: string, idProductInBill: number) => {
    console.log(itemOderInfo, colorBillDetails, 'ìno');
    if (!NUMBER_REG.test(quantityNew)) return;
    const updatedData = [...itemOderInfo];
    const itemIndex = updatedData.findIndex(obj => obj.id === idProductInBill);
    if (updatedData[itemIndex]?.quantity === 1) return;
    if (itemIndex !== -1) {
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        quantity: +quantityNew,
      };
    }
    setItemOderInfo(updatedData);
  };

  const handleOnSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    console.log(values.quantity, 'kkk');
  };

  const handleClickEditBill = (billId: number) => {
    OrderApiManagement.getBillDetail(billId).then((res) => {
      setColorBillDetails(res.data);
    });
  };

  const handleChangeColor = (idProductInBill: number, newColor: string) => {
    const updatedData = [...itemOderInfo];
    const itemIndex = updatedData.findIndex(obj => obj.id === idProductInBill);
    if (itemIndex !== -1) {
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        productDetail: {
          ...updatedData[itemIndex].productDetail,
          color: newColor,
        }
      };
    }
    setItemOderInfo(updatedData);
  };

  const handleChangeSize = (idProductInBill: number, newSize: string) => {
    const updatedData = [...itemOderInfo];
    const itemIndex = updatedData.findIndex(obj => obj.id === idProductInBill);
    if (itemIndex !== -1) {
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        productDetail: {
          ...updatedData[itemIndex].productDetail,
          size: newSize,
        }
      };
    }
    setItemOderInfo(updatedData);
  };

  const handleSelectedDiscount = (discountId: number, decreasePercent: number, typeDiscount: string) => {
    setDiscount({ ...discount, id: discountId, isSelected: true, decreasePercent: decreasePercent, type: typeDiscount });
  };

  const handleSaveDiscount = () => {
    setShowModalSelectedDiscount(false);
  };

  const handleEditBill = () => {
    const data = {
      billId: billId,
      discountId: discount.id,
      pendingItemDTOs: itemOderInfo.map(item => ({
        id: item.id,
        color: item.productDetail.color,
        size: item.productDetail.size,
        quantity: item.quantity
      }))
    };
    OrderApiManagement.updateBill(data).then(res => {
      console.log(res.data);
      setShowModal({ ...showModal, isDetail: false });
      OrderApiManagement.getOrderHistoryPending(userInfo.id).then(res => {
        setOrderHistoryList(res.data);
      }).catch(err => console.log(err));
    });
  };

  useEffect(() => {
    const data = {
      billId: 19,
      discountId: 4,
      pendingItemDTOs: itemOderInfo.map(item => ({
        id: item.id,
        color: item.productDetail.color,
        size: item.productDetail.size,
        quantity: item.quantity
      }))
    };
    console.log(data.pendingItemDTOs.map(item => item.id));
    OrderApiManagement.getDiscountBillDetail(data.pendingItemDTOs.map(item => item.id), +userInfo?.id || 0, 1000000).then((res) => {
      setDiscounts(res.data.discounts);
    });
    const totalSum = itemOderInfo.reduce((sum, item) => sum + (item.productDetail.product.price * item.quantity), 0);
    setTotalPrice(totalSum);
  }, [itemOderInfo]);

  useEffect(() => {
    let userInfo: any;
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    };
    if (!userInfo?.id) {
      router.push('/');
    }
  }, []);

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

  return (
    <div className={styles.orderBody}>
      <div className="row">
        <div className="col-2">
          <div className="d-flex gap-3 align-items-center">
            <div>
              <Image
                src="/assets/avatar.png"
                width={45}
                height={45}
                alt="main-logo"
              />
            </div>
            <div className={styles.info}>Tài khoản của <strong>Nguyễn Toàn</strong></div>
          </div>
          <div className={styles.account}>
            <li className={`${!isShowAccontInfo && styles.isActive} d-flex gap-3 align-items-center`} onClick={() => setIsShowAccountInfo(false)} role="presentation">
              <div className="d-flex">
                <svg stroke="currentColor" fill="rgb(155, 155, 155)" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path>
                </svg>
              </div>
              <span>Quản lý đơn hàng</span>
            </li>
            <li className={`${isShowAccontInfo && styles.isActive} d-flex gap-3 align-items-center`} onClick={() => setIsShowAccountInfo(true)} role="presentation">
              <div className="d-flex">
                <svg stroke="currentColor" fill="rgb(155, 155, 155)" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
              </div>
              <span>Thông tin tài khoản</span>
            </li>
            <li className={`d-flex gap-3 align-items-center`} onClick={() => setShowModal({...showModal, isLogout: true})} role="presentation">
              <div className="d-flex">
                {logoutIcon}
              </div>
              <span>Đăng xuất</span>
            </li>
          </div>
        </div>
        <div className="col-10">
          {isShowAccontInfo ? (
            <>
              <div className="mb-3">Thông tin tài khoản</div>
              <div className={styles.infoAccount}>
                <div className="mb-3">Thông tin cá nhân</div>
                <div className="d-flex gap-5">
                  <div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Họ" desc={userInfo?.lastName} />
                    </div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Tên" desc={userInfo?.firstName} />
                    </div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Email" desc={userInfo?.email} />
                    </div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Số điện thoại" desc={userInfo?.phoneNumber} />
                    </div>
                  </div>
                  <div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Tên đăng nhập" desc={userInfo?.username} />
                    </div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Mật khẩu" desc="**********" />
                    </div>
                    <div className={styles.itemInfo}>
                      <CustomLabel title="Giới tính" desc={userInfo?.gender === 1 ? 'Nam' : 'Nữ'} />
                    </div>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <>
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
                                onClick={() => {
                                  handleOpenModal(false, item.id);
                                  handleClickEditBill(item.id);
                                }}
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
            </>
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
          <div style={{ maxHeight: '500px', overflow: 'auto', paddingRight: '1rem' }}>
            {itemOderInfo?.map((item, index) => {
              return (
                <div className={styles.intened} key={Math.random()}>
                  <Formik
                    // enableReinitialize={true}
                    initialValues={{
                      // Khởi tạo giá trị ban đầu cho các trường trong form
                      quantity: itemOderInfo[index].quantity,
                      color: itemOderInfo[index].productDetail.color
                    }}
                    onSubmit={handleOnSubmit}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      errors,
                      setValues,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center">
                          <div className={styles.productInfo}>
                            <div className="d-flex">
                              <Image
                                src={`/assets/${item.productDetail.thumnail}`}
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
                          <div style={{ width: '200px' }}>
                            <CustomDropdown
                              placeholder={'color'}
                              value={item.productDetail.color}
                              name={'color'}
                            >
                              {(colorBillDetails[index]?.colorOrderDTOs || []).map((val) => (
                                <NavDropdown.Item key={Math.random()} onClick={() => handleChangeColor(item.id, val.color)}>{val.color}</NavDropdown.Item>
                              ))}
                            </CustomDropdown>
                          </div>
                          <div style={{ width: '150px' }}>
                            <CustomDropdown
                              placeholder={'size'}
                              value={item.productDetail.size}
                              name={'size'}
                            >
                              {(colorBillDetails[index]?.colorOrderDTOs?.find(x => x.color === item.productDetail.color)?.sizeQuantityDTOs || []).map((val) => {
                                if (!val) return;
                                return (
                                  <NavDropdown.Item key={Math.random()} onClick={() => handleChangeSize(item.id, val?.size)}>{val?.size}</NavDropdown.Item>
                                );
                              })}
                            </CustomDropdown>
                          </div>
                          <div className={styles.productPrice}>
                            <div className={styles.realPrice}>{formatNumberWithDot(item.productDetail.product.price)} ₫</div>
                            <del className={styles.discountPrice}>{formatNumberWithDot(item.productDetail.product.price)} ₫</del>
                          </div>
                          <div className={styles.productQty}>
                            <div className={styles.groupnput}>
                              <div
                                className={`${styles.removeCart} ${styles.disable}`}
                                // onClick={() => handleUpdateCart(item.id, item.quantity, false)}
                                onClick={() => handleQuantity(false, item.id)}
                                role="presentation"
                              >{removeIcon}</div>
                              {/* <input type="text" name="quantity" value={values.quantity} className={styles.inputCart} onChange={handleChange} /> */}
                              <input type="text" value={item.quantity} className={styles.inputCart} onChange={(e) => handleInputQuantity(e.target.value, item.id)} />
                              <div
                                className={`${styles.addCart} ${styles.disable}`}
                                // onClick={() => handleUpdateCart(item.id, item.quantity, true)}
                                onClick={() => handleQuantity(true, item.id)}
                                role="presentation"
                              >{addIcon}</div>
                            </div>
                          </div>
                          <div className={styles.finalProduct}>{formatNumberWithDot(values.quantity * item.productDetail.product.price)} ₫</div>
                          <div
                            className={styles.productremove}
                            onClick={() => handleShowModalDeleteItem(item.id)}
                            role="presentation"
                          >{deleteIcon}</div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              );
            })}
            <div className="d-flex justify-content-end">
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
                  <span>{discount.isSelected ? `Giảm ${discount.decreasePercent}${discount.type.includes("percent") ? "%" : "đ"}` : "Chọn hoặc nhập Khuyến mãi khác"}</span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className={styles.priceSummary}>
                <div className={styles.pricesItems}>
                  <div className="d-flex justify-content-between">
                    <span className={styles.pricesText}>Tạm tính</span>
                    <span className={styles.pricesValue}>{formatNumberWithDot(totalPrice)}đ</span>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span className={styles.pricesText}>Khuyến mãi vận chuyển</span>
                    <span className={`${styles.pricesValue} ${styles.summaryValuePositive}`}>-{formatNumberWithDot((totalPrice >= 300000 && totalPrice <= 500000) ? 10000 : (totalPrice < 300000 ? 0 : 20000))}đ</span>
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
                      {formatNumberWithDot(totalPrice - ((totalPrice >= 300000 && totalPrice <= 500000) ? 10000 : (totalPrice < 300000 ? 0 : 20000)) - (discount.type.includes("percent") ? (discount.decreasePercent / 100 * totalPrice) : discount.decreasePercent))}đ</span>
                    <span className={styles.vat}>(Đã bao gồm VAT nếu có)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex gap-2 justify-content-end align-items-center mt-4">
          {showModal.isDetail ? (
            <div className={styles.modalConfirm} onClick={() => handleEditBill()} role="presentation">Xác nhận</div>
          ) : (
            <div className={styles.modalConfirm} onClick={() => handleDeleteOrder()} role="presentation">Xác nhận</div>
          )}
          <div className={styles.modalCancel} onClick={() => setShowModal({ ...showModal, isDetail: false, isDelete: false })} role="presentation">Hủy</div>
        </div>
      </CustomModal>

      <CustomModal title="Khuyến mãi" show={showModalSelectedDiscount} setShow={setShowModalSelectedDiscount}>
        <p className={styles.modalDecs}>Chọn mã giảm giá</p>
        <div className={styles.couponList}>
          {discounts.map((item, index) => {
            return (
              <div key={index} className="d-flex gap-4 align-items-center">
                <input
                  type="radio"
                  className={styles.radio}
                  onClick={() => handleSelectedDiscount(item.discount.id, item.discount.decreasePercent, item.discount.unit)}
                  checked={item.discount.id === discount.id}
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
                    Giảm {item.discount.decreasePercent}{item.discount.unit.includes("percent") ?"%" : "đ"}
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

      <CustomModal
        size="xl"
        title="Xóa sản phẩm"
        show={showModal.isDeleteChidren}
        setShow={setShowModal}
      >
        <p className={styles.modalDecs}>Bạn có muốn xóa sản phẩm đã chọn không?</p>
        <div className="d-flex gap-2 justify-content-end align-items-center mt-4">
          <div className={styles.modalConfirm} onClick={() => handleDeleteChidrenItem()} role="presentation">Xác nhận</div>
          <div className={styles.modalCancel} onClick={() => setShowModal({ ...showModal, isDeleteChidren: false })} role="presentation">Hủy</div>
        </div>
      </CustomModal>
      <CustomModal
        size="xl"
        title="Đăng xuất"
        show={showModal.isLogout}
        setShow={setShowModal}
      >
        <p className={styles.modalDecs}>Bạn có chắc muốn đăng xuất không?</p>
        <div className="d-flex gap-2 justify-content-end align-items-center mt-4">
          <div className={styles.modalConfirm} onClick={() => router.push('/')} role="presentation">Xác nhận</div>
          <div className={styles.modalCancel} onClick={() => setShowModal({ ...showModal, isLogout: false })} role="presentation">Hủy</div>
        </div>
      </CustomModal>
    </div>
  );
};

export default OrderBody;
