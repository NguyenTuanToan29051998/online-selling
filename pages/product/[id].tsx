import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import CustomLoading from '../../components/molecules/CustomLoading';
import ProductDetailBody from '../../components/templates/ProductDetailBody';

const ProductDetail: NextPageWithLayout = () => {

  return (
    <ProductDetailBody />
  );
};

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default ProductDetail;