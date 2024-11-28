import Image from 'next/image';
import '@/resource/styles/HomePage.css';
import Link from 'next/link';
import user_icon from '@/resource/images/person.png';


function Home() { 
    return (
         <section className="bg-gray-100">
  <main className="container mx-auto px-6 py-8">
   <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
     Featured Novels
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img alt="Cover img of a sci-fi novel with a spaceship and distant planets" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
                <div className="p-4">

       <h3 className="text-lg font-bold text-gray-800">
        The Dragons Quest
       </h3>
       <p className="text-gray-600">
        An epic tale of a knights journey to slay a dragon and save the kingdom.
       </p>
      </div>
     </div>
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a sci-fi novel with a spaceship and distant planets" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Galactic Adventures
       </h3>
       <p className="text-gray-600">
        Join the crew of the Starship Explorer as they navigate the cosmos.
       </p>
      </div>
     </div>
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a romance novel with a couple holding hands in a sunset" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Love in the Sunset
       </h3>
       <p className="text-gray-600">
        A heartwarming story of love and relationships set against beautiful sunsets.
       </p>
      </div>
     </div>
    </div>
   </section>
   <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
     Latest Releases
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a mystery novel with a detective and a dark alley" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        The Silent Detective
       </h3>
       <p className="text-gray-600">
        A gripping mystery novel following a detective quest to solve a dark case.
       </p>
      </div>
     </div>
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a horror novel with a haunted house and a ghost" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Haunted Nights
       </h3>
       <p className="text-gray-600">
        Experience the chills and thrills of a haunted house in this horror novel.
       </p>
      </div>
     </div>
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a historical novel with a medieval castle and knights" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Medieval Chronicles
       </h3>
       <p className="text-gray-600">
        Dive into the history and adventures of medieval times in this novel.
       </p>
      </div>
     </div>
    </div>
   </section>
   <section>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
     Popular Novels
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a fantasy novel with a wizard and magical creatures" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Wizards Journey
       </h3>
       <p className="text-gray-600">
        Follow the adventures of a wizard in a world filled with magic and wonder.
       </p>
      </div>
     </div>
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a thriller novel with a spy and a cityscape" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Spy in the Shadows
       </h3>
       <p className="text-gray-600">
        A thrilling novel about espionage and intrigue in a bustling city.
       </p>
      </div>
     </div>
     <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img alt="Cover img of a drama novel with a family and a countryside" className="w-full h-48 object-cover" height="400" src="https://th.bing.com/th/id/R.2b376f0f7550b4819ddbe73c17db215a?rik=cKYPzGh7knzSKA&pid=ImgRaw&r=0" width="600"/>
      <div className="p-4">
       <h3 className="text-lg font-bold text-gray-800">
        Family Ties
       </h3>
       <p className="text-gray-600">
        A touching drama about family relationships and life in the countryside.
       </p>
      </div>
     </div>
    </div>
   </section>
  </main>
  <footer className="bg-white shadow mt-8">
   <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <p className="text-gray-800">
     © 2024 WebToon. All rights reserved.
    </p>
    <div className="flex space-x-4">
     <Link className="text-gray-800 hover:text-gray-600" href="#">
      <i className="fab fa-facebook-f">
      </i>
     </Link>
     <Link className="text-gray-800 hover:text-gray-600" href="#">
      <i className="fab fa-twitter">
      </i>
     </Link>
     <a title="nguvaiz" className="text-gray-800 hover:text-gray-600" href="#">
      <i className="fab fa-instagram">
      </i>
     </a>
    </div>
   </div>
      </footer>
      
      
 </section>
    )
}
export default Home;