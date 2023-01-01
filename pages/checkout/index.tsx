import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CustomContainer from '../../components/molecules/CustomContainer';
import CheckoutBody from '../../components/templates/CheckoutBody';

const Checkout: NextPageWithLayout = () => {

  return (
    <CustomContainer size="medium">
      <CheckoutBody />
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
