/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/ProductBody.module.scss';
import { favoriteGrayIcon, favoriteIcon, favoriteRedIcon, starIcon } from '../../public/icons';
import PaginationSection from '../organisms/PaginationSection';
import { CategoryType, ProductOverviewType } from '@/models/product';
import { homeApiManagement } from '../../api-clients/home';
import { FavoriteApiManagement } from '../../api-clients/favorite';
import useFormat from '../../hooks/useFormat';
import { searchManagementAPI } from '../../api-clients/search';
import { SearchType } from '@/models/search';

type PriceToSearchType = {
  min: number,
  max: number
}

type PropTypes = {

};

const ProductBody: FC<PropTypes> = () => {
  const { formatNumberWithDot } = useFormat();
  const router = useRouter();
  const { searchInput } = router.query;
  const searchText = ''.toString().concat('`', searchInput as string, '`');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [numberSelected, setNumberSelected] = useState<number>(0);
  const [productList, setProductList] = useState<ProductOverviewType[]>([]);
  const [searchInfo, setSearchInfo] = useState<SearchType>({
    cateName: '',
    material: '',
    color: '',
    size: '',
    min: 0,
    max: 0,
    minToMax: '',
    order: '',
    rating: '',
  });
  const [categoryList, setCategotyList] = useState<CategoryType[]>([]);
  const [colorList, setColorList] = useState<string[]>([]);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [priceToSearch, setPriceToSearch] = useState<PriceToSearchType>({
    min: 0,
    max: 0,
  });

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  }

  const handleAddToFavorite = (e: MouseEvent<HTMLDivElement>, proId: number) => {
    e.stopPropagation();
    FavoriteApiManagement.addProductToFavorite(userInfo.id, proId).then(res => {
      homeApiManagement.getAllProduct(userInfo.id && userInfo.id || '').then((res) => {
        setProductList(res.data.proPage.content);
      }).catch(err => console.log(err));
    }).catch(err => console.log());
  };

  const handleFilter = (name:  'cateName' | 'color' | 'rating', item: string) => {
    setIsFilter(true);
    setSearchInfo({...searchInfo, [name]: searchInfo[name] === item ? '' : item});
  };

  const handleCloseFilter = () => {
    setSearchInfo({
      cateName: '',
      material: '',
      color: '',
      size: '',
      min: 0,
      max: 0,
      minToMax: '',
      order: '',
      rating: '',
    });
    setPriceToSearch({
      min: 0,
      max: 0,
    });
  };

  const handleSearchByPrice = () => {
    setIsFilter(true);
    setSearchInfo({
      ...searchInfo,
      min: priceToSearch.min,
      max: priceToSearch.max,
      minToMax: priceToSearch.max ? (priceToSearch.min ? `Từ ${priceToSearch.min}đ đến ${priceToSearch.max}đ` : `Từ 0đ đến ${priceToSearch.max}đ`) : `Từ 0đ đến ${priceToSearch.min}đ`
    });
  };

  useEffect(() => {
    if (!searchInput) {
      homeApiManagement.getAllProduct('1').then((res) => {
        setProductList(res.data.proPage.content);
        setCategotyList(res.data.categories);
        setColorList(res.data.color);
      }).catch(err => console.log(err));
    } else {
      searchManagementAPI.getDataSearch(searchInput as string).then((res) => {
        setProductList(res.data.proPage.content);
        setCategotyList(res.data.categories);
        setColorList(res.data.color);
      }).catch(err => console.log(err));
    }
  }, [searchInput]);

  useEffect(() => {
    if (!isFilter) return;
    searchManagementAPI.getDataFilter(searchInfo.cateName, searchInfo.rating, searchInfo.color, searchInfo.size, searchInfo.min, searchInfo.max).then((res) => {
      setProductList(res.data.proPage.content);
    }).catch(err => console.log(err));
  }, [searchInfo]);

  return (
    <div className={styles.productBody}>
      <div className={styles.content}>
        <div className={styles.leftArea}>
          {/* <div className={styles.blockFilter}>
            <h4 className={styles.title}>Danh Mục Sản Phẩm</h4>
            <div className={styles.listCollapsed}>
              <span className={styles.searchFilterItem}>Tẩy trang</span>
              <span className={styles.searchFilterItem}>Đầm Dáng Xòe</span>
              <span className={styles.searchFilterItem}>Sofa/ salon và phụ kiện</span>
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Địa chỉ nhận hàng</h4>
            <div className={styles.listCollapsed}>
              <span className={styles.searchFilterItem}>Tẩy trang</span>
              <span className={styles.searchFilterItem}>Đầm Dáng Xòe</span>
              <span className={styles.searchFilterItem}>Sofa/ salon và phụ kiện</span>
            </div>
          </div> */}
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Thương hiệu</h4>
            <div className={styles.listCollapsed}>
              {categoryList.map((item, index) => {
                return (
                  <div className={styles.searchFilterItem} key={index}>
                    <div className="d-flex gap-2">
                      <input type="checkbox" className={styles.checkbox} onClick={() => handleFilter('cateName', item.name)} checked={item.name === searchInfo.cateName} />
                      <span>{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Màu sắc</h4>
            <div className={styles.listCollapsed}>
              {colorList.map((item, index) => {
                return (
                  <div className={styles.searchFilterItem} key={index}>
                    <div className="d-flex gap-2">
                      <input type="checkbox" name="color" className={styles.checkbox} onClick={() => handleFilter('color', item)} checked={item === searchInfo.color} />
                      <span>{item}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Đánh giá</h4>
            <div className={styles.listCollapsed}>
              <div className={styles.searchFilterItem} onClick={() => handleFilter('rating', '5')} role="presentation">
                <div className="d-flex gap-1">
                  <div className="d-flex">
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                  </div>
                  <span>Từ 5 sao</span>
                </div>
              </div>
              <div className={styles.searchFilterItem} onClick={() => handleFilter('rating', '4')} role="presentation">
                <div className="d-flex gap-1">
                  <div className="d-flex">
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#c7c7c7')}
                  </div>
                  <span>Từ 4 sao</span>
                </div>
              </div>
              <div className={styles.searchFilterItem} onClick={() => handleFilter('rating', '3')} role="presentation">
                <div className="d-flex gap-1">
                  <div className="d-flex">
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#c7c7c7')}
                    {starIcon('14', '#c7c7c7')}
                  </div>
                  <span>Từ 3 sao</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Giá</h4>
            <div className={styles.listCollapsed}>
              <div
                className={styles.filterPrice}
                onClick={() => setSearchInfo({...searchInfo, min: 0, max: 70000, minToMax: 'Từ 0đ đến 70.000đ'})}
                role="presentation"
              >
                Dưới 70.000
              </div>
              <div
                className={styles.filterPrice}
                onClick={() => setSearchInfo({...searchInfo, min: 170000, max: 240000, minToMax: 'Từ 170.000đ đến 240.000đ'})}
                role="presentation"
              >170.000 {`->`} 240.000</div>
              <div
                className={styles.filterPrice}
                onClick={() => setSearchInfo({...searchInfo, min: 240000, max: 999000000, minToMax: 'Trên 240.000đ'})}
                role="presentation"
              >Trên 240.000</div>
              <div className={styles.priceSmallText}>Chọn khoảng giá</div>
              <div className={styles.inputGroup}>
                <input pattern="[0-9]*" placeholder="Giá từ" value={priceToSearch.min} onChange={(e) => setPriceToSearch({...priceToSearch, min: Number(e.currentTarget.value)})} />
                <span>-</span>
                <input pattern="[0-9]*" placeholder="Giá đến" value={priceToSearch.max} onChange={(e) => setPriceToSearch({...priceToSearch, max: Number(e.currentTarget.value)})} />
              </div>
              <button className={styles.submitButton} onClick={() => handleSearchByPrice()}>Áp dụng</button>
            </div>
          </div>
        </div>

        <div className={styles.rightArea}>
          <div className={styles.summarySearch}>
            <div className={styles.inputSearch}>{searchInput ? `Kết quả tìm kiếm cho ${searchText}` : "Tất cả sản phẩm"}</div>
            <div className={styles.sorter}>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 0 ? `${styles.isSelected}` : ""}`}
                  onClick={() => setNumberSelected(0)}
                  role="presentation"
                >
                  Phổ biến
                </div>
                {numberSelected === 0 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 1 ? `${styles.isSelected}` : ""}`}
                  onClick={() => setNumberSelected(1)}
                  role="presentation"
                >
                  Bán Chạy
                </div>
                {numberSelected === 1 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 2 ? `${styles.isSelected}` : ""}`}
                  onClick={() => setNumberSelected(2)}
                  role="presentation"
                >
                  Giá Thấp Đến Cao
                </div>
                {numberSelected === 2 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 3 ? `${styles.isSelected}` : ""}`}
                  onClick={() => setNumberSelected(3)}
                  role="presentation"
                >
                  Giá Cao Đến Thấp
                </div>
                {numberSelected === 3 && <div className={styles.underlined} />}
              </div>
            </div>
            <div className={styles.filterItems}>
              {Object.entries(searchInfo).map(item => {
                return (
                  (!!item[1] && item[0] !== 'min' && item[0] !== 'max' && (
                    <p className={styles.item} key={Math.random()}>
                      {item[0] === 'rating' && `Từ ${item[1]} sao` || item[1]}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://salt.tikicdn.com/ts/brickv2og/1c/00/94/6392bb4ffb13ead8d973bb2ee36b7bc4.png"
                        alt="Xóa"
                        onClick={() => setSearchInfo({...searchInfo, [item[0]] :  typeof(item[1]) === 'string' ? '' : 0})}
                        role="presentation"
                      />
                    </p>
                  ))
                  );
              })}

              {Object.entries(searchInfo).some(item => !!item[1]) && <p className={`${styles.item} ${styles.default}`} onClick={() => handleCloseFilter()} role="presentation">Xóa tất cả</p>}
            </div>
          </div>
          {!productList.length ? (
            <div className="m-4">Chưa có sản phẩm phù hợp</div>
          ) : (
            <div className={styles.productList}>
              {(productList || []).map((item, index) => (
                <div className={styles.productItem} onClick={() => router.push(`/product/${item.product.id}`)} role="presentation" key={index}>
                  <div className="position-relative">
                    <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                    <div className={styles.thumbnail} style={{ backgroundImage: `url("/assets/${item.product.image}")` }} />
                    <div className={styles.addToFavorites} onClick={(e) => handleAddToFavorite(e, item.product.id)} role="presentation">{item.like ? favoriteRedIcon : favoriteGrayIcon}</div>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      <h3>{item.product.name}</h3>
                    </div>
                    {!!item.boughtQuantity ? (
                      <div className="d-flex gap-2">
                        <div className={styles.fullRating}>
                          <span className={styles.point}>{item.rating}</span>
                          <div className="d-flex">{starIcon('14', '#fdd836')}</div>
                        </div>
                        <div className={styles.bisectingLine} />
                        <span className={styles.quantity}>Đã bán {item.boughtQuantity}</span>
                      </div>
                    ) : (
                      <div className={styles.emptyRating} />
                    )}
                    <div className={`${styles.priceDiscount} ${styles.hasDiscount}`}>
                      <div className="price-discount__price">{!item.decreasePercent ? formatNumberWithDot(item.newPrice) : formatNumberWithDot(item.product.price)} đ</div>
                      {!!item.decreasePercent && (
                        <div className="price-discount__discount">-51%</div>
                      )}
                    </div>
                    {/* <div className={styles.badgeUnderPrice}>Tặng tới 1000 ASA (224k ₫) <br />≈ 1.0% hoàn tiền</div> */}
                    <div className={styles.badgeUnderRating}>
                      <div className={styles.item}>
                        <span>Freeship+</span>
                      </div>
                      {/* <div className={styles.item}>
                    <span>Trả góp</span>
                  </div> */}
                    </div>
                  </div>
                  {/* <div className={styles.badgeDelivery}>
                <span>Giao thứ 3, ngày 03/01</span>
              </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-5">
        <PaginationSection currentPage={currentPage} pageCount={pageCount} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProductBody;
