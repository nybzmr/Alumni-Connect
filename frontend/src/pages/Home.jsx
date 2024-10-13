import Footer from "../components/Footer";
import Feed from "../components/Feed";
import ProfileCard from "../components/ProfileCard";


function Home() {
  const token=localStorage.getItem("token")
  return (
    <>
      <div className='lg:flex'>
        <div className="lg:w-[65vw] overflow-y-auto h-full max-h-[calc(100vh-70px)]">
          <Feed />
        </div>
       {token? <div className="lg:w-[30vw]">
          
          <ProfileCard />
          <div className="lg:absolute lg:bottom-0">
            <Footer />
          </div>
        </div>:null}
      </div>
    </>
  );
}

export default Home;
