import IdeaDetailPage from '@/components/IdeaDetailPage';
import React from 'react';

const IdeaDEtailsPage = async ({params}) => {
    const {id} = await params;
    const res = await fetch (`${process.env.API_URL}/ideas/${id}`);
    const IdeaDetailsData = await res.json()
    return (
        <div className="lg:max-w-7xl px-4  mx-auto">
            {/* details Page Header  */}
              <div>
                    <h1 className='font-bold md:text-2xl'><span className='bg-gradient-to-r from-cyan-400 font-bold md:font-black md:text-3xl via-teal-400 to-indigo-400 bg-clip-text text-transparent'>{IdeaDetailsData.title}</span>  Details Page</h1>
              </div>
              {/* details Page Data  */}
              <div>
                <IdeaDetailPage key={IdeaDetailsData._id}  IdeaDetailsData={IdeaDetailsData} />
              </div>
        </div>
    );
};

export default IdeaDEtailsPage;