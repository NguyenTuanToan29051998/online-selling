import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CustomContainer from '../../components/molecules/CustomContainer';
import { useRouter } from 'next/router';
import OrderBody from '../../components/templates/OrderBody';
import BreadCrumb from '../../components/molecules/BreadCrumb';

const Order: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <div className="ps-5"><BreadCrumb firstLayer="Trang chủ" lastLayer={"Đơn hàng của tôi"} /></div>
      <OrderBody />
    </>
  );
};

Order.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Order;