import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/ProductDetailBody.module.scss';
import Image from 'next/image';
import { addIcon, angleRightIcon, checkGreenIcon, indicatorIcon, removeIcon, starIcon } from '../../public/icons';
import PaginationSection from '../organisms/PaginationSection';
import { ProductDetailType } from '@/models/product';
import { ProductDetailApiManagement } from '../../api-clients/product-detail';
import { CartApiManagement } from '../../api-clients/cart';
import useFormat from '../../hooks/useFormat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NUMBER_REG } from '../../public/const';

type PropTypes = {
  product: ProductDetailType;
};

const ProductDetailBody: FC<PropTypes> = (props) => {
  const { product } = props;
  const router = useRouter();
  const {formatNumberWithDot} = useFormat();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].color);
  const [isSelectedColor, setIsSelectedColor] = useState<boolean>(true);
  const [isSelectedSize, setIsSelectedSize] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.colors[0].relatedSizes[0].size);
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [selectedImage, setSelectedimage] = useState<string>(product.colors[0].image);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleAddToCart = () => {
    if (!userInfo.id) {
      return router.push('/');
    }
    if (!availableQuantity) return;
    CartApiManagement.addProductToCart(userInfo.id, selectedColor, selectedSize, product.product.product.id, quantityProduct).then(res => {
    }).catch(err => console.log(err));
    router.push('/product/1?isShowNoti=true');
  };
  const handleSelectedSize = (size: string) => {
    setSelectedSize(size);
    setIsSelectedColor(false);
    setIsSelectedSize(true);
  };

  const handleTotalProduct = (totalProduct: string) => {
    if (!NUMBER_REG.test(totalProduct)) return;
    if (+totalProduct > availableQuantity) {
      toast.error("số lượng vượt quá số sản phẩm còn lại!");
      return;
    }
    setQuantityProduct(+totalProduct);
  };

  useEffect(() => {
    router.push(`/product/${router.query.id}?isShowNoti=false`);
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    ProductDetailApiManagement.getNumberProduct(userInfo.id, selectedColor, selectedSize).then(res => {
      setAvailableQuantity(res.data);
    }).catch(err => console.log(err));
  }, [selectedColor, selectedSize]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.productDetail}>
        <div className={styles.leftArea}>
          <div className={styles.groupImage}>
            <div className="d-flex">
              <Image
                src={`/assets/${selectedImage}`}
                width={444}
                height={650}
                alt="product-detail"
              />
            </div>
          </div>
          <div className={styles.reviewImages}>
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`${styles.item} ${item.image === selectedImage && styles.selectedItem}`}
                style={{ backgroundImage: `url("/assets/${item.image}")` }}
                onClick={() => setSelectedimage(item.image)}
                role="presentation"
              />
            ))}
          </div>
        </div>
        <div className={styles.separate} />
        <div className={styles.rightArea}>
          <div className={styles.header}>
            <div className={styles.brand}>
              <h6>Thương hiệu: <span>5S</span></h6>
            </div>
            <h1 className={styles.title}>Áo Khoác Gió Thể Thao Nam 5S INSPIRATION (4 Màu), Công Nghệ Cao Cấp, Chống Thấm, Cản Bụi, Cản Gió Cực Ấm (AKG22001)</h1>
            <div className="d-flex gap-2 align-items-center">
              <div className="d-flex">
                {starIcon('18', '#fdd836')}
                {starIcon('18', '#fdd836')}
                {starIcon('18', '#fdd836')}
                {starIcon('18', '#fdd836')}
                {starIcon('18', '#c7c7c7')}
              </div>
              <div className={styles.viewReview}>(Xem 6 đánh giá)</div>
              <div className={styles.bisectingLine} />
              <div className={styles.quantitySold}>Đã bán 20</div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.left}>
              <div className={`${styles.productPrice} ${styles.hasDiscount}`}>
                <div className={styles.currentPrice}>{formatNumberWithDot(product.product.newPrice)} ₫</div>
                <div className={styles.cost}>{formatNumberWithDot(product.product.product.price)} ₫</div>
                <div className={styles.discountRate}>-51%</div>
              </div>
              <div className={styles.category}>
                <div className={styles.tableSize}>
                  Bảng kích thước
                  <div>{angleRightIcon}</div>
                </div>
                <div className={styles.productColor}>
                  <span className={styles.title}>Màu sắc: </span>
                  <span className={styles.name}>AKG22001CHI</span>
                  <div className={styles.optionColor}>
                    {(isSelectedSize ? product.sizes.filter(x => x.size === selectedSize)[0].relatedColors : product.colors || []).map((item, index) => {
                      return (
                        <div key={index} className="position-relative">
                          <div
                            className={`${styles.selectItem} ${selectedColor === item.color && styles.isSelected}`}
                            onClick={() => setSelectedColor(item.color)}
                            role="presentation"
                          >
                            <div className="d-flex">
                              <Image
                                src={`/assets/${item.image}`}
                                width={45}
                                height={50}
                                alt="product-detail"
                              />
                              {/* <div className={styles.item} style={{ backgroundImage: `url("/assets/${item.image}"` }} /> */}
                            </div>
                            <div className={styles.optionLabel}>{item.color}</div>
                          </div>
                          {selectedColor === item.color && (
                            <div className={styles.indicator}>{indicatorIcon}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.productColor}>
                  <span className={styles.title}>Kích cỡ: </span>
                  <span className={styles.name}>S</span>
                  <div className={styles.optionColor}>
                    {( product.sizes || []).map((item, index) => {
                      return (
                        <div key={index} className="position-relative">
                          <div
                            className={`${styles.selectSizeItem} ${selectedSize === item.size && styles.isSelected}`}
                            key={index}
                            onClick={() => handleSelectedSize(item.size)}
                            role="presentation"
                          >
                            {item.size}
                          </div>
                          {selectedSize === item.size && (
                            <div className={styles.indicator}>{indicatorIcon}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.coupons}>
                  <div className={styles.couponsText}>Hiện có {availableQuantity} sản phẩm</div>
                </div>
                <div className={styles.coupons}>
                  <div className={styles.couponsText}>1 Mã Giảm Giá</div>
                  <div className="d-flex">
                    <div className={styles.couponsTag}>
                      {[...Array(3)].map((item, index) => (
                        <div className={styles.text} key={index}>Giảm 35K</div>
                      ))}
                    </div>
                    <div className="d-flex mt-2">
                      <Image
                        src="/assets/right-icon.png"
                        width={28}
                        height={28}
                        alt="right-img"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.delivery}>
                  <div className={styles.deliveryHeader}>
                    <span>Giao đến </span>
                    <span className={styles.address}>Q. Hoàn Kiếm, P. Cửa Đông, Hà Nội</span> - <span className={styles.addressChange}>Đổi địa chỉ</span>
                  </div>
                  <div className={styles.shippingInfo}>
                    <div className={styles.shippingInfoItem}>
                      <div className={styles.shippingInfoItemHeader}>
                        <div className="d-flex">
                          <Image
                            src="/assets/now-logo.png"
                            width={32}
                            height={14}
                            alt="now-logo"
                          />
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.shippingInfoItemHeaderHighlight}>Trước 14:00 hôm nay</div>
                      </div>
                      <div className={styles.shippingInfoItemFee}>25.000đ (Freeship cho đh 499K)</div>
                    </div>
                    <div className={styles.shippingInfoItem}>
                      <div className={styles.shippingInfoItemHeader}>
                        <div className="d-flex">
                          <Image
                            src="/assets/fast-logo.png"
                            width={32}
                            height={14}
                            alt="now-logo"
                          />
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.shippingInfoItemHeaderHighlight}>Trước 14:00 hôm nay</div>
                      </div>
                      <div className={styles.shippingInfoItemFee}>Vận chuyển: 4.000đ</div>
                    </div>
                  </div>
                </div>
                <div className={styles.addToCart}>
                  <div>
                    <p className={styles.label}>Số Lượng</p>
                    <div className={styles.groupnput}>
                      <div
                        className={`${styles.removeCart} ${styles.disable}`}
                        onClick={() => setQuantityProduct(quantityProduct === 1 ? quantityProduct : quantityProduct - 1)}
                        role="presentation"
                      >{removeIcon}</div>
                      <input type="text" value={quantityProduct} className={styles.inputCart} onChange={(e) => handleTotalProduct(e.target.value)} />
                      <div
                        className={`${styles.addCart} ${styles.disable}`}
                        onClick={() => setQuantityProduct(quantityProduct === availableQuantity ? quantityProduct : quantityProduct + 1)}
                        role="presentation"
                      >{addIcon}</div>
                    </div>
                  </div>
                  <div className={`${availableQuantity === 0 ?  styles.disableAddToCart : styles.btnAddToCart}` } onClick={() => handleAddToCart()} role="presentation">Chọn mua</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.right}>
                <div className={styles.policy}>
                  <div>Hướng dẫn bảo hành</div>
                  <span>Xem chi tiết</span>
                </div>
                <div className={styles.benefits}>
                  <div className={styles.benefitsItem}>
                    <div className="d-flex">
                      <Image
                        src="/assets/policy-1.png"
                        width={32}
                        height={32}
                        alt="policy"
                      />
                    </div>
                    <span>Hoàn tiền<br /><b>111%</b><br />nếu hàng giả</span>
                  </div>
                  <div className={styles.benefitsItem}>
                    <div className="d-flex">
                      <Image
                        src="/assets/policy-2.png"
                        width={32}
                        height={32}
                        alt="policy"
                      />
                    </div>
                    <span>Mở hộp<br />kiểm tra<br />nhận hàng</span>
                  </div>
                  <div className={styles.benefitsItem}>
                    <div className="d-flex">
                      <Image
                        src="/assets/policy-3.png"
                        width={32}
                        height={32}
                        alt="policy"
                      />
                    </div>
                    <span> Đổi trả trong<br /><b>7 ngày</b><br />nếu sp lỗi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sameProduct}>
        <div className={styles.title}>Sản Phẩm Tương Tự</div>
        <div className={styles.productList}>
          {product.relatedProducts.map((item, index) => (
             <div className={styles.productItem} onClick={() => router.push(`/product/${item.product.id}`)} role="presentation" key={index}>
             <div className="position-relative">
               <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
               <div className={styles.thumbnail} style={{ backgroundImage: `url("/assets/${item.product.image}")` }} />
               {/* <div className={styles.addToFavorites} onClick={(e) => handleAddToFavorite(e, item.product.id)} role="presentation">{item.like ? favoriteRedIcon : favoriteGrayIcon}</div> */}
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
      </div>

      <div className={styles.detailInfoProduct}>
        <div className={styles.leftArea}>
          <div className={styles.infoWrapper}>
            <h2 className={styles.blockTitle}>Thông tin chi tiết</h2>
            <div className={styles.content}>
              <div className="d-flex">
                <div className={styles.source}>Xuất xứ</div>
                <div className={styles.sourceName}>Việt Nam</div>
              </div>
              <div className="d-flex">
                <div className={styles.source}>Xuất xứ thương hiệu</div>
                <div className={`${styles.sourceName} ${styles.bgGray}`}>Việt Nam</div>
              </div>
              <div className="d-flex">
                <div className={styles.source}>Thương hiệu</div>
                <div className={styles.sourceName}>Jinrinteen</div>
              </div>
            </div>
          </div>
          <div className={styles.productDescription}>
            <h2 className={styles.blockTitle}>Mô Tả Sản Phẩm</h2>
            <div className={styles.content}>
              <p>-Áo Khoác Hoodie có 2 loại Dây kéo hoặc Chui để QUÝ KHÁCH lựa chọn</p>
              <p>Chào mừng bạn đến với hệ thống</p>
              <p>HOODIE chuyên thời trang Áo Khoác nhẹ cao cấp: Áo Khoác Dù, Áo Khoác Kaki, Áo Khoác Nỉ, Áo Khoác Da, Áo Khoác Chống Nắ</p>
              <p>Sản phẩm được bao đổi trả hoặc hoàn tiền nếu bị lỗi!!!</p>
              <p>̂  ̉ ̂̉:</p>
              <p>Áo Hoodie Nỉ IN 3D bò sữa với Chất liệu Nỉ Ngoại tốt; mang phong cách thời trang thời thượng các bạn trẻ; đặc biệt không những giúp bạn giữ ấm trong mùa lạnh mà còn có thể chống nắng, chống gió, chống bụi, chống rét, chống tia UV cực tốt, rất tiện lợi nhé!!! (Được sử dụng nhiều trong dịp Lễ hội, Đi chơi, Da ngoại, Dạo phố, Du lị)</p>
              <p>BẢNG SIZE</p>
              <p>Size M: từ 35 - 50kg, Cao 1m55 - 1m68</p>
              <p>Size L: từ 51 - 62kg , Cao 1m60 - 1m70</p>
              <p>Size XL: từ 62 - 72 kg, Cao : 1m65 – 1m75</p>
              <p>(VÌ ÁO FORM RỘNG VÀ DÀI NÊN BẠN LƯU Ý CHỌN ĐÚNG SAI NHƯ TRÊN, ĐỪNG CHỌN CỘNG SIZE KHI MẶC SẼ RỘNG DÀI KHÔNG HỢP Ạ)</p>
              <p>(CHAT NGAY với Shop để Shop tư vấn size cho bạn nhé)</p>
              <p>Màu sắc: Y hình.</p>
              <p>Đường may kỹ, tinh tế, sắc xảo.</p>
              <p>Form chuẩn Unisex Nam Nữ Couple đều mặc được.</p>
              <p>Giao hàng tận nơi. Nhận hàng rồi thanh toán.</p>
              <p>Cam kết: Chất lượng và Mẫu mã Sản phẩm giống với Hình ảnh.</p>
              <p>Trả hàng hoàn tiền trong 72h nếu sản phẩm bị lỗi.</p>
              <p>Sỉ Inbox Shop.</p>
              <p>*** L͟Ư͟U͟ ͟Ý͟:͟</p>
              <p>H͟Ư͟Ớ͟N͟G͟ ͟D͟Ẫ͟N͟ ͟C͟Á͟C͟H͟ ͟Đ͟Ặ͟T͟ ͟H͟À͟N͟G͟:</p>
              <p>- Cách chọn Size: Shop đã phân bảng Size, bảng Màu. Vui lòng chọn Size và Màu phù hợp. Bạn nên Inbox Shop, cung cấp Chiều cao và Cân nặng để shop tư vấn Size cho phù hợp!</p>
              <p>+ Bạn chọn từng Sản phẩm rồi thêm vào Giỏ hàng.</p>
              <p>+ Khi giỏ hàng đã có đầy đủ các sản phẩm cần mua bạn mới tiến hành `Thanh toán`.</p><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....</p>
            </div>
          </div>
        </div>
        <div className={styles.rightArea}>
          <div className="d-flex">
            <Image
              src="/assets/sale-bg-3.png"
              width={300}
              height={540}
              alt="sale-img"
            />
          </div>
        </div>
      </div>

      <div className={styles.customerReivews}>
        <div className={styles.customerReivewsHeading}>Đánh Giá - Nhận Xét Từ Khách Hàng</div>
        <div className={styles.customerReivewsInner}>
          <div className={styles.reviewTop}>
            <div className={styles.rating}>
              <div className={styles.summary}>
                <div className={styles.point}>4.4</div>
                <div>
                  <div className="d-flex">
                    {starIcon('24', '#fdd836')}
                    {starIcon('24', '#fdd836')}
                    {starIcon('24', '#fdd836')}
                    {starIcon('24', '#fdd836')}
                    {starIcon('24', '#c7c7c7')}
                  </div>
                  <div className={styles.reviewTotal}>16 nhận xét</div>
                </div>

              </div>
              <div className={styles.detail}>
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                  </div>
                  <div className={styles.processBar}>
                    <div className={styles.percent} style={{ width: '76%' }} />
                  </div>
                  <div className={styles.ratingNumber}>12</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#c7c7c7')}
                  </div>
                  <div className={styles.processBar}>
                    <div className={styles.percent} style={{ width: '16%' }} />
                  </div>
                  <div className={styles.ratingNumber}>12</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#c7c7c7')}
                    {starIcon('18', '#c7c7c7')}
                  </div>
                  <div className={styles.processBar}>
                    <div className={styles.percent} style={{ width: '16%' }} />
                  </div>
                  <div className={styles.ratingNumber}>12</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#c7c7c7')}
                    {starIcon('18', '#c7c7c7')}
                    {starIcon('18', '#c7c7c7')}
                  </div>
                  <div className={styles.processBar}>
                    <div className={styles.percent} style={{ width: '16%' }} />
                  </div>
                  <div className={styles.ratingNumber}>12</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex">
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#c7c7c7')}
                    {starIcon('18', '#c7c7c7')}
                    {starIcon('18', '#c7c7c7')}
                    {starIcon('18', '#c7c7c7')}
                  </div>
                  <div className={styles.processBar}>
                    <div className={styles.percent} style={{ width: '30%' }} />
                  </div>
                  <div className={styles.ratingNumber}>30</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.reviewImage}>
                <div className={styles.reviewImageHeading}>Tất cả hình ảnh (7)</div>
                <div className={styles.reviewImageInner}>
                  {[...Array(6)].map((item, index) => (
                    <div className={styles.image} key={index} style={{ backgroundImage: `url("/assets/review-1.jpg")` }} />
                  ))}
                </div>
              </div>
              <div className={styles.filterReview}>
                <div className={styles.filterReviewLabel}>Lọc xem theo :</div>
                <div className={styles.filterReviewInner}>
                  <div className={styles.reviewItem}>Mới nhất</div>
                  <div className={`${styles.reviewItem} ${styles.isFillterRivew}`}>Có hình ảnh</div>
                  <div className={styles.reviewItem}>Đã mua hàng</div>
                  <div className={styles.reviewItem}>5 <span className="d-flex ms-1">{starIcon('20', '#c7c7c7')}</span></div>
                  <div className={styles.reviewItem}>4 <span className="d-flex ms-1">{starIcon('20', '#c7c7c7')}</span></div>
                  <div className={styles.reviewItem}>3 <span className="d-flex ms-1">{starIcon('20', '#c7c7c7')}</span></div>
                  <div className={styles.reviewItem}>2 <span className="d-flex ms-1">{starIcon('20', '#c7c7c7')}</span></div>
                  <div className={styles.reviewItem}>1 <span className="d-flex ms-1">{starIcon('20', '#c7c7c7')}</span></div>
                </div>
              </div>
            </div>
          </div>
          {[...Array(6)].map((item, index) => (
            <div className={styles.reviewComment} key={index}>
              <div className={styles.reviewCommentUser}>
                <div className={styles.reviewCommentUserInner}>
                  <div className={styles.avatarWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div style={{ backgroundImage: `/assets/brand-2.jpg` }} className={styles.avatar} />
                    <div className={styles.abbreviations}>YD</div>
                  </div>
                  <div>
                    <div className={styles.name}>yue duy</div>
                    <div className={styles.date}>Đã tham gia 3 năm</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex gap-2 align-items-center">
                  <div className="d-flex">
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#fdd836')}
                    {starIcon('18', '#c7c7c7')}
                  </div>
                  <div className={styles.reviewCommentTitle}>Hài lòng</div>
                </div>
                <div className={styles.sellerNameAttributes}>
                  <div className={styles.sellerName}>
                    <div className={styles.checkIcon} />Đã mua hàng</div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <div className="d-flex">{checkGreenIcon}</div>
                  <div className={styles.ratingAttribute}>Chất liệu vải dày dặn, Giữ ấm tốt, mẫu mã đẹp, Thoáng mát</div>
                </div>
                <div className={styles.createdDate}>
                  <div className={styles.item}>Mầu sắc: AKG22002BED</div>
                  <div className={styles.dots} />
                  <div className={styles.item}>Kích cỡ: 2XL</div>
                </div>
                <div className={styles.createdDate}>
                  <div className={styles.item}>Đánh giá vào 7 ngày trước</div>
                  <div className={styles.dots} />
                  <div className={styles.item}>Đã dùng 1 tháng</div>
                </div>
              </div>
            </div>
          ))}
          <ToastContainer />
          <PaginationSection currentPage={currentPage} pageCount={pageCount} setCurrentPage={setCurrentPage} />
          <div className="pb-5" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailBody;
