import { ParallaxBanner } from "react-scroll-parallax";

const CommonCover = ({ img, title, description }) => {
  return (
    <ParallaxBanner
      layers={[
        { image: img, speed: -30 },
        {
          speed: -2,
          children: (
            <div className="hero h-[600px] bg-cover bg-center mt-0">
              <div className="hero-overlay w-10/12 h-1/2 bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                  <p className="mb-5">{description}</p>
                </div>
              </div>
            </div>
          ),
        },
        // { image: "/static/banner-foreground.png", speed: -10 },
      ]}
      className="aspect-[2/1] hero h-[600px] bg-cover bg-center"
    />
  );
};

export default CommonCover;
{/* <div
  className="hero h-[600px] bg-cover bg-center mt-8"
  style={{
    backgroundImage: `url(${img})`,
  }}
>
  <div className="hero-overlay w-10/12 h-1/2 bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
      <p className="mb-5">{description}</p>
    </div>
  </div>
</div>; */}
