import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

//@ts-ignore
import amongUsImage from '../../../dist/Among_Us.jpg';
//@ts-ignore
import cyberpunkImage from '../../../dist/Cyberpunk_2077.jpg';
//@ts-ignore
import valorantImage from '../../../dist/VALORANT.jpg';
//@ts-ignore
import csgoImage from '../../../dist/Counter-Strike_Global_Offensive.jpg';
//@ts-ignore
import leagueOfLegendsImage from '../../../dist/League_Of_Legends.jpg';
//@ts-ignore
import fortniteImage from '../../../dist/Fortnite.jpg';

const Categories: React.FC = () => {
  return (
    <div className="container categories">
      <h2>Popular categories</h2>
      <div className="row">
        <div className="col-lg-1 col-bg-2 col-md-3 col-us-6">
          <Link to="/category/Fortnite">
            <div className="categories__card">
              <img src={fortniteImage} className="categories__img" />
              <p className="categories__name">Fortnite</p>
            </div>
          </Link>
        </div>
        <div className="col-lg-1 col-bg-2 col-md-3 col-us-6">
          <Link to="/category/Cyberpunk 2077">
            <div className="categories__card">
              <img src={cyberpunkImage} className="categories__img" />
              <p className="categories__name">Cyberpunk 2077</p>
            </div>
          </Link>
        </div>
        <div className="col-lg-1 col-bg-2 col-md-3 col-us-6">
          <Link to="/category/Among Us">
            <div className="categories__card">
              <img src={amongUsImage} className="categories__img" />
              <p className="categories__name">Among Us</p>
            </div>
          </Link>
        </div>
        <div className="col-lg-1 col-bg-2 col-md-3 col-us-6">
          <Link to="/category/League of Legends">
            <div className="categories__card">
              <img src={leagueOfLegendsImage} className="categories__img" />
              <p className="categories__name">League of Legends</p>
            </div>
          </Link>
        </div>
        <div className="col-lg-1 col-bg-2 col-md-3 col-us-6">
          <Link to="/category/VALORANT">
            <div className="categories__card">
              <img src={valorantImage} className="categories__img" />
              <p className="categories__name">VALORANT</p>
            </div>
          </Link>
        </div>
        <div className="col-lg-1 col-bg-2 col-md-3 col-us-6">
          <Link to="/category/Counter-Strike: Global Offensive">
            <div className="categories__card">
              <img src={csgoImage} className="categories__img" />
              <p className="categories__name">Counter-Strike: Global Offensive</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
