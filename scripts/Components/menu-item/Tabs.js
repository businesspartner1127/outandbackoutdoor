import React, { Fragment } from 'react';

import Collections from './Collections';
import Paper from './Paper';
import SellBack from './SellBack';
import { makeStyles } from '@material-ui/core/styles';

function Tabs({ selectedHandler, selected, collections}) {

  const promotionalFilterTitlesMens = [
    'New Arrivals',
    'Like New and Ready for Adventure - HIM',
    'Spring Tights and Joggers',
    'Hiking Gear Under $100',
    '70% off!',
    '60% off!'
  ];
  

  const promotionalFilterTitlesWomens = [
    'New Arrivals',
    'Like New and Ready for Adventure - HER',
    'BACKPACKS BUILT FOR THE LONG HAUL',
    'End of Season Deals - 60% Off Or More!'
  ];

  const promotionalFilterTitlesKids = [
    "Kids' New Arrivals",
    'Happy Campers',
  ];

  const mensFilterTitles = [
    'Hiking',
    'Skiing and Snowboarding',
    'Backpacking',
    'Climbing',
    'Mountaineering',
    'Running',
    'Everyday Wear',
    'Trail Running',
    'Cycling',
    'Cross-Country Skiing',
    'Snowshoeing',
    'Backcountry Skiing',
    'Travel',
    'Camping',
    'Fishing',
  ];

  const womensFilterTitles = [
    'Hiking',
    'Skiing and Snowboarding',
    'Backpacking',
    'Climbing',
    'Mountaineering',
    'Running',
    'Everyday Wear',
    'Trail Running',
    'Cycling',
    'Cross-Country Skiing',
    'Snowshoeing',
    'Backcountry Skiing',
    'Travel',
    'Camping',
    'Fishing',
  ];

  const kidsFilterTitles = [
    'Hiking',
    'Skiing and Snowboarding',
    'Backpacking',
    'Climbing',
    'Mountaineering',
    'Running',
    'Everyday Wear',
    'Trail Running',
    'Cycling',
    'Cross-Country Skiing',
    'Snowshoeing',
    'Backcountry Skiing',
    'Travel',
    'Camping',
    'Fishing',
  ];
  
  return (
    <Fragment>
        {selected === "Men's" && (
          <Paper
            type={"Men's"}
            data={collections}
            filterTitles={mensFilterTitles}
            promotionalFilter={promotionalFilterTitlesMens}
            selectedHandler={selectedHandler}
            selected={selected}/>
        )}
    
        {selected === "Women's" && (
          <Paper
            type={"Women's"}
            data={collections}
            filterTitles={womensFilterTitles}
            promotionalFilter={promotionalFilterTitlesWomens}
            selectedHandler={selectedHandler}
            selected={selected}/>
        )}
    
        {selected === "Kids'" && (
          <Paper
            type={"Kids'"}
            data={collections}
            filterTitles={kidsFilterTitles}
            promotionalFilter={promotionalFilterTitlesKids}
            selectedHandler={selectedHandler}
            selected={selected}/>
        )}  
        
        {selected === 'Collections' && (
          <Collections
            data={collections}
            selectedHandler={selectedHandler}
            selected={selected}/>
        )}
        
        {selected === 'Sell Gear' && (
          <SellBack
            data={collections}
            selectedHandler={selectedHandler}
            selected={selected}/>
        )}
      </Fragment>
  );
}

export default Tabs;
