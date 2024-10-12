import { PostDataContext } from "../../store/PostData";
import Card from "./Card";
import Loader from "./Loader";
import { useContext } from "react";
const Feed = () => {
    const { data, fetched, dataLength } = useContext(PostDataContext);

  if (!fetched) {
    return <Loader />;
  }

  if (fetched && dataLength === 0) {
    return <div className="text-center p-10 text-lg font-bold">hmmm no one has posted yet...</div>;
  }

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="flex justify-center p-10">
          <Card item={item} />
        </div>
      ))}
    </>
  );
};

export default Feed;
