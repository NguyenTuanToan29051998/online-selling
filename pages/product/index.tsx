import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import ProductBody from '../../components/templates/ProductBody';
import CustomContainer from '../../components/molecules/CustomContainer';
import BreadCrumb from '../../components/molecules/BreadCrumb';
import { useRouter } from 'next/router';

const Product: NextPageWithLayout = () => {
  const router = useRouter();
  const { searchInput } = router.query;

  return (
    <CustomContainer size="medium">
      <BreadCrumb firstLayer="Trang chủ" lastLayer={searchInput ? searchInput as string : "Sản phẩm"} />
      <ProductBody />
    </CustomContainer>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Product;