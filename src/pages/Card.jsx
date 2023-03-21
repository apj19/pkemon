import React from "react";

function Card() {
  const Data = [
    {
      id: 1,
      title: "Mountain",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["photography", "travel", "winter"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    },
    {
      id: 2,
      title: "Forest",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["photography", "travel", "winter"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    },
    {
      id: 3,
      title: "Beach",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      tags: ["photography", "travel", "winter"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    },
  ];

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {Data.map((item) => (
        <div
          key={item.id}
          className="rounded overflow-hidden shadow-lg dark:shadow-gray-800"
        >
          <img className="w-full" src={item.image} alt="Mountain" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.title}</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              {item.description.substring(0, 100)}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
