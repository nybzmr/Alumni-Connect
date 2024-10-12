const Card = ({ item }) => {
  // Format the createdAt field into a more readable format
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(item.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="lg:w-[55vw] w-full px-8 py-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        {/* Display the formatted date and time */}
        <span className="text-sm font-light text-gray-600">{`${formattedDate} at ${formattedTime}`}</span>
        <span>
          {item.tags.map((tag) => {
            return (
              <a
                key={tag}
                className="px-2 mx-1 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                tabIndex="0"
                role="button"
              >
                {tag}
              </a>
            );
          })}
        </span>
      </div>

      <div className="mt-2">
        <a
          className="text-xl font-bold text-gray-700 hover:text-gray-600 hover:underline"
          tabIndex="0"
          role="link"
        >
          {item.title}
        </a>
        <p className="mt-2 text-gray-600">
          {item.body}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="space-x-3">
          <a
            href="#"
            className="font-bold"
            tabIndex="0"
            role="link"
          >
            Likes: <p className="text-red-500 inline ">{item.reactions.likes}</p>
          </a>
          <a
            href="#"
            className=" font-bold  "
            tabIndex="0"
            role="link"
          >
            Dislikes: <p className="text-red-500 inline ">{item.reactions.dislikes}</p>
          </a>
        </span>

        <div className="flex items-center">
          <a
            className="font-bold text-gray-700 cursor-pointer"
            tabIndex="0"
            role="link"
          >
           -{item.userName}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
