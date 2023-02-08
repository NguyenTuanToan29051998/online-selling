import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import HomeBody from '../../components/templates/HomeBody';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import { homeApiManagement } from '../../api-clients/home';
import { ProductOverviewType } from '@/models/product';
import { CartApiManagement } from '../../api-clients/cart';

const Home: NextPageWithLayout = () => {

  const [productList, setProductList] = useState<ProductOverviewType[]>([]);
  const [topBuyList, setTopBuyList] = useState<ProductOverviewType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    homeApiManagement.getAllProduct(userInfo.id && userInfo.id || '').then((res) => {
      setProductList(res.data.allProducts.content);
      setTopBuyList(res.data.topBuy);
      setPageCount(res.data.allProducts.totalElements);
    }).catch(err => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    CartApiManagement.getCartDetail(userInfo.id).then((res) => {
      localStorage.setItem('total-cart', res.data.cartDetail.cartItems.length || '');
    }).catch(err => console.log(err));
  }, []);

  return (
    <HomeBody
      productList={productList}
      setProductList={setProductList}
      topBuyList={topBuyList}
      setTopBuyList={setTopBuyList}
      pageCount={pageCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Home;
