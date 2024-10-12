import Footer from "../components/Footer";
import Feed from "../components/Feed";
import ProfileCard from "../components/ProfileCard";

function Home() {
  return (
    <>
      <div className="flex">
        <div className="w-[65vw] overflow-y-auto h-full max-h-[calc(100vh-70px)]">
          <Feed />
        </div>
        <div className="w-[30vw]">
          
          <ProfileCard />
          <div className="absolute bottom-0">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
