import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CustomContainer from '../../components/molecules/CustomContainer';
import CheckoutBody from '../../components/templates/CheckoutBody';
import { CartType } from '@/models/cart';
import { CartApiManagement } from '../../api-clients/cart';

const Checkout: NextPageWithLayout = () => {

  const [paymentProductList, setPaymentProductList] = useState<CartType>();

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    CartApiManagement.getCartDetail(userInfo.id).then((res) => {
      setPaymentProductList(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <CustomContainer size="medium">
      {paymentProductList && <CheckoutBody paymentProductList={paymentProductList} />}
    </CustomContainer>
  );
};

Checkout.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Checkout;
