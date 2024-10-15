import Footer from "../components/Footer";
import Feed from "../components/Feed";
import ProfileCard from "../components/ProfileCard";

function Home() {
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
  const token = getCookie("token");
  return (
    <>
      <div className="lg:flex">
        <div className="lg:w-[65vw] overflow-y-auto h-full max-h-[calc(100vh-70px)]">
          <Feed />
        </div>
        {token ? (
          <div className="lg:w-[30vw]">
            <ProfileCard />
            <div className="lg:absolute lg:bottom-0">
              <Footer />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Home;
