import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CartBody from '../../components/templates/CartBody';
import CustomContainer from '../../components/molecules/CustomContainer';
import { CartApiManagement } from '../../api-clients/cart';
import { CartType } from '@/models/cart';

const Cart: NextPageWithLayout = () => {
  const [cartDetail, setCartDetail] = useState<CartType>();

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    CartApiManagement.getCartDetail(userInfo.id).then((res) => {
      res.data.cartDetail.cartItems.map((item: any) => {
        item.isSelected = false;
        return item;
      });
      setCartDetail(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <CustomContainer size="medium">
      {cartDetail && <CartBody cartDetail={cartDetail} setCartDetail={setCartDetail} />}
    </CustomContainer>
  );
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Cart;
