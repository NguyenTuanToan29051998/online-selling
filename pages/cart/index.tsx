import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CartBody from '../../components/templates/CartBody';
import CustomContainer from '../../components/molecules/CustomContainer';

const Cart: NextPageWithLayout = () => {

  return (
    <CustomContainer size="medium">
      <CartBody />
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
