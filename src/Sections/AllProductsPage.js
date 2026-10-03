import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../Styles/Products.css';
import '../Styles/ProductComponent.css';
import productsData from '../Components/productsData.json';
import ProductComponent from '../Components/ProductComponent';
import { formatPrice } from '../Components/formatPrice';
import { OCCASIONS } from './Occasions';
import '../Styles/AllProductsPage.css';

const AllProductsPage = ({ onLike, likedProducts = [], onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const activeOccasion = OCCASIONS.find((occasion) => occasion.slug === searchParams.get('occasion'));
  const visibleProducts = activeOccasion
    ? productsData.filter((product) => product.occasions?.includes(activeOccasion.slug))
    : productsData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLike = (product) => {
    onLike(product);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleShare = async (product) => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareText = `Buy ${product.name} for your loved ones for just ${formatPrice(product.price)} — only at Floralia!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } catch (error) {
        console.error('Error sharing product:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${productUrl}`);
        alert('Product link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Could not copy product link.');
      }
    }
  };

  return (
    <div className="products-page">
      <section className="products-hero" aria-labelledby="shop-title">
        <div className="container">
          <p className="eyebrow">Shop</p>
          <h1 id="shop-title" className="heading">
            {activeOccasion ? <>{activeOccasion.label} <span>Flowers</span></> : <>Our <span>Flowers</span></>}
          </h1>
          <p className="products-intro">Hand-tied arrangements for every occasion, packed with care and delivered fresh.</p>
        </div>
      </section>

      <section className="products-container">
        <div className="container">
          <div className="shop-toolbar">
            <nav className="occasion-tabs" aria-label="Filter by occasion">
              <Link
                to="/products"
                className={!activeOccasion ? 'active' : ''}
                aria-current={!activeOccasion ? 'page' : undefined}
              >
                All
              </Link>
              {OCCASIONS.map((occasion) => {
                const active = activeOccasion?.slug === occasion.slug;
                return (
                  <Link
                    key={occasion.slug}
                    to={`/products?occasion=${occasion.slug}`}
                    className={active ? 'active' : ''}
                    aria-current={active ? 'page' : undefined}
                  >
                    {occasion.label}
                  </Link>
                );
              })}
            </nav>
            <p className="shop-count">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'arrangement' : 'arrangements'}
            </p>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductComponent
                key={product.id}
                product={product}
                liked={likedProducts.some((item) => item.name === product.name)}
                onLike={handleLike}
                onAddToCart={handleAddToCart}
                onShare={handleShare}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProductsPage;
