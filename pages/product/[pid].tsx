import { GetServerSideProps } from 'next';

import { useState } from 'react';
import Breadcrumb from '../../components/breadcrumb';
import Content from '../../components/product-single/content';
import Gallery from '../../components/product-single/gallery';
import ProductsFeatured from '../../components/products-featured';
import Layout from '../../layouts/Main';
import { server } from '../../utils/server';

// types
import { ProductType } from 'types';

type ProductPageType = {
  product: ProductType;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  }
}

const Product = ({ product }: ProductPageType) => {

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
    </Layout>
  );
}

export default Product
