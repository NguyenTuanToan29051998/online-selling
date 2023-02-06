import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import CustomLoading from '../../components/molecules/CustomLoading';
import ProductDetailBody from '../../components/templates/ProductDetailBody';
import { ProductDetailType, ProductOverviewType } from '@/models/product';
import { ProductDetailApiManagement } from '../../api-clients/product-detail';
import { useRouter } from 'next/router';

const ProductDetail: NextPageWithLayout = () => {

  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductDetailType | null>(null);

  useEffect(() => {
    if (!id) return;
    ProductDetailApiManagement.getProduct(+(id as string)).then((res) => {
      setProduct(res.data);
    }).catch(err => console.log(err));
  }, [id]);

  return (
    <>
      {product && (
        <ProductDetailBody product={product} />
      )}
    </>
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