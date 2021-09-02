import React from 'react';
import './Home.css';
import Product from './Product.js';

function Home() {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt=''
        />
        <div className='home__row'>
          <Product
            title='The Gulag Archipelago'
            price={17.99}
            image='https://www.penguin.co.uk/content/dam/prh/books/104/1049544/9781784871512.jpg'
            rating={5}
          />
          <Product
            title='Fitbit Charge 4 - black - activity tracker'
            price={98.99}
            image='https://m.media-amazon.com/images/I/71smqRr0pmL._AC_SX425_.jpg'
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product
            title="Crocs Men's and Women's Baya Clog"
            price={22.99}
            image='https://m.media-amazon.com/images/I/31vF1tKdC+L._SR120,120_.jpg'
            rating={3}
          />
          <Product
            title='Clean Code: A Handbook of Agile Software Craftsmanship'
            price={41.51}
            image='https://m.media-amazon.com/images/I/81jRujEs6uL._AC_UY218_.jpg'
            rating={4}
          />
          <Product
            title='Hydro Flask Standard Mouth Flex Lid Water Bottle - Stainless Steel, Reusable, Vacuum Insulated'
            price={32.99}
            image='https://images-na.ssl-images-amazon.com/images/I/51JWdfCASRS.__AC_SX300_SY300_QL70_FMwebp_.jpg'
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product
            title='MOON LENCE Camping Tent 2/4/6 Person Family Tent Double Layer Outdoor Tent Waterproof Windproof Anti-UV'
            price={70.79}
            image='https://m.media-amazon.com/images/I/61nPipPXGbL._AC_UY218_.jpg'
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
