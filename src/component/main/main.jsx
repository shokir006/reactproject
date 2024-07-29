import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const Main = () => {
  const [blog, setBlog] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const blogCollection = collection(db, 'blogs');

  useEffect(() => {
    const unsubscribe = onSnapshot(blogCollection, (snapshot) => {
      const fetchedBlogs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setBlog(fetchedBlogs);
    });

    return () => unsubscribe();
  }, []);

  const filteredBlogs = blog.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.descript.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className="main_bosh flex flex-col min-h-screen bg-gray-100"> 
    <h1 className="text-3xl font-bold  text-center  text-gray-900 mt-[25px]">Menu</h1>
      <section className="text-gray-600 body-font flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-wrap mb-6">
            <div className="w-full mb-6 lg:w-1/2 text-center lg:mb-0">
            </div>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-6"
          />
          <div className="flex flex-wrap -m-2">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post) => (
                <div key={post.id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      className="h-48 w-full object-cover rounded-md mb-4"
                      src={post.img || "https://dummyimage.com/720x400"}
                      alt="content"
                    />
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      {post.title || 'Chichen Itza'}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {post.descript || 'No description available.'} so'm
                    </p>
                    <button className="w-full bg-lime-600 hover:bg-lime-700 text-white p-2 rounded-lg border border-transparent">
                      Buyurtma Berish
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full text-center text-gray-500">No results found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
