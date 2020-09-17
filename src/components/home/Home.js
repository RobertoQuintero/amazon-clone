import React from "react";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="amazon-image"
        />
        <div className="home__center">
          <div className="home__row flex2">
            <Product
              id="123123123"
              title="El código Da Vinci (Español) Tapa blanda – Edición especial, 1 diciembre 2004"
              price={233}
              image="https://images-na.ssl-images-amazon.com/images/I/51Xf-93eBPL._SX394_BO1,204,203,200_.jpg"
              rating={5}
            />

            <Product
              id="123120123"
              title="Sé lo que estás pensando (Español) Pasta blanda – 1 agosto 2019"
              price={219}
              image="https://images-na.ssl-images-amazon.com/images/I/41e64EQBZzL._SX327_BO1,204,203,200_.jpg"
              rating={4}
            />
          </div>
          <div className="home__row flex3">
            <Product
              id="123120189"
              title="¿Cómo pensar como Sherlock Holmes? (Español) Pasta blanda – 1 enero 2014"
              price={299}
              image="https://images-na.ssl-images-amazon.com/images/I/51mEcJ9qvjL._SX324_BO1,204,203,200_.jpg"
              rating={3}
            />
            <Product
              id="723120189"
              title="Arte de la seducción, El (Tercera edición) (Español) Pasta blanda – 25 abril 2019"
              price={475}
              image="https://images-na.ssl-images-amazon.com/images/I/51pDeh4pFXL._SX368_BO1,204,203,200_.jpg"
              rating={5}
            />
            <Product
              id="723145189"
              title="Las 48 leyes del poder (Español) Pasta blanda – 1 octubre 2018"
              price={598.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51ZDVQLSOEL._SX368_BO1,204,203,200_.jpg"
              rating={4}
            />
          </div>
          <div className="home__row flex2">
            <Product
              id="72314518990"
              title="El hombre en busca de sentido (Español) Pasta blanda – 31 julio"
              price={213.75}
              image="https://images-na.ssl-images-amazon.com/images/I/41bhWfwOBvL._SX327_BO1,204,203,200_.jpg"
              rating={4}
            />
            <Product
              id="72314518990"
              title="El instinto de creer: La psicología de la fe, el destino y el significado de la vida (Transiciones) (Español) Tapa blanda – 9 febrero 2012"
              price={1094.98}
              image="https://images-na.ssl-images-amazon.com/images/I/41GN8iS1xzL._SX331_BO1,204,203,200_.jpg"
              rating={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
