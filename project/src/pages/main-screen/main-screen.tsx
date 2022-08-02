import CitiesCardList from '../../components/cities-card-list/cities-card-list';
import Logo from '../../components/logo/logo';
import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import { AppRoute, CITY_NAMES } from '../../const';
import Map from '../../components/map/map';
import { useState } from 'react';
import {useAppSelector} from '../../hooks';
import CityButton from '../../components/city-button/city-button';
import { changeCity } from '../../store/action';
import {useAppDispatch} from '../../hooks';

function MainScreen(): JSX.Element {
  const stateCity = useAppSelector((state) => state.city); // берем заданный город из стейта
  const offers = useAppSelector((state) => state.offers); // берем объекты из глобального стейта
  const filteredOffers = offers.filter((offer) => offer.city.name === stateCity); // фильтруем предложения по заданному городу
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const dispatch = useAppDispatch();

  const handleOfferHover = (hoveredOffer: Offer | null) => {
    const currentOffer = filteredOffers.find((offer) => offer.id === hoveredOffer?.id);
    setSelectedOffer(currentOffer);
  };

  const handleChangeCity = (city: string) => {
    dispatch(changeCity({city}));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={`${AppRoute.Favorites}`} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITY_NAMES.map((city) => (
                <CityButton
                  city={city} key={city} isActive={city === stateCity}
                  onChangeCity={handleChangeCity}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {stateCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by&nbsp;</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CitiesCardList offers={filteredOffers} onOfferHover={handleOfferHover} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={filteredOffers} selectedOffer={selectedOffer} />
              </section>;
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
