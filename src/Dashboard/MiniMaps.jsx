import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MainMap from "./MainMap";

function MiniMaps({ curData, data, setCurData }) {
	return (
		<div className="w-[100%] h-[100%] ">
			<Carousel
				additionalTransfrom={0}
				arrows
				autoPlaySpeed={3000}
				centerMode={false}
				className="w-[100%] h-[100%] my-0"
				containerClass="container-with-dots"
				dotListClass=""
				draggable
				focusOnSelect={false}
				infinite
				itemClass=""
				keyBoardControl
				minimumTouchDrag={80}
				pauseOnHover
				renderArrowsWhenDisabled={false}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024,
						},
						items: 4,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 1,
						partialVisibilityGutter: 30,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 4,
						partialVisibilityGutter: 40,
					},
				}}
				rewind={false}
				rewindWithAnimation={false}
				rtl={false}
				shouldResetAutoplay
				showDots={false}
				sliderClass=""
				slidesToSlide={1}
				swipeable
			>
         {
            data.map((data, index) => {
               return (
                  <div key={index} className={`p-3`} 
                  onClick={()=>{
                     setCurData(data)
                  }}>
                     <div className={`md:h-[20vh] lg:h-[20vw] w-[100%] ${curData.id === data.id ? 'border-4 border-blue-500' : ''}`} >
                     <MainMap curData={data} mini={true}/>
                     <div className={`absolute top-0 left-0 w-full h-full bg-black opacity-0`}></div>
                     </div>
                  </div>
               )
            })
         }
			</Carousel>
		</div>
	);
}

export default MiniMaps;
