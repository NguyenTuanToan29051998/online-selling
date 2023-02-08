/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/OrderBody.module.scss';
import { OrderApiManagement } from '../../api-clients/order';
import { OrderType } from '@/models/order';
import CustomModal from '../organisms/CustomModal';

type PropTypes = {

};

const OrderBody: FC<PropTypes> = () => {
  const router = useRouter();
  const [numberSelectedTab, setNumberSelectedtab] = useState<number>(0);
  const [orderHistoryList, setOrderHistoryList] = useState<OrderType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [billId, setBillId] = useState<number>(-1);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleOpenModalDeleteOrder = (billId: number) => {
    setBillId(billId);
    setShowModal(true);
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

  return (
    <div className={styles.orderBody}>
      <div className="row">
        <div className="col-3">Tài khoản</div>
        <div className="col-9">
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
                    <th scope="col" className="col-3">Tên sản phẩm</th>
                    <th scope="col" className="col-2">Màu sắc</th>
                    <th scope="col" className="col-1"></th>
                    <th scope="col" className="col-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {(orderHistoryList || []).map((item, index) => (
                    <tr className={styles.rowBody} key={index}>
                      <td className="col-1"><div className="ms-3">Đơn hàng {index + 1}</div></td>
                      <td className="col-2">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                              <td className="mw-150 ">{val.productDetail.product.name}</td>
                            </div>
                          );
                        })}
                      </td>
                      <td className="col-1">
                        {item.billDetails.map((val, ind) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                              <td key={ind} className="mw-150 ms-5"><div>{val.productDetail.color}</div></td>
                            </div>
                          );
                        })}
                      </td>
                      {numberSelectedTab === 1 ? (
                        <>
                          <td className={styles.mw50}>{numberSelectedTab === 1 && 'Sửa'}</td>
                        <td className={styles.mw50} onClick={() => handleOpenModalDeleteOrder(item.id)} role="presentation">{numberSelectedTab === 1 && 'Xóa'}</td>
                        </>
                      ) : (
                        <>
                          <td className={styles.mw50}></td>
                          <td className={styles.mw50}></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <CustomModal title="Hủy đơn hàng" show={showModal} setShow={setShowModal}>
        <p className={styles.modalDecs}>Xác nhận hủy đơn hàng</p>
        <div className="d-flex gap-2 justify-content-end align-items-center">
          <div className={styles.modalConfirm} onClick={() => handleDeleteOrder()} role="presentation">Đồng ý</div>
          <div className={styles.modalCancel} onClick={() => setShowModal(false)} role="presentation">Quay lại</div>
        </div>
      </CustomModal>
    </div>
  );
};

export default OrderBody;
