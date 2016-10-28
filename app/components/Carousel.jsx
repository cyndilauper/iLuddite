const React = require('react'); //Put this in ProfileQueue?
const Slider = require('react-slick');

class Carousel extends React.Component {
  constructor (props) {
    super(props);
  }
    
  render () {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1, //Increase this depending on the amount of items in the queue, use state to determine this
      slidesToScroll: 1,
      useCSS: true,
      fade: true
    }
   return (
      <div className="row">
        <div className="col-md-12">
          <Slider {...settings}>
            <div><img src='http://adrienneandgeno.weebly.com/uploads/1/6/6/7/16672332/1397841092.jpg'/></div>
            <div><img src='https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAX0AAAAJDQ0ODVhMTgwLTEyMjAtNGM3Ny1hYmFlLWQ3YTAwOGE1MGI1Yg.jpg'/></div>
          </Slider>
        </div>
      </div>
    );
  }
}

module.exports = Carousel;

