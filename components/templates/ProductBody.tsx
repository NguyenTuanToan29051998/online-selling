/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/ProductBody.module.scss';
import { starIcon } from '../../public/icons';
import PaginationSection from '../organisms/PaginationSection';

type PropTypes = {

};

const ProductBody: FC<PropTypes> = () => {
  const router = useRouter();
  const { searchInput } = router.query;
  const searchText = ''.toString().concat('`', searchInput as string, '`');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);

  useEffect(() => {
    console.log('xxxxxxxxxx');
  }, []);

  return (
    <div className={styles.productBody}>
      <div className={styles.content}>
        <div className={styles.leftArea}>
          <div className={styles.blockFilter}>
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
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Đánh giá</h4>
            <div className={styles.listCollapsed}>
              <div className={styles.searchFilterItem}>
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
              <div className={styles.searchFilterItem}>
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
              <div className={styles.searchFilterItem}>
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
              <div className={styles.filterPrice}>Dưới 70.000</div>
              <div className={styles.filterPrice}>170.000 {`->`} 240.000</div>
              <div className={styles.filterPrice}>Trên 240.000</div>
              <div className={styles.priceSmallText}>Chọn khoảng giá</div>
              <div className={styles.inputGroup}>
                <input pattern="[0-9]*" placeholder="Giá từ" value="0" />
                  <span>-</span>
                <input pattern="[0-9]*" placeholder="Giá đến" value="0" />
              </div>
              <button className={styles.submitButton}>Áp dụng</button>
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Thương hiệu</h4>
            <div className={styles.listCollapsed}>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-2">
                  <input type="checkbox" name="" id="" className={styles.checkbox} />
                  <span>Senka</span>
                </div>
              </div>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-2">
                  <input type="checkbox" name="" id="" className={styles.checkbox} />
                  <span>DHC</span>
                </div>
              </div>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-2">
                  <input type="checkbox" name="" id="" className={styles.checkbox} />
                  <span>DHC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightArea}>
          <div className={styles.summarySearch}>
            <div className={styles.inputSearch}>{searchInput ? `Kết quả tìm kiếm cho ${searchText}`: "Tất cả sản phẩm"}</div>
            <div className={styles.sorter}>
              <div>
                <div className={`${styles.sorterItem} ${styles.isSelected}`}>Phổ biến</div>
                <div className={styles.underlined}></div>
              </div>
              <div>
                <div className={styles.sorterItem}>Bán chạy</div>
                {/* <div className={styles.underlined}></div> */}
              </div>
              <div>
                <div className={styles.sorterItem}>Giá thấp đến cao</div>
                {/* <div className={styles.underlined}></div> */}
              </div>
              <div>
                <div className={styles.sorterItem}>Giá cao đến thấp</div>
                {/* <div className={styles.underlined}></div> */}
              </div>
            </div>
          </div>

          <div className={styles.productList}>
            {[...Array(24)].map(item => (
              <>
                <div className={styles.productItem} onClick={() => router.push('/product/1')} role="presentation">
                  <div>
                    <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                    <div className={styles.thumbnail} style={{ backgroundImage: `url("/assets/product-1.jpg")` }} />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      <h3>Áo Khoác Gió Thể Thao Nam 5S INSPIRATION (4 Màu), Công Nghệ Cao Cấp, Chống Thấm, Cản Bụi, Cản Gió Cực Ấm (AKG22001)</h3>
                    </div>
                    <div className="d-flex gap-2">
                      <div className={styles.fullRating}>
                        <span className={styles.point}>4.2</span>
                        <div className="d-flex">{starIcon('14', '#fdd836')}</div>
                      </div>
                      <div className={styles.bisectingLine} />
                      <span className={styles.quantity}>Đã bán 20</span>
                    </div>
                    <div className={`${styles.priceDiscount} ${styles.hasDiscount}`}>
                      <div className="price-discount__price">439.000 ₫</div>
                      <div className="price-discount__discount">-51%</div>
                    </div>
                    <div className={styles.badgeUnderPrice}>Tặng tới 1000 ASA (224k ₫) <br />≈ 1.0% hoàn tiền</div>
                    <div className={styles.badgeUnderRating}>
                      <div className={styles.item}>
                        <span>Freeship+</span>
                      </div>
                      <div className={styles.item}>
                        <span>Trả góp</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.badgeDelivery}>
                    <span>Giao thứ 3, ngày 03/01</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <PaginationSection currentPage={currentPage} pageCount={pageCount} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProductBody;
